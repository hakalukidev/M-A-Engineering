"use client";

import { useEffect, useState } from "react";
import type { SearchableItem } from "@/types";

/** Module-level singleton so SearchBar and Breadcrumbs (mounted together in Header) share one fetch. */
let indexPromise: Promise<SearchableItem[]> | null = null;

function fetchCatalogIndex(): Promise<SearchableItem[]> {
  if (!indexPromise) {
    indexPromise = fetch("/api/catalog/index")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load catalog index");
        return res.json() as Promise<SearchableItem[]>;
      })
      .catch((error) => {
        indexPromise = null; // allow retry on next mount
        throw error;
      });
  }
  return indexPromise;
}

export function useCatalogIndex(): { index: SearchableItem[]; loading: boolean } {
  const [index, setIndex] = useState<SearchableItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchCatalogIndex()
      .then((data) => {
        if (!cancelled) setIndex(data);
      })
      .catch(() => {
        // Breadcrumbs/SearchBar both have their own fallbacks for an empty index.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { index, loading };
}
