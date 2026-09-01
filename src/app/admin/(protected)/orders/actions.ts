"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth/session";

export async function setOrderStatus(orderId: string, status: "new" | "handled") {
  await requireAdmin();
  await adminDb.collection("orders").doc(orderId).update({ status });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin");
}
