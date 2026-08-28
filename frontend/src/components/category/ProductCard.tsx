import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  categorySlug,
  subcategorySlug,
}: {
  product: Product;
  categorySlug: string;
  subcategorySlug: string;
}) {
  return (
    <Link
      href={`/categories/${categorySlug}/${subcategorySlug}/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green-dark/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        {/* Subtle darkening + lift-in arrow badge on hover, echoes the category card treatment. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute right-2 top-2 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-white/90 text-brand-green-dark opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-brand-orange group-hover:text-white">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-zinc-900 transition-colors duration-300 group-hover:text-brand-green-dark">
          {product.name}
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{product.description}</p>
        <p className="mt-2 text-sm font-semibold text-brand-green-dark">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
