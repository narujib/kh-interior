"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/shared/container";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "Studio" },
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
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-xl sm:text-2xl tracking-wide uppercase text-foreground z-50 relative"
        >
          Khakim Interior
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide transition-colors font-medium uppercase",
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
            className="ml-4 px-6 py-2 bg-foreground text-background text-sm font-medium uppercase tracking-wider hover:bg-foreground-soft transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <MobileMenu />
      </Container>
    </header>
  );
}
