/**
 * Vanilla three.js particle field with a cursor attraction well, plus the hero
 * crystal (HeroCrystal.js) sharing the same scene and WebGL context.
 *
 * This module and HeroCrystal.js are the ONLY files allowed to import from
 * `three`, and they are reached exclusively through a dynamic import() so the ~115 KB gz chunk never
 * enters the entry graph. If anything statically imports this file, the code
 * split silently breaks.
 *
 * All motion happens in the vertex shader. The per-frame CPU cost is three
 * vector operations to rebuild the cursor ray — there is no particle loop.
 */

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";

import { subscribe, ORDER } from "@/lib/raf";
import { pointer } from "@/lib/pointer";
import { clamp, damp } from "@/lib/math";
import { dprCap, perfTier } from "@/lib/env";
import { buildAttributes, particleCount } from "./buildBuffers";
import { createHeroCrystal } from "./HeroCrystal";

const VERT = /* glsl */ `
  uniform float uTime, uStrength, uRadius, uRadiusGrow, uPullFrac, uSwirl;
  uniform float uSize, uProjScale, uFogNear, uFogFar, uScroll;
  uniform vec3  uRayOrigin, uRayDir, uColorA, uColorB, uAccent;

  attribute float aSeed, aScale, aTint, aDrift;

  varying vec3  vColor;
  varying float vFade;

  void main() {
    // Idle drift, entirely GPU-side.
    float p = aSeed * 6.28318;
    vec3 pos = position + vec3(
      sin(uTime * 0.17 + p),
      cos(uTime * 0.13 + p * 1.7),
      sin(uTime * 0.09 + p * 2.3)
    ) * aDrift;

    pos.y += uScroll;

    // Distance to the cursor RAY, not to a point on a plane. A ray gives a cone
    // of influence, so the well keeps a constant apparent radius at every depth.
    vec3  toP    = pos - uRayOrigin;
    float t      = max(dot(toP, uRayDir), 0.0);
    vec3  onAxis = uRayOrigin + uRayDir * t;
    vec3  delta  = onAxis - pos;
    float dist   = length(delta);

    float radius = uRadius * (1.0 + t * uRadiusGrow);
    float f = 1.0 - smoothstep(0.0, radius, dist);
    f = f * f;                 // soft rim, strong core
    f *= uStrength;

    // Displacement is a FRACTION of the remaining gap, so it is self-limiting:
    // no 1/r^2 singularity, no particles tunnelling through the cursor axis.
    vec3 axis    = normalize(delta + 1e-5);
    vec3 tangent = cross(uRayDir, axis);
    pos += delta * (f * uPullFrac) + tangent * (f * uSwirl);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // uSize is a world-space diameter; uProjScale converts it to device pixels
    // ((drawingBufferHeight / 2) / tan(fov / 2)), so it already accounts for DPR.
    // Clamped to 64: plenty of mobile GPUs cap ALIASED_POINT_SIZE_RANGE there.
    gl_PointSize = clamp(uSize * aScale * uProjScale / -mv.z, 1.0, 64.0);

    vFade  = smoothstep(uFogFar, uFogNear, -mv.z) * (0.35 + 0.65 * aScale);

    // Particles inside the well shift toward the accent colour, so the field
    // reads as light responding to the cursor rather than a blurry dent.
    vColor = mix(mix(uColorA, uColorB, aTint), uAccent, clamp(f * 1.5, 0.0, 1.0));
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  varying vec3  vColor;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    a *= a;                    // tight core, long soft falloff
    a *= vFade;
    if (a < 0.004) discard;    // skips the blend on most of the sprite quad
    gl_FragColor = vec4(vColor, a);
  }
`;

const srgb = (hex) => new Color(hex).convertSRGBToLinear();

