import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MapPin, MessageCircle, ShoppingCart, Tag, Wallet } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  getAllCategories,
  getCategoryBySlug,
  getProductBySlug,
  getSubcategoryBySlug,
} from "@/data/categories";
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

/**
 * Product detail / order page. Layout follows an editorial storefront
 * reference (framed image, serif headline, "spec chip" rows standing in
 * for the reference's colour/size pickers, sticky CTA column, trust strip)
 * — but every fact shown is real, sourced from this product's own data. No
 * invented ratings, review counts, sale badges, or color/size variants:
 * this catalog is single-image, fixed-size, fixed-price (proposal 4.5), so
 * we don't fabricate signals the data doesn't have. The size/spec "chips"
 * below render as a single selected option (with a check mark) rather
 * than a picker, since there's nothing to pick between.
 */
export default async function ProductPage({
  params,
}: PageProps<"/categories/[slug]/[subcategory]/[product]">) {
  const { slug, subcategory: subcategorySlug, product: productSlug } = await params;
  const category = getCategoryBySlug(slug);
  const subcategory = getSubcategoryBySlug(slug, subcategorySlug);
  const product = getProductBySlug(slug, subcategorySlug, productSlug);

  if (!category || !subcategory || !product) notFound();

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

      {/* All the "chips" below (size, extra specs) show one real, fixed
          value with a check mark — styled like a picker, but there is
          nothing to pick since this catalog has no variants. */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-brand-ink/10 bg-brand-card shadow-md shadow-brand-ink/5">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
            {category.name} <span className="text-brand-muted">·</span> {subcategory.name}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-brand-ink/70">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-brand-ink/10 pt-6">
            <span className="text-4xl font-bold text-brand-ink">{formatPrice(product.price)}</span>
            <span className="text-sm font-medium text-brand-muted">fixed price, no hidden costs</span>
          </div>

          {/* Size / spec "chips" — single fixed value, shown selected */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Size / Spec
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-brand-green bg-brand-green/10 px-4 py-2 text-sm font-semibold text-brand-ink">
                <Check size={14} className="text-brand-green-dark" strokeWidth={3} />
                {product.size}
              </span>
            </div>
          </div>

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                    {key}
                  </p>
                  <p className="mt-2 inline-block rounded-lg border border-brand-ink/15 bg-brand-card px-3 py-1.5 text-sm font-medium text-brand-ink">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Primary CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/order?product=${product.id}`}
              className={buttonVariants("primary", "flex-1 py-3.5 text-base")}
            >
              <ShoppingCart size={18} />
              Order Now
            </Link>
            <a
              href={whatsappHref(
                siteConfig.contact.whatsapp,
                `Hi, I'm interested in ${product.name} (${product.size}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants("accent", "flex-1 py-3.5 text-base")}
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
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
    </Container>
  );
}
