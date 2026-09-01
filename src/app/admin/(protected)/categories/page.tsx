import Link from "next/link";
import Image from "next/image";
import { Plus, ChevronRight } from "lucide-react";
import { getAllCategories } from "@/data/categories";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteCategory } from "./actions";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-ink">Categories</h1>
          <p className="mt-1 text-sm text-brand-muted">
            {categories.length} categories, {categories.reduce((n, c) => n + c.subcategories.length, 0)} subcategories.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-1.5 rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-dark"
        >
          <Plus size={15} />
          New category
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-4 rounded-md border border-brand-ink/10 bg-white p-4 shadow-sm"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-zinc-100">
              <Image src={category.coverImage} alt="" fill sizes="56px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-brand-ink">{category.name}</p>
              <p className="truncate text-xs text-brand-muted">
                {category.subcategories.length} subcategories &middot; {category.slug}
              </p>
            </div>
            <Link
              href={`/admin/categories/${category.slug}`}
              className="flex items-center gap-1 rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-brand-ink hover:border-brand-green hover:text-brand-green"
            >
              Manage
              <ChevronRight size={13} />
            </Link>
            <DeleteButton
              action={deleteCategory.bind(null, category.slug)}
              confirmText={`Delete "${category.name}" and all its subcategories/products? This can't be undone.`}
            />
          </div>
        ))}
        {categories.length === 0 && (
          <p className="rounded-md border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
            No categories yet — create the first one.
          </p>
        )}
      </div>
    </div>
  );
}
