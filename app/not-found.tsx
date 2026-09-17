import Link from "next/link";
import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <Container className="flex flex-col items-center text-center">
        <PageHeading
          title="404"
          subtitle="Halaman yang Anda cari tidak dapat ditemukan."
          align="center"
        />
        <div className="mt-12">
          <Link
            href="/"
            className="bg-foreground text-background hover:bg-foreground-soft inline-block px-8 py-3 text-sm font-medium tracking-widest uppercase transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </Container>
    </div>
  );
}
