import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";
import { CATEGORY_ICONS } from "@/components/category/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
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

      <div className="flex flex-col gap-14 sm:gap-20">
        {categories.map((category, index) => {
          const Icon = CATEGORY_ICONS[category.slug] ?? Package;
          const typeCount = category.subcategories.length;
          const imageOnRight = index % 2 === 0;

          return (
            <section
              key={category.id}
              className="flex flex-col items-center gap-8 lg:flex-row lg:gap-14"
            >
              <div
                className={cn(
                  "relative h-[300px] w-full overflow-hidden rounded-md bg-zinc-100 shadow-md ring-1 ring-black/5 sm:h-[420px] lg:h-[520px] lg:flex-[1.2]",
                  imageOnRight ? "lg:order-2" : "lg:order-1"
                )}
              >
                <Image
                  src={category.coverImage}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>

              <div
                className={cn(
                  "flex w-full max-w-lg flex-col gap-4 lg:flex-1",
                  imageOnRight ? "lg:order-1" : "lg:order-2"
                )}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-brand-cream">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
                  {typeCount} {typeCount === 1 ? "type" : "types"}
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                  {category.name}
                </h2>
                <p className="text-base leading-relaxed text-brand-ink/70">
                  {category.shortDescription}
                </p>
                <Link
                  href={`/categories/${category.slug}`}
                  className="group mt-2 inline-flex w-fit items-center gap-2 rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-brand-cream shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-orange hover:shadow-lg"
                >
                  Explore {category.name}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
