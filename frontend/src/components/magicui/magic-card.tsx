"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI's MagicCard (magicui.design/docs/components/magic-card), trimmed
 * to this repo's needs and re-themed to the brand palette (brand-orange
 * spotlight on a cream card, no dark-mode branch — see globals.css) instead
 * of the original's CSS-variable/dark-mode setup.
 */
export function MagicCard({
  children,
  className,
  gradientSize = 220,
  gradientColor = "rgba(193, 89, 47, 0.16)", // brand-orange, low opacity
}: {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const bounds = cardRef.current?.getBoundingClientRect();
      if (!bounds) return;
      mouseX.set(e.clientX - bounds.left);
      mouseY.set(e.clientY - bounds.top);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  const background = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 70%)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-brand-green/15 bg-brand-card transition-colors duration-300 hover:border-brand-green/30",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
