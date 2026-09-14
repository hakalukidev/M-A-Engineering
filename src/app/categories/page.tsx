import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";
import { CATEGORY_ICONS } from "@/components/category/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getAllCategories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: `Browse every equipment category ${siteConfig.name} supplies.`,
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Browse"
        title="All Categories"
        subtitle="Every equipment category we supply, in one place."
        className="mb-12"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.slug] ?? Package;
          const typeCount = category.subcategories.length;

          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col gap-5 rounded-[32px] border border-brand-ink/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-xl hover:shadow-brand-green-dark/5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10 text-brand-green-dark transition-colors duration-300 group-hover:bg-brand-green-dark group-hover:text-white">
                  <Icon size={26} strokeWidth={1.75} />
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-ink/5 text-brand-ink/60 transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </div>

              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-brand-green">
                  {typeCount} {typeCount === 1 ? "type" : "types"}
                </p>
                <h2 className="text-xl font-bold tracking-tight text-brand-ink">{category.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/60">
                  {category.shortDescription}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
