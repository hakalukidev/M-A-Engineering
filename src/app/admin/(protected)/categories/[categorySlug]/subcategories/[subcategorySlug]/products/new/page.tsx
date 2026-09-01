import { notFound } from "next/navigation";
import { getSubcategoryBySlug } from "@/data/categories";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}) {
  const { categorySlug, subcategorySlug } = await params;
  const subcategory = await getSubcategoryBySlug(categorySlug, subcategorySlug);
  if (!subcategory) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">New product in {subcategory.name}</h1>
      <div className="mt-6">
        <ProductForm categorySlug={categorySlug} subcategorySlug={subcategorySlug} />
      </div>
    </div>
  );
}
