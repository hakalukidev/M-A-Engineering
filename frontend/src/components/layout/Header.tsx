"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { SearchBar } from "@/components/layout/SearchBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LogoMark } from "@/components/layout/LogoMark";
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
 * search suggestions dropdown is positioned relative to the top bar, and
 * an ancestor `overflow-hidden` clips it clean off (that was the original
 * "menu renders as a sliver" bug).
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="sticky top-0 z-30 bg-brand-cream px-3 py-3 sm:px-5 sm:py-4">
      <div className="mx-auto w-full max-w-7xl">
        <header className="rounded-2xl shadow-md [&>*:first-child]:rounded-t-2xl [&>*:last-child]:rounded-b-2xl">
          <div className="bg-brand-green-dark">
            <div className="grid min-h-20 grid-cols-[auto_1fr] items-center gap-4 px-5 py-3 sm:px-7 lg:grid-cols-[1fr_auto_1fr]">
              <nav className="hidden items-center gap-6 lg:flex">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-brand-cream",
                      isActive(item.href) ? "text-brand-cream" : "text-brand-cream/75"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Link href="/" className="flex min-w-0 items-center gap-2.5 justify-self-start lg:min-w-fit lg:justify-self-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-cream p-1 shadow-sm sm:h-10 sm:w-10">
                  <LogoMark className="h-full w-full" />
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate font-serif text-lg font-semibold italic tracking-tight text-brand-cream sm:text-xl">
                    {siteConfig.tagline}
                  </span>
                  <span className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-[0.2em] text-brand-cream/60">
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
                  <button
                    type="button"
                    onClick={() => setQuoteOpen(true)}
                    className={buttonVariants("primary")}
                  >
                    Get a Quote
                  </button>
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
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-2 py-2 text-sm font-medium hover:bg-brand-cream/10",
                    isActive(item.href) ? "bg-brand-cream/10 text-brand-cream" : "text-brand-cream/85"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setQuoteOpen(true);
                }}
                className={cn(buttonVariants("primary"), "mt-2 w-full")}
              >
                Get a Quote
              </button>
            </nav>
          </div>

          <Breadcrumbs />
        </header>
      </div>

      <Modal open={quoteOpen} onClose={() => setQuoteOpen(false)} title="Get a Quote">
        <p className="mb-4 text-sm text-zinc-600">
          Share a few details about the equipment or order you have in mind — a real person will
          follow up directly.
        </p>
        <InquiryForm onSuccess={() => setQuoteOpen(false)} />
      </Modal>
    </div>
  );
}
