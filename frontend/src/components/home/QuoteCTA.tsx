import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { CTAButton } from "@/components/cta/CTAButton";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { whatsappHref } from "@/lib/utils";

/** Closing lead-gen banner — dark green card, decorative photo pair, call + WhatsApp CTAs. */
export function QuoteCTA() {
  return (
    <section className="pb-14 sm:pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-green-dark px-6 py-14 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 gap-4 opacity-90 lg:flex">
            <div className="relative mt-8 h-40 w-32 overflow-hidden rounded-2xl ring-4 ring-brand-green-dark">
              <Image
                src="/images/categories/medical-equipment/cover.jpg"
                alt=""
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <div className="relative h-52 w-36 overflow-hidden rounded-2xl ring-4 ring-brand-green-dark">
              <Image
                src="/images/categories/food-shop-equipment/cover.jpg"
                alt=""
                fill
                sizes="144px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
              Get a Custom Quote
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-cream sm:text-4xl">
              Fitting out a kitchen, bakery, clinic, or shop?
            </h2>
            <p className="mt-4 text-base text-brand-cream/70">
              Tell us what you need and we&apos;ll put together pricing for the full order —
              single pieces or a complete fit-out.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <CTAButton />
              <a
                href={whatsappHref(siteConfig.contact.whatsapp, "Hi, I'd like a quote for equipment.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-cream/30 px-5 py-2.5 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-cream/10"
              >
                <MessageCircle size={16} />
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
