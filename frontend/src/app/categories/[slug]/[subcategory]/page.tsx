import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/category/ProductGallery";
import { InquiryPopup } from "@/components/cta/InquiryPopup";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories, getSubcategoryBySlug } from "@/data/categories";

export function generateStaticParams() {
  return getAllCategories().flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      slug: category.slug,
      subcategory: subcategory.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]/[subcategory]">): Promise<Metadata> {
  const { slug, subcategory: subcategorySlug } = await params;
  const subcategory = getSubcategoryBySlug(slug, subcategorySlug);

  if (!subcategory) return {};

  return {
    title: subcategory.name,
    description: subcategory.shortDescription,
  };
}

export default async function SubcategoryPage({
  params,
}: PageProps<"/categories/[slug]/[subcategory]">) {
  const { slug, subcategory: subcategorySlug } = await params;
  const subcategory = getSubcategoryBySlug(slug, subcategorySlug);

  if (!subcategory) notFound();

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Subcategory"
        title={subcategory.name}
        subtitle={subcategory.shortDescription}
        className="mb-10"
      />
      <ProductGallery products={subcategory.products} />
      <InquiryPopup
        config={{
          id: `${slug}-${subcategory.slug}-scroll-popup`,
          title: `Interested in our ${subcategory.name}?`,
          message: "Send an inquiry and our team will reach out with pricing and availability.",
          trigger: "scroll",
          triggerValue: 60,
          cta: { label: "Enquire Now", action: "quote", href: "/contact" },
        }}
      />
    </Container>
  );
}
