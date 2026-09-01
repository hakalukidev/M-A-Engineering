import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI's Marquee (magicui.design/docs/components/marquee), adapted for this
 * repo: CSS-only infinite scroller driven by the `animate-marquee` /
 * `animate-marquee-vertical` tokens in globals.css — no JS/framer-motion needed.
 * Content is duplicated `repeat` times so the loop reads as continuous; every
 * duplicate past the first is `aria-hidden` so keyboard/screen-reader users
 * don't tab through the same links repeatedly.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: ReactNode;
  vertical?: boolean;
  /** How many times to duplicate `children` to fill the loop (min 2 for a seamless scroll). */
  repeat?: number;
}) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [--duration:30s] [--gap:0.75rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: Math.max(repeat, 2) }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i === 0 ? undefined : true}
          className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
