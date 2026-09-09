"use server";

import { revalidatePath, updateTag } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth/session";
import type { FooterSettings } from "@/lib/settings";
import type { AboutSettings } from "@/lib/aboutSettings";
import type { ClientsSettings } from "@/lib/clientsSettings";
import type { BestsellersSettings } from "@/lib/bestsellersSettings";
import type { CategoriesExploreSettings } from "@/lib/categoriesExploreSettings";

export async function updateFooterSettings(input: FooterSettings) {
  await requireAdmin();
  await adminDb.collection("settings").doc("footer").set(input, { merge: true });
  updateTag("footer-settings"); // busts the unstable_cache in src/lib/settings.ts immediately, read-your-own-writes
  // Footer is rendered from the root layout on every route, so revalidate the whole app.
  revalidatePath("/", "layout");
}

export async function updateAboutSettings(input: AboutSettings) {
  await requireAdmin();
  await adminDb.collection("settings").doc("about").set(input, { merge: true });
  updateTag("about-settings"); // busts the unstable_cache in src/lib/aboutSettings.ts immediately, read-your-own-writes
  revalidatePath("/about");
}

export async function updateClientsSettings(input: ClientsSettings) {
  await requireAdmin();
  await adminDb.collection("settings").doc("clients").set(input, { merge: true });
  updateTag("clients-settings"); // busts the unstable_cache in src/lib/clientsSettings.ts immediately, read-your-own-writes
  revalidatePath("/"); // the client-photo row renders on the homepage
}

export async function updateBestsellersSettings(input: BestsellersSettings) {
  await requireAdmin();
  await adminDb.collection("settings").doc("bestsellers").set(input, { merge: true });
  updateTag("bestsellers-settings"); // busts the unstable_cache in src/lib/bestsellersSettings.ts immediately, read-your-own-writes
  revalidatePath("/"); // the Bestselling Products carousel renders on the homepage
}

export async function updateCategoriesExploreSettings(input: CategoriesExploreSettings) {
  await requireAdmin();
  await adminDb.collection("settings").doc("categoriesExplore").set(input, { merge: true });
  updateTag("categories-explore-settings"); // busts the unstable_cache in src/lib/categoriesExploreSettings.ts immediately, read-your-own-writes
  revalidatePath("/"); // the "Explore our built-to-last Categories" carousel renders on the homepage
}
