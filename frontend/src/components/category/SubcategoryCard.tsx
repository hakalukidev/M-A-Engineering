import Image from "next/image";
import Link from "next/link";
import type { Subcategory } from "@/types";

/** Subcategory button on a category page, linking into its subcategory page. */
export function SubcategoryCard({
  categorySlug,
  subcategory,
}: {
  categorySlug: string;
  subcategory: Subcategory;
}) {
  return (
    <Link
      href={`/categories/${categorySlug}/${subcategory.slug}`}
      className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-zinc-100"
    >
      <Image
        src={subcategory.coverImage}
        alt={subcategory.name}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="relative z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-lg font-semibold text-white">{subcategory.name}</p>
        <p className="text-sm text-zinc-200">{subcategory.shortDescription}</p>
      </div>
    </Link>
  );
}
