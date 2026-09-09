import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";

export type ClientPhoto = {
  src: string;
  alt: string;
};

export type ClientsSettings = {
  seeClientsHref: string;
  photos: ClientPhoto[];
};

/** Falls back to the current handover photos until an admin saves real ones. */
const DEFAULT_CLIENTS_SETTINGS: ClientsSettings = {
  seeClientsHref: "#",
  photos: [
    { src: "/images/home/clients/client-1.jpg", alt: "MA Engineering handing over an order to Food Fantasy with Arafat" },
    { src: "/images/home/clients/client-2.jpg", alt: "MA Engineering handover with Bastu Properties Ltd." },
    { src: "/images/home/clients/client-3.jpg", alt: "MA Engineering handover with Shawarma Damasco" },
    { src: "/images/home/clients/client-4.jpg", alt: "A happy MA Engineering client, 5-star rating" },
  ],
};

/** Same two-layer caching as getAboutSettings (src/lib/aboutSettings.ts). */
const fetchClientsSettingsFromFirestore = unstable_cache(
  async (): Promise<ClientsSettings> => {
    try {
      const doc = await adminDb.collection("settings").doc("clients").get();
      if (!doc.exists) return DEFAULT_CLIENTS_SETTINGS;
      const data = doc.data() as Partial<ClientsSettings>;
      return {
        ...DEFAULT_CLIENTS_SETTINGS,
        ...data,
        // Nullish (not length) check — an admin-saved empty array is a real "no photos" state,
        // only a missing field (legacy doc, or first save) should fall back to the defaults.
        photos: data.photos ?? DEFAULT_CLIENTS_SETTINGS.photos,
      };
    } catch {
      return DEFAULT_CLIENTS_SETTINGS;
    }
  },
  ["clients-settings"],
  { revalidate: 86400, tags: ["clients-settings"] }
);

export const getClientsSettings = cache(fetchClientsSettingsFromFirestore);
