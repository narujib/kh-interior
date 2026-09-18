"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/shared/container";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";

const links = [
  { href: "/portfolio", label: "Portofolio" },
  { href: "/services", label: "Layanan" },
  { href: "/gallery", label: "Galeri" },
  { href: "/about", label: "Tentang Kami" },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-40 transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-background/80 border-border border-b py-4 backdrop-blur-md"
            : "bg-transparent py-6"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <Image
              src="/images/khakim-interior.png"
              alt="Khakim Interior Logo"
              width={160}
              height={40}
              className="h-10 w-auto md:h-12"
              style={{ width: "auto" }}
              priority
            />
            <span className="font-heading text-foreground text-xl tracking-wide uppercase sm:text-2xl">
              Khakim Interior
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-sm font-medium tracking-wide uppercase transition-colors",
                  "after:bg-foreground after:absolute after:bottom-0 after:left-0 after:h-[1px] after:transition-all after:duration-300",
                  pathname === link.href
                    ? "text-foreground after:w-full"
                    : "text-foreground-soft hover:text-foreground after:w-0 hover:after:w-full"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-foreground text-background hover:bg-foreground-soft ml-4 px-6 py-2 text-sm font-medium tracking-wider uppercase transition-colors"
            >
              Kontak
            </Link>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-foreground hover:text-foreground-soft -mr-2 p-2 transition-colors md:hidden"
            aria-label="Open menu"
          >
            <Menu strokeWidth={1.5} className="h-6 w-6" />
          </button>
        </Container>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
}
