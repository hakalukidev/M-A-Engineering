import type { Metadata } from "next";
import { ProductCard } from "@/components/category/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getAllCategories, getAllProducts } from "@/data/categories";

export const metadata: Metadata = {
  title: "Products",
  description: `Browse every product ${siteConfig.name} supplies, in one place.`,
};

export default function ProductsPage() {
  const categories = getAllCategories();
  const productCount = getAllProducts().length;

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Everything we supply"
        title="All Products"
        subtitle={`${productCount}+ products across restaurant, kitchen, bakery, medical, and food shop equipment.`}
        className="mb-8"
      />

      {/* Quick-jump chips to each category section below — plain anchor links, no JS needed. */}
      <nav aria-label="Jump to category" className="mb-10 flex flex-wrap gap-2">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#${category.slug}`}
            className="rounded-full border border-brand-green/20 px-4 py-1.5 text-sm font-medium text-brand-ink/70 transition-colors hover:border-brand-green hover:text-brand-ink"
          >
            {category.name}
          </a>
        ))}
      </nav>

      <div className="space-y-14">
        {categories.map((category) => {
          const products = category.subcategories.flatMap((subcategory) =>
            subcategory.products.map((product) => ({
              product,
              subcategorySlug: subcategory.slug,
              subcategoryName: subcategory.name,
            }))
          );

          return (
            <section key={category.id} id={category.slug} className="scroll-mt-28">
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-brand-ink">
                  {category.name}
                </h2>
                <span className="text-sm text-brand-ink/50">{products.length} products</span>
              </div>

              {products.length === 0 ? (
                <p className="rounded-md border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
                  Products for this category are coming soon — check back shortly.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map(({ product, subcategorySlug, subcategoryName }) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      categorySlug={category.slug}
                      subcategorySlug={subcategorySlug}
                      subcategoryName={subcategoryName}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </Container>
  );
}
