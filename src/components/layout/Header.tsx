"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Menu, Phone, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { SearchBar } from "@/components/layout/SearchBar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { cn, telHref } from "@/lib/utils";

/** Code-split — framer-motion (Modal's only dependency) loads only once the quote button is actually clicked. */
const Modal = dynamic(() => import("@/components/ui/Modal").then((m) => m.Modal), { ssr: false });

/**
 * Site nav — a dark forest-green bar (brand palette, reference:
 * centered-wordmark hospitality navbars) with the logo centered, text nav
 * left, and search/contact actions right. Breadcrumbs (when present) sit
 * on a lighter strip underneath.
 *
 * On the homepage it starts transparent (frosted via backdrop-blur) and
 * floats on top of the Hero's photo, inset 10px on mobile / 20px from sm —
 * matching the photo card's own inset directly beneath it. It solidifies
 * to the normal edge-to-edge green bar (inset gone, square corners) once
 * the page scrolls past the hero, or whenever the mobile menu is open, so
 * nav text never sits unreadable over plain page content. Every other
 * route keeps the bar solid and in-flow (sticky) since there's no photo
 * behind it for contrast.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  // Once true, stays true — keeps Modal mounted so its close animation can
  // still play, while its (dynamically imported) chunk only loads on the
  // first actual open rather than on every page load.
  const [quoteEverOpened, setQuoteEverOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function openQuote() {
    setQuoteEverOpened(true);
    setQuoteOpen(true);
  }
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const overlay = isHome && !scrolled && !mobileOpen;

  return (
    <div className={cn(isHome ? "fixed inset-x-0 top-0" : "sticky top-0", "z-30")}>
      <header className={cn("transition-shadow duration-300", !overlay && "shadow-md")}>
        <div
          className={cn(
            "transition-[colors,margin,border-radius] duration-300",
            overlay
              ? "mx-[10px] mt-[10px] rounded-md bg-brand-green-dark/25 backdrop-blur-md sm:mx-[20px] sm:mt-[20px]"
              : "bg-brand-green-dark"
          )}
        >
          <div className="grid min-h-20 w-full grid-cols-[auto_1fr] items-center gap-4 px-[20px] py-3 lg:grid-cols-[auto_1fr_auto]">
            <Link href="/" className="flex min-w-0 flex-col justify-self-start leading-tight lg:min-w-fit">
              <span className="truncate font-serif text-lg font-semibold italic tracking-tight text-brand-cream sm:text-xl">
                {siteConfig.tagline}
              </span>
              <span className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-[0.2em] text-brand-cream/60">
                {siteConfig.shortName}
              </span>
            </Link>

            <nav className="hidden items-center justify-start gap-6 lg:ml-[52px] lg:flex">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-sm font-bold text-white transition-colors hover:text-brand-orange",
                    isActive(item.href) && "text-brand-orange"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

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
                <button type="button" onClick={openQuote} className={buttonVariants("primary")}>
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
              "w-full flex-col gap-1 border-t border-brand-cream/15 px-[20px] py-3 lg:hidden",
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
                  "rounded-md px-2 py-2 text-sm font-bold text-white hover:bg-brand-cream/10",
                  isActive(item.href) && "bg-brand-cream/10 text-brand-orange"
                )}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openQuote();
              }}
              className={cn(buttonVariants("primary"), "mt-2 w-full")}
            >
              Get a Quote
            </button>
          </nav>
        </div>

        <Breadcrumbs />
      </header>

      {quoteEverOpened && (
        <Modal open={quoteOpen} onClose={() => setQuoteOpen(false)} title="Get a Quote">
          <p className="mb-4 text-sm text-zinc-600">
            Share a few details about the equipment or order you have in mind — a real person
            will follow up directly.
          </p>
          <InquiryForm onSuccess={() => setQuoteOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
