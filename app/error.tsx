"use client";

import { useEffect } from "react";
import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Container className="text-center flex flex-col items-center">
        <PageHeading
          title="Terjadi Kesalahan"
          subtitle="Maaf, ada masalah saat memuat halaman ini."
          align="center"
        />
        <div className="mt-12">
          <button
            onClick={() => reset()}
            className="inline-block px-8 py-3 bg-foreground text-background text-sm tracking-widest uppercase font-medium hover:bg-foreground-soft transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </Container>
    </div>
  );
}
