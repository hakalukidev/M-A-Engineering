import type { Metadata } from "next";
import Image from "next/image";
import { Award, HeartHandshake, ShieldCheck, Truck } from "lucide-react";
import { CategoryCard } from "@/components/category/CategoryCard";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getAllCategories, getAllProducts } from "@/data/categories";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.name}.`,
};

const pillars = [
  {
    icon: Award,
    title: "Wide Equipment Range",
    detail: "Restaurant, kitchen, bakery, medical, and food shop gear — under one roof.",
  },
  {
    icon: Truck,
    title: "Bulk & Custom Orders",
    detail: "Fitting out a full floor or sourcing a single piece, handled the same way.",
  },
  {
    icon: ShieldCheck,
    title: "Built for Daily Use",
    detail: "Equipment specified for the pace of a real kitchen, clinic, or shop floor.",
  },
  {
    icon: HeartHandshake,
    title: "Direct Support",
    detail: "Reach us by phone or WhatsApp — a real person quotes and follows up on every order.",
  },
];

export default function AboutPage() {
  const categories = getAllCategories();
  const categoryCount = categories.length;
  const productCount = getAllProducts().length;

  return (
    <>
      {/* Banner — full-bleed photo with the page heading overlaid, matching the homepage Hero composition. */}
      <section className="bg-brand-cream pb-10 pt-10 sm:pb-14 sm:pt-14">
        <Container>
          <div className="relative min-h-[320px] overflow-hidden rounded-md bg-brand-green-dark sm:min-h-[380px]">
            <Image
              src="/images/categories/restaurant-equipment/cover.jpg"
              alt="Fitted-out commercial space with MA Engineering equipment"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/95 via-brand-green-dark/60 to-brand-green-dark/20" />
            <div className="relative flex min-h-[320px] flex-col justify-center gap-4 px-6 py-12 sm:min-h-[380px] sm:px-10 lg:w-3/5 lg:px-14">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
                About us
              </p>
              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-brand-cream sm:text-5xl">
                {siteConfig.name}
              </h1>
              <p className="max-w-md text-lg text-brand-cream/70">{siteConfig.description}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Story — company profile. Placeholder narrative; replace with the Client's real company profile (proposal section 9). */}
      <section className="py-6 sm:py-10">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Our story" title="Who We Are" className="mb-5" />
            <div className="max-w-xl space-y-4 text-base leading-relaxed text-brand-ink/70">
              {/* TODO: replace with the Client's company profile (proposal section 9) — history, expertise, and what sets the company apart. */}
              <p>
                {siteConfig.name} supplies equipment across the restaurant, commercial kitchen,
                bakery, medical, and food shop trades — helping businesses in and around Dhaka
                fit out their space with gear built for daily commercial use.
              </p>
              <p>
                Whether it&apos;s a single replacement piece or a complete floor fit-out, orders
                are quoted and followed up on directly, with equipment sourced to match the
                pace of a real working kitchen, clinic, or shop.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-zinc-100">
            <Image
              src="/images/categories/commercial-kitchen-equipment/cover.jpg"
              alt="Commercial kitchen equipment ready for delivery"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* What sets us apart — four honest capability pillars. */}
      <section className="py-10 sm:py-14">
        <Container>
          <SectionHeading eyebrow="Why choose us" title="What Sets Us Apart" className="mb-8" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="rounded-md bg-brand-green/8 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-brand-cream">
                  <Icon size={18} />
                </span>
                <p className="mt-4 font-semibold text-brand-ink">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-ink/60">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3 rounded-md border border-brand-green/15 px-5 py-4 text-sm text-brand-ink/60 sm:mt-6">
            <span>
              <strong className="text-brand-ink">{categoryCount}</strong> equipment categories
            </span>
            <span className="text-brand-ink/25">&middot;</span>
            <span>
              <strong className="text-brand-ink">{productCount}+</strong> products listed
            </span>
            <span className="text-brand-ink/25">&middot;</span>
            <span>Based in {siteConfig.contact.address}</span>
          </div>
        </Container>
      </section>

      {/* Category showcase — real data, links out to what we actually supply. */}
      <section className="py-6 sm:py-10">
        <Container>
          <SectionHeading eyebrow="What we supply" title="Browse by Category" className="mb-8" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </section>

      <QuoteCTA />
    </>
  );
}
