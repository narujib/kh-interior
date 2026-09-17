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

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
        className="md:hidden p-2 -mr-2 text-foreground hover:text-foreground-soft transition-colors"
        aria-label="Open menu"
      >
        <Menu strokeWidth={1.5} className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md"
          >
            <div className="flex items-center justify-between px-5 sm:px-8 py-6 border-b border-border/50">
              <Link
                href="/"
                className="font-heading text-2xl tracking-wide uppercase text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Khakim Interior
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 text-foreground hover:text-foreground-soft transition-colors"
                aria-label="Close menu"
              >
                <X strokeWidth={1.5} className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-8 px-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`font-heading text-3xl sm:text-4xl transition-colors ${
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
            
            <div className="py-8 text-center text-sm text-foreground-soft font-light border-t border-border/50">
              Jakarta, Indonesia
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
