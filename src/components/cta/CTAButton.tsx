import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/utils";
import type { CtaConfig } from "@/types";

const defaultCta: CtaConfig = {
  label: "Call Now",
  action: "call",
  href: telHref(siteConfig.contact.phone),
};

/** Primary conversion CTA — required on every page per proposal 4.3. */
export function CTAButton({ cta = defaultCta }: { cta?: CtaConfig }) {
  return (
    <a href={cta.href} className={buttonVariants("primary", "shadow-sm")}>
      <Phone size={16} />
      {cta.label}
    </a>
  );
}
