import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/categories";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string; productSlug: string }>;
}) {
  const { categorySlug, subcategorySlug, productSlug } = await params;
  const product = await getProductBySlug(categorySlug, subcategorySlug, productSlug);
  if (!product) notFound();

  return (
    <div>
      <Link
        href={`/admin/categories/${categorySlug}/subcategories/${subcategorySlug}`}
        className="text-xs font-semibold text-brand-green hover:underline"
      >
        &larr; Back to subcategory
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-ink">{product.name}</h1>
      <div className="mt-6">
        <ProductForm
          categorySlug={categorySlug}
          subcategorySlug={subcategorySlug}
          initial={{
            categorySlug,
            subcategorySlug,
            slug: product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            images: product.images ?? [],
            size: product.size,
            price: product.price,
            specs: product.specs ?? {},
          }}
        />
      </div>
    </div>
  );
}
