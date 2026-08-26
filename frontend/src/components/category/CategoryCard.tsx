import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types";

/** Prominent homepage category button linking into its category page (proposal 4.1). */
export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-zinc-100"
    >
      <Image
        src={category.coverImage}
        alt={category.name}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="relative z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="text-lg font-semibold text-white">{category.name}</p>
        <p className="text-sm text-zinc-200">{category.shortDescription}</p>
      </div>
    </Link>
  );
}
