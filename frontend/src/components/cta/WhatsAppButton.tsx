import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappHref } from "@/lib/utils";

/** Fixed floating CTA present on every page, per proposal 4.3. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref(siteConfig.contact.whatsapp, "Hi, I'm interested in your equipment.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={26} />
    </a>
  );
}
