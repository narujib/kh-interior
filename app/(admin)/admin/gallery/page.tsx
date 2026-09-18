import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { GalleryForm } from "@/components/admin/gallery-form";
import { GalleryGrid } from "@/components/admin/gallery-grid";

export const metadata = {
  title: "Galeri | Admin",
  robots: "noindex, nofollow",
};

export default async function AdminGalleryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-medium">Manajemen Galeri</h2>
        <p className="text-foreground-soft text-sm max-w-2xl">
          Tambahkan gambar baru ke galeri global atau hapus gambar yang sudah
          ada. Gunakan tombol <strong>"Tampilkan di Beranda"</strong> di bawah gambar untuk memajang gambar tersebut di halaman utama (maksimal 5 gambar unggulan).
        </p>
      </div>

      <div className="grid items-start gap-8 md:grid-cols-12">
        <div className="bg-surface-muted border-border sticky top-8 border p-6 md:col-span-4">
          <h3 className="font-heading mb-4 text-lg font-medium">
            Tambah Item Galeri
          </h3>
          <GalleryForm />
        </div>

        <div className="md:col-span-8">
          <GalleryGrid items={items} />
        </div>
      </div>
    </div>
  );
}
