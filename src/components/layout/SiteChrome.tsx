"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionStack } from "@/components/cta/FloatingActionStack";

/**
 * The public site's nav/footer/WhatsApp-FAB only make sense around the
 * public pages — /admin has its own sidebar chrome (see
 * src/app/admin/(protected)/layout.tsx) and shouldn't be nested inside
 * this. Gated here rather than moving /admin into a separate root layout
 * (Next.js route groups), which would mean relocating every existing
 * public route.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActionStack />
    </>
  );
}
