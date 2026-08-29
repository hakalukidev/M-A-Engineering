import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

const infoCards = [
  {
    icon: Phone,
    label: "Call us",
    value: siteConfig.contact.phone,
    href: telHref(siteConfig.contact.phone),
  },
  {
    icon: Mail,
    label: "Email us",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: siteConfig.contact.address,
    href: siteConfig.contact.mapUrl,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Banner — full-bleed photo with the page heading overlaid, matching the About/homepage composition. */}
      <section className="bg-brand-cream pb-10 pt-10 sm:pb-14 sm:pt-14">
        <Container>
          <div className="relative min-h-[280px] overflow-hidden rounded-md bg-brand-green-dark sm:min-h-[340px]">
            <Image
              src="/images/categories/bakery-equipment/cover.jpg"
              alt="MA Engineering equipment ready for delivery"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/95 via-brand-green-dark/60 to-brand-green-dark/20" />
            <div className="relative flex min-h-[280px] flex-col justify-center gap-4 px-6 py-12 sm:min-h-[340px] sm:px-10 lg:w-3/5 lg:px-14">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
                Get in touch
              </p>
              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-brand-cream sm:text-5xl">
                Contact Us
              </h1>
              <p className="max-w-md text-lg text-brand-cream/70">
                Have a project or a single piece to source? Send us the details and we&apos;ll get
                back to you with pricing and availability.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Info + form — quick contact channels and map on the left, inquiry form on the right. */}
      <section className="py-6 sm:py-10">
        <Container className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Reach us directly" title="Contact Details" className="mb-6" />

            <ul className="space-y-3">
              {infoCards.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 rounded-md bg-brand-green/8 p-4 transition-colors hover:bg-brand-green/12"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-brand-cream">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
                        {label}
                      </span>
                      <span className="mt-0.5 block text-sm font-medium text-brand-ink">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-4 rounded-md border border-brand-green/15 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-brand-cream">
                  <Clock size={18} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-brand-ink/50">
                    Business hours
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-brand-ink">
                    Saturday &ndash; Thursday, 9:00 AM &ndash; 7:00 PM
                  </span>
                </span>
              </li>
            </ul>

            <a
              href={whatsappHref(siteConfig.contact.whatsapp, "Hi, I'd like to get in touch.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
            >
              <MessageCircle size={16} />
              Chat with us on WhatsApp
            </a>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-md border border-brand-green/15 bg-brand-card p-6 sm:p-8">
              <SectionHeading
                eyebrow="Send an inquiry"
                title="Tell Us What You Need"
                subtitle="Share a few details about the equipment or order you have in mind — a real person will follow up directly."
                className="mb-6"
              />
              <InquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
