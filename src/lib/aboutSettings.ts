import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";

export type AboutPillar = {
  title: string;
  detail: string;
};

export type AboutSettings = {
  bannerParagraph1: string;
  bannerParagraph2: string;
  bannerImage: string;
  storyEyebrow: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyImage: string;
  pillars: [AboutPillar, AboutPillar, AboutPillar, AboutPillar];
};

/** Falls back to the existing hardcoded copy until an admin saves real About page content. */
const DEFAULT_ABOUT_SETTINGS: AboutSettings = {
  bannerParagraph1:
    "From a single replacement piece to a complete floor fit-out, every order is quoted and followed up on directly — equipment sourced to match the pace of a real working kitchen, clinic, or shop.",
  bannerParagraph2:
    "Based in 167, M A Engineering Factory, 21 Matikata Rd, Dhaka 1206, and reachable by phone or WhatsApp for quotes, bulk orders, and after-sales support.",
  bannerImage: "/images/categories/bakery-equipment/cover.jpg",
  storyEyebrow: "Our story",
  storyTitle: "Who We Are",
  storyParagraph1:
    "MA Engineering supplies equipment across the restaurant, commercial kitchen, bakery, medical, and food shop trades — helping businesses in and around Dhaka fit out their space with gear built for daily commercial use.",
  storyParagraph2:
    "Whether it's a single replacement piece or a complete floor fit-out, orders are quoted and followed up on directly, with equipment sourced to match the pace of a real working kitchen, clinic, or shop.",
  storyImage: "/images/categories/commercial-kitchen-equipment/cover.jpg",
  pillars: [
    {
      title: "Wide Equipment Range",
      detail: "Restaurant, kitchen, bakery, medical, and food shop gear — under one roof.",
    },
    {
      title: "Bulk & Custom Orders",
      detail: "Fitting out a full floor or sourcing a single piece, handled the same way.",
    },
    {
      title: "Built for Daily Use",
      detail: "Equipment specified for the pace of a real kitchen, clinic, or shop floor.",
    },
    {
      title: "Direct Support",
      detail: "Reach us by phone or WhatsApp — a real person quotes and follows up on every order.",
    },
  ],
};

/** Same two-layer caching as getFooterSettings (src/lib/settings.ts). */
const fetchAboutSettingsFromFirestore = unstable_cache(
  async (): Promise<AboutSettings> => {
    try {
      const doc = await adminDb.collection("settings").doc("about").get();
      if (!doc.exists) return DEFAULT_ABOUT_SETTINGS;
      return { ...DEFAULT_ABOUT_SETTINGS, ...(doc.data() as Partial<AboutSettings>) };
    } catch {
      return DEFAULT_ABOUT_SETTINGS;
    }
  },
  ["about-settings"],
  { revalidate: 86400, tags: ["about-settings"] }
);

export const getAboutSettings = cache(fetchAboutSettingsFromFirestore);
