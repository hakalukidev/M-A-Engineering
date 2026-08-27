"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { SearchBar } from "@/components/layout/SearchBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LogoMark } from "@/components/layout/LogoMark";
import { CategoryMegaMenu } from "@/components/layout/CategoryMegaMenu";
import { siteConfig } from "@/config/site";
import { cn, telHref } from "@/lib/utils";

/**
 * Sticky site nav — a dark forest-green bar (brand palette, reference:
 * centered-wordmark hospitality navbars) with the logo centered, text nav
 * left, and search/contact actions right. Breadcrumbs (when present) sit
 * on a lighter strip underneath.
 *
 * Rounding note: the top bar and Breadcrumbs are the header's only two
 * direct children, so `:first-child`/`:last-child` round the right corners
 * automatically whether or not Breadcrumbs renders (it returns null on
 * "/") — no `overflow-hidden` needed on the header. Don't add one: the
 * Products mega menu dropdown is positioned relative to the top bar, and
 * an ancestor `overflow-hidden` clips it clean off (that was the original
 * "menu renders as a sliver" bug).
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30 bg-brand-cream px-3 py-3 sm:px-5 sm:py-4">
      <div className="mx-auto w-full max-w-7xl">
        <header className="rounded-2xl shadow-md [&>*:first-child]:rounded-t-2xl [&>*:last-child]:rounded-b-2xl">
          <div className="bg-brand-green-dark">
            <div className="grid min-h-20 grid-cols-2 items-center gap-4 px-5 py-3 sm:px-7 lg:grid-cols-[1fr_auto_1fr]">
              <nav className="hidden items-center gap-6 lg:flex">
                {siteConfig.nav
                  .filter((item) => item.href === "/")
                  .map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-brand-cream/75 transition-colors hover:text-brand-cream"
                    >
                      {item.label}
                    </Link>
                  ))}
                <CategoryMegaMenu />
                {siteConfig.nav
                  .filter((item) => item.href !== "/")
                  .map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-brand-cream/75 transition-colors hover:text-brand-cream"
                    >
                      {item.label}
                    </Link>
                  ))}
              </nav>

              <Link href="/" className="flex shrink-0 items-center gap-2.5 justify-self-start lg:justify-self-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cream p-1 shadow-sm sm:h-10 sm:w-10">
                  <LogoMark className="h-full w-full" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="whitespace-nowrap font-serif text-lg font-semibold italic tracking-tight text-brand-cream sm:text-xl">
                    {siteConfig.tagline}
                  </span>
                  <span className="mt-0.5 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-brand-cream/60">
                    {siteConfig.shortName}
                  </span>
                </span>
              </Link>

              <div className="flex items-center justify-end gap-2 sm:gap-3">
                <SearchBar />

                <a
                  href={telHref(siteConfig.contact.phone)}
                  aria-label="Call us"
                  className="hidden rounded-full bg-brand-cream/10 p-2.5 text-brand-cream transition-colors hover:bg-brand-cream/20 sm:inline-flex"
                >
                  <Phone size={18} />
                </a>

                <div className="hidden sm:block">
                  <Link href="/contact" className={buttonVariants("primary")}>
                    Get a Quote
                  </Link>
                </div>

                <button
                  type="button"
                  aria-label="Toggle menu"
                  onClick={() => setMobileOpen((v) => !v)}
                  className="rounded-full bg-brand-cream/10 p-2.5 text-brand-cream transition-colors hover:bg-brand-cream/20 lg:hidden"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            <nav
              className={cn(
                "flex-col gap-1 border-t border-brand-cream/15 px-5 py-3 lg:hidden",
                mobileOpen ? "flex" : "hidden"
              )}
            >
              {siteConfig.nav
                .filter((item) => item.href === "/")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm font-medium text-brand-cream/85 hover:bg-brand-cream/10"
                  >
                    {item.label}
                  </Link>
                ))}
              <p className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-brand-cream/50">
                Products
              </p>
              <CategoryMegaMenu mobile />
              {siteConfig.nav
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm font-medium text-brand-cream/85 hover:bg-brand-cream/10"
                  >
                    {item.label}
                  </Link>
                ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants("primary"), "mt-2 w-full")}
              >
                Get a Quote
              </Link>
            </nav>
          </div>

          <Breadcrumbs />
        </header>
      </div>
    </div>
  );
}
