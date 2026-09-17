"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-foreground hover:text-foreground-soft -mr-2 p-2 transition-colors md:hidden"
        aria-label="Open menu"
      >
        <Menu strokeWidth={1.5} className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background/95 fixed inset-0 z-50 flex flex-col backdrop-blur-md"
          >
            <div className="border-border/50 flex items-center justify-between border-b px-5 py-6 sm:px-8">
              <Link
                href="/"
                className="font-heading text-foreground text-2xl tracking-wide uppercase"
                onClick={() => setIsOpen(false)}
              >
                Khakim Interior
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground hover:text-foreground-soft -mr-2 p-2 transition-colors"
                aria-label="Close menu"
              >
                <X strokeWidth={1.5} className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-heading text-3xl transition-colors sm:text-4xl ${
                      pathname === link.href
                        ? "text-foreground"
                        : "text-foreground-soft hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-foreground-soft border-border/50 border-t py-8 text-center text-sm font-light">
              Jakarta, Indonesia
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
