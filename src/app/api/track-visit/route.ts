import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";

/**
 * Public, unauthenticated — called once per browser session/day by
 * VisitTracker (see src/components/analytics/VisitTracker.tsx) to bump a
 * per-day counter doc. Deliberately one increment per doc rather than one
 * doc per visit: cheap to read back for the admin dashboard's chart, and
 * avoids the Firestore write volume a doc-per-pageview scheme would cost.
 */
export async function POST() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  await adminDb
    .collection("visits")
    .doc(today)
    .set({ count: FieldValue.increment(1) }, { merge: true });
  return NextResponse.json({ ok: true });
}
