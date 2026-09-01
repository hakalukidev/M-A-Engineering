import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { formatPrice } from "@/lib/utils";
import { StatusToggleButton } from "@/components/admin/StatusToggleButton";
import { setOrderStatus } from "../actions";

type Order = {
  productId: string;
  productName: string;
  productSize: string;
  productPrice: number;
  name: string;
  phone: string;
  address: string;
  paymentMethodId: string;
  transactionRef: string;
  proofImageUrl: string;
  status: "new" | "handled";
  createdAt: Timestamp;
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const doc = await adminDb.collection("orders").doc(orderId).get();
  if (!doc.exists) notFound();
  const order = doc.data() as Order;

  return (
    <div className="max-w-2xl">
      <Link href="/admin/orders" className="text-xs font-semibold text-brand-green hover:underline">
        &larr; All orders
      </Link>
      <div className="mt-2 flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold text-brand-ink">{order.name}</h1>
        <StatusToggleButton status={order.status} onToggle={setOrderStatus.bind(null, orderId)} />
      </div>
      <p className="text-sm text-brand-muted">{order.createdAt.toDate().toLocaleString()}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-brand-ink/10 bg-white p-5 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Product</h2>
          <p className="mt-2 font-semibold text-brand-ink">{order.productName}</p>
          <p className="text-sm text-brand-muted">{order.productSize}</p>
          <p className="mt-1 text-lg font-bold text-brand-orange">{formatPrice(order.productPrice)}</p>
        </div>

        <div className="rounded-md border border-brand-ink/10 bg-white p-5 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Customer</h2>
          <p className="mt-2 text-sm text-brand-ink">{order.phone}</p>
          <p className="mt-1 text-sm text-brand-ink">{order.address}</p>
        </div>

        <div className="rounded-md border border-brand-ink/10 bg-white p-5 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Payment</h2>
          <p className="mt-2 text-sm text-brand-ink">Method: {order.paymentMethodId}</p>
          <p className="text-sm text-brand-ink">Reference: {order.transactionRef}</p>
        </div>

        <div className="rounded-md border border-brand-ink/10 bg-white p-5 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Payment proof</h2>
          <div className="relative mt-2 h-48 w-full overflow-hidden rounded-md bg-zinc-100">
            <Image src={order.proofImageUrl} alt="Payment proof" fill sizes="400px" className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
