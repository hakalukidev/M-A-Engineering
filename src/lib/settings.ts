import "server-only";
import { cache } from "react";
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
  linkedin: siteConfig.social.linkedin,
};

export const getFooterSettings = cache(async (): Promise<FooterSettings> => {
  const doc = await adminDb.collection("settings").doc("footer").get();
  if (!doc.exists) return DEFAULT_FOOTER_SETTINGS;
  return { ...DEFAULT_FOOTER_SETTINGS, ...(doc.data() as Partial<FooterSettings>) };
});
