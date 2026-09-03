"use server";

import { revalidatePath, updateTag } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth/session";
import type { FooterSettings } from "@/lib/settings";
import type { AboutSettings } from "@/lib/aboutSettings";

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
