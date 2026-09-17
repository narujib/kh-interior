import { ProjectForm } from "@/components/admin/project-form";
import { createProjectAction } from "@/lib/actions/admin-projects";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Proyek Baru | Admin",
  robots: "noindex, nofollow",
};

export default async function AdminPortfolioCreatePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="animate-fade-in max-w-3xl space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-medium">Buat Proyek Baru</h2>
        <p className="text-foreground-soft text-sm">
          Isi detail di bawah ini untuk menambahkan proyek baru ke portofolio
          Anda.
        </p>
      </div>

      <div className="bg-surface-muted border-border border p-6">
        <ProjectForm onSubmit={createProjectAction} />
      </div>
    </div>
  );
}
