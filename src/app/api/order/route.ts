import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "order-proofs");
const MAX_PROOF_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/**
 * Receives fixed-price order submissions (proposal 4.5): product, payment
 * method, transaction reference, customer details, and a payment-proof
 * image — no payment gateway, this is a manual-payment order form.
 *
 * TODO: wire up an actual email/WhatsApp notification and/or persist the
 * order once the lightweight backend/admin panel (proposal 5.1) is in
 * place. For now this validates the payload, stores the proof image under
 * /public/uploads/order-proofs, and logs the order server-side.
 */
export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission" }, { status: 400 });
  }

  const productId = String(formData.get("productId") ?? "");
  const name = String(formData.get("name") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const address = String(formData.get("address") ?? "");
  const paymentMethodId = String(formData.get("paymentMethodId") ?? "");
  const transactionRef = String(formData.get("transactionRef") ?? "");
  const proof = formData.get("proof");

  if (!productId || !name || !phone || !address || !paymentMethodId || !transactionRef) {
    return NextResponse.json({ error: "Missing required order fields" }, { status: 400 });
  }

  if (!(proof instanceof File) || proof.size === 0) {
    return NextResponse.json({ error: "Payment proof image is required" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(proof.type)) {
    return NextResponse.json({ error: "Payment proof must be an image" }, { status: 400 });
  }
  if (proof.size > MAX_PROOF_BYTES) {
    return NextResponse.json({ error: "Payment proof image is too large (max 5MB)" }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = proof.type.split("/")[1] ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = Buffer.from(await proof.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), bytes);

  const order = {
    productId,
    name,
    phone,
    address,
    paymentMethodId,
    transactionRef,
    proofFile: `/uploads/order-proofs/${filename}`,
  };

  console.info("[order] new submission:", order);

  return NextResponse.json({ ok: true });
}
