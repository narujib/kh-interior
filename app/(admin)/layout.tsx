import { AdminLayoutClient } from "@/components/layout/admin-layout-client";

export const metadata = {
  title: "Admin Dashboard | Khakim Interior",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We'll rely on NextAuth middleware or page-level protection
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
