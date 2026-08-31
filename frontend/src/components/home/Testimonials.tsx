import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";

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
    quote: "Sustainable utensils are awesome for daily use.",
    name: "Rafiqul",
    lastName: "Islam",
    detail: "Restaurant owner — Uttara, Dhaka",
  },
  {
    quote:
      "MA Engineering's glass jars are awesome for storage, and the bamboo utensils are perfect for daily use.",
    name: "Mahmudul",
    lastName: "Hasan",
    detail: "Restaurant owner — Uttara, Dhaka",
  },
  {
    quote: "Fantastic products and fast delivery. My kitchen feels so much greener!",
    name: "Nusrat",
    lastName: "Jahan",
    detail: "Bakery owner — Mirpur, Dhaka",
    featured: true,
  },
  {
    quote:
      "Love MA Engineering's eco-style! Glass jars keep things fresh, and bamboo utensils are so chic.",
    name: "Dr. Kamrul",
    lastName: "Islam",
    detail: "Clinic administrator — Dhanmondi, Dhaka",
  },
  {
    quote: "The sustainable range is excellent. My bamboo utensils are perfect for daily use.",
    name: "Esther",
    lastName: "Howard",
    detail: "Sous chef — Gulshan, Dhaka",
  },
  {
    quote: "Our walk-in cooler has run flawlessly since day one. Great build quality.",
    name: "Tanvir",
    lastName: "Ahmed",
    detail: "Hotel manager — Banani, Dhaka",
  },
  {
    quote: "The display counters look premium and keep our pastries fresh all day.",
    name: "Farzana",
    lastName: "Akter",
    detail: "Cafe owner — Bashundhara, Dhaka",
  },
  {
    quote: "Reliable sterilization equipment and quick after-sales support.",
    name: "Dr. Shirin",
    lastName: "Sultana",
    detail: "Clinic owner — Banani, Dhaka",
  },
  {
    quote: "Their dough mixers cut our prep time in half. Solid investment.",
    name: "Imran",
    lastName: "Kabir",
    detail: "Bakery head chef — Uttara, Dhaka",
  },
  {
    quote: "Great range of billing scales — accurate and easy for staff to use.",
    name: "Shamima",
    lastName: "Begum",
    detail: "Shop owner — Mohammadpur, Dhaka",
  },
] as const;

/** Client-feedback carousel with a headline rating stat, placed just above the footer. Placeholder copy until real quotes are collected — see the TODO above. */
export function Testimonials() {
  return (
    <section className="bg-brand-cream py-14 sm:py-20">
      <Container>
        <div className="mb-10 flex flex-wrap items-start gap-x-10 gap-y-4">
          <p className="font-serif text-5xl italic text-brand-ink">
            4.9<span className="text-2xl not-italic text-brand-ink/60">/5</span>
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-brand-ink/70">
            More than <span className="font-semibold text-brand-ink">25,000</span>{" "}
            <span className="font-semibold text-brand-ink">5-Star</span> Reviews for Our
            Award-Winning Eco Products
          </p>
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {DEMO_TESTIMONIALS.map((t, i) =>
            "featured" in t && t.featured ? (
              <div
                key={i}
                className="flex w-full shrink-0 snap-center flex-col rounded-md bg-white p-7 shadow-xl shadow-brand-ink/10 sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]"
              >
                <Quote className="h-7 w-7 shrink-0 fill-brand-orange-dark text-brand-orange-dark" strokeWidth={0} />
                <p className="mt-4 flex-1 text-base font-medium leading-snug text-brand-ink">
                  {t.quote}
                </p>
                <p className="mt-8 text-sm font-semibold text-brand-ink">
                  {t.name} <span className="font-serif italic">{t.lastName}</span>
                </p>
                <p className="text-xs text-brand-ink/50">{t.detail}</p>
              </div>
            ) : (
              <div key={i} className="flex w-full shrink-0 snap-center flex-col px-1 py-4 sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]">
                <Quote className="h-6 w-6 shrink-0 fill-brand-orange-dark/70 text-brand-orange-dark/70" strokeWidth={0} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-ink/70">{t.quote}</p>
                <p className="mt-8 text-sm font-semibold text-brand-ink">
                  {t.name} <span className="font-serif italic">{t.lastName}</span>
                </p>
                <p className="text-xs text-brand-ink/40">{t.detail}</p>
              </div>
            )
          )}
        </div>
      </Container>
    </section>
  );
}
