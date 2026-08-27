import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { CTAButton } from "@/components/cta/CTAButton";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { getAllCategories, getAllProducts } from "@/data/categories";
import { cn } from "@/lib/utils";

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
    <div className={cn("rounded-2xl bg-brand-ink/40 px-5 py-4 shadow-lg backdrop-blur-md", className)}>
      <p className="flex items-center gap-1.5 text-xs font-medium text-brand-cream/80">
        <LayoutGrid size={13} />
        {categoryCount} categories &middot; {productCount}+ products
      </p>
      <p className="mt-1 text-3xl font-bold leading-none text-brand-cream">Ready to quote</p>
    </div>
  );
}

/**
 * Homepage hero — full-bleed photo with the headline and CTA overlaid
 * directly on it (reference: a hospitality-site hero where the nav sits
 * on the same photo and a frosted stat card floats bottom-right). Our
 * nav is a separate dark bar above rather than layered on the photo
 * itself, but the photo, left-aligned headline, and floating stat badge
 * follow that same composition. Photo credit: Unsplash (free license) —
 * swap for the Client's own facility/product photography once supplied.
 */
export function Hero() {
  const categoryCount = getAllCategories().length;
  const productCount = getAllProducts().length;

  return (
    <section className="bg-brand-cream pb-14 pt-10 sm:pb-20 sm:pt-14">
      <Container>
        <div className="relative min-h-[480px] overflow-hidden rounded-3xl bg-brand-green-dark sm:min-h-[560px]">
          <Image
            src="/images/hero/commercial-kitchen.jpg"
            alt="Stainless-steel commercial kitchen equipment"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/95 via-brand-green-dark/55 to-brand-green-dark/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/70 via-transparent to-transparent" />

          <div className="relative flex min-h-[480px] flex-col justify-center gap-6 px-6 py-12 sm:min-h-[560px] sm:px-10 sm:py-16 lg:w-3/5 lg:px-14">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
              Restaurant &middot; Commercial Kitchen &middot; Bakery &middot; Medical &middot; Food Shop
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-brand-cream sm:text-5xl">
              Equipment That Keeps Your <span className="font-serif italic text-brand-orange">Business</span> Running
            </h1>
            <p className="max-w-md text-lg text-brand-cream/70">{siteConfig.description}</p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <CTAButton />
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-cream/30 px-5 py-2.5 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-cream/10"
              >
                Browse categories
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Frosted stat card, mobile: inline below the CTAs so it can never overlap them.
                (Its sm+ twin below floats bottom-right of the full photo instead.) */}
            <StatCard categoryCount={categoryCount} productCount={productCount} className="mt-2 self-start sm:hidden" />
          </div>

          {/* Frosted stat card, sm+: floats bottom-right of the full photo, positioned against
              this section's own `relative` (not the narrower text column above). */}
          <StatCard
            categoryCount={categoryCount}
            productCount={productCount}
            className="absolute bottom-8 right-8 hidden sm:block"
          />
        </div>
      </Container>
    </section>
  );
}
