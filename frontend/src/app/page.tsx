import { Hero } from "@/components/home/Hero";
import { LifestyleBreak } from "@/components/home/LifestyleBreak";
import { CategoryExplore } from "@/components/home/CategoryExplore";
import { Commitment } from "@/components/home/Commitment";
import { Testimonials } from "@/components/home/Testimonials";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { BackgroundAudioPlayer } from "@/components/audio/BackgroundAudioPlayer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LifestyleBreak />
      <CategoryExplore />
      <Testimonials />
      <Commitment />
      <QuoteCTA />
      <BackgroundAudioPlayer />
    </>
  );
}
