import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { CTAButton } from "@/components/cta/CTAButton";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Container } from "@/components/ui/Container";
import { ProductCarousel, type ProductCarouselItem } from "@/components/home/ProductCarousel";
import { siteConfig } from "@/config/site";
import { getAllCategories, getAllProducts, getProductBySlug, getSubcategoryBySlug } from "@/data/categories";
import { cn } from "@/lib/utils";

/** One pick from every subcategory across all 5 categories, so a wide, mostly-full carousel row reads as "one of everything" rather than one line's whole catalog. */
const FEATURED_PICKS: [string, string, string][] = [
  ["restaurant-equipment", "dining-furniture", "cushioned-booth-straight"],
  ["restaurant-equipment", "cooking-ranges", "electric-griddle-range"],
  ["restaurant-equipment", "refrigeration-units", "back-bar-cooler"],
  ["restaurant-equipment", "serving-counters", "salad-bar-counter"],
  ["commercial-kitchen-equipment", "cooking-equipment", "deep-fryer-single-basket"],
  ["commercial-kitchen-equipment", "food-preparation-equipment", "planetary-mixer-10l"],
  ["commercial-kitchen-equipment", "refrigeration-storage", "blast-chiller"],
  ["commercial-kitchen-equipment", "dishwashing-equipment", "hood-type-dishwasher"],
  ["bakery-equipment", "ovens-proofers", "deck-oven-2-deck"],
  ["bakery-equipment", "mixers-dough-equipment", "spiral-dough-mixer-25kg"],
  ["bakery-equipment", "display-showcases", "cake-display-showcase-curved"],
  ["bakery-equipment", "packaging-equipment", "tray-sealer"],
  ["medical-equipment", "hospital-furniture", "electric-hospital-bed"],
  ["medical-equipment", "diagnostic-equipment", "digital-blood-pressure-monitor"],
  ["medical-equipment", "surgical-equipment", "operating-table"],
  ["medical-equipment", "sterilization-equipment", "autoclave-50l"],
  ["food-shop-equipment", "display-counters", "meat-display-counter"],
  ["food-shop-equipment", "refrigeration-freezers", "multi-deck-open-chiller"],
  ["food-shop-equipment", "weighing-billing", "pos-billing-machine"],
  ["food-shop-equipment", "storage-shelving", "gondola-shelving"],
];

function getFeaturedItems(): ProductCarouselItem[] {
  return FEATURED_PICKS.map(([categorySlug, subcategorySlug, productSlug]) => {
    const product = getProductBySlug(categorySlug, subcategorySlug, productSlug);
    const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);
    if (!product || !subcategory) return null;
    return { product, categorySlug, subcategorySlug, subcategoryName: subcategory.name };
  }).filter((item) => item !== null);
}

function StatCard({
  categoryCount,
  productCount,
  className,
}: {
  categoryCount: number;
  productCount: number;
  className?: string;
}) {
  return (
    <div className={cn("rounded-none bg-brand-ink/40 px-3 py-2 shadow-lg backdrop-blur-md", className)}>
      <p className="flex items-center gap-1.5 text-xs font-medium text-brand-cream/80">
        <LayoutGrid size={13} />
        {categoryCount} categories &middot; {productCount}+ products
      </p>
      <p className="mt-1 text-3xl font-bold leading-none text-brand-cream">Ready to quote</p>
    </div>
  );
}

/**
 * Homepage hero — rounded photo card (headline + CTA overlaid, frosted stat
 * badge floating bottom-right) inset with a slim margin from the left,
 * right, and top edges — matching the transparent navbar's own inset in
 * Header.tsx so the two read as one continuous rounded card with the nav
 * riding on top of the photo, no gap between them. Stacked above a
 * "Bestselling Products" carousel, both sharing the first fold.
 */
export function Hero() {
  const categoryCount = getAllCategories().length;
  const productCount = getAllProducts().length;
  const featuredItems = getFeaturedItems();

  return (
    <section className="bg-brand-cream pb-4 sm:pb-6">
      <div className="px-[20px] pt-[20px]">
        <div className="relative h-[80vh] w-full overflow-hidden rounded-md bg-brand-green-dark">
          <Image
            src="/images/hero/hero_image.png"
            alt="Warm, professionally equipped kitchen interior"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <Container className="relative h-full">
            <div className="flex h-full flex-col justify-center gap-2.5 py-4 sm:py-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
                Restaurant &middot; Commercial Kitchen &middot; Bakery &middot; Medical &middot; Food Shop
              </p>
              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-brand-cream sm:text-5xl">
                <TextAnimate
                  segments={[
                    { text: "Equipment" },
                    { text: "That" },
                    { text: "Keeps" },
                    { text: "Your" },
                    { text: "Business", className: "font-serif italic text-brand-orange" },
                    { text: "Running" },
                  ]}
                />
              </h1>
              <p className="max-w-md text-lg text-brand-cream/70">{siteConfig.description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-cream/30 px-5 py-2.5 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-cream/10"
                >
                  Browse categories
                  <ArrowRight size={16} />
                </Link>
                <CTAButton />
              </div>

              {/* Frosted stat card, mobile: inline below the CTAs so it can never overlap them.
                  (Its sm+ twin below floats bottom-right of the photo card instead.) */}
              <StatCard categoryCount={categoryCount} productCount={productCount} className="self-start sm:hidden" />
            </div>
          </Container>

          {/* Frosted stat card, sm+: floats bottom-right of the photo card, aligned to the
              same Container edge as the text column above (not the card's own edge). */}
          <div className="absolute inset-x-0 bottom-2 hidden sm:block">
            <Container className="flex justify-end">
              <StatCard categoryCount={categoryCount} productCount={productCount} />
            </Container>
          </div>
        </div>
      </div>

      {/* Bestselling Products carousel — sits right under the photo, sharing the hero fold.
          Full-width (not capped by Container's max-w-6xl) so more cards fit per row. */}
      <div className="mt-4 w-full px-[20px] sm:mt-6">
        <ProductCarousel
          eyebrow="Across the catalog"
          title={
            <>
              Bestselling <span className="text-brand-orange">✦</span> Products
            </>
          }
          moreHref="/categories"
          moreLabel="More products"
          items={featuredItems}
        />
      </div>
    </section>
  );
}
