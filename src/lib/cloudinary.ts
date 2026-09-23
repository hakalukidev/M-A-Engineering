import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Adds Cloudinary's f_auto (best format the browser supports, e.g. WebP/AVIF)
 * and q_auto (smallest file without visible quality loss) delivery
 * transformations to a plain upload URL. Safe to call on any URL — non-Cloudinary
 * URLs and ones that already carry the transformation are returned unchanged.
 */
export function withAutoFormatQuality(url: string): string {
  const marker = "/image/upload/";
  if (!url.includes("res.cloudinary.com") || !url.includes(marker)) return url;
  if (url.includes(`${marker}f_auto,q_auto/`)) return url;
  return url.replace(marker, `${marker}f_auto,q_auto/`);
}

/**
 * Signed server-side upload — the browser never talks to Cloudinary
 * directly or sees the API secret. Callers (the admin upload route, the
 * order-proof handler) pass an already-read file buffer.
 *
 * `compress` re-encodes the stored original with q_auto and caps it at
 * 2000px, so large phone photos don't sit in storage at full size. Leave it
 * off where the untouched original matters (payment proof screenshots).
 * Either way the returned URL is delivered with f_auto,q_auto.
 */
export function uploadImageToCloudinary(
  buffer: Buffer,
  options: { folder: string; publicId?: string; compress?: boolean }
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder,
        public_id: options.publicId,
        resource_type: "image",
        ...(options.compress && {
          transformation: [{ width: 2000, height: 2000, crop: "limit", quality: "auto" }],
        }),
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload returned no result"));
          return;
        }
        resolve({ url: withAutoFormatQuality(result.secure_url), publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}
