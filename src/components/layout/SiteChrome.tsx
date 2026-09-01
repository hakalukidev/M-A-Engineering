"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { FloatingActionStack } from "@/components/cta/FloatingActionStack";
import { VisitTracker } from "@/components/analytics/VisitTracker";

/**
 * The public site's nav/footer/WhatsApp-FAB only make sense around the
 * public pages — /admin has its own sidebar chrome (see
 * src/app/admin/(protected)/layout.tsx) and shouldn't be nested inside
 * this. Gated here rather than moving /admin into a separate root layout
 * (Next.js route groups), which would mean relocating every existing
 * public route.
 *
 * `footer` is passed in as an already-rendered element (from the root
 * layout, a Server Component) rather than imported directly here, because
 * Footer is now async and reads Firestore (via getFooterSettings) —
 * a "use client" module can't import a Server Component that touches
 * server-only data like that.
 */
export function SiteChrome({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <VisitTracker />
      <Header />
      <main className="flex-1">{children}</main>
      {footer}
      <FloatingActionStack />
    </>
  );
}
