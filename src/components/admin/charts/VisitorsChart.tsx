"use client";

import { TimeSeriesChart } from "@/components/admin/charts/TimeSeriesChart";

/**
 * Thin client wrapper so the dashboard (a Server Component) only needs to
 * pass plain serializable data — `formatCategory` is a function, and
 * functions can't cross the server->client prop boundary unless they're
 * defined on the client side of it, as here.
 */
export function VisitorsChart({ categories, values }: { categories: string[]; values: number[] }) {
  return (
    <TimeSeriesChart
      categories={categories}
      formatCategory={(date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      series={[{ key: "visitors", label: "Visitors", color: "#3f8f5f", values }]}
    />
  );
}
