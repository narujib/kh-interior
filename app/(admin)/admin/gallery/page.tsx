import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { GalleryForm } from "@/components/admin/gallery-form";
import { GalleryGrid } from "@/components/admin/gallery-grid";

export const metadata = {
  title: "Gallery | Admin",
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
    <div className="animate-fade-in max-w-5xl space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-medium">
          Gallery Management
        </h2>
        <p className="text-foreground-soft text-sm">
          Add new images to the global gallery or remove existing ones.
        </p>
      </div>

      <div className="grid items-start gap-8 md:grid-cols-12">
        <div className="bg-surface-muted border-border sticky top-8 border p-6 md:col-span-4">
          <h3 className="font-heading mb-4 text-lg font-medium">
            Add Gallery Item
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
