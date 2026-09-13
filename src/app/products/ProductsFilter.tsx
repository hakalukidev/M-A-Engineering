"use client";

import { useState } from "react";
import { ProductCard } from "@/components/category/ProductCard";
import type { Category } from "@/types";

export function ProductsFilter({ categories }: { categories: Category[] }) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug);
  const activeCategory = categories.find((category) => category.slug === activeSlug) ?? categories[0];

  if (!activeCategory) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
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
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveSlug(category.slug)}
            aria-pressed={category.slug === activeCategory.slug}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              category.slug === activeCategory.slug
                ? "border-brand-green bg-brand-green text-white"
                : "border-brand-ink/15 text-brand-ink/70 hover:border-brand-green/40 hover:text-brand-ink"
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>

      <section>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-brand-ink">
            {activeCategory.name}
          </h2>
          <span className="text-sm text-brand-ink/50">{products.length} products</span>
        </div>

        {products.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
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
