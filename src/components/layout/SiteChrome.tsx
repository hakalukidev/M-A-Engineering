"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { VisitTracker } from "@/components/analytics/VisitTracker";
import { QueryProvider } from "@/components/providers/QueryProvider";

/** Code-split — framer-motion (its only dependency) loads in its own chunk instead of the main bundle. */
const FloatingActionStack = dynamic(
  () => import("@/components/cta/FloatingActionStack").then((m) => m.FloatingActionStack),
  { ssr: false }
);

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
 * server-only data like that. `contact` (phone/whatsapp/messenger) is
 * plain data from the same admin-editable settings, fetched once in the
 * root layout and threaded down to the FAB.
 */
export function SiteChrome({
  children,
  footer,
  contact,
}: {
  children: ReactNode;
  footer: ReactNode;
  contact: { phone: string; whatsapp: string; messenger: string };
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <QueryProvider>
      <VisitTracker />
      <Header phone={contact.phone} />
      <main className="flex-1">{children}</main>
      {footer}
      <FloatingActionStack {...contact} />
    </QueryProvider>
  );
}
