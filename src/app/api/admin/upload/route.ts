import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth/session";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/**
 * Admin-only signed upload — the browser never sees the Cloudinary API
 * secret. Uses verifySession() (not requireAdmin()) because requireAdmin()
 * calls next/navigation's redirect(), which is meant for Server
 * Components/Server Actions, not route handlers — here we want a plain 401.
 */
export async function POST(request: Request) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image is too large (max 8MB)" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { url } = await uploadImageToCloudinary(buffer, { folder: "ma-engineering/catalog" });

  return NextResponse.json({ url });
}
