import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChefHat,
  CookingPot,
  Croissant,
  HeartPulse,
  LayoutGrid,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";
import { CTAButton } from "@/components/cta/CTAButton";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Container } from "@/components/ui/Container";
import { ProductCarousel, type ProductCarouselItem } from "@/components/home/ProductCarousel";
import { getAllCategories, getAllProducts, getProductBySlug, getSubcategoryBySlug } from "@/data/categories";
import { getFooterSettings } from "@/lib/settings";
import { getBestsellersSettings } from "@/lib/bestsellersSettings";
import { cn, telHref } from "@/lib/utils";
import type { Category } from "@/types";

/** Icon per top-level category, keyed by slug. */
const CATEGORY_ICONS: Record<string, typeof ChefHat> = {
  "restaurant-equipment": ChefHat,
  "commercial-kitchen-equipment": CookingPot,
  "bakery-equipment": Croissant,
  "medical-equipment": HeartPulse,
  "food-shop-equipment": Store,
};

/** Admin-curated via /admin/settings (src/lib/bestsellersSettings.ts) — falls back to one pick per subcategory until an admin saves a real list. */
async function getFeaturedItems(): Promise<ProductCarouselItem[]> {
  const { picks } = await getBestsellersSettings();
  const items = await Promise.all(
    picks.map(async ({ categorySlug, subcategorySlug, productSlug }) => {
      const [product, subcategory] = await Promise.all([
        getProductBySlug(categorySlug, subcategorySlug, productSlug),
        getSubcategoryBySlug(categorySlug, subcategorySlug),
      ]);
      if (!product || !subcategory) return null;
      return { product, categorySlug, subcategorySlug };
    })
  );
  return items.filter((item) => item !== null);
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

/** Compact icon+name pill — sits in the hero photo itself, in place of the old plain-text category line. */
function CategoryChip({ category }: { category: Category }) {
  const Icon = CATEGORY_ICONS[category.slug] ?? LayoutGrid;
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex items-center justify-center gap-2 rounded-full border border-brand-cream/25 bg-brand-cream/10 py-1.5 pr-3.5 pl-1.5 backdrop-blur-sm transition-colors hover:bg-brand-cream/20"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-cream/15 text-brand-cream transition-colors group-hover:bg-brand-orange group-hover:text-white">
        <Icon size={13} />
      </span>
      <span className="text-xs font-semibold text-brand-cream">{category.name}</span>
    </Link>
  );
}

/**
 * Homepage hero — rounded photo card (headline + CTA overlaid, frosted stat
 * badge floating bottom-right) inset with a slim margin from the left,
 * right, and top edges — matching the transparent navbar's own inset in
 * Header.tsx so the two read as one continuous rounded card with the nav
 * riding on top of the photo, no gap between them. Stacked above a
 * "Shop by category" showcase and a "Bestselling Products" carousel, all
 * three sharing the first fold.
 */
export async function Hero() {
  const [categories, products, featuredItems, settings] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
    getFeaturedItems(),
    getFooterSettings(),
  ]);
  const categoryCount = categories.length;
  const productCount = products.length;

  return (
    <section className="bg-brand-cream pb-4 sm:pb-6">
      <div className="px-[10px] pt-[10px] sm:px-[20px] sm:pt-[20px]">
        <div className="relative min-h-[80vh] w-full overflow-hidden rounded-md bg-brand-green-dark">
          <Image
            src="/images/hero/hero_image.png"
            alt="Warm, professionally equipped kitchen interior"
            fill
            priority
            sizes="100vw"
            className="object-cover lg:object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <Container className="relative h-full">
            <div className="flex h-full flex-col justify-center gap-2.5 pb-4 pt-24 sm:pb-5 sm:pt-28 lg:pt-32">
              <div className="grid max-w-lg grid-cols-3 gap-2">
                {categories
                  .filter((category) => CATEGORY_ICONS[category.slug])
                  .map((category) => (
                    <CategoryChip key={category.slug} category={category} />
                  ))}
              </div>

              {/* Safe Delivery / Reliable Service — sits right below the category boxes above. */}
              <div className="flex max-w-lg flex-col gap-3 rounded-md border border-brand-cream/15 bg-brand-cream/10 p-4 backdrop-blur-sm sm:flex-row sm:gap-5">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green text-brand-cream">
                    <Truck size={15} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-cream">1. Safe Delivery</p>
                    <p className="mt-0.5 text-xs text-brand-cream/60">Carefully packed, delivered to your site.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green text-brand-cream">
                    <ShieldCheck size={15} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-cream">2. Reliable Service</p>
                    <p className="mt-0.5 text-xs text-brand-cream/60">Real support before and after every order.</p>
                  </div>
                </div>
              </div>

              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-brand-cream sm:text-5xl">
                <TextAnimate
                  segments={[
                    { text: "Equipment" },
                    { text: "That" },
                    { text: "Keeps" },
                    { text: "Your" },
                    { text: "Business", className: "text-brand-orange" },
                    { text: "Running" },
                  ]}
                />
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-cream/30 px-5 py-2.5 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-cream/10"
                >
                  Browse categories
                  <ArrowRight size={16} />
                </Link>
                <CTAButton cta={{ label: "Call Now", action: "call", href: telHref(settings.phone) }} />
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
          moreHref="/products"
          moreLabel="More products"
          items={featuredItems}
        />
      </div>
    </section>
  );
}
