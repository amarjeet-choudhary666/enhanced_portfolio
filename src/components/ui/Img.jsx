import { cn } from "@/lib/cn";

/**
 * width/height are always required, which is what keeps CLS at zero.
 * Pass `priority` for the single LCP image only.
 */
export default function Img({ src, alt, width, height, priority = false, className, ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchpriority: "high" } : null)}
      className={cn("block", className)}
      {...rest}
    />
  );
}
