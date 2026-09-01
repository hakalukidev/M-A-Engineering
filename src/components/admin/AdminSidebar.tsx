"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderTree,
  ShoppingCart,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/settings", label: "Footer Settings", icon: Settings },
] as const;

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-72 shrink-0 flex-col bg-brand-green-dark px-5 py-6 text-brand-cream">
      <p className="inline-flex w-fit items-center rounded-full border border-brand-cream/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-cream/70">
        Admin Panel
      </p>
      <h1 className="mt-4 text-xl font-bold leading-tight text-white">{siteConfig.name} Admin</h1>
      <p className="mt-2 text-sm leading-relaxed text-brand-cream/60">
        Manage the catalog, orders, and inquiries from one place.
      </p>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-cream text-brand-green-dark"
                  : "text-brand-cream/75 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={17} strokeWidth={1.9} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-4">
        <p className="truncate px-1 text-xs text-brand-cream/50">{email}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-brand-cream/75 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut size={17} strokeWidth={1.9} />
          Log out
        </button>
      </div>
    </aside>
  );
}
