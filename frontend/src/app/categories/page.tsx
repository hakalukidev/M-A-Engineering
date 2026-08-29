import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Boxes, Layers, Package, PackageSearch } from "lucide-react";
import { CATEGORY_ICONS, CategoryCard } from "@/components/category/CategoryCard";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { MagicCard } from "@/components/magicui/magic-card";
import { Marquee } from "@/components/magicui/marquee";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getAllCategories, getAllProducts } from "@/data/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: `Browse every equipment category ${siteConfig.name} supplies, with all subcategories and products in one directory.`,
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const subcategoryCount = categories.reduce(
    (total, category) => total + category.subcategories.length,
    0
  );
  const productCount = getAllProducts().length;

  const stats = [
    { icon: Layers, label: "Categories", value: categories.length },
    { icon: Boxes, label: "Equipment types", value: subcategoryCount },
    { icon: PackageSearch, label: "Products", value: `${productCount}+` },
  ];

  return (
    <>
      {/* Banner — full-bleed photo with the page heading + directory stats overlaid, matching the About/homepage Hero composition. */}
      <section className="bg-brand-cream pb-10 pt-10 sm:pb-14 sm:pt-14">
        <Container>
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-brand-green-dark sm:min-h-[380px]">
            <Image
              src="/images/categories/bakery-equipment/cover.jpg"
              alt="Equipment on display across MA Engineering's product categories"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/95 via-brand-green-dark/60 to-brand-green-dark/20" />
            <div className="relative flex min-h-[320px] flex-col justify-center gap-4 px-6 py-12 sm:min-h-[380px] sm:px-10 lg:w-3/5 lg:px-14">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
                Directory
              </p>
              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-brand-cream sm:text-5xl">
                All Categories
              </h1>
              <p className="max-w-md text-lg text-brand-cream/70">
                Every equipment line we supply, organized into categories and types so you can go
                straight to what you need.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                {stats.map(({ icon: Icon, label, value }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-brand-cream backdrop-blur-sm ring-1 ring-white/20"
                  >
                    <Icon size={16} className="text-brand-orange" />
                    <strong className="font-semibold">{value}</strong> {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Category grid — bento layout, first category featured (matches the homepage CategoryGrid). */}
      <section className="py-6 sm:py-10">
        <Container>
          <SectionHeading
            eyebrow="Pick a category"
            title="Browse by Category"
            subtitle="Open a category to see its equipment types, photos, and fixed pricing."
            className="mb-8"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[13rem]">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : undefined}
              >
                <CategoryCard category={category} featured={index === 0} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Every subcategory, grouped by category — a scannable full-directory view for quick jumps + SEO.
          Each group is a Magic UI MagicCard (mouse-tracked spotlight) with a Magic UI Marquee
          auto-scrolling its type chips; hovering a card pauses the scroll to click a chip. */}
      <section className="py-10 sm:py-14">
        <Container>
          <SectionHeading
            eyebrow="Explore"
            title="Every Equipment Type"
            subtitle="Every subcategory, grouped by category and always in motion — hover a card to pause it and jump straight to the type you need."
            className="mb-8"
          />
          <div className="space-y-4">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.slug] ?? Package;
              const typeCount = category.subcategories.length;
              return (
                <MagicCard
                  key={category.id}
                  className="shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 px-5 py-4 sm:px-6">
                    <Link
                      href={`/categories/${category.slug}`}
                      className="group/title inline-flex items-center gap-3 text-lg font-semibold text-brand-ink transition-colors hover:text-brand-green-dark"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-brand-green-dark text-brand-cream shadow-sm ring-1 ring-brand-green-dark/10 transition-transform duration-300 group-hover/title:scale-105">
                        <Icon size={17} strokeWidth={1.75} />
                      </span>
                      {category.name}
                    </Link>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-green/15 bg-brand-green/6 px-3 py-1 text-xs font-semibold text-brand-green-dark">
                      {typeCount}
                      <span className="font-medium text-brand-ink/50">
                        {typeCount === 1 ? "type" : "types"}
                      </span>
                    </span>
                  </div>
                  {typeCount === 0 ? (
                    <p className="px-5 py-5 text-sm text-brand-ink/50 sm:px-6">
                      Types coming soon — check back shortly.
                    </p>
                  ) : (
                    <div className="relative">
                      <Marquee pauseOnHover className="[--duration:26s] px-5 py-4 sm:px-6">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            href={`/categories/${category.slug}/${subcategory.slug}`}
                            className="shrink-0 rounded-full border border-zinc-200 bg-brand-cream px-4 py-2 text-sm font-medium whitespace-nowrap text-brand-ink/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-green hover:bg-brand-green/8 hover:text-brand-green-dark hover:shadow"
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </Marquee>
                      {/* Edge fades so the loop reads as scrolling under the card, not clipping mid-chip. */}
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-brand-card to-transparent sm:w-16" />
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-brand-card to-transparent sm:w-16" />
                    </div>
                  )}
                </MagicCard>
              );
            })}
          </div>
        </Container>
      </section>

      <QuoteCTA />
    </>
  );
}
