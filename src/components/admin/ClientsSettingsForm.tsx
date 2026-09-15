"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { updateClientsSettings } from "@/app/admin/(protected)/settings/actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { ClientsSettings } from "@/lib/clientsSettings";

export function ClientsSettingsForm({ initial }: { initial: ClientsSettings }) {
  const router = useRouter();
  const [values, setValues] = useState<ClientsSettings>(initial);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function photoField(index: number, key: "src" | "alt", value: string) {
    setValues((v) => {
      const photos = [...v.photos];
      photos[index] = { ...photos[index], [key]: value };
      return { ...v, photos };
    });
    setSaved(false);
  }

  function addPhoto() {
    setValues((v) => ({ ...v, photos: [...v.photos, { src: "", alt: "" }] }));
    setSaved(false);
  }

  function removePhoto(index: number) {
    setValues((v) => ({ ...v, photos: v.photos.filter((_, i) => i !== index) }));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (values.photos.some((p) => !p.src)) {
      setError("Every photo needs an uploaded image before you can save.");
      return;
    }
    setSubmitting(true);
    try {
      await updateClientsSettings(values);
      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5 rounded-md border border-brand-ink/10 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        {values.photos.map((photo, i) => (
          <div key={i} className="rounded-md border border-zinc-200 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Photo {i + 1}
              </span>
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
              >
                <Trash2 size={13} />
                Remove
              </button>
            </div>
            <ImageUploadField
              label="Photo"
              value={photo.src}
              onChange={(url) => photoField(i, "src", url)}
            />
            <label className="mb-1 mt-3 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Description (for accessibility, not shown on the page)
            </label>
            <input
              value={photo.alt}
              onChange={(e) => photoField(i, "alt", e.target.value)}
              required
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addPhoto}
        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-green hover:text-brand-green"
      >
        + Add photo
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && <p className="text-sm text-brand-green">Saved — the homepage is updated.</p>}

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
