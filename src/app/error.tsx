"use client";

import { useEffect } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

/**
 * Catches rendering errors anywhere below the root layout — most commonly a
 * Firestore hiccup while loading the catalog (see src/data/categories.ts).
 * Does NOT catch errors thrown in the root layout itself (e.g. the footer's
 * settings fetch, which has its own try/catch instead — see
 * src/lib/settings.ts) since Next.js only routes those to global-error.tsx.
 */
export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
        <TriangleAlert size={26} />
      </span>
      <h1 className="mt-5 text-2xl font-bold text-brand-ink">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-sm text-brand-muted">
        We couldn&apos;t load this page right now. Please try again in a moment.
      </p>
      <button type="button" onClick={reset} className={`${buttonVariants("primary")} mt-6`}>
        <RefreshCw size={16} />
        Try again
      </button>
    </Container>
  );
}
