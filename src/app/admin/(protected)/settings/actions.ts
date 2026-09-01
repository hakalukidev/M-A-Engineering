"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth/session";
import type { FooterSettings } from "@/lib/settings";

export async function updateFooterSettings(input: FooterSettings) {
  await requireAdmin();
  await adminDb.collection("settings").doc("footer").set(input, { merge: true });
  // Footer is rendered from the root layout on every route, so revalidate the whole app.
  revalidatePath("/", "layout");
}
