import { PageHeading } from "@/components/shared/page-heading";
import { SettingsForm } from "@/components/admin/settings-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Pengaturan Akun",
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-12">
      <PageHeading
        title="Pengaturan"
        subtitle="Kelola kredensial akses dasbor admin."
        align="left"
      />
      <SettingsForm initialUsername={session?.user?.name || ""} />
    </div>
  );
}
