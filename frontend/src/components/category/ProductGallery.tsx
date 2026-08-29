import { ProductCard } from "@/components/category/ProductCard";
import type { Product } from "@/types";

/** Product grid for a category page — each card links to its own product page (proposal 4.2). */
export function ProductGallery({
  products,
  categorySlug,
  subcategorySlug,
  subcategoryName,
}: {
  products: Product[];
  categorySlug: string;
  subcategorySlug: string;
  subcategoryName?: string;
}) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
        Products for this category are coming soon — check back shortly.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          categorySlug={categorySlug}
          subcategorySlug={subcategorySlug}
          subcategoryName={subcategoryName}
        />
      ))}
    </div>
  );
}
