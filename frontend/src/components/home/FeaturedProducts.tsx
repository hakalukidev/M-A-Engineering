import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCategoryBySlug, getProductBySlug } from "@/data/categories";
import { formatPrice } from "@/lib/utils";

/** Hand-picked spread across all 5 categories so the row reads as "one of everything", not one line's whole catalog. */
const PICKS: [string, string, string][] = [
  ["restaurant-equipment", "serving-counters", "salad-bar-counter"],
  ["commercial-kitchen-equipment", "cooking-equipment", "deep-fryer-single-basket"],
  ["bakery-equipment", "ovens-proofers", "deck-oven-2-deck"],
  ["medical-equipment", "surgical-equipment", "operating-table"],
  ["food-shop-equipment", "display-counters", "meat-display-counter"],
  ["restaurant-equipment", "dining-furniture", "cushioned-booth-straight"],
  ["bakery-equipment", "display-showcases", "cake-display-showcase-curved"],
  ["medical-equipment", "diagnostic-equipment", "digital-blood-pressure-monitor"],
];

/** A slice of the catalog on the homepage, per the reference "Bestselling Products" grid — real items, real prices, no fabricated ratings/badges. */
export function FeaturedProducts() {
  const items = PICKS.map(([categorySlug, subcategorySlug, productSlug]) => {
    const product = getProductBySlug(categorySlug, subcategorySlug, productSlug);
    const category = getCategoryBySlug(categorySlug);
    if (!product || !category) return null;
    return { product, category, categorySlug, subcategorySlug };
  }).filter((item) => item !== null);

  if (items.length === 0) return null;

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Across the catalog"
            title="A look at what we supply"
            subtitle="One item from each line — every product ships with a fixed size and price, ready to add to a quote."
          />
          <Link
            href="/categories"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-green-dark hover:text-brand-green"
          >
            Browse all categories
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map(({ product, category, categorySlug, subcategorySlug }) => (
            <Link
              key={product.id}
              href={`/categories/${categorySlug}/${subcategorySlug}/${product.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/5 hover:ring-zinc-200"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-green-dark shadow-sm">
                  {category.name}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-3.5">
                <p className="text-sm font-semibold leading-snug text-zinc-900">{product.name}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{product.size}</p>
                <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                  <p className="text-sm font-bold text-brand-green-dark">{formatPrice(product.price)}</p>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green-dark transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
