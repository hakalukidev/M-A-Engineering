"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Package } from "lucide-react";
import { getAllCategories } from "@/data/categories";
import { cn } from "@/lib/utils";

function MegaMenuImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-brand-cream">
        <Package className="h-8 w-8 text-brand-muted" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 20vw, 50vw"
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      onError={() => setFailed(true)}
    />
  );
}

/**
 * Nav item showing the main categories as image cards in a dropdown
 * (proposal 4.1 — "categories with real images, nicely displayed").
 * Desktop: hover-driven. Mobile: reuses the caller's mobile-menu open state.
 */
export function CategoryMegaMenu({ mobile = false }: { mobile?: boolean }) {
  const categories = getAllCategories().slice(0, 5);

  if (mobile) {
    return (
      <div className="grid grid-cols-2 gap-2 px-2 py-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg"
          >
            <MegaMenuImage src={category.coverImage} alt={category.name} />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-2">
              <span className="text-xs font-semibold text-white">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="group/nav relative">
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-brand-cream/75 transition-colors hover:text-brand-cream"
      >
        Products
        <ChevronDown size={14} className="transition-transform group-hover/nav:rotate-180" />
      </button>

      <div
        className={cn(
          "invisible absolute left-1/2 top-full z-40 w-[36rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-150",
          "group-hover/nav:visible group-hover/nav:opacity-100"
        )}
      >
        <div className="grid grid-cols-3 gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <MegaMenuImage src={category.coverImage} alt={category.name} />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-2">
                <span className="text-xs font-semibold text-white">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
