"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Main image + thumbnail-select strip for the product page. Renders a
 * plain single image with no strip when there's only one photo — the
 * strip only earns its place once a product actually has more than one
 * (see the `images` field on Product).
 */
export function ProductImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-brand-ink/10 bg-brand-card shadow-md shadow-brand-ink/5">
        <Image
          src={active}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div
          role="tablist"
          aria-label={`${alt} photos`}
          className="mt-3 flex gap-3 overflow-x-auto pb-1"
        >
          {images.map((src, index) => (
            <button
              key={src + index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show photo ${index + 1} of ${images.length}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative aspect-square w-16 shrink-0 overflow-hidden rounded-md border-2 bg-brand-card transition-colors sm:w-20",
                index === activeIndex
                  ? "border-brand-green"
                  : "border-brand-ink/10 hover:border-brand-ink/30"
              )}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
