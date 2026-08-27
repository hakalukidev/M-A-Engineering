import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getAllCategories, getProductBySlug, getSubcategoryBySlug } from "@/data/categories";
import { siteConfig } from "@/config/site";
import { formatPrice, whatsappHref } from "@/lib/utils";

export function generateStaticParams() {
  return getAllCategories().flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.products.map((product) => ({
        slug: category.slug,
        subcategory: subcategory.slug,
        product: product.id,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]/[subcategory]/[product]">): Promise<Metadata> {
  const { slug, subcategory: subcategorySlug, product: productSlug } = await params;
  const product = getProductBySlug(slug, subcategorySlug, productSlug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/categories/[slug]/[subcategory]/[product]">) {
  const { slug, subcategory: subcategorySlug, product: productSlug } = await params;
  const subcategory = getSubcategoryBySlug(slug, subcategorySlug);
  const product = getProductBySlug(slug, subcategorySlug, productSlug);

  if (!subcategory || !product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteConfig.url}${product.image}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Container className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-green">
            {subcategory.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">{product.name}</h1>
          <p className="mt-4 text-base text-zinc-600">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-6 rounded-xl border border-zinc-200 p-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Size</p>
              <p className="text-sm font-semibold text-zinc-900">{product.size}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Price</p>
              <p className="text-sm font-semibold text-zinc-900">{formatPrice(product.price)}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/order?product=${product.id}`}
              className={buttonVariants("primary")}
            >
              <ShoppingCart size={16} />
              Order Now
            </Link>
            <a
              href={whatsappHref(
                siteConfig.contact.whatsapp,
                `Hi, I'm interested in ${product.name} (${product.size}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants("accent")}
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
            <a
              href={siteConfig.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants("outline")}
            >
              <MapPin size={16} />
              View Factory on Map
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
