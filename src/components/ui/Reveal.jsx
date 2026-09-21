import { m } from "framer-motion";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";

/**
 * The only component in the app that uses whileInView.
 *
 * `once: true` means the observer disconnects after firing: nothing below the
 * fold animates until it is reached, and nothing re-animates on scroll-back.
 */
export function Reveal({ as = "div", variants = fadeUp, className, children, ...rest }) {
  const Tag = m[as] ?? m.div;
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Parent wrapper that staggers `<Reveal>` children. */
export function RevealGroup({ as = "div", gap = 0.08, delay = 0, className, children, ...rest }) {
  const Tag = m[as] ?? m.div;
  return (
    <Tag
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Child of RevealGroup — inherits the parent's stagger timing. */
export function RevealItem({ as = "div", variants = fadeUp, className, children, ...rest }) {
  const Tag = m[as] ?? m.div;
  return (
    <Tag className={className} variants={variants} {...rest}>
      {children}
    </Tag>
  );
}
