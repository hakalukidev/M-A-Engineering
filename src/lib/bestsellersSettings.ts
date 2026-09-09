import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";

export type BestsellerPick = {
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
};

export type BestsellersSettings = {
  picks: BestsellerPick[];
};

/**
 * Falls back to the original hardcoded FEATURED_PICKS (one pick per
 * subcategory) until an admin curates a real list from the admin panel.
 */
const DEFAULT_BESTSELLERS_SETTINGS: BestsellersSettings = {
  picks: [
    { categorySlug: "restaurant-equipment", subcategorySlug: "dining-furniture", productSlug: "cushioned-booth-straight" },
    { categorySlug: "restaurant-equipment", subcategorySlug: "cooking-ranges", productSlug: "electric-griddle-range" },
    { categorySlug: "restaurant-equipment", subcategorySlug: "refrigeration-units", productSlug: "back-bar-cooler" },
    { categorySlug: "restaurant-equipment", subcategorySlug: "serving-counters", productSlug: "salad-bar-counter" },
    { categorySlug: "commercial-kitchen-equipment", subcategorySlug: "cooking-equipment", productSlug: "deep-fryer-single-basket" },
    { categorySlug: "commercial-kitchen-equipment", subcategorySlug: "food-preparation-equipment", productSlug: "planetary-mixer-10l" },
    { categorySlug: "commercial-kitchen-equipment", subcategorySlug: "refrigeration-storage", productSlug: "blast-chiller" },
    { categorySlug: "commercial-kitchen-equipment", subcategorySlug: "dishwashing-equipment", productSlug: "hood-type-dishwasher" },
    { categorySlug: "bakery-equipment", subcategorySlug: "ovens-proofers", productSlug: "deck-oven-2-deck" },
    { categorySlug: "bakery-equipment", subcategorySlug: "mixers-dough-equipment", productSlug: "spiral-dough-mixer-25kg" },
    { categorySlug: "bakery-equipment", subcategorySlug: "display-showcases", productSlug: "cake-display-showcase-curved" },
    { categorySlug: "bakery-equipment", subcategorySlug: "packaging-equipment", productSlug: "tray-sealer" },
    { categorySlug: "medical-equipment", subcategorySlug: "hospital-furniture", productSlug: "electric-hospital-bed" },
    { categorySlug: "medical-equipment", subcategorySlug: "diagnostic-equipment", productSlug: "digital-blood-pressure-monitor" },
    { categorySlug: "medical-equipment", subcategorySlug: "surgical-equipment", productSlug: "operating-table" },
    { categorySlug: "medical-equipment", subcategorySlug: "sterilization-equipment", productSlug: "autoclave-50l" },
    { categorySlug: "food-shop-equipment", subcategorySlug: "display-counters", productSlug: "meat-display-counter" },
    { categorySlug: "food-shop-equipment", subcategorySlug: "refrigeration-freezers", productSlug: "multi-deck-open-chiller" },
    { categorySlug: "food-shop-equipment", subcategorySlug: "weighing-billing", productSlug: "pos-billing-machine" },
    { categorySlug: "food-shop-equipment", subcategorySlug: "storage-shelving", productSlug: "gondola-shelving" },
  ],
};

/** Same two-layer caching as getClientsSettings (src/lib/clientsSettings.ts). */
const fetchBestsellersSettingsFromFirestore = unstable_cache(
  async (): Promise<BestsellersSettings> => {
    try {
      const doc = await adminDb.collection("settings").doc("bestsellers").get();
      if (!doc.exists) return DEFAULT_BESTSELLERS_SETTINGS;
      const data = doc.data() as Partial<BestsellersSettings>;
      return {
        // Nullish (not length) check — an admin-saved empty list is a real "no picks" state,
        // only a missing field (first save) should fall back to the defaults.
        picks: data.picks ?? DEFAULT_BESTSELLERS_SETTINGS.picks,
      };
    } catch {
      return DEFAULT_BESTSELLERS_SETTINGS;
    }
  },
  ["bestsellers-settings"],
  { revalidate: 86400, tags: ["bestsellers-settings"] }
);

export const getBestsellersSettings = cache(fetchBestsellersSettingsFromFirestore);
