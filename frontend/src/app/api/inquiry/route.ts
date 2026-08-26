import { NextResponse } from "next/server";
import type { InquiryFormValues } from "@/types";

/**
 * Receives inquiry/contact-form submissions (proposal 4.3: "Contact/inquiry
 * form with email notification to the company").
 *
 * TODO: wire up an actual email notification (e.g. Resend/Nodemailer) and/or
 * persist the inquiry once the lightweight backend/admin panel (proposal 5.1)
 * is in place. For now this validates the payload and logs it server-side.
 */
export async function POST(request: Request) {
  let body: Partial<InquiryFormValues>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, phone, message } = body;
  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "name, phone, and message are required" },
      { status: 400 }
    );
  }

  console.info("[inquiry] new submission:", body);

  return NextResponse.json({ ok: true });
}
