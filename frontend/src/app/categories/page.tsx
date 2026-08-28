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
          <div className="space-y-5">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.slug] ?? Package;
              return (
                <MagicCard key={category.id} className="p-5 sm:p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <Link
                      href={`/categories/${category.slug}`}
                      className="group/title inline-flex items-center gap-2.5 text-lg font-semibold text-brand-ink transition-colors hover:text-brand-green-dark"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green-dark transition-colors group-hover/title:bg-brand-green group-hover/title:text-brand-cream">
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                      {category.name}
                    </Link>
                    <span className="text-sm text-brand-ink/50">
                      {category.subcategories.length}{" "}
                      {category.subcategories.length === 1 ? "type" : "types"}
                    </span>
                  </div>
                  {category.subcategories.length === 0 ? (
                    <p className="text-sm text-brand-ink/50">
                      Types coming soon — check back shortly.
                    </p>
                  ) : (
                    <Marquee pauseOnHover className="[--duration:26s] py-1">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={`/categories/${category.slug}/${subcategory.slug}`}
                          className="shrink-0 rounded-full border border-zinc-200 bg-brand-cream px-4 py-2 text-sm font-medium whitespace-nowrap text-brand-ink/80 transition-colors hover:border-brand-green hover:bg-brand-green/8 hover:text-brand-green-dark"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </Marquee>
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
