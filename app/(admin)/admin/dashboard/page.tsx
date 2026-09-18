import { getDashboardStats, getRecentMessages } from "@/lib/data/admin";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { RecentMessages } from "@/components/admin/recent-messages";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  PlusCircle,
  FolderOpen,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Dasbor Admin",
  robots: "noindex, nofollow",
};

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch data in parallel
  const [stats, messages] = await Promise.all([
    getDashboardStats(),
    getRecentMessages(5),
  ]);

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-medium">Ringkasan</h2>
        <p className="text-foreground-soft text-sm">
          Selamat datang kembali di dasbor administrasi Khakim Interior.
        </p>
      </div>

      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats
          totalProjects={stats.totalProjects}
          totalGalleryItems={stats.totalGalleryItems}
          unreadMessages={stats.unreadMessages}
          latestProjectTitle={stats.latestProjectTitle}
        />
      </Suspense>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Suspense
            fallback={<Skeleton className="h-[400px] w-full rounded-none" />}
          >
            <RecentMessages messages={messages} />
          </Suspense>
        </div>
        <div className="md:col-span-1">
          <DashboardQuickActions />
        </div>
      </div>
    </div>
  );
}

function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-28 w-full rounded-none" />
      ))}
    </div>
  );
}

function DashboardQuickActions() {
  return (
    <Card className="border-border rounded-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="font-heading text-lg font-medium">
          Tindakan Cepat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Link
          href="/admin/portfolio/new"
          className="border-border bg-surface-muted hover:bg-surface-muted/80 group flex items-center justify-between border p-4 transition-colors"
        >
          <div className="flex items-center gap-3">
            <PlusCircle className="text-foreground-soft h-5 w-5" />
            <span className="text-sm font-medium">Tambah Proyek</span>
          </div>
          <ArrowRight className="text-foreground-soft h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </Link>

        <Link
          href="/admin/portfolio"
          className="border-border bg-surface-muted hover:bg-surface-muted/80 group flex items-center justify-between border p-4 transition-colors"
        >
          <div className="flex items-center gap-3">
            <FolderOpen className="text-foreground-soft h-5 w-5" />
            <span className="text-sm font-medium">Kelola Portofolio</span>
          </div>
          <ArrowRight className="text-foreground-soft h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </Link>

        <Link
          href="/admin/gallery"
          className="border-border bg-surface-muted hover:bg-surface-muted/80 group flex items-center justify-between border p-4 transition-colors"
        >
          <div className="flex items-center gap-3">
            <ImageIcon className="text-foreground-soft h-5 w-5" />
            <span className="text-sm font-medium">Kelola Galeri</span>
          </div>
          <ArrowRight className="text-foreground-soft h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </Link>
      </CardContent>
    </Card>
  );
}
