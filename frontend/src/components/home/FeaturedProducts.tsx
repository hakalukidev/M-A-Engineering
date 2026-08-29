import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/category/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProductBySlug, getSubcategoryBySlug } from "@/data/categories";

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

/**
 * A slice of the catalog on the homepage, per the reference "Bestselling
 * Products" grid — real items, real prices, no fabricated ratings/badges.
 * Reuses the shared ProductCard (same card as /products and every
 * category page) so the "+ Cart" order button is consistent everywhere
 * products are shown, not just here.
 */
export function FeaturedProducts() {
  const items = PICKS.map(([categorySlug, subcategorySlug, productSlug]) => {
    const product = getProductBySlug(categorySlug, subcategorySlug, productSlug);
    const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);
    if (!product || !subcategory) return null;
    return { product, subcategory, categorySlug, subcategorySlug };
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
          {items.map(({ product, subcategory, categorySlug, subcategorySlug }) => (
            <ProductCard
              key={product.id}
              product={product}
              categorySlug={categorySlug}
              subcategorySlug={subcategorySlug}
              subcategoryName={subcategory.name}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
