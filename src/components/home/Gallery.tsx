"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Category } from "@/types";

const GAP_PX = 12; // matches the gap-3 on the scroller

/**
 * Category explore strip — real subcategory photography, one pick per
 * category, styled as an "Explore <name> / Shop →" carousel per the
 * reference's editorial category-teaser row.
 */
const PICKS: [string, string][] = [
  ["restaurant-equipment", "dining-furniture"],
  ["restaurant-equipment", "cooking-ranges"],
  ["restaurant-equipment", "refrigeration-units"],
  ["restaurant-equipment", "serving-counters"],
  ["commercial-kitchen-equipment", "cooking-equipment"],
  ["commercial-kitchen-equipment", "food-preparation-equipment"],
  ["commercial-kitchen-equipment", "refrigeration-storage"],
  ["commercial-kitchen-equipment", "dishwashing-equipment"],
  ["bakery-equipment", "ovens-proofers"],
  ["bakery-equipment", "mixers-dough-equipment"],
  ["bakery-equipment", "display-showcases"],
  ["bakery-equipment", "packaging-equipment"],
  ["medical-equipment", "hospital-furniture"],
  ["medical-equipment", "diagnostic-equipment"],
  ["medical-equipment", "surgical-equipment"],
  ["medical-equipment", "sterilization-equipment"],
  ["food-shop-equipment", "display-counters"],
  ["food-shop-equipment", "refrigeration-freezers"],
  ["food-shop-equipment", "weighing-billing"],
  ["food-shop-equipment", "storage-shelving"],
];

function ExploreCard({
  categorySlug,
  subcategorySlug,
  name,
  image,
  tall,
}: {
  categorySlug: string;
  subcategorySlug: string;
  name: string;
  image: string;
  tall: boolean;
}) {
  return (
    <Link
      href={`/categories/${categorySlug}/${subcategorySlug}`}
      data-card
      className={`group relative block w-[calc((100%-12px)/2)] shrink-0 snap-start overflow-hidden rounded-md bg-zinc-100 sm:w-[calc((100%-60px)/6)] ${
        tall ? "aspect-[4/6.5]" : "aspect-[4/5]"
      }`}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(min-width: 640px) 17vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
      <p className="absolute inset-x-0 bottom-0 p-4 font-serif text-base italic leading-tight text-white">
        {name}
      </p>
    </Link>
  );
}

export function Gallery({ categories }: { categories: Category[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const tiles = PICKS.map(([categorySlug, subcategorySlug]) => {
    const category = categories.find((c) => c.slug === categorySlug);
    const subcategory = category?.subcategories.find((s) => s.slug === subcategorySlug);
    if (!category || !subcategory) return null;
    return { categorySlug, subcategorySlug, name: subcategory.name, image: subcategory.coverImage };
  }).filter((t) => t !== null);

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

  if (tiles.length < 5) return null;

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-xl text-xl leading-snug tracking-tight text-brand-ink/70 sm:text-2xl">
            Explore our range across every category{" "}
            <span className="text-brand-orange">✦</span>{" "}
            <span className="font-serif italic text-brand-ink">Gallery</span>
          </h2>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous categories"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-ink/15 bg-white text-brand-ink transition-colors hover:bg-brand-green-dark hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label="Next categories"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-ink/15 bg-white text-brand-ink transition-colors hover:bg-brand-green-dark hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onScroll={updateScrollState}
          className="flex items-start snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tiles.map((tile, index) => (
            <ExploreCard
              key={`${tile.categorySlug}-${tile.subcategorySlug}`}
              {...tile}
              tall={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
