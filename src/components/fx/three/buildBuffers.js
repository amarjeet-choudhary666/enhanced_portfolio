import { clamp } from "@/lib/math";

export const FIELD = {
  /**
   * World-space half-extents of the particle volume. spreadY is generous
   * because uScroll shifts the whole field vertically by up to 22 units as the
   * page scrolls — too tight and the bottom of the field empties out.
   */
  spreadX: 46,
  spreadY: 44,
  zNear: 8,
  zFar: -45,
};

/**
 * Particle count scales with viewport area and device capability.
 * The field is generated wider than the frustum because gl_POINTS are culled
 * by their centre — a large sprite whose centre crosses the screen edge pops
 * out instantly, so we keep those pops off-canvas.
 */
export function particleCount(width, height, tier) {
  // Slightly leaner than a hero-only field would be, because this one renders
  // continuously behind every section rather than pausing below the fold.
  const base = clamp(Math.round((width * height) / 750), 1100, 4200);
  return Math.round(base * tier);
}

export function buildAttributes(count) {
  const position = new Float32Array(count * 3);
  const aSeed = new Float32Array(count);
  const aScale = new Float32Array(count);
  const aTint = new Float32Array(count);
  const aDrift = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Bias toward the far plane so depth reads as volume rather than a slab.
    const zt = Math.pow(Math.random(), 0.65);
    const z = FIELD.zNear + (FIELD.zFar - FIELD.zNear) * zt;
    const depthWiden = 1 + zt * 0.85;

    position[i3] = (Math.random() * 2 - 1) * FIELD.spreadX * depthWiden;
    position[i3 + 1] = (Math.random() * 2 - 1) * FIELD.spreadY * depthWiden;
    position[i3 + 2] = z;

    aSeed[i] = Math.random();
    aScale[i] = 0.4 + Math.random() * 1.2;
    aTint[i] = Math.random();
    aDrift[i] = 0.15 + Math.random() * 0.55;
  }

  return { position, aSeed, aScale, aTint, aDrift };
}
