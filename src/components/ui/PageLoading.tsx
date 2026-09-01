import { Loader2 } from "lucide-react";

/** Shared fallback for route-level loading.tsx boundaries — lets Next.js stream the shell (nav, footer) immediately while a page's data loads. */
export function PageLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center py-24">
      <Loader2 size={28} className="animate-spin text-brand-green" strokeWidth={2} />
    </div>
  );
}
