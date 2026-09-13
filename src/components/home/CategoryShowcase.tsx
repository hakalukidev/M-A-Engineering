import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";
import { CATEGORY_ICONS } from "@/components/category/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Category } from "@/types";

/**
 * The 5 equipment categories as a clean, scannable list — icon, name,
 * description, type count — rather than a photo/color-block grid. Simpler to
 * keep consistent than per-category imagery, and reads as a straightforward
 * directory rather than a marketing tile wall.
 */
export function CategoryShowcase({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="What we supply"
          title="Five Categories, One Trusted Supplier"
          subtitle="From a single replacement part to a full facility fit-out — restaurant, commercial kitchen, bakery, medical, and food shop equipment, all sourced and supported by one team."
          className="mb-8 sm:mb-10"
        />

        <div className="divide-y divide-brand-ink/10 border-y border-brand-ink/10">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug] ?? Package;
            const typeCount = category.subcategories.length;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group flex items-center gap-4 py-5 transition-colors hover:bg-brand-green/5 sm:gap-6 sm:py-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green-dark transition-colors duration-300 group-hover:bg-brand-green-dark group-hover:text-white sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold text-brand-ink sm:text-xl">{category.name}</p>
                </div>

                <span className="hidden shrink-0 text-xs font-medium uppercase tracking-wide text-brand-ink/40 sm:block">
                  {typeCount} {typeCount === 1 ? "type" : "types"}
                </span>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-ink/5 text-brand-ink/60 transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white">
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
