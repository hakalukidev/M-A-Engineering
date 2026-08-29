"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Description / Specifications tabs on the product page. No "Reviews" tab
 * and no ratings — this catalog has no review data, and we don't fabricate
 * one (see the product page's own comment on that). The trust strip (fixed
 * price, manual payment, WhatsApp, factory visit) lives above these tabs
 * on the page itself, not in here.
 */
export function ProductTabs({
  description,
  specs,
}: {
  description: string;
  specs?: Record<string, string>;
}) {
  const hasSpecs = Boolean(specs && Object.keys(specs).length > 0);
  const tabs = [
    { id: "description", label: "Description" },
    ...(hasSpecs ? [{ id: "specifications", label: "Specifications" }] : []),
  ] as const;

  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("description");

  return (
    <div className="mt-16 border-t border-brand-ink/10 pt-10">
      <div role="tablist" aria-label="Product information" className="flex flex-wrap gap-x-8 gap-y-2 border-b border-brand-ink/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "-mb-px border-b-2 px-1 pb-3 text-sm font-semibold transition-colors",
              active === tab.id
                ? "border-brand-green text-brand-ink"
                : "border-transparent text-brand-muted hover:text-brand-ink"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-8">
        {active === "description" && (
          <div>
            <h2 className="font-serif text-2xl font-semibold text-brand-ink">About This Piece</h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-brand-ink/70">
              {description}
            </p>
          </div>
        )}

        {active === "specifications" && hasSpecs && (
          <div className="max-w-2xl divide-y divide-brand-ink/10 overflow-hidden rounded-md border border-brand-ink/10">
            {Object.entries(specs!).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between gap-4 bg-brand-card px-5 py-3.5">
                <span className="text-sm font-medium text-brand-muted">{key}</span>
                <span className="text-sm font-semibold text-brand-ink">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
