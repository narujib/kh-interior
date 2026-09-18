"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  FolderOpen,
  MessageSquare,
  LogOut,
  PanelLeftClose,
  Settings,
} from "lucide-react";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portofolio", icon: FolderOpen },
  { href: "/admin/gallery", label: "Galeri", icon: ImageIcon },
  { href: "/admin/messages", label: "Pesan", icon: MessageSquare },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`bg-background border-border fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col border-r transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="border-border flex h-16 items-center justify-between border-b px-6">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/images/khakim-interior.png"
            alt="Khakim Interior Logo"
            width={120}
            height={30}
            className="h-8 w-auto"
            style={{ width: "auto" }}
            priority
          />
          <span className="font-heading text-xl">Khakim Interior</span>
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="text-foreground-soft hover:text-foreground lg:hidden"
        >
          <PanelLeftClose className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-6">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${
                isActive
                  ? "bg-foreground text-white-soft"
                  : "text-foreground-soft hover:bg-surface-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-border border-t p-4">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
}
