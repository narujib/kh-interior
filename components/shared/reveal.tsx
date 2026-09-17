"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1], // Custom slow ease
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
