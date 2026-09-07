import { clsx, type ClassValue } from "clsx";
import type { ProductSizeOption } from "@/types";

/** Merge conditional class names — thin wrapper so call sites stay short. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Build a `tel:` link from a phone number, stripping display formatting. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/** Build a `wa.me` deep link, optionally pre-filling the message. */
export function whatsappHref(phone: string, message?: string) {
  const digits = phone.replace(/[^\d]/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}

/** Format a BDT price for display, e.g. `formatPrice(45000)` -> "৳45,000". */
export function formatPrice(bdt: number) {
  return `৳${bdt.toLocaleString("en-US")}`;
}

/** Lowest price across a product's size options — what a multi-size product "starts from". */
export function startingPrice(sizes: ProductSizeOption[]) {
  return Math.min(...sizes.map((option) => option.price));
}

/**
 * Price display for a size list: the plain price when every size costs the
 * same (including the common single-size case), or "From ৳X" when sizes
 * carry different prices.
 */
export function formatPriceRange(sizes: ProductSizeOption[]) {
  const prices = sizes.map((option) => option.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatPrice(min) : `From ${formatPrice(min)}`;
}
