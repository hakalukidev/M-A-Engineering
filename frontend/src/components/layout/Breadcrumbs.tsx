"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getCategoryBySlug, getSubcategoryBySlug } from "@/data/categories";

function titleCase(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Derives Home / Section / Page crumbs from the current route. Hidden on "/". */
export function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, i) => {
    const href = `/${segments.slice(0, i + 1).join("/")}`;
    const isCategorySlug = segments[0] === "categories" && i === 1;
    const isSubcategorySlug = segments[0] === "categories" && i === 2;
    const label = isCategorySlug
      ? getCategoryBySlug(segment)?.name ?? titleCase(segment)
      : isSubcategorySlug
        ? getSubcategoryBySlug(segments[1], segment)?.name ?? titleCase(segment)
        : titleCase(segment);
    return { label, href, isLast: i === segments.length - 1 };
  });

  return (
    <nav aria-label="Breadcrumb" className="border-t border-brand-cream px-6 py-2.5">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-brand-muted">
        <li>
          <Link href="/" className="hover:text-brand-ink">
            Home
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <ChevronRight size={12} />
            {crumb.isLast ? (
              <span className="font-medium text-brand-ink">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-brand-ink">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
