import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <Container className="grid gap-12 py-16 lg:grid-cols-2">
      <div>
        <SectionHeading eyebrow="Get in touch" title="Contact Us" className="mb-6" />
        <ul className="space-y-4 text-sm text-zinc-700">
          <li className="flex items-center gap-3">
            <Phone size={18} className="text-amber-600" /> {siteConfig.contact.phone}
          </li>
          <li className="flex items-center gap-3">
            <Mail size={18} className="text-amber-600" /> {siteConfig.contact.email}
          </li>
          <li className="flex items-center gap-3">
            <MapPin size={18} className="text-amber-600" /> {siteConfig.contact.address}
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-zinc-200 p-6">
        <InquiryForm />
      </div>
    </Container>
  );
}
