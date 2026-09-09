import { getFooterSettings } from "@/lib/settings";
import { FooterSettingsForm } from "@/components/admin/FooterSettingsForm";

export default async function AdminFooterSettingsPage() {
  const footerSettings = await getFooterSettings();

  return (
    <div>
      <h2 className="text-lg font-bold text-brand-ink">Footer Settings</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Controls the company blurb, contact details, and social links shown in the site footer
        (and the phone/WhatsApp/Messenger used by the floating contact button and Contact page).
      </p>
      <div className="mt-6">
        <FooterSettingsForm initial={footerSettings} />
      </div>
    </div>
  );
}
