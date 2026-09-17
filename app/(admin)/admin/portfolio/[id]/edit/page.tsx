import { ProjectForm } from "@/components/admin/project-form";
import { ImageSorter } from "@/components/admin/image-sorter";
import { updateProjectAction } from "@/lib/actions/admin-projects";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Edit Proyek | Admin",
  robots: "noindex, nofollow",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { orderIndex: "asc" },
      },
    },
  });

  if (!project) {
    notFound();
  }

  // Pre-bind the action with the project ID
  const updateAction = updateProjectAction.bind(null, project.id);

  return (
    <div className="animate-fade-in max-w-4xl space-y-12">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-medium">Edit Proyek</h2>
        <p className="text-foreground-soft text-sm">
          Perbarui detail proyek atau kelola gambar galeri.
        </p>
      </div>

      <div className="bg-surface-muted border-border border p-6">
        <h3 className="font-heading mb-6 text-xl font-medium">
          Informasi Dasar
        </h3>
        <ProjectForm initialData={project} onSubmit={updateAction} />
      </div>

      <div className="bg-surface-muted border-border border p-6">
        <ImageSorter projectId={project.id} initialImages={project.images} />
      </div>
    </div>
  );
}
