/**
 * The hero centrepiece: a noise-displaced crystal with a wireframe shell and
 * two orbit rings, rendered into the particle field's scene so the page keeps
 * a single WebGL context.
 *
 * It is anchored to the hero's right column in *page* space: layout() maps CSS
 * pixels to world units on the z = 0 plane, and update() slides it up with
 * scrollY so it scrolls away with the hero like any other element. Once it is
 * off screen it is hidden entirely and costs nothing.
 *
 * Only reached through ParticleField, which is itself dynamically imported.
 */

import {
  AdditiveBlending,
  Color,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  ShaderMaterial,
  TorusGeometry,
  Vector3,
  WireframeGeometry,
} from "three";

import { pointer } from "@/lib/pointer";
import { clamp, damp } from "@/lib/math";

// Ashima Arts 3D simplex noise (MIT).
const NOISE = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x1),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

const VERT = /* glsl */ `
  uniform float uTime, uAmp;
  varying vec3  vWorldPos;
  varying float vNoise;
  ${NOISE}
  void main() {
    // Two octaves: a slow swell and a faster ripple on top of it.
    float n  = snoise(position * 0.42 + uTime * 0.22);
    float n2 = snoise(position * 1.10 - uTime * 0.38) * 0.35;
    vec3 p = position + normal * (n + n2) * uAmp;
    vNoise = n;
    vec4 wp = modelMatrix * vec4(p, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const FRAG = /* glsl */ `
  uniform float uTime, uHover;
  uniform vec3  uColorA, uColorB, uAccent, uLightDir;
  varying vec3  vWorldPos;
  varying float vNoise;

  void main() {
    // Screen-space derivatives give one normal per facet — that is what makes
    // it read as cut crystal rather than a soft blob.
    vec3 N = normalize(cross(dFdx(vWorldPos), dFdy(vWorldPos)));
    vec3 V = normalize(cameraPosition - vWorldPos);
    if (dot(N, V) < 0.0) N = -N;

    float ndv  = max(dot(N, V), 0.0);
    float fres = pow(1.0 - ndv, 2.4);

    vec3  L    = normalize(uLightDir);
    float diff = max(dot(N, L), 0.0);
    float spec = pow(max(dot(N, normalize(L + V)), 0.0), 60.0);

    // Thin-film style iridescence driven by view angle and the displacement.
    float t = ndv * 1.4 + vNoise * 0.5 + uTime * 0.04;
    vec3 irid = 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));

    vec3 base = mix(uColorA, uColorB, 0.5 + 0.5 * vNoise);
    vec3 col  = base * (0.06 + 0.5 * diff);
    col += mix(uAccent, irid, 0.5) * fres * (1.0 + uHover * 0.6);
    col += vec3(spec) * 0.85;

    // Cool bounce light from below-left so the shadow side still has shape.
    col += uColorB * max(dot(N, normalize(vec3(-0.6, -0.8, 0.25))), 0.0) * 0.3;

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

const srgb = (hex) => new Color(hex).convertSRGBToLinear();

/** Below this width the hero is single-column and the crystal would sit on the copy. */
const MIN_WIDTH = 1100;

