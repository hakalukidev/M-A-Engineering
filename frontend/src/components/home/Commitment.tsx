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
          <div className="relative z-0 -mr-[6%] w-[26%] shrink-0 aspect-[13/15] overflow-hidden rounded-md shadow-lg">
            <Image
              src="/images/categories/commercial-kitchen-equipment/refrigeration-storage/blast-chiller.jpg"
              alt="Commercial refrigeration units"
              fill
              sizes="(min-width: 1024px) 260px, 26vw"
              className="object-cover"
            />
          </div>
          <div className="relative z-10 w-[48%] shrink-0 aspect-[65/44] overflow-hidden rounded-md shadow-xl">
            <Image
              src="/images/categories/restaurant-equipment/dining-furniture/wooden-dining-chair.jpg"
              alt="Wooden dining chairs and table"
              fill
              sizes="(min-width: 1024px) 520px, 48vw"
              className="object-cover"
            />
          </div>
          <div className="relative z-0 -ml-[6%] w-[26%] shrink-0 aspect-[13/15] overflow-hidden rounded-md shadow-lg">
            <Image
              src="/images/categories/bakery-equipment/ovens-proofers/deck-oven-2-deck.jpg"
              alt="Commercial deck oven and proofer"
              fill
              sizes="(min-width: 1024px) 260px, 26vw"
              className="object-cover"
            />
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-xl leading-relaxed text-zinc-500 sm:mt-14 sm:text-2xl">
          Discover our commitment to{" "}
          <Leaf className="mb-1 inline-block h-5 w-5 text-brand-green sm:h-6 sm:w-6" />{" "}
          <span className="italic">durable, responsibly sourced materials</span>,
          energy-efficient engineering, and{" "}
          <span className="italic">ethical manufacturing</span> partnerships — all
          built to support a harder-working operation and a{" "}
          <Leaf className="mb-1 inline-block h-5 w-5 text-brand-green sm:h-6 sm:w-6" />{" "}
          <span className="italic">greener commercial kitchen.</span>
        </p>
      </Container>
    </section>
  );
}
