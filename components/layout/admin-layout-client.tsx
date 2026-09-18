"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Derive title from pathname
  let title = "Dashboard";
  if (pathname.includes("/admin/portfolio")) title = "Portfolio Management";
  if (pathname.includes("/admin/gallery")) title = "Gallery Management";
  if (pathname.includes("/admin/messages")) title = "Messages";

  return (
    <div className="bg-surface-muted flex min-h-screen">
      {/* Sidebar for desktop and mobile */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex min-h-screen flex-1 flex-col transition-all duration-300 lg:pl-64">
        <AdminHeader setSidebarOpen={setSidebarOpen} title={title} />

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
