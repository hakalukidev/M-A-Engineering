import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";

export type CategoryExplorePick = {
  categorySlug: string;
  /** Distinct from the category's own coverImage — kept separate so this carousel and category pages don't repeat photos. */
  image: string;
};

export type CategoriesExploreSettings = {
  picks: CategoryExplorePick[];
};

/**
 * Falls back to the original hardcoded photo set (one pick per top-level
 * category) until an admin curates a real list from the admin panel.
 */
const DEFAULT_CATEGORIES_EXPLORE_SETTINGS: CategoriesExploreSettings = {
  picks: [
    { categorySlug: "restaurant-equipment", image: "/images/home/explore-categories/restaurant-equipment.jpg" },
    { categorySlug: "commercial-kitchen-equipment", image: "/images/home/explore-categories/commercial-kitchen-equipment.jpg" },
    { categorySlug: "bakery-equipment", image: "/images/home/explore-categories/bakery-equipment.jpg" },
    { categorySlug: "medical-equipment", image: "/images/home/explore-categories/medical-equipment.jpg" },
    { categorySlug: "food-shop-equipment", image: "/images/home/explore-categories/food-shop-equipment.jpg" },
  ],
};

/** Same two-layer caching as getBestsellersSettings (src/lib/bestsellersSettings.ts). */
const fetchCategoriesExploreSettingsFromFirestore = unstable_cache(
  async (): Promise<CategoriesExploreSettings> => {
    try {
      const doc = await adminDb.collection("settings").doc("categoriesExplore").get();
      if (!doc.exists) return DEFAULT_CATEGORIES_EXPLORE_SETTINGS;
      const data = doc.data() as Partial<CategoriesExploreSettings>;
      return {
        // Nullish (not length) check — an admin-saved empty list is a real "no picks" state,
        // only a missing field (first save) should fall back to the defaults.
        picks: data.picks ?? DEFAULT_CATEGORIES_EXPLORE_SETTINGS.picks,
      };
    } catch {
      return DEFAULT_CATEGORIES_EXPLORE_SETTINGS;
    }
  },
  ["categories-explore-settings"],
  { revalidate: 86400, tags: ["categories-explore-settings"] }
);

export const getCategoriesExploreSettings = cache(fetchCategoriesExploreSettingsFromFirestore);
