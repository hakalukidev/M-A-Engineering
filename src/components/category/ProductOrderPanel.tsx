"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, MessageCircle, ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn, formatPrice, whatsappHref } from "@/lib/utils";
import type { Product } from "@/types";

/**
 * Price + size/spec picker + primary CTAs for the product page. A client
 * component because picking a size changes the price shown, the size/price
 * carried into the Order Now link, and the WhatsApp message text. Most
 * products still have just the one size option — the picker then renders a
 * single chip, already selected, which looks exactly like the old fixed
 * "chip" but is now backed by real (possibly multi-size) data instead of a
 * placeholder that could never be anything but one value.
 */
export function ProductOrderPanel({ product, whatsapp }: { product: Product; whatsapp: string }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].size);
  const selected = product.sizes.find((option) => option.size === selectedSize) ?? product.sizes[0];

  return (
    <>
      {/* Price */}
      <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-brand-ink/10 pt-6">
        <span className="text-4xl font-bold text-brand-ink">{formatPrice(selected.price)}</span>
        <span className="text-sm font-medium text-brand-muted">fixed price, no hidden costs</span>
      </div>

      {/* Size / spec picker — a real picker once a product has more than
          one option, a single pre-selected chip otherwise. */}
      <div className="mt-6 border-t border-brand-ink/10 pt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Size / Spec</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((option) => {
            const isSelected = option.size === selected.size;
            return (
              <button
                key={option.size}
                type="button"
                onClick={() => setSelectedSize(option.size)}
                aria-pressed={isSelected}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-colors",
                  isSelected
                    ? "border-brand-green bg-brand-green/10 text-brand-ink"
                    : "border-brand-ink/15 text-brand-ink/70 hover:border-brand-ink/30"
                )}
              >
                {isSelected && <Check size={14} className="text-brand-green-dark" strokeWidth={3} />}
                {option.size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary CTAs — Order Now carries the visual weight, WhatsApp Us
          sits alongside as a compact secondary action */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/order?product=${product.id}&size=${encodeURIComponent(selected.size)}`}
          className={buttonVariants("primary", "flex-1 py-3.5 text-base")}
        >
          <ShoppingCart size={18} />
          Order Now
        </Link>
        <a
          href={whatsappHref(whatsapp, `Hi, I'm interested in ${product.name} (${selected.size}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants("outline", "py-3.5 text-base sm:w-auto sm:px-8")}
        >
          <MessageCircle size={18} />
          WhatsApp Us
        </a>
      </div>
    </>
  );
}
