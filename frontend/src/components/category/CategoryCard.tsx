"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Croissant,
  Flame,
  Package,
  ShoppingBasket,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

/** Per-category glyph, shown as a badge and as a watermark when the cover image is missing. Also reused wherever a category needs a matching icon (e.g. the categories directory page). */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "restaurant-equipment": UtensilsCrossed,
  "commercial-kitchen-equipment": Flame,
  "bakery-equipment": Croissant,
  "medical-equipment": Stethoscope,
  "food-shop-equipment": ShoppingBasket,
};

/**
 * Prominent homepage category button linking into its category page (proposal 4.1).
 * `featured` renders a larger tile for the lead position in a bento-style grid.
 */
export function CategoryCard({
  category,
  featured = false,
}: {
  category: Category;
  featured?: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = CATEGORY_ICONS[category.slug] ?? Package;
  const typeCount = category.subcategories.length;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group relative flex aspect-[4/3] h-full w-full flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-brand-green to-brand-green-dark shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-green-dark/20 lg:aspect-auto"
      )}
    >
      {!imageFailed && (
        <Image
          src={category.coverImage}
          alt={category.name}
          fill
          sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageFailed(true)}
        />
      )}

      {imageFailed && (
        <Icon
          aria-hidden
          className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-white/10"
          strokeWidth={1}
        />
      )}

      {/* Legibility gradient, always present regardless of image state. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      <div className="pointer-events-none absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
        <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
      </div>

      <div className="relative z-10 flex items-end justify-between gap-3 p-4 sm:p-5">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-white/60">
            {typeCount} {typeCount === 1 ? "type" : "types"}
          </p>
          <p
            className={cn(
              "font-semibold text-white",
              featured ? "text-2xl sm:text-3xl" : "text-lg"
            )}
          >
            {category.name}
          </p>
          <p
            className={cn(
              "mt-1 text-white/75",
              featured ? "max-w-md text-sm sm:text-base" : "text-sm line-clamp-2"
            )}
          >
            {category.shortDescription}
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300 group-hover:bg-brand-orange group-hover:ring-brand-orange">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}
