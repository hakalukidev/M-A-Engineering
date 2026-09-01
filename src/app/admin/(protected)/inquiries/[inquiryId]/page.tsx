import Link from "next/link";
import { notFound } from "next/navigation";
import type { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { StatusToggleButton } from "@/components/admin/StatusToggleButton";
import { setInquiryStatus } from "../actions";

type Inquiry = {
  name: string;
  phone: string;
  email: string | null;
  message: string;
  interestedIn: string | null;
  status: "new" | "handled";
  createdAt: Timestamp;
};

export default async function AdminInquiryDetailPage({
  params,
}: {
  params: Promise<{ inquiryId: string }>;
}) {
  const { inquiryId } = await params;
  const doc = await adminDb.collection("inquiries").doc(inquiryId).get();
  if (!doc.exists) notFound();
  const inquiry = doc.data() as Inquiry;

  return (
    <div className="max-w-xl">
      <Link href="/admin/inquiries" className="text-xs font-semibold text-brand-green hover:underline">
        &larr; All inquiries
      </Link>
      <div className="mt-2 flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold text-brand-ink">{inquiry.name}</h1>
        <StatusToggleButton status={inquiry.status} onToggle={setInquiryStatus.bind(null, inquiryId)} />
      </div>
      <p className="text-sm text-brand-muted">{inquiry.createdAt.toDate().toLocaleString()}</p>

      <div className="mt-6 rounded-md border border-brand-ink/10 bg-white p-5 shadow-sm">
        <p className="text-sm text-brand-ink">
          <span className="font-semibold">Phone:</span> {inquiry.phone}
        </p>
        {inquiry.email && (
          <p className="mt-1 text-sm text-brand-ink">
            <span className="font-semibold">Email:</span> {inquiry.email}
          </p>
        )}
        {inquiry.interestedIn && (
          <p className="mt-1 text-sm text-brand-ink">
            <span className="font-semibold">Interested in:</span> {inquiry.interestedIn}
          </p>
        )}
        <div className="mt-4 border-t border-zinc-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Message</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-brand-ink">{inquiry.message}</p>
        </div>
      </div>
    </div>
  );
}
