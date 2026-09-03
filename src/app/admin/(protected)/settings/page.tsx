import { getFooterSettings } from "@/lib/settings";
import { getAboutSettings } from "@/lib/aboutSettings";
import { FooterSettingsForm } from "@/components/admin/FooterSettingsForm";
import { AboutSettingsForm } from "@/components/admin/AboutSettingsForm";

export default async function AdminSettingsPage() {
  const [footerSettings, aboutSettings] = await Promise.all([getFooterSettings(), getAboutSettings()]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-brand-ink">Footer Settings</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Controls the company blurb, contact details, and social links shown in the site footer
          (and the phone/WhatsApp/Messenger used by the floating contact button and Contact page).
        </p>
        <div className="mt-6">
          <FooterSettingsForm initial={footerSettings} />
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-brand-ink">About Page</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Controls the photos and copy shown on the public About page.
        </p>
        <div className="mt-6">
          <AboutSettingsForm initial={aboutSettings} />
        </div>
      </div>
    </div>
  );
}
