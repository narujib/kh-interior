import { PageHeading } from "@/components/shared/page-heading";
import { SettingsForm } from "@/components/admin/settings-form";

export const metadata = {
  title: "Pengaturan Akun",
};

export default function SettingsPage() {
  return (
    <div className="space-y-12">
      <PageHeading
        title="Pengaturan"
        subtitle="Kelola kredensial akses dasbor admin."
        align="left"
      />
      <SettingsForm />
    </div>
  );
}
