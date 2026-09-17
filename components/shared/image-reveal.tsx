"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* The masking block that slides away */}
      <motion.div
        className="absolute inset-0 z-10 bg-background"
        initial={{ y: 0 }}
        whileInView={{ y: "100%" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 1,
          ease: [0.7, 0, 0.3, 1], // very smooth reveal
          delay,
        }}
      />
      
      {/* The actual image container that scales slightly down while revealing */}
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          duration: 1.2,
          ease: [0.33, 1, 0.68, 1],
          delay,
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
