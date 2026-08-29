"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextAnimateSegment {
  /** One word. Segments are joined with a non-breaking space, each animating in on its own. */
  text: string;
  className?: string;
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22, delayChildren: 0.15 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * Magic UI's Text Animate (magicui.design/docs/components/text-animate),
 * trimmed to the single preset this repo needs — "blur in, word by word,
 * on mount" — and extended to take styled segments (`{ text, className }[]`)
 * instead of one plain string, so one word inside a heading (e.g. an
 * italic accent word) can keep its own styling while still animating in
 * with the rest.
 */
export function TextAnimate({
  segments,
  className,
}: {
  segments: TextAnimateSegment[];
  className?: string;
}) {
  return (
    <motion.span className={cn("inline", className)} variants={container} initial="hidden" animate="show">
      {segments.map((segment, i) => (
        <motion.span key={i} variants={word} className={cn("inline-block", segment.className)}>
          {segment.text}
          {i < segments.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
