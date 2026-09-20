"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateCommitmentSettings } from "@/app/admin/(protected)/settings/actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { CommitmentSettings } from "@/lib/commitmentSettings";

const PHOTO_LABELS = ["Left photo", "Centre photo (featured)", "Right photo"] as const;

export function CommitmentSettingsForm({ initial }: { initial: CommitmentSettings }) {
  const router = useRouter();
  const [values, setValues] = useState<CommitmentSettings>(initial);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function photoField(index: number, key: "src" | "alt", value: string) {
    setValues((v) => {
      const photos = [...v.photos] as CommitmentSettings["photos"];
      photos[index] = { ...photos[index], [key]: value };
      return { ...v, photos };
    });
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (values.photos.some((p) => !p.src)) {
      setError("All three photos are required.");
      return;
    }
    setSubmitting(true);
    try {
      await updateCommitmentSettings(values);
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
      <div>
        <h2 className="text-sm font-semibold text-brand-ink">Photo collage (3 photos)</h2>
        <div className="mt-3 space-y-4">
          {values.photos.map((photo, i) => (
            <div key={i} className="rounded-md border border-zinc-200 p-3">
              <ImageUploadField
                label={PHOTO_LABELS[i]}
                value={photo.src}
                onChange={(url) => photoField(i, "src", url)}
              />
              <label className="mb-1 mt-3 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Description (alt text)
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
      </div>

      <div className="border-t border-zinc-100 pt-5">
        <h2 className="text-sm font-semibold text-brand-ink">Statement</h2>
        <div className="mt-3">
          <textarea
            value={values.text}
            onChange={(e) => {
              setValues((v) => ({ ...v, text: e.target.value }));
              setSaved(false);
            }}
            required
            rows={6}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
          />
          <p className="mt-1.5 text-xs text-brand-muted">
            Wrap words in <code className="rounded bg-zinc-100 px-1">**double stars**</code> to make them bold, and
            type <code className="rounded bg-zinc-100 px-1">[leaf]</code> where you want the green leaf icon.
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && <p className="text-sm text-brand-green">Saved — the homepage is updated.</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
      >
        {submitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
