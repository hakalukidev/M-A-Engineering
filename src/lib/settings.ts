import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { siteConfig } from "@/config/site";

export type FooterSettings = {
  shortName: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  youtube: string;
  instagram: string;
  linkedin: string;
  messenger: string;
};

/** Falls back to the hardcoded siteConfig values until an admin saves real footer settings. */
const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  shortName: siteConfig.shortName,
  description: siteConfig.description,
  phone: siteConfig.contact.phone,
  whatsapp: siteConfig.contact.whatsapp,
  email: siteConfig.contact.email,
  address: siteConfig.contact.address,
  facebook: siteConfig.social.facebook,
  youtube: siteConfig.social.youtube,
  instagram: siteConfig.social.instagram,
  linkedin: siteConfig.social.linkedin,
  messenger: siteConfig.social.messenger,
};

/**
 * Same two-layer caching as getAllCategories in src/data/categories.ts —
 * unstable_cache across requests (tag "footer-settings", 24h safety-net
 * revalidate; updateFooterSettings revalidates the tag immediately on
 * save, so this window is only a fallback), React's cache() within one
 * request. This is a single-document read so the old 5 min window wasn't
 * the main quota drain (see categories.ts), but it's called from the root
 * layout on every page, so there's no reason to re-check it any more often
 * than the safety net requires.
 */
const fetchFooterSettingsFromFirestore = unstable_cache(
  async (): Promise<FooterSettings> => {
    // Footer renders from the root layout, which sits above any error.tsx
    // boundary — a Firestore hiccup here must fall back quietly (to the
    // hardcoded defaults) rather than take down chrome that doesn't
    // strictly need live data. Core catalog data (src/data/categories.ts)
    // intentionally does NOT do this: there, a Firestore failure has no
    // honest fallback, so it should surface to the nearest error.tsx.
    try {
      const doc = await adminDb.collection("settings").doc("footer").get();
      if (!doc.exists) return DEFAULT_FOOTER_SETTINGS;
      return { ...DEFAULT_FOOTER_SETTINGS, ...(doc.data() as Partial<FooterSettings>) };
    } catch {
      return DEFAULT_FOOTER_SETTINGS;
    }
  },
  ["footer-settings"],
  { revalidate: 86400, tags: ["footer-settings"] }
);

export const getFooterSettings = cache(fetchFooterSettingsFromFirestore);
