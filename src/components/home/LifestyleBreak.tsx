"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { ClientPhoto } from "@/lib/clientsSettings";

const SLIDE_INTERVAL_MS = 3500;

/**
 * Client handover-photo showcase, followed by the statement + CTA — visual
 * breathing room after the product carousel. Photos are admin-editable
 * (Settings > Happy Clients) via src/lib/clientsSettings.ts.
 *
 * On laptops and up (lg+) every photo is laid out at once in a full-width
 * grid. Below that the showcase auto-advances through them one at a time.
 * "See Our Clients" opens all of them together in a gallery overlay, for
 * anyone who wants to see the whole set at once instead of waiting for the
 * slideshow.
 */
export function LifestyleBreak({ photos }: { photos: ClientPhoto[] }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    if (photos.length <= 1 || isGalleryOpen) return;
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % photos.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [photos.length, isGalleryOpen]);

  const currentPhoto = photos[slideIndex] ?? null;

  return (
    <section className="bg-brand-cream py-16 sm:py-24">
      <Container>
        <button
          type="button"
          onClick={() => photos.length > 0 && setIsGalleryOpen(true)}
          disabled={photos.length === 0}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-green-dark px-5 py-2.5 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-green disabled:pointer-events-none disabled:opacity-60"
        >
          See Our Clients
          <ArrowRight size={16} />
        </button>

        {photos.length > 0 && (
          <div className="hidden gap-3 lg:grid lg:grid-cols-3 xl:grid-cols-6">
            {photos.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-square overflow-hidden rounded-lg bg-brand-green-dark"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 16vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {currentPhoto && (
          <div className="lg:hidden">
            <div className="relative aspect-[16/10] w-full max-w-xl overflow-hidden rounded-xl bg-brand-green-dark sm:rounded-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhoto.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    fill
                    sizes="(min-width: 640px) 36rem, 100vw"
                    className="object-contain"
                    priority={slideIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {photos.length > 1 && (
              <div className="mt-3 flex gap-1.5">
                {photos.map((photo, index) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setSlideIndex(index)}
                    aria-label={`Show photo ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      index === slideIndex
                        ? "w-6 bg-brand-green-dark"
                        : "w-1.5 bg-brand-green-dark/30 hover:bg-brand-green-dark/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 sm:mt-10">
          <p className="max-w-2xl text-xl leading-snug text-brand-ink sm:text-2xl">
            We build <span className="font-semibold text-brand-orange">equipment</span> built
            to last, in{" "}
            <span className="font-semibold text-brand-orange">heavy-gauge stainless steel</span>.
          </p>
        </div>
      </Container>

      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGalleryOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsGalleryOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 text-white/70 hover:text-white"
            >
              <X size={28} />
            </button>
            <motion.div
              className="max-h-[85vh] w-full max-w-4xl overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {photos.map((photo) => (
                  <div
                    key={photo.src}
                    className="relative aspect-square overflow-hidden rounded-xl bg-brand-green-dark sm:rounded-lg"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
