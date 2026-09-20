import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { LifestyleBreak } from "@/components/home/LifestyleBreak";
import { Commitment } from "@/components/home/Commitment";
import { QuoteCTA } from "@/components/home/QuoteCTA";
import { BackgroundAudioPlayer } from "@/components/audio/BackgroundAudioPlayer";
import { getAllCategories } from "@/data/categories";
import { getFooterSettings } from "@/lib/settings";
import { getClientsSettings } from "@/lib/clientsSettings";
import { getCommitmentSettings } from "@/lib/commitmentSettings";

export default async function HomePage() {
  const [categories, settings, clientsSettings, commitmentSettings] = await Promise.all([
    getAllCategories(),
    getFooterSettings(),
    getClientsSettings(),
    getCommitmentSettings(),
  ]);

  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryShowcase categories={categories} />
      <LifestyleBreak photos={clientsSettings.photos} />
      <Commitment {...commitmentSettings} />
      <QuoteCTA phone={settings.phone} whatsapp={settings.whatsapp} />
      <BackgroundAudioPlayer />
    </>
  );
}
