"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { buildSearchIndex, searchIndex } from "@/lib/search";

/** Always-visible pill search in the sticky header — top search bar per proposal 4.1. */
export function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  const index = useMemo(() => buildSearchIndex(), []);
  const results = useMemo(() => searchIndex(debouncedQuery, index), [debouncedQuery, index]);

  return (
    <div className="relative w-28 sm:w-48 lg:w-72">
      <div className="flex items-center gap-2 rounded-full bg-brand-cream px-4 py-2.5">
        <Search size={16} className="shrink-0 text-brand-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search equipment..."
          className="w-full bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-muted"
        />
      </div>

      {debouncedQuery && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-80 overflow-y-auto rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
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
                className="block rounded-lg px-3 py-2 text-sm hover:bg-zinc-50"
              >
                <span className="font-medium text-zinc-900">{item.title}</span>
                <span className="ml-2 text-xs uppercase tracking-wide text-zinc-400">
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