export function createHeroCrystal(scene, { detail = 12 } = {}) {
  const group = new Group();
  group.renderOrder = -1; // draw before the particles so they depth-test against it
  scene.add(group);

  // --- the crystal -----------------------------------------------------------
  const uniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0.32 },
    uHover: { value: 0 },
    uLightDir: { value: new Vector3(0.6, 0.9, 0.7) },
    uColorA: { value: srgb("#3d6bff") },
    uColorB: { value: srgb("#8b5cf6") },
    uAccent: { value: srgb("#22d3ee") },
  };

  const coreGeo = new IcosahedronGeometry(1, detail);
  const coreMat = new ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
  const core = new Mesh(coreGeo, coreMat);
  group.add(core);

  // --- wireframe shell, counter-rotating -------------------------------------
  const shellGeo = new WireframeGeometry(new IcosahedronGeometry(1.42, 1));
  const shellMat = new LineBasicMaterial({
    color: srgb("#6b8cff"),
    transparent: true,
    opacity: 0.22,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const shell = new LineSegments(shellGeo, shellMat);
  group.add(shell);

  // --- orbit rings -----------------------------------------------------------
  const ringMat = new MeshBasicMaterial({
    color: srgb("#a78bfa"),
    transparent: true,
    opacity: 0.55,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const ringMatB = ringMat.clone();
  ringMatB.color = srgb("#22d3ee");
  ringMatB.opacity = 0.4;

  const ringGeo = new TorusGeometry(1.75, 0.012, 6, 180);
  const ringGeoB = new TorusGeometry(2.05, 0.008, 6, 180);
  const ringA = new Mesh(ringGeo, ringMat);
  const ringB = new Mesh(ringGeoB, ringMatB);
  ringA.rotation.set(1.2, 0.3, 0);
  ringB.rotation.set(-0.9, -0.5, 0.4);
  group.add(ringA, ringB);

  // --- layout: CSS px → world units on the z = 0 plane -------------------------
  const L = { pxToWorld: 0, baseX: 0, baseY: 0, radius: 1, enabled: false, vh: 1 };

  function layout(width, height, camera) {
    const halfH = camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
    L.pxToWorld = (2 * halfH) / height;
    L.vh = height;
    L.enabled = width >= MIN_WIDTH;

    // Mirror the hero's max-w-content (72rem) container and put the crystal in
    // the centre of the empty right-hand column.
    const content = Math.min(width - 64, 1152);
    const cxPx = width / 2 + content * 0.27;
    const cyPx = height * 0.47;
    const rPx = Math.min(content * 0.15, height * 0.2);

    L.baseX = (cxPx - width / 2) * L.pxToWorld;
    L.baseY = (height / 2 - cyPx) * L.pxToWorld;
    L.radius = rPx * L.pxToWorld;
  }

  // --- per-frame -------------------------------------------------------------
  const _c = new Vector3();
  let intro = 0; // 0 → 1 scale-in on first appearance
  let hover = 0;
  let spin = 0;
  let tiltX = 0;
  let tiltY = 0;

  function update(dt, t, camera) {
    const scrollY = window.scrollY;
    const visible = L.enabled && scrollY < L.vh * 1.1;
    group.visible = visible;
    if (!visible) return;

    intro = damp(intro, 1, 1.6, dt);

    // Is the cursor over the crystal? Compare in NDC against its projected centre.
    _c.copy(group.position).project(camera);
    const rNdc = (L.radius * 1.6) / (camera.position.z * Math.tan((camera.fov * Math.PI) / 360));
    const dx = (pointer.nx - _c.x) * camera.aspect;
    const dy = pointer.ny - _c.y;
    const near = pointer.inside ? 1 - clamp(Math.hypot(dx, dy) / (rNdc * 1.8), 0, 1) : 0;
    hover = damp(hover, near, 4, dt);

    uniforms.uTime.value = t;
    uniforms.uHover.value = hover;
    uniforms.uAmp.value = 0.3 + hover * 0.22;

    // Spin speeds up under the cursor, and scrolling winds it forward.
    spin += dt * (0.18 + hover * 0.5);
    tiltX = damp(tiltX, -pointer.ny * 0.45, 3, dt);
    tiltY = damp(tiltY, pointer.nx * 0.6, 3, dt);

    const scrollRot = scrollY / L.vh;
    core.rotation.set(tiltX + scrollRot * 0.8, spin + tiltY, 0);
    shell.rotation.set(-tiltX * 0.6, -spin * 0.6 - scrollRot, t * 0.05);
    ringA.rotation.z = t * 0.25;
    ringB.rotation.z = -t * 0.18;

    // Gentle bob so it floats rather than sits.
    const bob = Math.sin(t * 0.8) * L.radius * 0.06;
    group.position.set(L.baseX, L.baseY + scrollY * L.pxToWorld + bob, 0);
    group.scale.setScalar(L.radius * (0.6 + 0.4 * intro) * (1 + hover * 0.05));
  }

  return {
    layout,
    update,
    dispose() {
      scene.remove(group);
      coreGeo.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      ringGeo.dispose();
      ringGeoB.dispose();
      ringMat.dispose();
      ringMatB.dispose();
    },
  };
}
