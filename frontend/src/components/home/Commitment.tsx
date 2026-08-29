import Image from "next/image";
import { Leaf } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * "Our commitment" break — a staggered three-photo collage over a centered,
 * serif-italic statement. Sits between the catalog sections as a quieter,
 * editorial beat (mirrors the reference: overlapping photos, no eyebrow/title).
 */
export function Commitment() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto flex max-w-5xl items-center justify-center">
          <div className="relative z-0 -mr-10 h-[220px] w-[190px] shrink-0 -rotate-12 overflow-hidden rounded-md shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105 sm:h-[360px] sm:w-[320px] sm:-mr-16">
            <Image
              src="/images/categories/commercial-kitchen-equipment/refrigeration-storage/blast-chiller.jpg"
              alt="Commercial refrigeration units"
              fill
              sizes="(min-width: 640px) 320px, 190px"
              className="object-cover"
            />
          </div>
          <div className="relative z-10 h-[280px] w-[240px] shrink-0 overflow-hidden rounded-md shadow-xl sm:h-[460px] sm:w-[420px]">
            <Image
              src="/images/categories/restaurant-equipment/dining-furniture/wooden-dining-chair.jpg"
              alt="Wooden dining chairs and table"
              fill
              sizes="(min-width: 640px) 420px, 240px"
              className="object-cover"
            />
          </div>
          <div className="relative z-0 -ml-10 h-[220px] w-[190px] shrink-0 rotate-12 overflow-hidden rounded-md shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105 sm:h-[360px] sm:w-[320px] sm:-ml-16">
            <Image
              src="/images/categories/bakery-equipment/ovens-proofers/deck-oven-2-deck.jpg"
              alt="Commercial deck oven and proofer"
              fill
              sizes="(min-width: 640px) 320px, 190px"
              className="object-cover"
            />
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-xl leading-relaxed text-zinc-500 sm:mt-14 sm:text-2xl">
          Discover our commitment to{" "}
          <Leaf className="mb-1 inline-block h-5 w-5 text-brand-green sm:h-6 sm:w-6" />{" "}
          <span className="italic text-brand-ink">durable, responsibly sourced materials</span>,
          energy-efficient engineering, and{" "}
          <span className="italic text-brand-ink">ethical manufacturing</span> partnerships — all
          built to support a harder-working operation and a{" "}
          <Leaf className="mb-1 inline-block h-5 w-5 text-brand-green sm:h-6 sm:w-6" />{" "}
          <span className="italic text-brand-ink">greener commercial kitchen.</span>
        </p>
      </Container>
    </section>
  );
}
