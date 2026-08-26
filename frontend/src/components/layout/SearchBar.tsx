"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { buildSearchIndex, searchIndex } from "@/lib/search";

/** Sticky-header search: expands into a dropdown of matching categories/products. */
export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  const index = useMemo(() => buildSearchIndex(), []);
  const results = useMemo(() => searchIndex(debouncedQuery, index), [debouncedQuery, index]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="rounded-full p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
      >
        <Search size={20} />
      </button>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1.5">
        <Search size={18} className="text-zinc-400" />
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search machinery or category..."
          className="w-48 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 sm:w-64"
        />
        <button
          type="button"
          aria-label="Close search"
          onClick={() => {
            setOpen(false);
            setQuery("");
          }}
          className="text-zinc-400 hover:text-zinc-700"
        >
          <X size={16} />
        </button>
      </div>

      {debouncedQuery && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-80 overflow-y-auto rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-zinc-500">No matches for &ldquo;{debouncedQuery}&rdquo;.</p>
          ) : (
            results.map((item) => (
              <Link
                key={`${item.type}-${item.categorySlug}-${item.slug}`}
                href={`/categories/${item.categorySlug}`}
                onClick={() => setOpen(false)}
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
