import type { Metadata } from "next";
import { CategoryCard } from "@/components/category/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse all machinery categories.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <Container className="py-16">
      <SectionHeading title="All Categories" className="mb-10" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </Container>
  );
}
