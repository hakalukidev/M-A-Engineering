import "server-only";
import { adminDb } from "@/lib/firebase/admin";

export type DailyPoint = { date: string; count: number };

/** Reads the visits/{YYYY-MM-DD} daily counters written by /api/track-visit. */
export async function getVisitStats(): Promise<{ total: number; daily: DailyPoint[] }> {
  const snap = await adminDb.collection("visits").get();
  const daily = snap.docs
    .map((doc) => ({ date: doc.id, count: (doc.data().count as number) ?? 0 }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const total = daily.reduce((sum, d) => sum + d.count, 0);
  return { total, daily };
}

export type SubmissionPoint = { date: string; orders: number; inquiries: number };

/** Groups orders/inquiries by day (from their createdAt timestamp) for the dashboard chart. */
export async function getSubmissionStats(): Promise<SubmissionPoint[]> {
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
}
