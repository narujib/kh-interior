import Link from "next/link";
import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Container className="text-center flex flex-col items-center">
        <PageHeading
          title="404"
          subtitle="Halaman yang Anda cari tidak dapat ditemukan."
          align="center"
        />
        <div className="mt-12">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-foreground text-background text-sm tracking-widest uppercase font-medium hover:bg-foreground-soft transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </Container>
    </div>
  );
}
