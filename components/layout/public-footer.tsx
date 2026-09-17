import Link from "next/link";
import { Container } from "@/components/shared/container";

export function PublicFooter() {
  return (
    <footer className="bg-surface-muted pt-16 pb-8 md:pt-24 border-t border-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-heading text-2xl tracking-wide uppercase text-foreground mb-6 inline-block"
            >
              Khakim Interior
            </Link>
            <p className="text-foreground-soft font-light max-w-sm">
              Creating timeless, minimal, and sophisticated spaces tailored to your lifestyle.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium uppercase tracking-wider text-sm mb-6">Navigation</h4>
            <ul className="space-y-4 font-light text-foreground-soft">
              <li>
                <Link href="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-foreground transition-colors">Gallery</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">Studio</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium uppercase tracking-wider text-sm mb-6">Connect</h4>
            <ul className="space-y-4 font-light text-foreground-soft">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
              </li>
              <li>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Pinterest</a>
              </li>
              <li>
                <a href="mailto:hello@khakiminterior.com" className="hover:text-foreground transition-colors">Email Us</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 text-xs text-foreground-soft font-light gap-4">
          <p>&copy; {new Date().getFullYear()} Khakim Interior. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
