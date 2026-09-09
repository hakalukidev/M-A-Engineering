import { getClientsSettings } from "@/lib/clientsSettings";
import { ClientsSettingsForm } from "@/components/admin/ClientsSettingsForm";

export default async function AdminClientsSettingsPage() {
  const clientsSettings = await getClientsSettings();

  return (
    <div>
      <h2 className="text-lg font-bold text-brand-ink">Happy Clients</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Controls the row of client handover photos shown near the top of the homepage.
      </p>
      <div className="mt-6">
        <ClientsSettingsForm initial={clientsSettings} />
      </div>
    </div>
  );
}
