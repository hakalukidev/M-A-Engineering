import "server-only";
import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";

export type DailyPoint = { date: string; count: number };

/**
 * Reads the visits/{YYYY-MM-DD} daily counters written by /api/track-visit.
 * Cached — a full collection scan costs one Firestore read per document
 * returned, and this was being re-run on every single admin dashboard
 * load with no caching at all, which is a real contributor to burning
 * through the Spark plan's daily read quota (see src/data/categories.ts
 * for the same pattern). A few minutes of staleness on an internal
 * analytics chart is a non-issue.
 */
export const getVisitStats = unstable_cache(
  async (): Promise<{ total: number; daily: DailyPoint[] }> => {
    const snap = await adminDb.collection("visits").get();
    const daily = snap.docs
      .map((doc) => ({ date: doc.id, count: (doc.data().count as number) ?? 0 }))
      .sort((a, b) => a.date.localeCompare(b.date));
    const total = daily.reduce((sum, d) => sum + d.count, 0);
    return { total, daily };
  },
  ["visit-stats"],
  { revalidate: 900 }
);

export type SubmissionPoint = { date: string; orders: number; inquiries: number };

/** Groups orders/inquiries by day (from their createdAt timestamp) for the dashboard chart. */
export const getSubmissionStats = unstable_cache(
  async (): Promise<SubmissionPoint[]> => {
    const [ordersSnap, inquiriesSnap] = await Promise.all([
      adminDb.collection("orders").select("createdAt").get(),
      adminDb.collection("inquiries").select("createdAt").get(),
    ]);

    const counts = new Map<string, { orders: number; inquiries: number }>();
    function bump(dateKey: string, field: "orders" | "inquiries") {
      const entry = counts.get(dateKey) ?? { orders: 0, inquiries: 0 };
      entry[field] += 1;
      counts.set(dateKey, entry);
    }

    for (const doc of ordersSnap.docs) {
      const createdAt = doc.get("createdAt") as FirebaseFirestore.Timestamp | undefined;
      if (createdAt) bump(createdAt.toDate().toISOString().slice(0, 10), "orders");
    }
    for (const doc of inquiriesSnap.docs) {
      const createdAt = doc.get("createdAt") as FirebaseFirestore.Timestamp | undefined;
      if (createdAt) bump(createdAt.toDate().toISOString().slice(0, 10), "inquiries");
    }

    return Array.from(counts.entries())
      .map(([date, v]) => ({ date, ...v }))
      .sort((a, b) => a.date.localeCompare(b.date));
  },
  ["submission-stats"],
  { revalidate: 900 }
);
