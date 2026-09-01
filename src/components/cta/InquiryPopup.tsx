"use client";

import dynamic from "next/dynamic";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { usePopupTrigger } from "@/hooks/usePopupTrigger";
import type { PopupConfig } from "@/types";

/** Code-split — framer-motion (Modal's only dependency) loads only once the trigger actually fires. */
const Modal = dynamic(() => import("@/components/ui/Modal").then((m) => m.Modal), { ssr: false });

/**
 * One of the 3-4 strategically placed popups (proposal 4.3).
 * Mount several instances with different `config.trigger` across the site
 * (e.g. a delay popup on the homepage, a scroll popup on category pages).
 */
export function InquiryPopup({ config }: { config: PopupConfig }) {
  const { shouldShow, everTriggered, dismiss } = usePopupTrigger(config.trigger, config.triggerValue);

  if (!everTriggered) return null;

  return (
    <Modal open={shouldShow} onClose={dismiss} title={config.title}>
      <p className="mb-4 text-sm text-zinc-600">{config.message}</p>
      <InquiryForm onSuccess={dismiss} />
    </Modal>
  );
}
