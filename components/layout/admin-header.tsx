"use client";

import { PanelLeft } from "lucide-react";

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  title?: string;
}

export function AdminHeader({ setSidebarOpen, title }: AdminHeaderProps) {
  return (
    <header className="bg-background border-border sticky top-0 z-40 flex h-16 w-full items-center justify-center border-b px-4 lg:px-8">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-foreground-soft hover:text-foreground mr-4 -ml-2 rounded-md p-2 transition-colors lg:hidden"
        >
          <PanelLeft className="h-5 w-5" />
        </button>

        {title && (
          <h1 className="font-heading truncate text-xl font-medium lg:text-2xl">
            {title}
          </h1>
        )}
      </div>
    </header>
  );
}
