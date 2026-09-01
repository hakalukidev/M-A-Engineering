"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useCatalogIndex } from "@/hooks/useCatalogIndex";

function titleCase(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Derives Home / Section / Page crumbs from the current route. Hidden on "/".
 * Category/subcategory/product names come from the shared catalog index
 * (see useCatalogIndex) — while it's loading, crumbs fall back to a
 * humanized slug rather than blanking out.
 */
export function Breadcrumbs() {
  const pathname = usePathname();
  const { index } = useCatalogIndex();

  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, i) => {
    const href = `/${segments.slice(0, i + 1).join("/")}`;
    const isCategorySlug = segments[0] === "categories" && i === 1;
    const isSubcategorySlug = segments[0] === "categories" && i === 2;
    const isProductSlug = segments[0] === "categories" && i === 3;

    let name: string | undefined;
    if (isCategorySlug) {
      name = index.find((item) => item.type === "category" && item.slug === segment)?.title;
    } else if (isSubcategorySlug) {
      name = index.find(
        (item) => item.type === "subcategory" && item.categorySlug === segments[1] && item.slug === segment
      )?.title;
    } else if (isProductSlug) {
      name = index.find(
        (item) =>
          item.type === "product" &&
          item.categorySlug === segments[1] &&
          item.subcategorySlug === segments[2] &&
          item.slug === segment
      )?.title;
    }

    return { label: name ?? titleCase(segment), href, isLast: i === segments.length - 1 };
  });

  return (
    <nav aria-label="Breadcrumb" className="border-t border-brand-cream bg-brand-card">
      <ol className="flex w-full flex-wrap items-center gap-1.5 px-[20px] py-2.5 text-xs text-brand-muted">
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
