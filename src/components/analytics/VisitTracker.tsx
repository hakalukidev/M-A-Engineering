"use client";

import { useEffect } from "react";

/**
 * Fires once per browser per day (sessionStorage-gated, so page navigations
 * within the same visit don't inflate the count) to bump the admin
 * dashboard's daily visitor counter. No UI — mount anywhere under the
 * public site.
 */
export function VisitTracker() {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const flagKey = `ma_visit_tracked_${today}`;
    try {
      if (sessionStorage.getItem(flagKey)) return;
      sessionStorage.setItem(flagKey, "1");
    } catch {
      // sessionStorage unavailable (private mode, etc.) — fall through and track anyway.
    }
    fetch("/api/track-visit", { method: "POST" }).catch(() => {
      // Best-effort — a failed visit ping shouldn't surface to the visitor.
    });
  }, []);

  return null;
}
