import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

// Real handover photos with clients, supplied 2026-09-07, resized to 800x800
// and re-compressed (jpeg q78) from the originals to keep page weight down.
// All four are square, shown together in one row — object-contain so none
// of them get cropped.
const CLIENT_PHOTOS = [
  { src: "/images/home/clients/client-1.jpg", alt: "MA Engineering handing over an order to Food Fantasy with Arafat" },
  { src: "/images/home/clients/client-2.jpg", alt: "MA Engineering handover with Bastu Properties Ltd." },
  { src: "/images/home/clients/client-3.jpg", alt: "MA Engineering handover with Shawarma Damasco" },
  { src: "/images/home/clients/client-4.jpg", alt: "A happy MA Engineering client, 5-star rating" },
];

// TODO: point this at the real "See Our Clients" page/link once it's sent
// over — using a plain anchor since it isn't decided yet whether it's an
// internal page or an external link.
const SEE_CLIENTS_HREF = "#";

/**
 * Client handover-photo row (all four shown together, one row, nothing
 * cropped) followed by the statement + CTA — visual breathing room after
 * the product carousel.
 */
export function LifestyleBreak() {
  return (
    <section className="bg-brand-cream py-14 sm:py-20">
      <Container>
        <a
          href={SEE_CLIENTS_HREF}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-green-dark px-5 py-2.5 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-green"
        >
          See Our Clients
          <ArrowRight size={16} />
        </a>

        <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
          {CLIENT_PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-md bg-brand-green-dark sm:rounded-lg"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10">
          <p className="max-w-2xl text-xl leading-snug text-brand-ink sm:text-2xl">
            We build <span className="font-semibold text-brand-orange">equipment</span> that
            holds up for years to come — through daily service and{" "}
            <span className="font-semibold text-brand-orange">demanding shifts</span>.
            Every piece leaves our factory in{" "}
            <span className="font-semibold text-brand-orange">heavy-gauge stainless steel</span>.
          </p>
        </div>
      </Container>
    </section>
  );
}