export function createParticleField(host) {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: false, // additive points gain nothing from MSAA
    powerPreference: "high-performance",
    stencil: false,
    // Needed so particles behind the hero crystal are occluded by it — that
    // occlusion is most of what makes the crystal read as a solid in the field.
    depth: true,
  });

  renderer.setClearAlpha(0);
  renderer.setPixelRatio(dprCap());
  renderer.setSize(host.clientWidth, host.clientHeight, false);

  const canvas = renderer.domElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  host.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(55, host.clientWidth / host.clientHeight, 1, 90);
  camera.position.set(0, 0, 24);

  const uniforms = {
    uTime: { value: 0 },
    uStrength: { value: 0 },
    uRadius: { value: 7.5 },
    uRadiusGrow: { value: 0.045 },
    uPullFrac: { value: 0.6 },
    uSwirl: { value: 0.28 },
    uSize: { value: 0.12 }, // world-space diameter
    uProjScale: { value: 1000 }, // recomputed from the viewport below
    uFogNear: { value: 18 },
    uFogFar: { value: 80 },
    uScroll: { value: 0 },
    uRayOrigin: { value: new Vector3() },
    uRayDir: { value: new Vector3(0, 0, -1) },
    uColorA: { value: srgb("#3d6bff") },
    uColorB: { value: srgb("#8b5cf6") },
    uAccent: { value: srgb("#22d3ee") },
  };

  const material = new ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  /**
   * Converts a world-space diameter to device pixels at unit depth. Depends on
   * the framebuffer height and the vertical FOV, so it must be recomputed
   * whenever either changes.
   */
  function updateProjScale() {
    const hPx = renderer.domElement.height; // framebuffer px, DPR included
    uniforms.uProjScale.value = hPx / 2 / Math.tan((camera.fov * Math.PI) / 360);
  }
  updateProjScale();

  let geometry = null;
  let points = null;
  let count = 0;

  function buildGeometry() {
    const tier = perfTier();
    const next = particleCount(host.clientWidth, host.clientHeight, tier);
    if (geometry && Math.abs(next - count) / count < 0.2) return;

    count = next;
    const attrs = buildAttributes(count);

    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(attrs.position, 3));
    g.setAttribute("aSeed", new BufferAttribute(attrs.aSeed, 1));
    g.setAttribute("aScale", new BufferAttribute(attrs.aScale, 1));
    g.setAttribute("aTint", new BufferAttribute(attrs.aTint, 1));
    g.setAttribute("aDrift", new BufferAttribute(attrs.aDrift, 1));
    g.boundingSphere = null;
    g.computeBoundingSphere();

    if (points) {
      scene.remove(points);
      geometry.dispose();
    }
    geometry = g;
    points = new Points(g, material);
    points.frustumCulled = false;
    scene.add(points);
  }

  buildGeometry();

  const crystal = createHeroCrystal(scene, { detail: perfTier() < 0.5 ? 6 : 12 });
  crystal.layout(host.clientWidth, host.clientHeight, camera);

  // --- per-frame work: three vector ops, then one draw call ------------------
  const _v = new Vector3();
  let camX = 0;
  let camY = 0;
  let scrollDrift = 0;

  function frame(dt, t) {
    uniforms.uTime.value = t;

    // Ease the well in and out so it never snaps on pointer enter/leave.
    const target = pointer.inside ? 1 : 0;
    uniforms.uStrength.value = damp(uniforms.uStrength.value, target, 6, dt);

    _v.set(pointer.nx, pointer.ny, 0.5).unproject(camera);
    uniforms.uRayOrigin.value.copy(camera.position);
    uniforms.uRayDir.value.copy(_v).sub(camera.position).normalize();

    // The whole field leans toward the cursor, layered under the local well.
    camX = damp(camX, pointer.nx * 1.2, 2.4, dt);
    camY = damp(camY, pointer.ny * 0.7, 2.4, dt);
    camera.position.x = camX;
    camera.position.y = camY;
    camera.lookAt(0, 0, 0);

    // Drift the field as the page scrolls. Driving this off scroll *progress*
    // rather than raw scrollY means the full parallax range is used whatever
    // the document height, instead of maxing out in the first screenful.
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1) : 0;
    scrollDrift = damp(scrollDrift, progress * 22, 4, dt);
    uniforms.uScroll.value = scrollDrift;

    crystal.update(dt, t, camera);

    renderer.render(scene, camera);
  }

  // --- lifecycle -------------------------------------------------------------
  let unsubscribe = null;
  let enabled = false;

  function setEnabled(next) {
    if (next === enabled) return;
    enabled = next;
    if (next) unsubscribe = subscribe(frame, ORDER.RENDER);
    else {
      unsubscribe?.();
      unsubscribe = null;
    }
  }

  let resizeTimer = 0;
  function onResize() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(dprCap());
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    updateProjScale();
    crystal.layout(w, h, camera);

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildGeometry, 250);
  }
  window.addEventListener("resize", onResize, { passive: true });

  const onContextLost = (e) => {
    e.preventDefault();
    setEnabled(false);
  };
  const onContextRestored = () => {
    buildGeometry();
    setEnabled(true);
  };
  canvas.addEventListener("webglcontextlost", onContextLost);
  canvas.addEventListener("webglcontextrestored", onContextRestored);

  setEnabled(true);

  return {
    setEnabled,
    dispose() {
      setEnabled(false);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      geometry?.dispose();
      material.dispose();
      crystal.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
