"use client";

import { useEffect } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";

/** Admin-styled error boundary — same trigger as src/app/error.tsx (usually a Firestore hiccup), different chrome. */
export default function AdminErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-md border border-dashed border-brand-ink/15 bg-white p-10 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
        <TriangleAlert size={26} />
      </span>
      <h1 className="mt-5 text-xl font-bold text-brand-ink">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-sm text-brand-muted">
        This section couldn&apos;t load — often a temporary database issue. Try again in a moment.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 flex items-center gap-2 rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
      >
        <RefreshCw size={16} />
        Try again
      </button>
    </div>
  );
}
