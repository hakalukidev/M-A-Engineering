import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { CTAButton } from "@/components/cta/CTAButton";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { ProductCarousel, type ProductCarouselItem } from "@/components/home/ProductCarousel";
import { getAllCategories, getAllProducts, getProductBySlug, getSubcategoryBySlug } from "@/data/categories";
import { getFooterSettings } from "@/lib/settings";
import { getBestsellersSettings } from "@/lib/bestsellersSettings";
import { telHref } from "@/lib/utils";

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

/**
 * Homepage hero — a single, uncluttered photo card: eyebrow badge, headline,
 * one-line subtext, and two clear actions. Rounded and inset from the left,
 * right, and top edges, matching the transparent navbar's own inset in
 * Header.tsx so the two read as one continuous card. Category browsing and
 * trust signals live in their own sections right below (ValueProps,
 * CategoryExplore) instead of being crammed onto the photo.
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
      <div className="px-2.5 pt-2.5 sm:px-5 sm:pt-5">
        <div className="relative min-h-[72vh] w-full overflow-hidden rounded-2xl bg-brand-green-dark sm:min-h-[78vh]">
          <Image
            src="/images/hero/hero_image.png"
            alt="Warm, professionally equipped kitchen interior"
            fill
            priority
            sizes="100vw"
            className="object-cover lg:object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/5 sm:from-black/60 sm:via-black/20 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent sm:from-black/50 sm:via-transparent" />

          <Container className="absolute inset-x-0 bottom-0">
            <div className="flex max-w-xl flex-col gap-4 pb-5 sm:gap-5 sm:pb-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-cream/25 bg-brand-cream/10 py-1.5 pr-4 pl-2 text-xs font-medium text-brand-cream backdrop-blur-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-white">
                  <LayoutGrid size={11} />
                </span>
                {categoryCount} categories &middot; {productCount}+ products
              </span>

              <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-brand-cream sm:text-5xl sm:leading-[1.1] lg:text-6xl">
                <TextAnimate
                  segments={[
                    { text: "Equipment" },
                    { text: "that" },
                    { text: "keeps" },
                    { text: "your" },
                    { text: "business", className: "text-brand-orange" },
                    { text: "running." },
                  ]}
                />
              </h1>

              <p className="hidden max-w-md text-base leading-relaxed text-brand-cream/70 sm:block">
                Restaurant, commercial kitchen, bakery, medical, and food shop equipment —
                sourced, delivered, and supported by one team in Dhaka.
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-1 sm:gap-3">
                <Link href="/products" className={buttonVariants("inverted")}>
                  Browse Products
                  <ArrowRight size={16} />
                </Link>
                <CTAButton cta={{ label: "Call Now", action: "call", href: telHref(settings.phone) }} />
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Bestselling Products carousel — sits right under the photo, sharing the hero fold.
          Full-width (not capped by Container's max-width) so more cards fit per row. */}
      <div className="mt-10 w-full px-5 sm:mt-14 sm:px-6 lg:px-8">
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
