import { Hero } from "@/components/home/Hero";
import { LifestyleBreak } from "@/components/home/LifestyleBreak";
import { CategoryExplore } from "@/components/home/CategoryExplore";
import { Gallery } from "@/components/home/Gallery";
import { Testimonials } from "@/components/home/Testimonials";
import { Commitment } from "@/components/home/Commitment";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { BackgroundAudioPlayer } from "@/components/audio/BackgroundAudioPlayer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LifestyleBreak />
      <CategoryExplore />
      <Gallery />
      <Testimonials />
      <Commitment />
      <QuoteCTA />
      <BackgroundAudioPlayer />
    </>
  );
}
