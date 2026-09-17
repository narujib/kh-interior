import { getProjects } from "@/lib/data/projects";
import { ProjectTable } from "@/components/admin/project-table";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Manajemen Portofolio | Admin",
  robots: "noindex, nofollow",
};

export default async function AdminPortfolioPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const projects = await getProjects();

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-heading text-2xl font-medium">
            Proyek Portofolio
          </h2>
          <p className="text-foreground-soft text-sm">
            Kelola portofolio proyek dan studi kasus Anda.
          </p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className={buttonVariants({ className: "rounded-none" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Proyek Baru
        </Link>
      </div>

      <ProjectTable projects={projects} />
    </div>
  );
}
