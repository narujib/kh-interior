"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

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
  if (projects.length === 0) {
    return (
      <div className="border-border bg-surface-muted flex flex-col items-center justify-center border border-dashed p-12 text-center">
        <p className="text-foreground-soft mb-4">No projects found.</p>
        <Button asChild className="rounded-none">
          <Link href="/admin/portfolio/new">Create Project</Link>
        </Button>
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
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border h-8 w-8 rounded-none"
                  asChild
                >
                  <Link href={`/admin/portfolio/${project.id}/edit`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border h-8 w-8 rounded-none text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
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
