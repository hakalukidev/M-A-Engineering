import type { Metadata } from "next";
import Image from "next/image";
import { Boxes, Layers, PackageSearch } from "lucide-react";
import { CategoryCard } from "@/components/category/CategoryCard";
import { QuoteCTA } from "@/components/home/QuoteCTA";
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
          <div className="relative min-h-[320px] overflow-hidden rounded-md bg-brand-green-dark sm:min-h-[380px]">
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

      <QuoteCTA />
    </>
  );
}
