import { getFooterSettings } from "@/lib/settings";
import { FooterSettingsForm } from "@/components/admin/FooterSettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getFooterSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-ink">Footer Settings</h1>
      <p className="mt-1 text-sm text-brand-muted">
        Controls the company blurb, contact details, and social links shown in the site footer.
      </p>
      <div className="mt-6">
        <FooterSettingsForm initial={settings} />
      </div>
    </div>
  );
}
