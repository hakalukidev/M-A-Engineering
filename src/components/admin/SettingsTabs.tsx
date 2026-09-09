"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SETTINGS_TABS = [
  { href: "/admin/settings/footer", label: "Footer" },
  { href: "/admin/settings/about", label: "About Page" },
  { href: "/admin/settings/clients", label: "Happy Clients" },
  { href: "/admin/settings/bestsellers", label: "Bestselling Products" },
  { href: "/admin/settings/categories-explore", label: "Explore Categories" },
] as const;

export function SettingsTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1 border-b border-brand-ink/10 pb-3">
      {SETTINGS_TABS.map(({ href, label }) => {
        const active = pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand-green text-white"
                : "text-brand-muted hover:bg-brand-green/10 hover:text-brand-ink"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
