"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { ClientPhoto } from "@/lib/clientsSettings";

/**
 * Client handover-photo row (all shown together, one row, nothing cropped)
 * followed by the statement + CTA — visual breathing room after the product
 * carousel. Photos are admin-editable (Settings > Happy Clients) via
 * src/lib/clientsSettings.ts.
 *
 * "See Our Clients" and each thumbnail open the same photo enlarged in place
 * (click again, or the photo, to dismiss) rather than navigating anywhere —
 * there's no dedicated clients page to send people to yet.
 */
export function LifestyleBreak({ photos }: { photos: ClientPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <section className="bg-brand-cream py-16 sm:py-24">
      <Container>
        <button
          type="button"
          onClick={() => photos.length > 0 && setActiveIndex(0)}
          disabled={photos.length === 0}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-green-dark px-5 py-2.5 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-green disabled:pointer-events-none disabled:opacity-60"
        >
          See Our Clients
          <ArrowRight size={16} />
        </button>

        <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View larger: ${photo.alt}`}
              className="relative aspect-square overflow-hidden rounded-xl bg-brand-green-dark transition-opacity hover:opacity-90 sm:rounded-lg"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-contain"
              />
            </button>
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

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
              className="absolute right-4 top-4 text-white/70 hover:text-white"
            >
              <X size={28} />
            </button>
            <motion.div
              className="relative h-[80vh] w-full max-w-3xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setActiveIndex(null)}
            >
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
