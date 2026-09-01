"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

/** Confirm-before-delete button that calls a bound Server Action. */
export function DeleteButton({
  action,
  confirmText,
}: {
  action: () => Promise<void>;
  confirmText: string;
}) {
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      onClick={async () => {
        if (!window.confirm(confirmText)) return;
        setPending(true);
        try {
          await action();
        } finally {
          setPending(false);
        }
      }}
      className="flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
    >
      <Trash2 size={13} />
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
