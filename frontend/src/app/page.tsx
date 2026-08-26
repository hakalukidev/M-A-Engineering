import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { InquiryPopup } from "@/components/cta/InquiryPopup";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <InquiryPopup
        config={{
          id: "home-delay-popup",
          title: "Need a quote?",
          message: "Tell us what machine you're looking for and we'll get back to you fast.",
          trigger: "delay",
          triggerValue: 10000,
          cta: { label: "Get a Quote", action: "quote", href: "/contact" },
        }}
      />
    </>
  );
}
