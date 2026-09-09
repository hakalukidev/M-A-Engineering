import { getAboutSettings } from "@/lib/aboutSettings";
import { AboutSettingsForm } from "@/components/admin/AboutSettingsForm";

export default async function AdminAboutSettingsPage() {
  const aboutSettings = await getAboutSettings();

  return (
    <div>
      <h2 className="text-lg font-bold text-brand-ink">About Page</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Controls the photos and copy shown on the public About page.
      </p>
      <div className="mt-6">
        <AboutSettingsForm initial={aboutSettings} />
      </div>
    </div>
  );
}
