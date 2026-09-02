import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

/**
 * Catalog card — visual reference: padded product frame, small italic
 * pill tag on the image, tagline + price row with a "+ Cart" pill button.
 * We don't have promotions or an actual cart (fixed-price catalog,
 * WhatsApp/order flow, no variants), so the pill shows the real
 * subcategory instead of a fabricated promo badge, and the "+ Cart"
 * button deep-links straight into the real order form for this product.
 */
export function ProductCard({
  product,
  categorySlug,
  subcategorySlug,
  subcategoryName,
}: {
  product: Product;
  categorySlug: string;
  subcategorySlug: string;
  /** Falls back to the slug, title-cased, when the caller doesn't have the name handy. */
  subcategoryName?: string;
}) {
  const href = `/categories/${categorySlug}/${subcategorySlug}/${product.id}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-md border border-brand-ink/10 bg-brand-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-lg hover:shadow-brand-green-dark/10">
      <Link href={href} className="block p-2.5 pb-0">
        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gradient-to-b from-brand-cream to-brand-ink/10">
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full border border-brand-ink/10 bg-brand-card/90 px-3 py-1 font-serif text-xs italic text-brand-ink/75 backdrop-blur-sm">
            {subcategoryName ?? subcategorySlug.replace(/-/g, " ")}
          </span>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute right-2.5 top-2.5 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-white/90 text-brand-green-dark opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:bg-brand-orange group-hover:text-white">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <Link href={href} className="min-w-0">
          <p className="truncate text-sm font-semibold text-brand-ink transition-colors duration-300 group-hover:text-brand-green-dark">
            {product.name}
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-brand-ink/60">{product.description}</p>
        </Link>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <p className="min-w-0 truncate text-sm font-bold text-brand-ink sm:text-base">
            {formatPrice(product.price)}
          </p>
          <Link
            href={`/order?product=${product.id}`}
            aria-label="Add to cart"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-green-dark p-2 text-xs font-semibold text-brand-cream transition-colors hover:bg-brand-green sm:px-3.5 sm:py-2"
          >
            <Plus size={13} strokeWidth={2.75} />
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
