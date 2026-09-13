import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { ClientPhoto } from "@/lib/clientsSettings";

/**
 * Client handover-photo row (all shown together, one row, nothing cropped)
 * followed by the statement + CTA — visual breathing room after the product
 * carousel. Photos and the CTA link are admin-editable (Settings > Happy
 * Clients) via src/lib/clientsSettings.ts.
 */
export function LifestyleBreak({
  photos,
  seeClientsHref,
}: {
  photos: ClientPhoto[];
  seeClientsHref: string;
}) {
  return (
    <section className="bg-brand-cream py-14 sm:py-20">
      <Container>
        <a
          href={seeClientsHref}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-green-dark px-5 py-2.5 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-green"
        >
          See Our Clients
          <ArrowRight size={16} />
        </a>

        <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-xl bg-brand-green-dark sm:rounded-lg"
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
            We build <span className="font-semibold text-brand-orange">equipment</span> built
            to last, in{" "}
            <span className="font-semibold text-brand-orange">heavy-gauge stainless steel</span>.
          </p>
        </div>
      </Container>
    </section>
  );
}
