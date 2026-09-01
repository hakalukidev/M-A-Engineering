import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import type { InquiryFormValues } from "@/types";

/** Receives inquiry/contact-form submissions (proposal 4.3) and persists them for the admin inbox. */
export async function POST(request: Request) {
  let body: Partial<InquiryFormValues> & { company?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot — a real visitor never fills this hidden field.
  if (String(body.company ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { name, phone, email, message, interestedIn } = body;
  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "name, phone, and message are required" },
      { status: 400 }
    );
  }

  await adminDb.collection("inquiries").add({
    name,
    phone,
    email: email ?? null,
    message,
    interestedIn: interestedIn ?? null,
    status: "new",
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true });
}
