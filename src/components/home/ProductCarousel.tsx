"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/category/ProductCard";
import type { Product } from "@/types";

const GAP_PX = 16; // matches the gap-4 on the scroller

export interface ProductCarouselItem {
  product: Product;
  categorySlug: string;
  subcategorySlug: string;
}

/**
 * Reusable "Bestselling Products" row — small eyebrow + title, a "More
 * products" link, and a snap-scrolling row of ProductCards with edge arrow
 * buttons that disable/hide once there's nothing further to scroll to.
 * Used standalone (FeaturedProducts) and inline in the hero fold.
 */
export function ProductCarousel({
  eyebrow,
  title,
  moreHref,
  moreLabel = "More products",
  items,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  moreHref: string;
  moreLabel?: string;
  items: ProductCarouselItem[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  // Fraction of the track currently in view / scrolled past — drives the
  // mobile-only progress pill below the cards (see render below). Never
  // overlaps a card, unlike an edge fade would.
  const [viewFraction, setViewFraction] = useState(1);
  const [scrollFraction, setScrollFraction] = useState(0);

  function updateScrollState() {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setViewFraction(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
    setScrollFraction(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  }

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 280) + GAP_PX;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  if (items.length === 0) return null;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && <p className="text-base text-brand-ink/70">{eyebrow}</p>}
          <h2 className="mt-0.5 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">{title}</h2>
        </div>
        <Link
          href={moreHref}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition-colors hover:text-brand-green-dark hover:decoration-brand-green-dark"
        >
          {moreLabel}
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollLeft}
          aria-label="Previous products"
          className="absolute top-1/2 -left-4 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-ink/10 bg-white text-brand-ink shadow-md transition-all duration-300 hover:bg-brand-green-dark hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:flex"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={scrollerRef}
          onScroll={updateScrollState}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map(({ product, categorySlug, subcategorySlug }) => (
            <div
              key={product.id}
              data-card
              className="w-full shrink-0 snap-start sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-48px)/4)] xl:w-[calc((100%-64px)/5)] 2xl:w-[calc((100%-80px)/6)]"
            >
              <ProductCard
                product={product}
                categorySlug={categorySlug}
                subcategorySlug={subcategorySlug}
                onNextClick={canScrollRight ? () => scrollByCard(1) : undefined}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollRight}
          aria-label="Next products"
          className="absolute top-1/2 -right-4 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-ink/10 bg-white text-brand-ink shadow-md transition-all duration-300 hover:bg-brand-green-dark hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:flex"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Mobile-only "there's more, swipe" cue — a scrollbar-style pill
          below the row rather than anything laid over a card, so it can
          never read as cropping a product photo. Hidden once every card
          already fits in view (nothing to scroll to). */}
      {viewFraction < 1 && (
        <div aria-hidden className="mx-auto mt-3 h-1 w-24 overflow-hidden rounded-full bg-brand-ink/10 sm:hidden">
          <div
            className="h-full rounded-full bg-brand-ink/40"
            style={{
              width: `${viewFraction * 100}%`,
              marginLeft: `${scrollFraction * (100 - viewFraction * 100)}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
