import { CTAButton } from "@/components/cta/CTAButton";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

/** Homepage hero — bold intro + primary CTA, per proposal 4.1. */
export function Hero() {
  return (
    <section className="border-b border-zinc-200 bg-brand-cream pb-14 pt-24 text-brand-ink">
      <Container className="flex flex-col items-start gap-6">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="max-w-xl text-lg text-brand-ink/70">{siteConfig.description}</p>
        <CTAButton />
      </Container>
    </section>
  );
}
