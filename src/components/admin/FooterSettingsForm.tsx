"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateFooterSettings } from "@/app/admin/(protected)/settings/actions";
import type { FooterSettings } from "@/lib/settings";

export function FooterSettingsForm({ initial }: { initial: FooterSettings }) {
  const router = useRouter();
  const [values, setValues] = useState<FooterSettings>(initial);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function field(key: keyof FooterSettings, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await updateFooterSettings(values);
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
        <h2 className="text-sm font-semibold text-brand-ink">Company</h2>
        <div className="mt-3 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Short name (shown as the footer heading)
            </label>
            <input
              value={values.shortName}
              onChange={(e) => field("shortName", e.target.value)}
              required
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
              Description
            </label>
            <textarea
              value={values.description}
              onChange={(e) => field("description", e.target.value)}
              required
              rows={2}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-5">
        <h2 className="text-sm font-semibold text-brand-ink">Contact</h2>
        <div className="mt-3 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">Phone</label>
            <input
              value={values.phone}
              onChange={(e) => field("phone", e.target.value)}
              required
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">Email</label>
            <input
              type="email"
              value={values.email}
              onChange={(e) => field("email", e.target.value)}
              required
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">Address</label>
            <textarea
              value={values.address}
              onChange={(e) => field("address", e.target.value)}
              required
              rows={2}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-5">
        <h2 className="text-sm font-semibold text-brand-ink">Social links (optional)</h2>
        <div className="mt-3 space-y-3">
          {(["facebook", "youtube", "instagram", "linkedin"] as const).map((key) => (
            <div key={key}>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted capitalize">
                {key}
              </label>
              <input
                value={values[key]}
                onChange={(e) => field(key, e.target.value)}
                placeholder="https://..."
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
              />
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && <p className="text-sm text-brand-green">Saved — the footer is updated site-wide.</p>}

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
