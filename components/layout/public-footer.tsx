import Link from "next/link";
import { Container } from "@/components/shared/container";

export function PublicFooter() {
  return (
    <footer className="bg-surface-muted border-border border-t pt-16 pb-8 md:pt-24">
      <Container>
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-heading text-foreground mb-6 inline-block text-2xl tracking-wide uppercase"
            >
              Khakim Interior
            </Link>
            <p className="text-foreground-soft max-w-sm font-light">
              Menciptakan ruang yang tak lekang oleh waktu, minimalis, dan
              elegan yang disesuaikan dengan gaya hidup Anda.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-medium tracking-wider uppercase">
              Navigasi
            </h4>
            <ul className="text-foreground-soft space-y-4 font-light">
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-foreground transition-colors"
                >
                  Portofolio
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-foreground transition-colors"
                >
                  Layanan
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-foreground transition-colors"
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-medium tracking-wider uppercase">
              Terhubung
            </h4>
            <ul className="text-foreground-soft space-y-4 font-light">
              <li>
                <a
                  href="https://instagram.com/khakiminterior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@khakiminterior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/khakiminterior"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@khakiminterior.com"
                  className="hover:text-foreground transition-colors"
                >
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border/50 text-foreground-soft flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs font-light md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Khakim Interior. Seluruh hak cipta
            dilindungi.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="hover:text-foreground">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
