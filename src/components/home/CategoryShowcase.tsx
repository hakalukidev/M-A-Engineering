import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";
import { CATEGORY_ICONS } from "@/components/category/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Category } from "@/types";

/**
 * The 5 equipment categories as a clean block grid — icon, name, type
 * count — rather than a photo tile wall or a single-column list. Flat,
 * bordered cards keep it consistent across categories without depending on
 * per-category imagery.
 */
export function CategoryShowcase({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we supply"
          title="Five Categories, One Trusted Supplier"
          subtitle="From a single replacement part to a full facility fit-out — restaurant, commercial kitchen, bakery, medical, and food shop equipment, all sourced and supported by one team."
          className="mb-8 sm:mb-10"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug] ?? Package;
            const typeCount = category.subcategories.length;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-brand-ink/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/30 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green-dark transition-colors duration-300 group-hover:bg-brand-green-dark group-hover:text-white">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold text-brand-ink">{category.name}</p>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-brand-ink/40">
                    {typeCount} {typeCount === 1 ? "type" : "types"}
                  </p>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition-all duration-300 group-hover:bg-red-700">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
