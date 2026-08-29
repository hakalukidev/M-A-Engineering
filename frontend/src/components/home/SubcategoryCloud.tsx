"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChefHat, Croissant, LayoutGrid, Stethoscope, Store, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCategories } from "@/data/categories";
import { cn } from "@/lib/utils";

/** Category id -> tab icon. A category with no mapping just falls back to LayoutGrid. */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "restaurant-equipment": UtensilsCrossed,
  "commercial-kitchen-equipment": ChefHat,
  "bakery-equipment": Croissant,
  "medical-equipment": Stethoscope,
  "food-shop-equipment": Store,
};

/**
 * Filter pill for the category row above the cloud. Active state is drawn by
 * a single shared element (`layoutId`) that framer-motion slides between
 * buttons, so switching tabs reads as one pill gliding over rather than
 * separate backgrounds popping in/out.
 */
function TabButton({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active ? "text-white" : "text-brand-ink/70 hover:text-brand-ink"
      )}
    >
      {active && (
        <motion.span
          layoutId="subcategory-tab-highlight"
          className="absolute inset-0 rounded-full bg-brand-green shadow-sm shadow-brand-green/30"
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      )}
      <span className="relative flex items-center gap-1.5">
        <Icon className="size-3.5" />
        {label}
      </span>
    </button>
  );
}

/**
 * Flat link cloud into every subcategory — quick scanning/SEO surface, no
 * photos required. Category tabs filter the view client-side, but "All" is
 * the default so the full link set still renders in the initial HTML for
 * crawlers; the tabs are a browsing convenience layered on top, not a
 * requirement to reach any link. Wrapped in MagicCard for a cursor-tracked
 * spotlight (magicui.design/docs/components/magic-card, already themed for
 * this repo) and framer-motion for the tab glide + a light stagger-in when
 * the filtered set changes.
 */
export function SubcategoryCloud() {
  const categories = getAllCategories();
  const [active, setActive] = useState<string>("all");

  const visibleCategories = active === "all" ? categories : categories.filter((c) => c.id === active);

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Full range"
          title="Browse by equipment type"
          subtitle="Every subcategory across our 5 lines, in one place."
          className="mb-8"
        />

        <div className="mb-6 inline-flex flex-wrap gap-1 rounded-2xl border border-zinc-200 bg-white/70 p-1.5">
          <TabButton label="All" icon={LayoutGrid} active={active === "all"} onClick={() => setActive("all")} />
          {categories.map((category) => (
            <TabButton
              key={category.id}
              label={category.name}
              icon={CATEGORY_ICONS[category.id] ?? LayoutGrid}
              active={active === category.id}
              onClick={() => setActive(category.id)}
            />
          ))}
        </div>

        <MagicCard className="p-5 sm:p-6" gradientSize={280}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="space-y-6"
            >
              {visibleCategories.map((category) => {
                const Icon = CATEGORY_ICONS[category.id] ?? LayoutGrid;
                return (
                  <div key={category.id}>
                    {active === "all" && (
                      <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-green">
                        <Icon className="size-3.5" />
                        {category.name}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2.5">
                      {category.subcategories.map((subcategory, i) => (
                        <motion.div
                          key={subcategory.id}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.16, delay: Math.min(i * 0.02, 0.3) }}
                        >
                          <Link
                            href={`/categories/${category.slug}/${subcategory.slug}`}
                            className="group inline-flex items-center rounded-full border border-brand-green/15 bg-brand-cream/60 px-4 py-2 text-sm font-medium text-brand-ink/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-green hover:bg-brand-green hover:text-white hover:shadow-md hover:shadow-brand-green/25"
                          >
                            {subcategory.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </MagicCard>
      </Container>
    </section>
  );
}
