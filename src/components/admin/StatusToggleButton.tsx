"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, RotateCcw } from "lucide-react";

export function StatusToggleButton({
  status,
  onToggle,
}: {
  status: "new" | "handled";
  onToggle: (nextStatus: "new" | "handled") => Promise<void>;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const next = status === "new" ? "handled" : "new";

  return (
    <button
      type="button"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        try {
          await onToggle(next);
          router.refresh();
        } finally {
          setPending(false);
        }
      }}
      className="flex items-center gap-2 rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
    >
      {status === "new" ? <Check size={15} /> : <RotateCcw size={15} />}
      {pending ? "Updating..." : status === "new" ? "Mark as handled" : "Mark as new"}
    </button>
  );
}
