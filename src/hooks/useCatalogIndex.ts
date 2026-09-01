"use client";

import { useQuery } from "@tanstack/react-query";
import type { SearchableItem } from "@/types";

async function fetchCatalogIndex(): Promise<SearchableItem[]> {
  const res = await fetch("/api/catalog/index");
  if (!res.ok) throw new Error("Failed to load catalog index");
  return res.json() as Promise<SearchableItem[]>;
}

/**
 * TanStack Query dedupes this across every mounted consumer (SearchBar +
 * Breadcrumbs, both in Header) the same way the old hand-rolled singleton
 * promise did, but also adds proper cache reuse across navigations
 * (staleTime, set in QueryProvider) and retry-on-failure for free.
 */
export function useCatalogIndex(): { index: SearchableItem[]; loading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["catalog-index"],
    queryFn: fetchCatalogIndex,
  });

  return { index: data ?? [], loading: isLoading };
}
