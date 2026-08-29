"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { InquiryFormValues } from "@/types";

type Status = "idle" | "submitting" | "success" | "error";

/** Contact/inquiry form used on the contact page and inside popups (proposal 4.3). */
export function InquiryForm({
  interestedIn,
  onSuccess,
}: {
  interestedIn?: string;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = new FormData(e.currentTarget);
    const values: InquiryFormValues = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? "") || undefined,
      message: String(form.get("message") ?? ""),
      interestedIn,
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
        Thanks — we&apos;ve received your inquiry and will get back to you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        required
        placeholder="Full name"
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-ink"
      />
      <input
        name="phone"
        required
        placeholder="Phone number"
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-ink"
      />
      <input
        name="email"
        type="email"
        placeholder="Email (optional)"
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-ink"
      />
      <textarea
        name="message"
        required
        rows={3}
        placeholder="What equipment are you interested in?"
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-ink"
      />
      <Button variant="secondary" type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
