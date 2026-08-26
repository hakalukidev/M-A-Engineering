import { CategoryCard } from "@/components/category/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories } from "@/data/categories";

export function CategoryGrid() {
  const categories = getAllCategories();

  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="What we offer"
          title="Browse by category"
          subtitle="4-5 machinery categories, each with a full image gallery and specs."
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
