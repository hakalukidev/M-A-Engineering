import { CategoryCard } from "@/components/category/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories } from "@/data/categories";

export function CategoryGrid() {
  const categories = getAllCategories();

  return (
    <section className="pb-16 pt-10">
      <Container>
        <SectionHeading
          eyebrow="What we offer"
          title="Browse by category"
          subtitle="4-5 equipment categories, each split into subcategories with a full image gallery and specs."
          className="mb-10"
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
  );
}
