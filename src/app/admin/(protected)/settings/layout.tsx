import type { ReactNode } from "react";
import { SettingsTabs } from "@/components/admin/SettingsTabs";

export default function AdminSettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-ink">Settings</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Each section below controls a different part of the public site.
        </p>
      </div>
      <SettingsTabs />
      <div>{children}</div>
    </div>
  );
}
