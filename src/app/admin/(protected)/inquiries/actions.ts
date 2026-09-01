"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/auth/session";

export async function setInquiryStatus(inquiryId: string, status: "new" | "handled") {
  await requireAdmin();
  await adminDb.collection("inquiries").doc(inquiryId).update({ status });
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${inquiryId}`);
  revalidatePath("/admin");
}
