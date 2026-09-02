import type { Metadata } from "next";
import { Clock, HelpCircle, Mail, MapPin, MessageCircle, Phone, Plus } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { getFooterSettings } from "@/lib/settings";
import { telHref, whatsappHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

const faqs = [
  {
    q: "Do you handle bulk and full fit-out orders?",
    a: "Yes — from a single replacement piece to a full kitchen, bakery, or clinic fit-out. Send us the list and we'll quote the whole order together.",
  },
  {
    q: "What payment methods do you accept?",
    a: "bKash, Nagad, Rocket, and direct bank transfer. Details are confirmed with your quote before you pay.",
  },
  {
    q: "Do you deliver outside Dhaka?",
    a: "Yes, we arrange delivery nationwide. Share your location when you inquire and we'll confirm timing and cost.",
  },
  {
    q: "How fast will I hear back?",
    a: "Inquiries submitted here or over WhatsApp are usually answered the same business day.",
  },
  {
    q: "Do you offer installation and setup?",
    a: "Yes, our team can install and set up larger equipment on-site for kitchens, bakeries, and clinics on request.",
  },
];

export default async function ContactPage() {
  const settings = await getFooterSettings();

  const contactMethods = [
    {
      icon: Phone,
      label: "Call us",
      value: settings.phone,
      href: telHref(settings.phone),
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: settings.whatsapp,
      href: whatsappHref(settings.whatsapp, "Hi, I'd like to get in touch."),
      external: true,
    },
    {
      icon: Mail,
      label: "Email us",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    {
      icon: MapPin,
      label: "Visit us",
      value: settings.address,
      href: siteConfig.contact.mapUrl,
      external: true,
    },
  ];

  return (
    <>
      {/* Hero — heading + quick contact links on the left, the inquiry form floating as an elevated card on the right. */}
      <section className="bg-brand-cream pb-14 pt-10 sm:pb-20 sm:pt-14">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex min-w-0 max-w-lg flex-col gap-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
              Get in touch
            </p>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-brand-ink sm:text-6xl">
              <TextAnimate
                segments={[
                  { text: "Let's" },
                  { text: "talk" },
                  { text: "about" },
                  { text: "your" },
                  { text: "next order", className: "font-serif italic text-brand-green" },
                ]}
              />
            </h1>
            <p className="text-lg text-brand-ink/70">
              Whether it&apos;s one replacement piece or a full kitchen fit-out, send us the
              details and a real person will follow up with pricing and availability.
            </p>

            <ul className="mt-2 grid min-w-0 gap-3 sm:grid-cols-2">
              {contactMethods.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label} className="min-w-0">
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex min-w-0 items-center gap-3 rounded-md border border-brand-ink/10 bg-brand-card/60 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/30 hover:bg-brand-card hover:shadow-md hover:shadow-brand-green-dark/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-brand-cream transition-colors duration-300 group-hover:bg-brand-orange">
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-brand-ink/45">
                        {label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-semibold text-brand-ink">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex items-center gap-2 text-sm text-brand-ink/60">
              <Clock size={15} className="shrink-0 text-brand-green" />
              Saturday &ndash; Thursday, 9:00 AM &ndash; 7:00 PM
            </div>
          </div>

          <div className="relative min-w-0 isolate lg:-translate-x-[50px]">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 hidden translate-x-3 translate-y-3 rounded-md bg-brand-green/15 sm:block"
            />
            <div className="rounded-md border border-brand-ink/10 bg-brand-card p-6 shadow-xl shadow-brand-green-dark/10 sm:p-8">
              <SectionHeading
                eyebrow="Send an inquiry"
                title="Tell Us What You Need"
                subtitle="Share a few details about the equipment or order you have in mind."
                className="mb-6"
              />
              <InquiryForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Map — factory location, full-width embed. */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Find us"
            title="Visit the Factory"
            subtitle={settings.address}
            className="mb-8"
          />
          <div className="overflow-hidden rounded-md border border-brand-ink/10 shadow-sm">
            <iframe
              src={siteConfig.contact.mapEmbedUrl}
              title="Our location on Google Maps"
              className="h-80 w-full border-0 sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      {/* FAQ — decorative question panel on the left, common pre-order questions on the right. */}
      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative hidden self-start overflow-hidden rounded-md bg-brand-green-dark p-8 lg:flex lg:flex-col lg:justify-between">
            <HelpCircle
              size={140}
              strokeWidth={1}
              className="pointer-events-none absolute -bottom-6 -right-6 text-brand-cream/10"
            />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange">
                Have questions
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-cream">
                Frequently Asked
              </h2>
              <p className="mt-4 max-w-sm text-base text-brand-cream/70">
                Common questions before you order — WhatsApp us if yours isn&apos;t here.
              </p>
            </div>
            <a
              href={whatsappHref(settings.whatsapp, "Hi, I have a question before ordering.")}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand-cream px-5 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-cream/90"
            >
              <MessageCircle size={16} />
              Ask us on WhatsApp
            </a>
          </div>

          <div>
            <SectionHeading
              eyebrow="Have questions"
              title="Frequently Asked"
              subtitle="Common questions before you order — WhatsApp us if yours isn't here."
              className="mb-6 lg:hidden"
            />
            <div className="space-y-3">
              {faqs.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-md border border-brand-ink/10 bg-brand-card p-4 open:border-brand-green/30 sm:p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-ink [&::-webkit-details-marker]:hidden">
                    {q}
                    <Plus
                      size={16}
                      className="shrink-0 text-brand-green transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-brand-ink/65">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
