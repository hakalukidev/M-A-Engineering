"use client";

import { useState } from "react";
import { ProductCard } from "@/components/category/ProductCard";
import type { Category } from "@/types";

export function ProductsFilter({ categories }: { categories: Category[] }) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug);
  const activeCategory = categories.find((category) => category.slug === activeSlug) ?? categories[0];

  const products = activeCategory.subcategories.flatMap((subcategory) =>
    subcategory.products.map((product) => ({
      product,
      subcategorySlug: subcategory.slug,
      subcategoryName: subcategory.name,
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
            className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-all hover:scale-105 ${
              category.slug === activeCategory.slug
                ? "border-brand-green bg-brand-green/10 text-brand-ink"
                : "border-brand-green/20 text-brand-ink/70 hover:border-brand-green hover:bg-brand-green/10 hover:text-brand-ink"
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
          <p className="rounded-md border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
            Products for this category are coming soon — check back shortly.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {products.map(({ product, subcategorySlug, subcategoryName }) => (
              <ProductCard
                key={product.id}
                product={product}
                categorySlug={activeCategory.slug}
                subcategorySlug={subcategorySlug}
                subcategoryName={subcategoryName}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
