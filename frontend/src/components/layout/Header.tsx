"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { SearchBar } from "@/components/layout/SearchBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LogoMark } from "@/components/layout/LogoMark";
import { siteConfig } from "@/config/site";
import { cn, telHref } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30 bg-brand-cream px-3 py-3 sm:px-5 sm:py-4">
      <div className="mx-auto w-full max-w-7xl">
        <header className="overflow-hidden rounded-2xl bg-brand-card shadow-sm">
          <div className="flex min-h-20 items-center justify-between gap-4 px-5 py-3 sm:px-7">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <LogoMark className="h-9 w-9 sm:h-10 sm:w-10" />
              <span className="flex flex-col leading-tight">
                <span className="whitespace-nowrap font-sans text-lg font-black tracking-tight text-brand-ink sm:text-xl">
                  {siteConfig.shortName}
                </span>
                <span className="mt-0.5 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-brand-muted">
                  {siteConfig.tagline}
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-brand-ink/70 hover:text-brand-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <SearchBar />

              <a
                href={telHref(siteConfig.contact.phone)}
                aria-label="Call us"
                className="hidden rounded-full p-2.5 text-brand-ink/70 hover:bg-brand-cream hover:text-brand-ink sm:inline-flex"
              >
                <Phone size={18} />
              </a>

              <div className="hidden sm:block">
                <Link href="/contact" className={buttonVariants("accent")}>
                  Get a Quote
                </Link>
              </div>

              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((v) => !v)}
                className="rounded-full p-2.5 text-brand-ink/70 hover:bg-brand-cream hover:text-brand-ink lg:hidden"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          <nav
            className={cn(
              "flex-col gap-1 border-t border-brand-cream px-5 py-3 lg:hidden",
              mobileOpen ? "flex" : "hidden"
            )}
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-brand-ink/80 hover:bg-brand-cream/60"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={cn(buttonVariants("accent"), "mt-2 w-full")}
            >
              Get a Quote
            </Link>
          </nav>

          <Breadcrumbs />
        </header>
      </div>
    </div>
  );
}
