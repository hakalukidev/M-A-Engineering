"use client";

import { useMemo, useState } from "react";
import { TimeSeriesChart } from "@/components/admin/charts/TimeSeriesChart";
import type { SubmissionPoint } from "@/lib/analytics";

type Granularity = "day" | "month" | "year";

const GRANULARITIES: { key: Granularity; label: string }[] = [
  { key: "day", label: "Day" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
];

function bucketKey(date: string, granularity: Granularity): string {
  if (granularity === "year") return date.slice(0, 4);
  if (granularity === "month") return date.slice(0, 7);
  return date;
}

function formatLabel(key: string, granularity: Granularity): string {
  if (granularity === "year") return key;
  if (granularity === "month") {
    const [y, m] = key.split("-");
    return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  const d = new Date(key);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function bucket(data: SubmissionPoint[], granularity: Granularity) {
  const map = new Map<string, { orders: number; inquiries: number }>();
  for (const point of data) {
    const key = bucketKey(point.date, granularity);
    const entry = map.get(key) ?? { orders: 0, inquiries: 0 };
    entry.orders += point.orders;
    entry.inquiries += point.inquiries;
    map.set(key, entry);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, v]) => ({ key, ...v }));
}

export function OrdersInquiriesChart({ data }: { data: SubmissionPoint[] }) {
  const [granularity, setGranularity] = useState<Granularity>("day");

  const bucketed = useMemo(() => {
    const rows = bucket(data, granularity);
    // Keep the chart readable — cap to the most recent 30 buckets.
    return rows.slice(-30);
  }, [data, granularity]);

  const categories = bucketed.map((r) => r.key);

  if (data.length === 0) {
    return (
      <div className="flex h-[220px] items-center justify-center text-sm text-brand-muted">
        No orders or inquiries yet.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex justify-end gap-1">
        {GRANULARITIES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setGranularity(key)}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
              granularity === key
                ? "bg-brand-green text-white"
                : "text-brand-muted hover:bg-zinc-100 hover:text-brand-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <TimeSeriesChart
        categories={categories}
        formatCategory={(key) => formatLabel(key, granularity)}
        series={[
          { key: "orders", label: "Orders", color: "#3f8f5f", values: bucketed.map((r) => r.orders) },
          { key: "inquiries", label: "Inquiries", color: "#c1592f", values: bucketed.map((r) => r.inquiries) },
        ]}
      />
    </div>
  );
}
