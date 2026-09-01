import Link from "next/link";
import type { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: "new" | "handled";
  createdAt: Timestamp;
};

async function getInquiries(): Promise<Inquiry[]> {
  const snap = await adminDb.collection("inquiries").orderBy("createdAt", "desc").get();
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Inquiry, "id">) }));
}

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Inquiries</h1>
      <p className="mt-1 text-sm text-brand-muted">{inquiries.length} total submissions.</p>

      <div className="mt-6 space-y-2.5">
        {inquiries.map((inquiry) => (
          <Link
            key={inquiry.id}
            href={`/admin/inquiries/${inquiry.id}`}
            className="flex items-center gap-4 rounded-md border border-brand-ink/10 bg-white p-4 shadow-sm hover:shadow-md"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-brand-ink">{inquiry.name}</p>
              <p className="truncate text-xs text-brand-muted">
                {inquiry.phone} &middot; {inquiry.message}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                inquiry.status === "new" ? "bg-brand-orange/15 text-brand-orange-dark" : "bg-brand-green/15 text-brand-green-dark"
              }`}
            >
              {inquiry.status}
            </span>
          </Link>
        ))}
        {inquiries.length === 0 && (
          <p className="rounded-md border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
            No inquiries yet.
          </p>
        )}
      </div>
    </div>
  );
}
