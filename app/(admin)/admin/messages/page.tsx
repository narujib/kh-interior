import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { MessageTable } from "@/components/admin/message-table";

export const metadata = {
  title: "Pesan | Admin",
  robots: "noindex, nofollow",
};

export default async function AdminMessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl font-medium">Pesan</h2>
        <p className="text-foreground-soft text-sm">
          Kelola pengiriman pesan formulir kontak.
        </p>
      </div>

      <MessageTable messages={messages} />
    </div>
  );
}
