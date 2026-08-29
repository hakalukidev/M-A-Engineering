import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Gallery } from "@/components/home/Gallery";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CategoryHighlight } from "@/components/home/CategoryHighlight";
import { SubcategoryCloud } from "@/components/home/SubcategoryCloud";
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
      <FeaturedProducts />
      <Gallery />
      <CategoryGrid />
      {commercialKitchen && <CategoryHighlight category={commercialKitchen} />}
      {bakery && <CategoryHighlight category={bakery} reverse />}
      <SubcategoryCloud />
      <QuoteCTA />
      <Testimonials />
      <BackgroundAudioPlayer />
    </>
  );
}
