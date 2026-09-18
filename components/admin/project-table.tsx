"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ProjectSummary = {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  isFeatured: boolean;
};

interface ProjectTableProps {
  projects: ProjectSummary[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Apakah Anda yakin ingin menghapus proyek ini? Ini juga akan menghapus semua gambar proyek yang terkait."
      )
    )
      return;

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus proyek");

      toast.success("Proyek berhasil dihapus");
      router.refresh();
    } catch {
      toast.error("Gagal menghapus proyek");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleToggleFeatured = async (id: string, isCurrentlyFeatured: boolean) => {
    setIsToggling(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}/featured`, {
        method: "PATCH",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengubah status");
      }

      toast.success(
        isCurrentlyFeatured
          ? "Proyek dihapus dari Beranda"
          : "Proyek ditampilkan di Beranda"
      );
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal mengubah status");
    } finally {
      setIsToggling(null);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="border-border bg-surface-muted flex flex-col items-center justify-center border border-dashed p-12 text-center">
        <p className="text-foreground-soft mb-4">
          Tidak ada proyek yang ditemukan.
        </p>
        <Link
          href="/admin/portfolio/new"
          className={buttonVariants({ className: "rounded-none" })}
        >
          Buat Proyek
        </Link>
      </div>
    );
  }

  return (
    <div className="border-border border">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-muted hover:bg-surface-muted">
            <TableHead className="font-heading text-foreground-soft text-xs tracking-widest uppercase">
              Judul
            </TableHead>
            <TableHead className="font-heading text-foreground-soft text-xs tracking-widest uppercase">
              Klien
            </TableHead>
            <TableHead className="font-heading text-foreground-soft text-right text-xs tracking-widest uppercase">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell>{project.clientName}</TableCell>
              <TableCell className="space-x-2 text-right">
                <Button
                  variant={project.isFeatured ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggleFeatured(project.id, project.isFeatured)}
                  disabled={isToggling === project.id}
                  className={`border-border h-8 rounded-none px-3 text-xs tracking-widest uppercase ${
                    project.isFeatured ? "bg-foreground text-white-soft hover:bg-foreground-soft" : ""
                  }`}
                >
                  {isToggling === project.id ? (
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  ) : null}
                  {project.isFeatured ? "Beranda" : "Set Beranda"}
                </Button>
                <Link
                  href={`/admin/portfolio/${project.id}/edit`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                    className: "border-border h-8 w-8 rounded-none",
                  })}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(project.id)}
                  disabled={isDeleting === project.id}
                  className="border-border h-8 w-8 rounded-none text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  {isDeleting === project.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  <span className="sr-only">Hapus</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
