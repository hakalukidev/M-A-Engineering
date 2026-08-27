import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories } from "@/data/categories";

/** Flat link cloud into every subcategory — quick scanning/SEO surface, no photos required. */
export function SubcategoryCloud() {
  const categories = getAllCategories();

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Full range"
          title="Browse by equipment type"
          subtitle="Every subcategory across our 5 lines, in one place."
          className="mb-8"
        />
        <div className="flex flex-wrap gap-2.5">
          {categories.flatMap((category) =>
            category.subcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                href={`/categories/${category.slug}/${subcategory.slug}`}
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-brand-ink/80 transition-colors hover:border-brand-green hover:bg-brand-green/8 hover:text-brand-green-dark"
              >
                {subcategory.name}
              </Link>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
