import { clsx, type ClassValue } from "clsx";

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
