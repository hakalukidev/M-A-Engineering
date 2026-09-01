"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * QueryClient is created once per browser session via useState (not at
 * module scope) — the Next.js App Router pattern that avoids sharing state
 * across requests/users on the server while still being stable across
 * client re-renders. See src/hooks/useCatalogIndex.ts for the one query
 * this app actually needs (the search/breadcrumb catalog index) — the rest
 * of the site reads Firestore directly in Server Components, which is
 * already the faster path and isn't being moved to client-side fetching.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // catalog index changes rarely; avoid refetching on every mount
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
