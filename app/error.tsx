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
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <Container className="flex flex-col items-center text-center">
        <PageHeading
          title="Terjadi Kesalahan"
          subtitle="Maaf, ada masalah saat memuat halaman ini."
          align="center"
        />
        <div className="mt-12">
          <button
            onClick={() => reset()}
            className="bg-foreground text-background hover:bg-foreground-soft inline-block px-8 py-3 text-sm font-medium tracking-widest uppercase transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </Container>
    </div>
  );
}
