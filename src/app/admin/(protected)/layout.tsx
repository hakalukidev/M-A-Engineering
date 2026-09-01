import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

/**
 * Authoritative admin gate — middleware.ts only checks the cookie is
 * present (Edge runtime can't run firebase-admin); requireAdmin() here does
 * the real verification against Firebase Admin SDK + the ADMIN_EMAIL
 * allowlist, and runs on every request under this route group.
 */
export default async function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-brand-cream">
      <AdminSidebar email={session.email} />
      <main className="min-w-0 flex-1 overflow-x-hidden p-6 sm:p-8">{children}</main>
    </div>
  );
}
