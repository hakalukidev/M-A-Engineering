"use client";

import { Modal } from "@/components/ui/Modal";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { usePopupTrigger } from "@/hooks/usePopupTrigger";
import type { PopupConfig } from "@/types";

/**
 * One of the 3-4 strategically placed popups (proposal 4.3).
 * Mount several instances with different `config.trigger` across the site
 * (e.g. a delay popup on the homepage, a scroll popup on category pages).
 */
export function InquiryPopup({ config }: { config: PopupConfig }) {
  const { shouldShow, dismiss } = usePopupTrigger(config.trigger, config.triggerValue);

  return (
    <Modal open={shouldShow} onClose={dismiss} title={config.title}>
      <p className="mb-4 text-sm text-zinc-600">{config.message}</p>
      <InquiryForm onSuccess={dismiss} />
    </Modal>
  );
}
