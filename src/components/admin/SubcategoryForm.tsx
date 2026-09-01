"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  createSubcategory,
  updateSubcategory,
  type SubcategoryInput,
} from "@/app/admin/(protected)/categories/actions";

export function SubcategoryForm({
  categorySlug,
  initial,
}: {
  categorySlug: string;
  initial?: SubcategoryInput;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (isEdit && initial) {
        await updateSubcategory(categorySlug, initial.slug, { name, shortDescription, coverImage });
        router.push(`/admin/categories/${categorySlug}`);
        router.refresh();
      } else {
        await createSubcategory({ categorySlug, slug, name, shortDescription, coverImage });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 rounded-md border border-brand-ink/10 bg-white p-6 shadow-sm">
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">Slug</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          disabled={isEdit}
          required
          placeholder="dining-furniture"
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green disabled:bg-zinc-100 disabled:text-zinc-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
          Short description
        </label>
        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          required
          rows={2}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
        />
      </div>
      <ImageUploadField label="Cover image" value={coverImage} onChange={setCoverImage} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting || !coverImage}
        className="rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
      >
        {submitting ? "Saving..." : isEdit ? "Save changes" : "Create subcategory"}
      </button>
    </form>
  );
}
