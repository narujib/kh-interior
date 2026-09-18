import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { ImageReveal } from "@/components/shared/image-reveal";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="bg-background overflow-hidden py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="order-2 lg:order-1">
            <FadeIn>
              <div className="text-foreground-soft mb-8 flex items-center gap-4 text-xs tracking-widest uppercase sm:text-sm">
                <span className="font-medium">03</span>
                <span className="bg-border h-[1px] w-8" />
                <span>Studio Kami</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-heading mb-8 text-4xl leading-[1.1] font-normal sm:text-5xl lg:text-6xl">
                Filosofi Kemewahan yang Tenang.
              </h2>
            </FadeIn>

            <FadeIn delay={0.4} direction="left" className="space-y-6">
              <h3 className="font-heading text-2xl font-medium md:text-3xl">
                Filosofi Kami
              </h3>
              <p className="text-foreground-soft leading-relaxed">
                Kami percaya bahwa kemewahan sejati terletak pada kualitas
                perhatian terhadap setiap detail. Desain kami tidak berteriak;
                melainkan berbisik. Kami menciptakan ruang yang terasa begitu
                pas—di mana setiap elemen memiliki tujuan dan setiap material
                dipilih dengan niat yang jelas.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="text-foreground-soft mb-12 space-y-6 text-lg leading-relaxed font-light">
                <p>
                  Di Khakim Interior, kami percaya bahwa kemewahan sejati
                  terletak pada kesederhanaan, kesengajaan, dan perhatian yang
                  tak tergoyahkan terhadap detail. Ruang-ruang kami dirancang
                  untuk membangkitkan rasa tenang, memberikan tempat
                  perlindungan dari kebisingan dunia luar.
                </p>
                <p>
                  Melalui kurasi cermat terhadap material alami, tekstur yang
                  halus, serta pencahayaan yang mahir, kami merancang lingkungan
                  yang tidak hanya memukau secara visual, tetapi juga
                  beresonansi mendalam dengan mereka yang menghuninya.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Link
                href="/about"
                className="text-foreground hover:text-foreground-soft group border-foreground/30 hover:border-foreground inline-flex items-center gap-2 border-b pb-2 text-sm font-medium tracking-widest uppercase transition-colors"
              >
                Baca Kisah Kami
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>
          </div>

          <div className="relative order-1 h-[600px] w-full lg:order-2 lg:h-[800px]">
            <ImageReveal delay={0.2} className="h-full w-full">
              <Image
                src="/images/workshop.jpg"
                alt="Khakim Interior Studio Design Approach"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ImageReveal>

            {/* Decorative block */}
            <FadeIn
              delay={0.6}
              direction="left"
              className="bg-surface-muted absolute -bottom-8 -left-8 -z-10 hidden h-48 w-48 sm:block md:-bottom-12 md:-left-12 md:h-64 md:w-64"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
