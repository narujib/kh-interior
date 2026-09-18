import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { FloatingWhatsApp } from "@/components/shared/floating-wa";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background selection:bg-foreground selection:text-background flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <PublicFooter />
      <FloatingWhatsApp />
    </div>
  );
}
