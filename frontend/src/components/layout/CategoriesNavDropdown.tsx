"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Package } from "lucide-react";
import { CATEGORY_ICONS } from "@/components/category/CategoryCard";
import { getAllCategories } from "@/data/categories";
import { cn } from "@/lib/utils";

const categories = getAllCategories();

/**
 * "Categories" nav item — click-to-toggle white dropdown panel listing every
 * category with its matching icon, so a visitor can jump straight into one
 * without landing on the directory page first.
 */
export function CategoriesNavDropdown({ isActive }: { isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-brand-orange",
          (isActive || open) && "text-brand-orange"
        )}
      >
        Categories
        <ChevronDown size={16} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-3 w-64 rounded-md border border-zinc-200 bg-white p-2 shadow-lg">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug] ?? Package;
            return (
              <Link
                key={category.id}
                href={`/products#${category.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                <Icon size={18} className="shrink-0 text-brand-green" strokeWidth={1.75} />
                {category.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Same category list, as an inline accordion for the dark full-width mobile menu. */
export function CategoriesMobileAccordion({
  isActive,
  onNavigate,
}: {
  isActive: boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-bold text-white hover:bg-brand-cream/10",
          isActive && "bg-brand-cream/10 text-brand-orange"
        )}
      >
        Categories
        <ChevronDown size={16} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="flex flex-col gap-0.5 py-1 pl-4">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug] ?? Package;
            return (
              <Link
                key={category.id}
                href={`/products#${category.slug}`}
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-white/80 hover:bg-brand-cream/10 hover:text-white"
              >
                <Icon size={16} className="shrink-0 text-brand-orange" strokeWidth={1.75} />
                {category.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
