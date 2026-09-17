import { getDashboardStats, getRecentMessages } from "@/lib/data/admin";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { RecentMessages } from "@/components/admin/recent-messages";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Dasbor Admin | Khakim Interior",
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

      <div className="grid gap-8 md:grid-cols-2">
        <Suspense
          fallback={<Skeleton className="h-[400px] w-full rounded-none" />}
        >
          <RecentMessages messages={messages} />
        </Suspense>
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
