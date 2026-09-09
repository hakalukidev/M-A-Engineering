"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { updateCategoriesExploreSettings } from "@/app/admin/(protected)/settings/actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { CategoriesExploreSettings, CategoryExplorePick } from "@/lib/categoriesExploreSettings";

export type ExploreCategoryOption = {
  slug: string;
  name: string;
};

export function CategoriesExploreSettingsForm({
  initial,
  categoryOptions,
}: {
  initial: CategoriesExploreSettings;
  categoryOptions: ExploreCategoryOption[];
}) {
  const router = useRouter();
  const [picks, setPicks] = useState<CategoryExplorePick[]>(initial.picks);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const namesBySlug = useMemo(() => new Map(categoryOptions.map((c) => [c.slug, c.name])), [categoryOptions]);
  const pickedSlugs = useMemo(() => new Set(picks.map((p) => p.categorySlug)), [picks]);
  const availableOptions = categoryOptions.filter((c) => !pickedSlugs.has(c.slug));

  function addPick() {
    if (!selectedSlug) return;
    setPicks((p) => [...p, { categorySlug: selectedSlug, image: "" }]);
    setSelectedSlug("");
    setSaved(false);
  }

  function removePick(index: number) {
    setPicks((p) => p.filter((_, i) => i !== index));
    setSaved(false);
  }

  function movePick(index: number, direction: -1 | 1) {
    setPicks((p) => {
      const next = [...p];
      const target = index + direction;
      if (target < 0 || target >= next.length) return p;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setSaved(false);
  }

  function setPickImage(index: number, image: string) {
    setPicks((p) => p.map((pick, i) => (i === index ? { ...pick, image } : pick)));
    setSaved(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await updateCategoriesExploreSettings({ picks });
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
      <div className="space-y-3">
        {picks.length === 0 && (
          <p className="text-sm text-brand-muted">No categories picked yet — add some below.</p>
        )}
        {picks.map((pick, i) => {
          const name = namesBySlug.get(pick.categorySlug);
          return (
            <div key={pick.categorySlug} className="flex items-center gap-3 rounded-md border border-zinc-200 p-2.5">
              <ImageUploadField
                label=""
                value={pick.image}
                onChange={(url) => setPickImage(i, url)}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-brand-ink">
                  {name ?? `${pick.categorySlug} (no longer in catalog)`}
                </p>
                {!pick.image && <p className="text-xs text-amber-600">No image yet — hidden from the homepage until uploaded.</p>}
              </div>
              <div className="flex shrink-0 items-center gap-1 self-start">
                <button
                  type="button"
                  onClick={() => movePick(i, -1)}
                  disabled={i === 0}
                  aria-label="Move up"
                  className="rounded p-1.5 text-brand-ink/60 transition-colors hover:bg-zinc-100 hover:text-brand-ink disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => movePick(i, 1)}
                  disabled={i === picks.length - 1}
                  aria-label="Move down"
                  className="rounded p-1.5 text-brand-ink/60 transition-colors hover:bg-zinc-100 hover:text-brand-ink disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowDown size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => removePick(i)}
                  aria-label="Remove"
                  className="rounded p-1.5 text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-4">
        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="min-w-0 flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
        >
          <option value="">Add a category…</option>
          {availableOptions.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addPick}
          disabled={!selectedSlug}
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-green hover:text-brand-green disabled:pointer-events-none disabled:opacity-50"
        >
          + Add
        </button>
      </div>

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
