import Image from "next/image";
import { Award, ShieldCheck, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";

const FEATURES = [
  { icon: ShieldCheck, eyebrow: "Heavy-Gauge", label: "Stainless Steel" },
  { icon: Wrench, eyebrow: "Precision", label: "Engineering" },
  { icon: Award, eyebrow: "Built To", label: "Last" },
];

/**
 * Full-bleed photo card with an italic overlay statement, paired with a row
 * of icon feature cards beneath — visual breathing room after the product
 * carousel, and a chance to sell the build quality behind the catalog.
 * Rounded card + inset margin matches the Hero's photo treatment; the
 * feature row reuses ValueProps' pale-green pill styling.
 */
export function LifestyleBreak() {
  return (
    <section className="bg-brand-cream py-14 sm:py-20">
      <Container>
        <div className="relative min-h-[360px] w-full overflow-hidden rounded-md bg-brand-green-dark sm:min-h-[440px] sm:rounded-md">
          <Image
            src="/images/categories/commercial-kitchen-equipment/cover.jpg"
            alt="Stainless steel commercial kitchen equipment"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/90 via-brand-green-dark/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-8 sm:px-12 sm:pb-12">
            <p className="max-w-2xl text-xl leading-snug text-brand-cream sm:text-2xl">
              We build{" "}
              <span className="font-serif italic text-brand-orange">equipment</span> that
              holds up for years to come — through daily service and{" "}
              <span className="font-serif italic text-brand-orange">demanding shifts</span>.
              Every piece leaves our factory in{" "}
              <span className="font-serif italic text-brand-orange">
                heavy-gauge stainless steel
              </span>
              .
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, eyebrow, label }, index) => (
            <div
              key={label}
              className={`flex items-center gap-3 bg-brand-green/15 px-5 py-3.5 ${
                index === 1 ? "rounded-full" : "rounded-md"
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-cream text-brand-green-dark">
                <Icon size={16} strokeWidth={1.75} />
              </span>
              <p className="leading-tight">
                <span className="block font-serif italic text-sm text-brand-ink/70">{eyebrow}</span>
                <span className="block text-base font-semibold text-brand-ink">{label}</span>
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
