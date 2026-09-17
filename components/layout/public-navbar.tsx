"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/shared/container";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const links = [
  { href: "/portfolio", label: "Portofolio" },
  { href: "/services", label: "Layanan" },
  { href: "/gallery", label: "Galeri" },
  { href: "/about", label: "Tentang Kami" },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
        <Link
          href="/"
          className="font-heading text-foreground relative z-50 text-xl tracking-wide uppercase sm:text-2xl"
        >
          Khakim Interior
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide uppercase transition-colors",
                pathname === link.href
                  ? "text-foreground"
                  : "text-foreground-soft hover:text-foreground"
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

        {/* Mobile Navigation */}
        <MobileMenu />
      </Container>
    </header>
  );
}
