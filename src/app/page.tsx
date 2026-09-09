import { Hero } from "@/components/home/Hero";
import { LifestyleBreak } from "@/components/home/LifestyleBreak";
import { CategoryExplore } from "@/components/home/CategoryExplore";
import { Gallery } from "@/components/home/Gallery";
import { Testimonials } from "@/components/home/Testimonials";
import { Commitment } from "@/components/home/Commitment";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { BackgroundAudioPlayer } from "@/components/audio/BackgroundAudioPlayer";
import { getAllCategories } from "@/data/categories";
import { getFooterSettings } from "@/lib/settings";
import { getClientsSettings } from "@/lib/clientsSettings";
import { getCategoriesExploreSettings } from "@/lib/categoriesExploreSettings";

export default async function HomePage() {
  const [categories, settings, clientsSettings, categoriesExploreSettings] = await Promise.all([
    getAllCategories(),
    getFooterSettings(),
    getClientsSettings(),
    getCategoriesExploreSettings(),
  ]);

  return (
    <>
      <Hero />
      <LifestyleBreak photos={clientsSettings.photos} seeClientsHref={clientsSettings.seeClientsHref} />
      <CategoryExplore categories={categories} picks={categoriesExploreSettings.picks} />
      <Gallery categories={categories} />
      <Testimonials />
      <Commitment />
      <QuoteCTA phone={settings.phone} whatsapp={settings.whatsapp} />
      <BackgroundAudioPlayer />
    </>
  );
}
