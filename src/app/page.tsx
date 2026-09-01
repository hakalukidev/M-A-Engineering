import { Hero } from "@/components/home/Hero";
import { LifestyleBreak } from "@/components/home/LifestyleBreak";
import { CategoryExplore } from "@/components/home/CategoryExplore";
import { Gallery } from "@/components/home/Gallery";
import { Testimonials } from "@/components/home/Testimonials";
import { Commitment } from "@/components/home/Commitment";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { BackgroundAudioPlayer } from "@/components/audio/BackgroundAudioPlayer";
import { getAllCategories } from "@/data/categories";

export default async function HomePage() {
  const categories = await getAllCategories();

  return (
    <>
      <Hero />
      <LifestyleBreak />
      <CategoryExplore categories={categories} />
      <Gallery categories={categories} />
      <Testimonials />
      <Commitment />
      <QuoteCTA />
      <BackgroundAudioPlayer />
    </>
  );
}
