"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="bg-surface-muted relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background Image with slow Ken Burns effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.06 }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80"
          alt="Khakim Interior Minimalist Design"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay gradient to ensure text readability */}
        <div className="from-black-soft/60 via-black-soft/20 absolute inset-0 bg-gradient-to-t to-transparent" />
      </motion.div>

      <Container className="relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32">
        <div className="max-w-3xl">
          <FadeIn delay={0.2} duration={1}>
            <h1 className="font-heading font-bold text-white-soft mb-6 text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
              Mendesain Ruang yang Bercerita Tentang Anda.
            </h1>
          </FadeIn>

          <FadeIn delay={0.4} duration={1}>
            <p className="text-white-soft/80 mb-10 max-w-xl text-lg font-light md:text-xl">
              Kami berspesialisasi dalam desain interior kustom premium,
              menciptakan lingkungan yang tenang, editorial, dan tak lekang oleh
              waktu.
            </p>
          </FadeIn>

          <FadeIn delay={0.6} duration={1}>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/portfolio"
                className="bg-white-soft text-foreground hover:bg-white-soft/90 px-8 py-4 text-sm font-medium tracking-widest uppercase transition-colors"
              >
                Lihat Portofolio
              </Link>
              <Link
                href="/contact"
                className="border-white-soft/30 text-white-soft hover:bg-white-soft hover:text-foreground border px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300"
              >
                Mari Berdiskusi
              </Link>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
