"use client";

import { useState } from "react";
import { ProductCard } from "@/components/category/ProductCard";
import type { Category } from "@/types";

/** Cycled by category index so each filter pill gets its own color. */
const PILL_COLORS = [
  { active: "border-emerald-500 bg-emerald-100 text-emerald-900", inactive: "border-emerald-200 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-50" },
  { active: "border-amber-500 bg-amber-100 text-amber-900", inactive: "border-amber-200 text-amber-800 hover:border-amber-400 hover:bg-amber-50" },
  { active: "border-sky-500 bg-sky-100 text-sky-900", inactive: "border-sky-200 text-sky-800 hover:border-sky-400 hover:bg-sky-50" },
  { active: "border-rose-500 bg-rose-100 text-rose-900", inactive: "border-rose-200 text-rose-800 hover:border-rose-400 hover:bg-rose-50" },
  { active: "border-violet-500 bg-violet-100 text-violet-900", inactive: "border-violet-200 text-violet-800 hover:border-violet-400 hover:bg-violet-50" },
  { active: "border-orange-500 bg-orange-100 text-orange-900", inactive: "border-orange-200 text-orange-800 hover:border-orange-400 hover:bg-orange-50" },
];

export function ProductsFilter({ categories }: { categories: Category[] }) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug);
  const activeCategory = categories.find((category) => category.slug === activeSlug) ?? categories[0];

  if (!activeCategory) {
    return (
      <p className="rounded-md border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
        No products yet — check back shortly.
      </p>
    );
  }

  const products = activeCategory.subcategories.flatMap((subcategory) =>
    subcategory.products.map((product) => ({
      product,
      subcategorySlug: subcategory.slug,
    }))
  );

  return (
    <>
      <nav aria-label="Filter by category" className="mb-10 flex flex-wrap gap-2">
        {categories.map((category, index) => {
          const colors = PILL_COLORS[index % PILL_COLORS.length];
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveSlug(category.slug)}
              aria-pressed={category.slug === activeCategory.slug}
              className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-all hover:scale-105 ${
                category.slug === activeCategory.slug ? colors.active : colors.inactive
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </nav>

      <section>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-brand-ink">
            {activeCategory.name}
          </h2>
          <span className="text-sm text-brand-ink/50">{products.length} products</span>
        </div>

        {products.length === 0 ? (
          <p className="rounded-md border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
            Products for this category are coming soon — check back shortly.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {products.map(({ product, subcategorySlug }) => (
              <ProductCard
                key={product.id}
                product={product}
                categorySlug={activeCategory.slug}
                subcategorySlug={subcategorySlug}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
