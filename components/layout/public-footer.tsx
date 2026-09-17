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
              Creating timeless, minimal, and sophisticated spaces tailored to
              your lifestyle.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-medium tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="text-foreground-soft space-y-4 font-light">
              <li>
                <Link
                  href="/portfolio"
                  className="hover:text-foreground transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-foreground transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-foreground transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-medium tracking-wider uppercase">
              Connect
            </h4>
            <ul className="text-foreground-soft space-y-4 font-light">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Pinterest
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@khakiminterior.com"
                  className="hover:text-foreground transition-colors"
                >
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border/50 text-foreground-soft flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs font-light md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Khakim Interior. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
