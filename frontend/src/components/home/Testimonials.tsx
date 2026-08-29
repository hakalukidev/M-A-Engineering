import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * DEMO testimonials — no real client reviews exist yet, so these are
 * fictional sample copy (Bangladeshi names/areas) standing in for the real
 * thing, same purpose as the phone/WhatsApp/email placeholders in
 * src/config/site.ts. TODO: before launch, swap every quote and attribution
 * below for an actual client's words (see proposal section 9, "Client
 * Responsibilities") — do not ship these as real reviews.
 */
const DEMO_TESTIMONIALS = [
  {
    quote:
      "We fitted out our entire kitchen through MA Engineering — the cooking line and fridges have run without a single breakdown since installation.",
    name: "Mahmudul Hasan",
    detail: "Restaurant owner — Uttara, Dhaka",
  },
  {
    quote:
      "Ordered our display showcase and deck oven together. Delivery was on time and the finish is far better than what we quoted elsewhere.",
    name: "Nusrat Jahan",
    detail: "Bakery owner — Mirpur, Dhaka",
  },
  {
    quote:
      "Sourced our examination and sterilization equipment here for the new floor. Straightforward quote, and they followed up after installation too.",
    name: "Dr. Kamrul Islam",
    detail: "Clinic administrator — Dhanmondi, Dhaka",
  },
] as const;

/** Client-feedback cards, placed just above the footer. Placeholder copy until real quotes are collected — see the TODO above. */
export function Testimonials() {
  return (
    <section className="pb-14 sm:pb-20">
      <Container>
        <SectionHeading
          eyebrow="Client feedback"
          title="What our clients say"
          subtitle="Demo quotes for now — swap in real client reviews before launch."
          className="mb-8"
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {DEMO_TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-900/5 hover:ring-brand-green/30"
            >
              <Quote className="h-6 w-6 shrink-0 text-brand-orange transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
              <p className="mt-3 flex-1 text-sm italic leading-relaxed text-zinc-600">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-xs font-semibold text-brand-green-dark transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                  {t.name.charAt(0)}
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-zinc-900">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
