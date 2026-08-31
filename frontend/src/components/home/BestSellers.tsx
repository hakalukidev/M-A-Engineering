"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getProductBySlug, getSubcategoryBySlug } from "@/data/categories";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const GAP_PX = 12; // matches the gap-3 on the scroller

/** One pick per subcategory, distinct from Hero's FEATURED_PICKS, so the two carousels don't repeat the same products. */
const BEST_SELLER_PICKS: [string, string, string][] = [
  ["restaurant-equipment", "dining-furniture", "standard-dining-table-4-seat"],
  ["restaurant-equipment", "cooking-ranges", "6-burner-gas-range"],
  ["restaurant-equipment", "refrigeration-units", "reach-in-chiller-double-door"],
  ["restaurant-equipment", "serving-counters", "buffet-hot-counter-3-pan"],
  ["commercial-kitchen-equipment", "cooking-equipment", "flat-top-griddle"],
  ["commercial-kitchen-equipment", "food-preparation-equipment", "meat-mincer"],
  ["commercial-kitchen-equipment", "refrigeration-storage", "walk-in-cooler-standard"],
  ["commercial-kitchen-equipment", "dishwashing-equipment", "pot-wash-sink-3-compartment"],
  ["bakery-equipment", "ovens-proofers", "combi-oven-proofer"],
  ["bakery-equipment", "mixers-dough-equipment", "dough-divider-rounder"],
  ["bakery-equipment", "display-showcases", "cold-display-showcase"],
  ["bakery-equipment", "packaging-equipment", "labeling-machine"],
  ["medical-equipment", "hospital-furniture", "patient-trolley"],
  ["medical-equipment", "diagnostic-equipment", "ecg-machine"],
  ["medical-equipment", "surgical-equipment", "surgical-light-ceiling"],
  ["medical-equipment", "sterilization-equipment", "dry-heat-sterilizer"],
  ["food-shop-equipment", "display-counters", "bakery-display-counter"],
  ["food-shop-equipment", "refrigeration-freezers", "ice-cream-freezer"],
  ["food-shop-equipment", "weighing-billing", "digital-platform-scale"],
  ["food-shop-equipment", "storage-shelving", "storage-bin-rack"],
];

interface BestSellerItem {
  product: Product;
  categorySlug: string;
  subcategorySlug: string;
  subcategoryName: string;
}

function getBestSellerItems(): BestSellerItem[] {
  return BEST_SELLER_PICKS.map(([categorySlug, subcategorySlug, productSlug]) => {
    const product = getProductBySlug(categorySlug, subcategorySlug, productSlug);
    const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);
    if (!product || !subcategory) return null;
    return { product, categorySlug, subcategorySlug, subcategoryName: subcategory.name };
  }).filter((item) => item !== null);
}

function BestSellerCard({ product, categorySlug, subcategorySlug, subcategoryName }: BestSellerItem) {
  const href = `/categories/${categorySlug}/${subcategorySlug}/${product.id}`;

  return (
    <div
      data-card
      className="group relative aspect-[3/4] w-[78%] shrink-0 snap-start overflow-hidden rounded-md bg-zinc-100 sm:w-[calc((100%-36px)/3)] lg:w-[calc((100%-48px)/4)]"
    >
      <Link href={href} className="absolute inset-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 23vw, (min-width: 640px) 32vw, 78vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      <span className="absolute left-2.5 top-2.5 z-10 rounded-full border border-white/20 bg-black/30 px-3 py-1 font-serif text-xs italic text-white backdrop-blur-sm">
        {subcategoryName}
      </span>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <Link href={href} className="min-w-0 leading-tight text-white">
          <span className="block truncate text-base font-serif italic">{product.name}</span>
          <span className="block text-lg font-semibold">{formatPrice(product.price)}</span>
        </Link>
      </div>
    </div>
  );
}

/** "Best sellers" carousel, sitting right under the Explore Categories strip on the homepage. */
export function BestSellers() {
  const items = getBestSellerItems();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  if (items.length === 0) return null;

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-base text-brand-ink/70">Customer favorites</p>
            <h2 className="mt-0.5 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">
              Best <span className="font-serif italic">sellers</span>
            </h2>
          </div>
          <Link
            href="/categories"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition-colors hover:text-brand-green-dark hover:decoration-brand-green-dark"
          >
            More products
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
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => (
              <BestSellerCard key={item.product.id} {...item} />
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
      </Container>
    </section>
  );
}
