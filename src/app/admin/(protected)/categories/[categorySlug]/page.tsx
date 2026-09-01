import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Plus, ChevronRight } from "lucide-react";
import { getCategoryBySlug } from "@/data/categories";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSubcategory } from "../actions";

export default async function AdminCategoryDetailPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  return (
    <div>
      <Link href="/admin/categories" className="text-xs font-semibold text-brand-green hover:underline">
        &larr; All categories
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-ink">{category.name}</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <CategoryForm
          initial={{
            slug: category.slug,
            name: category.name,
            shortDescription: category.shortDescription,
            coverImage: category.coverImage,
          }}
        />

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-brand-ink">Subcategories</h2>
            <Link
              href={`/admin/categories/${category.slug}/subcategories/new`}
              className="flex items-center gap-1.5 rounded-md bg-brand-green px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-green-dark"
            >
              <Plus size={13} />
              New subcategory
            </Link>
          </div>

          <div className="mt-3 space-y-2.5">
            {category.subcategories.map((subcategory) => (
              <div
                key={subcategory.id}
                className="flex items-center gap-3 rounded-md border border-brand-ink/10 bg-white p-3 shadow-sm"
              >
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                  <Image src={subcategory.coverImage} alt="" fill sizes="44px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-brand-ink">{subcategory.name}</p>
                  <p className="truncate text-xs text-brand-muted">{subcategory.products.length} products</p>
                </div>
                <Link
                  href={`/admin/categories/${category.slug}/subcategories/${subcategory.slug}`}
                  className="flex items-center gap-1 rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-brand-ink hover:border-brand-green hover:text-brand-green"
                >
                  Manage
                  <ChevronRight size={12} />
                </Link>
                <DeleteButton
                  action={deleteSubcategory.bind(null, category.slug, subcategory.slug)}
                  confirmText={`Delete "${subcategory.name}" and all its products? This can't be undone.`}
                />
              </div>
            ))}
            {category.subcategories.length === 0 && (
              <p className="rounded-md border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500">
                No subcategories yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
