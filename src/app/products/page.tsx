import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getAllCategories, getAllProducts } from "@/data/categories";
import { ProductsFilter } from "./ProductsFilter";

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

      <ProductsFilter categories={categories} />
    </Container>
  );
}
