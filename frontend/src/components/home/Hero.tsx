import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, LayoutGrid } from "lucide-react";
import { CTAButton } from "@/components/cta/CTAButton";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { getAllCategories, getAllProducts } from "@/data/categories";
import type { Category } from "@/types";
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

/** Small square category tile for the hero's "Explore categories" strip — image, name, hover arrow. */
function ExploreTile({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <Image
        src={category.coverImage}
        alt={category.name}
        fill
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 23vw, 24vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm ring-1 ring-white/25 transition-all duration-300 group-hover:bg-brand-orange group-hover:ring-brand-orange">
        <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-2 text-xs font-semibold leading-tight text-white sm:text-sm">
        {category.name}
      </span>
    </Link>
  );
}

/**
 * Homepage hero — full-width photo card (headline + CTA overlaid, frosted
 * stat badge floating bottom-right) stacked above a compact "Explore
 * categories" thumbnail strip, both sharing the first fold.
 */
export function Hero() {
  const categories = getAllCategories();
  const categoryCount = categories.length;
  const productCount = getAllProducts().length;
  const exploreCategories = categories.slice(0, 4);

  return (
    <section className="bg-brand-cream pb-14 pt-10 sm:pb-20 sm:pt-14">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl bg-brand-green-dark sm:min-h-[480px]">
            <Image
              src="/images/hero/boutique-kitchen.jpg"
              alt="Warm, professionally equipped kitchen interior"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/95 via-brand-green-dark/60 to-brand-green-dark/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/75 via-transparent to-transparent" />

            <div className="relative flex min-h-[420px] flex-col justify-center gap-6 px-6 py-12 sm:min-h-[480px] sm:px-10 sm:py-16">
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
                  (Its sm+ twin below floats bottom-right of the photo card instead.) */}
              <StatCard categoryCount={categoryCount} productCount={productCount} className="mt-2 self-start sm:hidden" />
            </div>

            {/* Frosted stat card, sm+: floats bottom-right of the photo card, positioned
                against this card's own `relative` (not the narrower text column above). */}
            <StatCard
              categoryCount={categoryCount}
              productCount={productCount}
              className="absolute bottom-6 right-6 hidden sm:block"
            />
          </div>

          {/* Explore-categories strip — quick jump into the first 4 categories without leaving the hero fold. */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Explore categories
              </p>
              <Link
                href="/categories"
                className="text-xs font-semibold text-brand-green-dark hover:text-brand-green"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {exploreCategories.map((category) => (
                <ExploreTile key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
