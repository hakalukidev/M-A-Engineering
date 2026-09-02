"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Plus } from "lucide-react";
import { telHref, whatsappHref } from "@/lib/utils";

/** Official WhatsApp glyph (Font Awesome Free, CC BY 4.0) — real brand mark instead of a generic chat bubble. */
function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 448 512" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

/** Official Facebook Messenger glyph (Font Awesome Free, CC BY 4.0) — real brand mark instead of a generic paper plane. */
function MessengerIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 512 512" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z" />
    </svg>
  );
}

/**
 * Collapsed-by-default "speed dial" FAB, stacked bottom-right (proposal 4.3).
 * A fixed column of 3 always-expanded buttons collided with page content
 * (product-card prices, footer links) at every viewport width since the
 * corner it occupies is never actually empty on a long scrolling page —
 * shrinking the buttons only shrank the collision, not the overlap itself.
 * Collapsing to one 48px toggle removes that footprint until the visitor
 * asks for it.
 *
 * `phone`/`whatsapp`/`messenger` come from admin-editable settings (see
 * src/lib/settings.ts, /admin/settings) — passed down from the root layout
 * (a Server Component) rather than read from siteConfig directly here, so
 * an admin's saved changes actually take effect on this button.
 */
export function FloatingActionStack({
  phone,
  whatsapp,
  messenger,
}: {
  phone: string;
  whatsapp: string;
  messenger: string;
}) {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      key: "whatsapp",
      label: "Chat on WhatsApp",
      href: whatsappHref(whatsapp, "Hi, I'm interested in your equipment."),
      icon: WhatsAppIcon,
      className: "bg-brand-primary hover:bg-brand-primary-dark",
    },
    {
      key: "call",
      label: "Call us",
      href: telHref(phone),
      icon: Phone,
      className: "bg-brand-primary hover:bg-brand-primary-dark",
    },
    {
      key: "messenger",
      label: "Message us on Facebook",
      href: `https://m.me/${messenger}`,
      icon: MessengerIcon,
      className: "bg-brand-primary hover:bg-brand-primary-dark",
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.a
              key={action.key}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={action.label}
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 10 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 20 }}
              whileHover={{ scale: 1.08 }}
              className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-colors ${action.className}`}
            >
              <action.icon size={20} />
            </motion.a>
          ))}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact options" : "Contact us"}
        aria-expanded={open}
        whileTap={{ scale: 0.92 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white shadow-lg transition-colors hover:bg-brand-primary-dark"
      >
        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex"
        >
          <Plus size={22} />
        </motion.span>
      </motion.button>
    </div>
  );
}
