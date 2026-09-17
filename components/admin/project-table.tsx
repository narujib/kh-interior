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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ProjectSummary = {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  completionDate: Date;
};

interface ProjectTableProps {
  projects: ProjectSummary[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this project? This will also delete all associated project images."
      )
    )
      return;

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete project");

      toast.success("Project deleted successfully");
      router.refresh();
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(null);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="border-border bg-surface-muted flex flex-col items-center justify-center border border-dashed p-12 text-center">
        <p className="text-foreground-soft mb-4">No projects found.</p>
        <Link
          href="/admin/portfolio/new"
          className={buttonVariants({ className: "rounded-none" })}
        >
          Create Project
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
              Title
            </TableHead>
            <TableHead className="font-heading text-foreground-soft text-xs tracking-widest uppercase">
              Client
            </TableHead>
            <TableHead className="font-heading text-foreground-soft text-xs tracking-widest uppercase">
              Completion Date
            </TableHead>
            <TableHead className="font-heading text-foreground-soft text-right text-xs tracking-widest uppercase">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell>{project.clientName}</TableCell>
              <TableCell>
                {format(new Date(project.completionDate), "MMM yyyy")}
              </TableCell>
              <TableCell className="space-x-2 text-right">
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
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
