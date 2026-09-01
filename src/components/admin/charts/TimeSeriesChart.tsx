"use client";

import { useRef, useState } from "react";

export type ChartSeries = {
  key: string;
  label: string;
  color: string;
  values: number[];
};

const VB_W = 640;
const VB_H = 220;
const PAD = { top: 12, right: 12, bottom: 24, left: 36 };

function niceMax(max: number): number {
  if (max <= 0) return 4;
  const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
  const normalized = max / magnitude;
  const step = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return step * magnitude;
}

/**
 * Single/dual-series time-line chart, inline SVG per the dataviz skill:
 * 2px round-cap lines, an end-dot with a surface ring, a ~10% area wash for
 * a lone series, recessive hairline gridlines, a legend for 2+ series, and
 * a hover crosshair + tooltip (one readout listing every series at that X).
 */
export function TimeSeriesChart({
  categories,
  series,
  formatCategory = (c) => c,
}: {
  categories: string[];
  series: ChartSeries[];
  formatCategory?: (category: string) => string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const plotW = VB_W - PAD.left - PAD.right;
  const plotH = VB_H - PAD.top - PAD.bottom;
  const n = categories.length;

  const maxValue = niceMax(Math.max(0, ...series.flatMap((s) => s.values)));
  const xStep = n > 1 ? plotW / (n - 1) : 0;
  const xAt = (i: number) => PAD.left + (n > 1 ? i * xStep : plotW / 2);
  const yAt = (v: number) => PAD.top + plotH - (v / maxValue) * plotH;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxValue * f));

  function handlePointerMove(e: React.PointerEvent<SVGRectElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || n === 0) return;
    const xRatio = (e.clientX - rect.left) / rect.width;
    const xVb = xRatio * VB_W;
    const idx = n > 1 ? Math.round((xVb - PAD.left) / xStep) : 0;
    setHoverIndex(Math.min(n - 1, Math.max(0, idx)));
  }

  // Show at most ~6 x-axis labels so they don't collide.
  const labelStride = Math.max(1, Math.ceil(n / 6));

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        style={{ width: "100%", height: 220 }}
        role="img"
        aria-label="Time series chart"
      >
        {/* Gridlines */}
        {yTicks.map((tick) => (
          <line
            key={tick}
            x1={PAD.left}
            x2={VB_W - PAD.right}
            y1={yAt(tick)}
            y2={yAt(tick)}
            stroke="#e4e4e7"
            strokeWidth={1}
          />
        ))}

        {/* Y tick labels */}
        {yTicks.map((tick) => (
          <text
            key={tick}
            x={PAD.left - 8}
            y={yAt(tick)}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize={9}
            fill="#8c8375"
          >
            {tick.toLocaleString()}
          </text>
        ))}

        {/* X tick labels */}
        {categories.map((c, i) =>
          i % labelStride === 0 ? (
            <text
              key={c}
              x={xAt(i)}
              y={VB_H - 6}
              textAnchor="middle"
              fontSize={9}
              fill="#8c8375"
            >
              {formatCategory(c)}
            </text>
          ) : null
        )}

        {/* Single-series area wash */}
        {series.length === 1 && n > 0 && (
          <path
            d={`M ${xAt(0)} ${yAt(series[0].values[0] ?? 0)} ${series[0].values
              .map((v, i) => `L ${xAt(i)} ${yAt(v)}`)
              .join(" ")} L ${xAt(n - 1)} ${PAD.top + plotH} L ${xAt(0)} ${PAD.top + plotH} Z`}
            fill={series[0].color}
            opacity={0.1}
            stroke="none"
          />
        )}

        {/* Lines */}
        {series.map((s) => (
          <path
            key={s.key}
            d={s.values.map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(v)}`).join(" ")}
            fill="none"
            stroke={s.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* End-dot markers */}
        {n > 0 &&
          series.map((s) => (
            <circle
              key={s.key}
              cx={xAt(n - 1)}
              cy={yAt(s.values[n - 1] ?? 0)}
              r={4}
              fill={s.color}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}

        {/* Crosshair */}
        {hoverIndex !== null && (
          <line
            x1={xAt(hoverIndex)}
            x2={xAt(hoverIndex)}
            y1={PAD.top}
            y2={PAD.top + plotH}
            stroke="#211f1a"
            strokeOpacity={0.25}
            strokeWidth={1}
          />
        )}

        {/* Hover hit area */}
        <rect
          x={PAD.left}
          y={PAD.top}
          width={plotW}
          height={plotH}
          fill="transparent"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
        />
      </svg>

      {/* Legend — only meaningful with 2+ series */}
      {series.length > 1 && (
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
          {series.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5 text-xs text-brand-muted">
              <span className="inline-block h-0.5 w-4 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      )}

      {/* Tooltip */}
      {hoverIndex !== null && n > 0 && (
        <div
          className="pointer-events-none absolute top-2 z-10 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs shadow-lg"
          style={{
            left: `${(xAt(hoverIndex) / VB_W) * 100}%`,
            transform: hoverIndex > n / 2 ? "translateX(-100%)" : "translateX(0)",
          }}
        >
          <p className="font-semibold text-brand-ink">{formatCategory(categories[hoverIndex])}</p>
          {series.map((s) => (
            <p key={s.key} className="mt-0.5 flex items-center gap-1.5 text-brand-muted">
              <span className="inline-block h-0.5 w-3 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="font-semibold text-brand-ink">{(s.values[hoverIndex] ?? 0).toLocaleString()}</span>
              {s.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
