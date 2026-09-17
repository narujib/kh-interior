import { ProjectForm } from "@/components/admin/project-form";
import { createProjectAction } from "@/lib/actions/admin-projects";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "New Project | Admin",
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
        <h2 className="font-heading text-2xl font-medium">
          Create New Project
        </h2>
        <p className="text-foreground-soft text-sm">
          Fill out the details below to add a new project to your portfolio.
        </p>
      </div>

      <div className="bg-surface-muted border-border border p-6">
        <ProjectForm onSubmit={createProjectAction} />
      </div>
    </div>
  );
}
