import { NextResponse } from "next/server";
import { getAllCategories } from "@/data/categories";
import { buildSearchIndex } from "@/lib/search";

/**
 * Public, cached flattened catalog index — the only way the two client
 * components that need catalog data (SearchBar, Breadcrumbs) can reach it,
 * since they're nested inside the client-side Header with no per-route
 * Server Component to prop-drill from. See src/hooks/useCatalogIndex.ts.
 */
export async function GET() {
  const categories = await getAllCategories();
  const index = buildSearchIndex(categories);

  return NextResponse.json(index, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" },
  });
}
