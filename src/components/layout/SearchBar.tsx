"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useCatalogIndex } from "@/hooks/useCatalogIndex";
import { searchIndex } from "@/lib/search";

/** Always-visible pill search in the sticky header — top search bar per proposal 4.1. */
export function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  const { index } = useCatalogIndex();
  const results = useMemo(() => searchIndex(debouncedQuery, index), [debouncedQuery, index]);

  return (
    // Static on mobile so the results dropdown anchors to the full-width header instead of the narrow input.
    <div className="min-w-28 flex-1 sm:relative sm:max-w-48 sm:flex-none lg:max-w-72">
      <div className="flex items-center gap-1.5 rounded-full bg-brand-cream px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2.5">
        <Search size={15} className="shrink-0 text-brand-muted sm:size-4" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full min-w-0 overflow-hidden text-ellipsis bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-muted sm:text-sm"
        />
      </div>

      {debouncedQuery && (
        <div className="absolute inset-x-3 top-full z-40 mt-2 max-h-[60vh] sm:inset-x-0 sm:max-h-80 overflow-y-auto rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-zinc-500">No matches for &ldquo;{debouncedQuery}&rdquo;.</p>
          ) : (
            results.map((item) => (
              <Link
                key={`${item.type}-${item.categorySlug}-${item.slug}`}
                href={
                  item.type === "product"
                    ? `/categories/${item.categorySlug}/${item.subcategorySlug}/${item.slug}`
                    : item.subcategorySlug
                      ? `/categories/${item.categorySlug}/${item.subcategorySlug}`
                      : `/categories/${item.categorySlug}`
                }
                onClick={() => setQuery("")}
                className="flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-zinc-50"
              >
                <span className="min-w-0 break-words font-medium text-zinc-900">{item.title}</span>
                <span className="shrink-0 pt-0.5 text-xs uppercase tracking-wide text-zinc-400">
                  {item.type}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
