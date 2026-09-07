import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, Tag, Wallet } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductImageGallery } from "@/components/category/ProductImageGallery";
import { ProductOrderPanel } from "@/components/category/ProductOrderPanel";
import { ProductTabs } from "@/components/category/ProductTabs";
import {
  getAllCategories,
  getCategoryBySlug,
  getProductBySlug,
  getSubcategoryBySlug,
} from "@/data/categories";
import { siteConfig } from "@/config/site";
import { getFooterSettings } from "@/lib/settings";
import { startingPrice } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getAllCategories()).flatMap((category) =>
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
  const product = await getProductBySlug(slug, subcategorySlug, productSlug);

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

/**
 * Product detail / order page. Layout follows an editorial storefront
 * reference (framed image + thumbnail-select strip, serif headline, "spec
 * chip" rows standing in for the reference's colour/size pickers, sticky
 * CTA column, trust strip, Description/Specifications tabs below) — but
 * every fact shown is real, sourced from this product's own data. No
 * invented ratings, review counts, sale badges, or color variants: this
 * catalog is fixed-price per size (proposal 4.5), so we don't fabricate
 * signals the data doesn't have. Size *is* a real variant, though — a
 * product can carry several size/spec options (each with its own price),
 * managed from the admin panel — so the "chip" row (ProductOrderPanel) is a
 * genuine picker; most products still just have the one option, which
 * renders as a single pre-selected chip. The thumbnail strip
 * (ProductImageGallery) only appears once a product actually has more than
 * one real photo in its `images` array — most products still have just the
 * one. The reference's Reviews tab and customer-review section below are
 * intentionally dropped — no review data to show.
 */
export default async function ProductPage({
  params,
}: PageProps<"/categories/[slug]/[subcategory]/[product]">) {
  const { slug, subcategory: subcategorySlug, product: productSlug } = await params;
  const [category, subcategory, product, settings] = await Promise.all([
    getCategoryBySlug(slug),
    getSubcategoryBySlug(slug, subcategorySlug),
    getProductBySlug(slug, subcategorySlug, productSlug),
    getFooterSettings(),
  ]);

  if (!category || !subcategory || !product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteConfig.url}${product.image}`,
    offers:
      product.sizes.length > 1
        ? {
            "@type": "AggregateOffer",
            priceCurrency: "BDT",
            lowPrice: startingPrice(product.sizes),
            highPrice: Math.max(...product.sizes.map((option) => option.price)),
            offerCount: product.sizes.length,
            availability: "https://schema.org/InStock",
          }
        : {
            "@type": "Offer",
            priceCurrency: "BDT",
            price: product.sizes[0].price,
            availability: "https://schema.org/InStock",
          },
  };

  // Honest, data-backed trust points (see ValueProps) — every claim here
  // maps to a real feature already on the site (fixed pricing, the manual
  // payment methods on the order form, the WhatsApp CTA, the map link).
  const trustPoints = [
    { icon: Tag, label: "Fixed price", detail: "No hidden costs or gateway fees" },
    { icon: Wallet, label: "Manual payment", detail: "bKash, Nagad, Rocket or bank" },
    { icon: MessageCircle, label: "WhatsApp support", detail: "Ask questions before you order" },
    { icon: MapPin, label: "Visit the factory", detail: "See it in person by appointment" },
  ];

  return (
    <Container className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductImageGallery
            images={product.images && product.images.length > 0 ? product.images : [product.image]}
            alt={product.name}
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
            {category.name} <span className="text-brand-muted">·</span> {subcategory.name}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-brand-ink/70">
            {product.description}
          </p>

          <ProductOrderPanel product={product} whatsapp={settings.whatsapp} />

          <a
            href={siteConfig.contact.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-green-dark underline-offset-4 hover:underline"
          >
            <MapPin size={14} />
            View factory on map
          </a>

          {/* Trust strip */}
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-brand-ink/10 pt-6 sm:grid-cols-4">
            {trustPoints.map(({ icon: Icon, label, detail }) => (
              <div key={label} className="flex flex-col items-start gap-1.5 sm:items-center sm:text-center">
                <Icon size={20} className="text-brand-green-dark" strokeWidth={1.75} />
                <div className="min-w-0 leading-tight">
                  <p className="text-sm font-semibold text-brand-ink">{label}</p>
                  <p className="text-xs text-brand-muted">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductTabs description={product.description} specs={product.specs} />
    </Container>
  );
}
