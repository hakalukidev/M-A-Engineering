import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { getAllProducts } from "@/data/categories";

const MAX_PROOF_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/**
 * Receives fixed-price order submissions (proposal 4.5): product, payment
 * method, transaction reference, customer details, and a payment-proof
 * image — no payment gateway, this is a manual-payment order form.
 */
export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission" }, { status: 400 });
  }

  // Honeypot — a real visitor never fills this hidden field.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
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

  // productId alone identifies the product across the whole flattened catalog
  // (see getAllProducts), so scan every category/subcategory for it.
  const products = await getAllProducts();
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  const buffer = Buffer.from(await proof.arrayBuffer());
  const { url: proofImageUrl } = await uploadImageToCloudinary(buffer, {
    folder: "ma-engineering/order-proofs",
  });

  await adminDb.collection("orders").add({
    productId,
    productName: product.name,
    productSize: product.size,
    productPrice: product.price,
    name,
    phone,
    address,
    paymentMethodId,
    transactionRef,
    proofImageUrl,
    status: "new",
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true });
}
