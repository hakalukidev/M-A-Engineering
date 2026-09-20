import { getCommitmentSettings } from "@/lib/commitmentSettings";
import { CommitmentSettingsForm } from "@/components/admin/CommitmentSettingsForm";

export default async function AdminCommitmentSettingsPage() {
  const commitmentSettings = await getCommitmentSettings();

  return (
    <div>
      <h2 className="text-lg font-bold text-brand-ink">Our Commitment</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Controls the three-photo collage and the statement shown on the homepage.
      </p>
      <div className="mt-6">
        <CommitmentSettingsForm initial={commitmentSettings} />
      </div>
    </div>
  );
}
