"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { updateBestsellersSettings } from "@/app/admin/(protected)/settings/actions";
import type { BestsellersSettings, BestsellerPick } from "@/lib/bestsellersSettings";

export type CatalogProductOption = {
  categorySlug: string;
  categoryName: string;
  subcategorySlug: string;
  subcategoryName: string;
  productSlug: string;
  productName: string;
  image: string;
};

function pickKey(pick: BestsellerPick) {
  return `${pick.categorySlug}__${pick.subcategorySlug}__${pick.productSlug}`;
}

export function BestsellersSettingsForm({
  initial,
  catalogProducts,
}: {
  initial: BestsellersSettings;
  catalogProducts: CatalogProductOption[];
}) {
  const router = useRouter();
  const [picks, setPicks] = useState<BestsellerPick[]>(initial.picks);
  const [selectedKey, setSelectedKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const productsByKey = useMemo(() => {
    const map = new Map<string, CatalogProductOption>();
    for (const product of catalogProducts) {
      map.set(`${product.categorySlug}__${product.subcategorySlug}__${product.productSlug}`, product);
    }
    return map;
  }, [catalogProducts]);

  const pickedKeys = useMemo(() => new Set(picks.map(pickKey)), [picks]);
  const availableProducts = catalogProducts.filter((p) => !pickedKeys.has(`${p.categorySlug}__${p.subcategorySlug}__${p.productSlug}`));

  function addPick() {
    const product = productsByKey.get(selectedKey);
    if (!product) return;
    setPicks((p) => [
      ...p,
      { categorySlug: product.categorySlug, subcategorySlug: product.subcategorySlug, productSlug: product.productSlug },
    ]);
    setSelectedKey("");
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await updateBestsellersSettings({ picks });
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
          <p className="text-sm text-brand-muted">No products picked yet — add some below.</p>
        )}
        {picks.map((pick, i) => {
          const product = productsByKey.get(pickKey(pick));
          return (
            <div key={pickKey(pick)} className="flex items-center gap-3 rounded-md border border-zinc-200 p-2.5">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-zinc-100">
                {product?.image && (
                  <Image src={product.image} alt={product.productName} fill sizes="48px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-brand-ink">
                  {product?.productName ?? `${pick.productSlug} (no longer in catalog)`}
                </p>
                <p className="truncate text-xs text-brand-muted">
                  {product ? `${product.categoryName} / ${product.subcategoryName}` : "Remove — this product was deleted from the catalog"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
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
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className="min-w-0 flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-green"
        >
          <option value="">Add a product…</option>
          {Object.entries(
            availableProducts.reduce<Record<string, CatalogProductOption[]>>((groups, p) => {
              const groupLabel = `${p.categoryName} / ${p.subcategoryName}`;
              (groups[groupLabel] ??= []).push(p);
              return groups;
            }, {})
          ).map(([groupLabel, products]) => (
            <optgroup key={groupLabel} label={groupLabel}>
              {products.map((p) => (
                <option key={`${p.categorySlug}__${p.subcategorySlug}__${p.productSlug}`} value={`${p.categorySlug}__${p.subcategorySlug}__${p.productSlug}`}>
                  {p.productName}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <button
          type="button"
          onClick={addPick}
          disabled={!selectedKey}
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
