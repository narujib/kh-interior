import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="bg-foreground text-white-soft py-32 md:py-48">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <FadeIn>
            <h2 className="font-heading mb-8 text-4xl leading-[1.1] font-normal sm:text-5xl md:text-7xl">
              Siap Mewujudkan Ruang Impian Anda?
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-white-soft/80 mb-12 text-lg font-light md:text-xl">
              Mari berdiskusi tentang bagaimana kami dapat menghidupkan visi
              Anda melalui desain yang cermat dan penuh perhitungan.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Link
              href="/contact"
              className="bg-white-soft text-foreground hover:bg-surface-muted group inline-flex items-center gap-4 px-8 py-5 text-sm font-medium tracking-widest uppercase transition-colors"
            >
              Mulai Konsultasi
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
