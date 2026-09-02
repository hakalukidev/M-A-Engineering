import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { siteConfig } from "@/config/site";

export type FooterSettings = {
  shortName: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  facebook: string;
  youtube: string;
  instagram: string;
  linkedin: string;
};

/** Falls back to the hardcoded siteConfig values until an admin saves real footer settings. */
const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  shortName: siteConfig.shortName,
  description: siteConfig.description,
  phone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: siteConfig.contact.address,
  facebook: siteConfig.social.facebook,
  youtube: siteConfig.social.youtube,
  instagram: siteConfig.social.instagram,
  linkedin: siteConfig.social.linkedin,
};

/**
 * Same two-layer caching as getAllCategories in src/data/categories.ts —
 * unstable_cache across requests (tag "footer-settings", 5 min safety net;
 * updateFooterSettings revalidates the tag on save), React's cache() within
 * one request.
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
  { revalidate: 300, tags: ["footer-settings"] }
);

export const getFooterSettings = cache(fetchFooterSettingsFromFirestore);
