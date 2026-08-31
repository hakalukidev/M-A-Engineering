import type { Metadata } from "next";
import { CategoryCard } from "@/components/category/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getAllCategories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: `Browse every equipment category ${siteConfig.name} supplies.`,
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Browse"
        title="All Categories"
        subtitle="Every equipment category we supply, in one place."
        className="mb-10"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Container>
  );
}
