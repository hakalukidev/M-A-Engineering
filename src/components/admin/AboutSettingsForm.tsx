"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateAboutSettings } from "@/app/admin/(protected)/settings/actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { AboutSettings } from "@/lib/aboutSettings";

export function AboutSettingsForm({ initial }: { initial: AboutSettings }) {
  const router = useRouter();
  const [values, setValues] = useState<AboutSettings>(initial);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function field(key: keyof Omit<AboutSettings, "pillars">, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  }

  function pillarField(index: number, key: "title" | "detail", value: string) {
    setValues((v) => {
      const pillars = [...v.pillars] as AboutSettings["pillars"];
      pillars[index] = { ...pillars[index], [key]: value };
      return { ...v, pillars };
    });
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await updateAboutSettings(values);
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
        <h2 className="text-sm font-semibold text-brand-ink">Banner</h2>
        <div className="mt-3 space-y-3">
          <ImageUploadField
            label="Banner photo"
            value={values.bannerImage}
            onChange={(url) => field("bannerImage", url)}
          />
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Paragraph 1
            </label>
            <textarea
              value={values.bannerParagraph1}
              onChange={(e) => field("bannerParagraph1", e.target.value)}
              required
              rows={3}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Paragraph 2
            </label>
            <textarea
              value={values.bannerParagraph2}
              onChange={(e) => field("bannerParagraph2", e.target.value)}
              required
              rows={3}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-5">
        <h2 className="text-sm font-semibold text-brand-ink">Our Story</h2>
        <div className="mt-3 space-y-3">
          <ImageUploadField
            label="Story photo"
            value={values.storyImage}
            onChange={(url) => field("storyImage", url)}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Eyebrow
              </label>
              <input
                value={values.storyEyebrow}
                onChange={(e) => field("storyEyebrow", e.target.value)}
                required
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Title
              </label>
              <input
                value={values.storyTitle}
                onChange={(e) => field("storyTitle", e.target.value)}
                required
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Paragraph 1
            </label>
            <textarea
              value={values.storyParagraph1}
              onChange={(e) => field("storyParagraph1", e.target.value)}
              required
              rows={3}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Paragraph 2
            </label>
            <textarea
              value={values.storyParagraph2}
              onChange={(e) => field("storyParagraph2", e.target.value)}
              required
              rows={3}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-5">
        <h2 className="text-sm font-semibold text-brand-ink">What Sets Us Apart (4 cards)</h2>
        <div className="mt-3 space-y-4">
          {values.pillars.map((pillar, i) => (
            <div key={i} className="rounded-md border border-zinc-200 p-3">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Card {i + 1} title
              </label>
              <input
                value={pillar.title}
                onChange={(e) => pillarField(i, "title", e.target.value)}
                required
                className="mb-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
              />
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Card {i + 1} detail
              </label>
              <input
                value={pillar.detail}
                onChange={(e) => pillarField(i, "detail", e.target.value)}
                required
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
              />
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && <p className="text-sm text-brand-green">Saved — the About page is updated.</p>}

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
