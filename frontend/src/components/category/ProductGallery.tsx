"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ProductCard } from "@/components/category/ProductCard";
import type { Product } from "@/types";

/** Image gallery with lightbox preview for a category page (proposal 4.2). */
export function ProductGallery({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(-1);

  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
        Images for this category are coming soon — check back shortly.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} onOpen={() => setIndex(i)} />
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={products.map((product) => ({
          src: product.image,
          alt: product.name,
        }))}
      />
    </>
  );
}
