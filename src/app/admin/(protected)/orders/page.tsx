import Link from "next/link";
import type { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { formatPrice } from "@/lib/utils";

type Order = {
  id: string;
  name: string;
  phone: string;
  productName: string;
  productPrice: number;
  status: "new" | "handled";
  createdAt: Timestamp;
};

async function getOrders(): Promise<Order[]> {
  const snap = await adminDb.collection("orders").orderBy("createdAt", "desc").get();
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Order, "id">) }));
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Orders</h1>
      <p className="mt-1 text-sm text-brand-muted">{orders.length} total submissions.</p>

      <div className="mt-6 space-y-2.5">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/admin/orders/${order.id}`}
            className="flex items-center gap-4 rounded-md border border-brand-ink/10 bg-white p-4 shadow-sm hover:shadow-md"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-brand-ink">{order.name}</p>
              <p className="truncate text-xs text-brand-muted">
                {order.productName} &middot; {order.phone}
              </p>
            </div>
            <p className="shrink-0 text-sm font-semibold text-brand-ink">{formatPrice(order.productPrice)}</p>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                order.status === "new" ? "bg-brand-orange/15 text-brand-orange-dark" : "bg-brand-green/15 text-brand-green-dark"
              }`}
            >
              {order.status}
            </span>
          </Link>
        ))}
        {orders.length === 0 && (
          <p className="rounded-md border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
            No orders yet.
          </p>
        )}
      </div>
    </div>
  );
}
