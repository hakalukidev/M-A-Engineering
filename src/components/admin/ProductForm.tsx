"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  createProduct,
  updateProduct,
  type ProductInput,
} from "@/app/admin/(protected)/categories/actions";

type SpecRow = { key: string; value: string };

export function ProductForm({
  categorySlug,
  subcategorySlug,
  initial,
}: {
  categorySlug: string;
  subcategorySlug: string;
  initial?: ProductInput;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [size, setSize] = useState(initial?.size ?? "");
  const [price, setPrice] = useState(initial?.price?.toString() ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [specs, setSpecs] = useState<SpecRow[]>(
    initial?.specs ? Object.entries(initial.specs).map(([key, value]) => ({ key, value })) : []
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function updateSpec(index: number, field: "key" | "value", value: string) {
    setSpecs((rows) => rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const specsObject = Object.fromEntries(
      specs.filter((row) => row.key.trim() !== "").map((row) => [row.key.trim(), row.value])
    );

    try {
      if (isEdit && initial) {
        await updateProduct(categorySlug, subcategorySlug, initial.slug, {
          name,
          description,
          image,
          images,
          size,
          price: Number(price),
          specs: specsObject,
        });
        router.push(`/admin/categories/${categorySlug}/subcategories/${subcategorySlug}`);
        router.refresh();
      } else {
        await createProduct({
          categorySlug,
          subcategorySlug,
          slug,
          name,
          description,
          image,
          images,
          size,
          price: Number(price),
          specs: specsObject,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded-md border border-brand-ink/10 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            disabled={isEdit}
            required
            placeholder="standard-dining-table-4-seat"
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
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
            Size / spec
          </label>
          <input
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
            placeholder="48 x 30 in"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
            Price (BDT)
          </label>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
          />
        </div>
      </div>

      <ImageUploadField label="Main image" value={image} onChange={setImage} />

      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-brand-muted">
          Extra photos (optional)
        </p>
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={url + i} className="relative">
              <ImageUploadField
                label=""
                value={url}
                onChange={(next) => setImages((imgs) => (next ? imgs.map((u, idx) => (idx === i ? next : u)) : imgs.filter((_, idx) => idx !== i)))}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setImages((imgs) => [...imgs, ""])}
            className="flex h-20 w-20 items-center justify-center rounded-md border-2 border-dashed border-zinc-300 text-zinc-400 hover:border-brand-green hover:text-brand-green"
            aria-label="Add another photo"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Specs (optional)</p>
          <button
            type="button"
            onClick={() => setSpecs((rows) => [...rows, { key: "", value: "" }])}
            className="flex items-center gap-1 text-xs font-semibold text-brand-green hover:underline"
          >
            <Plus size={12} />
            Add spec
          </button>
        </div>
        <div className="space-y-2">
          {specs.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={row.key}
                onChange={(e) => updateSpec(i, "key", e.target.value)}
                placeholder="Material"
                className="w-1/3 rounded-md border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-brand-green"
              />
              <input
                value={row.value}
                onChange={(e) => updateSpec(i, "value", e.target.value)}
                placeholder="Stainless steel"
                className="flex-1 rounded-md border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-brand-green"
              />
              <button
                type="button"
                onClick={() => setSpecs((rows) => rows.filter((_, idx) => idx !== i))}
                className="text-zinc-400 hover:text-red-600"
                aria-label="Remove spec"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting || !image}
        className="rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
      >
        {submitting ? "Saving..." : isEdit ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}
