import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="About us" title={siteConfig.name} className="mb-6" />
      <p className="max-w-2xl text-zinc-600">
        {/* TODO: replace with the Client's company profile (proposal section 9). */}
        Company profile content goes here — history, expertise, and what sets the
        company apart in the machinery industry.
      </p>
    </Container>
  );
}
