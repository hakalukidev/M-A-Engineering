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

export default async function HomePage() {
  const [categories, settings, clientsSettings] = await Promise.all([
    getAllCategories(),
    getFooterSettings(),
    getClientsSettings(),
  ]);

  return (
    <>
      <Hero />
      <LifestyleBreak photos={clientsSettings.photos} seeClientsHref={clientsSettings.seeClientsHref} />
      <CategoryExplore categories={categories} />
      <Gallery categories={categories} />
      <Testimonials />
      <Commitment />
      <QuoteCTA phone={settings.phone} whatsapp={settings.whatsapp} />
      <BackgroundAudioPlayer />
    </>
  );
}
