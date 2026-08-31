"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAllCategories } from "@/data/categories";

const GAP_PX = 12; // matches the gap-3 on the scroller

/**
 * Top-level category explore strip — one card per main category, styled as
 * an "Explore <name> / Shop →" carousel. Sits below LifestyleBreak's
 * trust-badge row, using its own photo set (not reused from Gallery's
 * subcategory-level picks) so the two carousels don't repeat images.
 */
const IMAGES: Record<string, string> = {
  "restaurant-equipment": "/images/home/explore-categories/restaurant-equipment.jpg",
  "commercial-kitchen-equipment": "/images/home/explore-categories/commercial-kitchen-equipment.jpg",
  "bakery-equipment": "/images/home/explore-categories/bakery-equipment.jpg",
  "medical-equipment": "/images/home/explore-categories/medical-equipment.jpg",
  "food-shop-equipment": "/images/home/explore-categories/food-shop-equipment.jpg",
};

function ExploreCard({ slug, name, image }: { slug: string; name: string; image: string }) {
  return (
    <Link
      href={`/categories/${slug}`}
      data-card
      className="group relative block aspect-[3/5] w-[calc((100%-12px)/2)] shrink-0 snap-start overflow-hidden rounded-md bg-zinc-100 sm:w-[calc((100%-48px)/5)]"
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(min-width: 640px) 20vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-5">
        <p className="leading-tight text-white">
          <span className="block text-sm">Explore</span>
          <span className="block font-serif text-xl italic">{name}</span>
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cream px-4 py-1.5 text-xs font-semibold text-brand-ink transition-colors group-hover:bg-white">
          Shop
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function CategoryExplore() {
  const categories = getAllCategories();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const tiles = categories
    .filter((category) => IMAGES[category.slug])
    .map((category) => ({ slug: category.slug, name: category.name, image: IMAGES[category.slug] }));

  function updateScrollState() {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
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

  if (tiles.length < 3) return null;

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <h2 className="mb-8 max-w-xl text-2xl font-bold leading-snug tracking-tight text-brand-ink sm:text-3xl">
          Explore our built-to-last{" "}
          <span className="text-brand-orange">✦</span> <span className="font-serif italic">Categories</span>
        </h2>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous categories"
            className="absolute top-1/2 -left-4 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-ink/10 bg-white text-brand-ink shadow-md transition-all duration-300 hover:bg-brand-green-dark hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:flex"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={scrollerRef}
            onScroll={updateScrollState}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tiles.map((tile) => (
              <ExploreCard key={tile.slug} {...tile} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label="Next categories"
            className="absolute top-1/2 -right-4 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-ink/10 bg-white text-brand-ink shadow-md transition-all duration-300 hover:bg-brand-green-dark hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:flex"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </Container>
    </section>
  );
}
