import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "accent";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-primary text-white hover:bg-brand-primary-dark",
  secondary: "bg-brand-ink text-brand-cream hover:bg-brand-ink/85",
  outline: "border border-zinc-300 text-zinc-900 hover:bg-zinc-100",
  accent: "bg-brand-green text-white hover:bg-brand-green-dark",
};

/** Shared class string so links styled as buttons (e.g. CTAButton) stay in sync. */
export function buttonVariants(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={buttonVariants(variant, className)} {...props} />;
}
