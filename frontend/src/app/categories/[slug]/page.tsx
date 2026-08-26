import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/category/ProductGallery";
import { InquiryPopup } from "@/components/cta/InquiryPopup";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories, getCategoryBySlug } from "@/data/categories";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return {};

  return {
    title: category.name,
    description: category.shortDescription,
  };
}

export default async function CategoryPage({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Category"
        title={category.name}
        subtitle={category.shortDescription}
        className="mb-10"
      />
      <ProductGallery products={category.products} />
      <InquiryPopup
        config={{
          id: `${category.slug}-scroll-popup`,
          title: `Interested in our ${category.name}?`,
          message: "Send an inquiry and our team will reach out with pricing and availability.",
          trigger: "scroll",
          triggerValue: 60,
          cta: { label: "Enquire Now", action: "quote", href: "/contact" },
        }}
      />
    </Container>
  );
}
