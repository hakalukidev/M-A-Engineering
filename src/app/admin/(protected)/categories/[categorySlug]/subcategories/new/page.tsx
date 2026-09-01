import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data/categories";
import { SubcategoryForm } from "@/components/admin/SubcategoryForm";

export default async function NewSubcategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">New subcategory in {category.name}</h1>
      <div className="mt-6">
        <SubcategoryForm categorySlug={categorySlug} />
      </div>
    </div>
  );
}
