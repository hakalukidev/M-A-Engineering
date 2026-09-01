import Link from "next/link";
import { FolderTree, Layers, Package, ShoppingCart, MessageSquare } from "lucide-react";
import { adminDb } from "@/lib/firebase/admin";
import { formatPrice } from "@/lib/utils";
import type { Timestamp } from "firebase-admin/firestore";

async function getCounts() {
  const [categories, subcategories, products, newOrders, newInquiries] = await Promise.all([
    adminDb.collection("categories").count().get(),
    adminDb.collection("subcategories").count().get(),
    adminDb.collection("products").count().get(),
    adminDb.collection("orders").where("status", "==", "new").count().get(),
    adminDb.collection("inquiries").where("status", "==", "new").count().get(),
  ]);
  return {
    categories: categories.data().count,
    subcategories: subcategories.data().count,
    products: products.data().count,
    newOrders: newOrders.data().count,
    newInquiries: newInquiries.data().count,
  };
}

type RecentOrder = { id: string; name: string; productName: string; productPrice: number; status: string; createdAt: Timestamp };
type RecentInquiry = { id: string; name: string; message: string; status: string; createdAt: Timestamp };

async function getRecentOrders(): Promise<RecentOrder[]> {
  const snap = await adminDb.collection("orders").orderBy("createdAt", "desc").limit(5).get();
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<RecentOrder, "id">) }));
}

async function getRecentInquiries(): Promise<RecentInquiry[]> {
  const snap = await adminDb.collection("inquiries").orderBy("createdAt", "desc").limit(5).get();
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<RecentInquiry, "id">) }));
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
        status === "new" ? "bg-brand-orange/15 text-brand-orange-dark" : "bg-brand-green/15 text-brand-green-dark"
      }`}
    >
      {status}
    </span>
  );
}

export default async function AdminDashboardPage() {
  const [counts, recentOrders, recentInquiries] = await Promise.all([
    getCounts(),
    getRecentOrders(),
    getRecentInquiries(),
  ]);

  const stats = [
    { label: "Categories", value: counts.categories, icon: FolderTree, href: "/admin/categories" },
    { label: "Subcategories", value: counts.subcategories, icon: Layers, href: "/admin/categories" },
    { label: "Products", value: counts.products, icon: Package, href: "/admin/categories" },
    { label: "New Orders", value: counts.newOrders, icon: ShoppingCart, href: "/admin/orders" },
    { label: "New Inquiries", value: counts.newInquiries, icon: MessageSquare, href: "/admin/inquiries" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-brand-muted">An overview of the catalog and recent activity.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-md border border-brand-ink/10 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <Icon size={18} className="text-brand-green" strokeWidth={1.9} />
            <p className="mt-3 text-2xl font-bold text-brand-ink">{value}</p>
            <p className="text-xs font-medium text-brand-muted">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-md border border-brand-ink/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-brand-ink">Recent orders</h2>
            <Link href="/admin/orders" className="text-xs font-semibold text-brand-green hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-3 divide-y divide-zinc-100">
            {recentOrders.length === 0 && <p className="py-4 text-sm text-brand-muted">No orders yet.</p>}
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="flex items-center justify-between gap-3 py-3 hover:bg-zinc-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-brand-ink">{order.name}</p>
                  <p className="truncate text-xs text-brand-muted">{order.productName}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-semibold text-brand-ink">{formatPrice(order.productPrice)}</span>
                  <StatusBadge status={order.status} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-brand-ink/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-brand-ink">Recent inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs font-semibold text-brand-green hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-3 divide-y divide-zinc-100">
            {recentInquiries.length === 0 && <p className="py-4 text-sm text-brand-muted">No inquiries yet.</p>}
            {recentInquiries.map((inquiry) => (
              <Link
                key={inquiry.id}
                href={`/admin/inquiries/${inquiry.id}`}
                className="flex items-center justify-between gap-3 py-3 hover:bg-zinc-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-brand-ink">{inquiry.name}</p>
                  <p className="truncate text-xs text-brand-muted">{inquiry.message}</p>
                </div>
                <StatusBadge status={inquiry.status} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
