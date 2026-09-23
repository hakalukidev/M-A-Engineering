import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";

export type CommitmentPhoto = {
  src: string;
  alt: string;
};

export type CommitmentSettings = {
  /** Left, centre (featured) and right photo of the collage. */
  photos: [CommitmentPhoto, CommitmentPhoto, CommitmentPhoto];
  /** Statement copy. `**text**` renders bold, `[leaf]` renders the green leaf icon. */
  text: string;
};

/** Falls back to the existing hardcoded collage + statement until an admin saves real content. */
const DEFAULT_COMMITMENT_SETTINGS: CommitmentSettings = {
  photos: [
    {
      src: "/images/categories/commercial-kitchen-equipment/cooking-equipment/four-burner-gas-stove.jpg",
      alt: "M A Engineering four-burner stainless steel gas stove",
    },
    {
      src: "/images/categories/bakery-equipment/display-showcases/cake-display-showcase-curved.jpg",
      alt: "Bakery display showcase filled with pastries in a shop",
    },
    {
      src: "/images/categories/bakery-equipment/display-showcases/display-showcase-red-gold-inshop.jpg",
      alt: "Red and gold display showcase by M A Engineering",
    },
  ],
  text: "Discover our commitment to [leaf] **durable, responsibly sourced materials**, energy-efficient engineering, and **ethical manufacturing** partnerships — all built to support a harder-working operation and a [leaf] **greener commercial kitchen.**",
};

/** Same two-layer caching as getClientsSettings (src/lib/clientsSettings.ts). */
const fetchCommitmentSettingsFromFirestore = unstable_cache(
  async (): Promise<CommitmentSettings> => {
    try {
      const doc = await adminDb.collection("settings").doc("commitment").get();
      if (!doc.exists) return DEFAULT_COMMITMENT_SETTINGS;
      const data = doc.data() as Partial<CommitmentSettings>;
      return {
        photos:
          Array.isArray(data.photos) && data.photos.length === 3
            ? data.photos
            : DEFAULT_COMMITMENT_SETTINGS.photos,
        text: data.text ?? DEFAULT_COMMITMENT_SETTINGS.text,
      };
    } catch {
      return DEFAULT_COMMITMENT_SETTINGS;
    }
  },
  ["commitment-settings"],
  { revalidate: 86400, tags: ["commitment-settings"] }
);

export const getCommitmentSettings = cache(fetchCommitmentSettingsFromFirestore);
