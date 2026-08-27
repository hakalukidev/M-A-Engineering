import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

/** Alternating photo/text split section for one featured category. */
export function CategoryHighlight({ category, reverse = false }: { category: Category; reverse?: boolean }) {
  return (
    <section className="py-6 sm:py-10">
      <Container>
        <div
          className={cn(
            "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
            reverse && "lg:[&>*:first-child]:order-2"
          )}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-zinc-100">
            <Image
              src={category.coverImage}
              alt={category.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-orange">
              Featured category
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              {category.name}
            </h2>
            <p className="mt-4 max-w-md text-base text-brand-ink/70">{category.shortDescription}</p>
            <p className="mt-2 text-sm font-medium text-brand-ink/50">
              {category.subcategories.length} equipment types in this category
            </p>
            <Link
              href={`/categories/${category.slug}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
            >
              Browse {category.name}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
