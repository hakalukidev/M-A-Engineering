import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Plus, Pencil } from "lucide-react";
import { getSubcategoryBySlug } from "@/data/categories";
import { SubcategoryForm } from "@/components/admin/SubcategoryForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatPrice } from "@/lib/utils";
import { deleteProduct } from "../../../actions";

export default async function AdminSubcategoryDetailPage({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}) {
  const { categorySlug, subcategorySlug } = await params;
  const subcategory = await getSubcategoryBySlug(categorySlug, subcategorySlug);
  if (!subcategory) notFound();

  return (
    <div>
      <Link
        href={`/admin/categories/${categorySlug}`}
        className="text-xs font-semibold text-brand-green hover:underline"
      >
        &larr; Back to category
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-ink">{subcategory.name}</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <SubcategoryForm
          categorySlug={categorySlug}
          initial={{
            categorySlug,
            slug: subcategory.slug,
            name: subcategory.name,
            shortDescription: subcategory.shortDescription,
            coverImage: subcategory.coverImage,
          }}
        />

        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-brand-ink">Products</h2>
            <Link
              href={`/admin/categories/${categorySlug}/subcategories/${subcategorySlug}/products/new`}
              className="flex items-center gap-1.5 rounded-md bg-brand-green px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-green-dark"
            >
              <Plus size={13} />
              New product
            </Link>
          </div>

          <div className="mt-3 space-y-2.5">
            {subcategory.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-md border border-brand-ink/10 bg-white p-3 shadow-sm"
              >
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                  <Image src={product.image} alt="" fill sizes="44px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-brand-ink">{product.name}</p>
                  <p className="truncate text-xs text-brand-muted">
                    {product.size} &middot; {formatPrice(product.price)}
                  </p>
                </div>
                <Link
                  href={`/admin/categories/${categorySlug}/subcategories/${subcategorySlug}/products/${product.id}`}
                  className="flex items-center gap-1 rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-brand-ink hover:border-brand-green hover:text-brand-green"
                >
                  <Pencil size={12} />
                  Edit
                </Link>
                <DeleteButton
                  action={deleteProduct.bind(null, categorySlug, subcategorySlug, product.id)}
                  confirmText={`Delete "${product.name}"? This can't be undone.`}
                />
              </div>
            ))}
            {subcategory.products.length === 0 && (
              <p className="rounded-md border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500">
                No products yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
