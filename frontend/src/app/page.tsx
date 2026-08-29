import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { LifestyleBreak } from "@/components/home/LifestyleBreak";
import { Gallery } from "@/components/home/Gallery";
import { Commitment } from "@/components/home/Commitment";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CategoryHighlight } from "@/components/home/CategoryHighlight";
import { Testimonials } from "@/components/home/Testimonials";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { BackgroundAudioPlayer } from "@/components/audio/BackgroundAudioPlayer";
import { getCategoryBySlug } from "@/data/categories";

export default function HomePage() {
  const commercialKitchen = getCategoryBySlug("commercial-kitchen-equipment");
  const bakery = getCategoryBySlug("bakery-equipment");

  return (
    <>
      <Hero />
      <ValueProps />
      <LifestyleBreak />
      <Gallery />
      <Commitment />
      <CategoryGrid />
      {commercialKitchen && <CategoryHighlight category={commercialKitchen} />}
      {bakery && <CategoryHighlight category={bakery} reverse />}
      <QuoteCTA />
      <Testimonials />
      <BackgroundAudioPlayer />
    </>
  );
}
