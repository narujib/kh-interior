import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";

const TESTIMONIALS = [
  {
    quote:
      "Khakim Interior mengubah ruang kami menjadi tempat perlindungan yang tenang. Perhatian mereka terhadap detail dan pemahaman akan material tidak tertandingi. Setiap sudut terasa begitu berarti.",
    author: "Sarah J.",
    role: "Klien Hunian Pribadi",
  },
  {
    quote:
      "Bekerja sama dengan mereka merupakan pengalaman yang mulus. Mereka menghargai visi kami sekaligus menyempurnakannya dengan estetika kemewahan yang tenang khas mereka. Sangat direkomendasikan.",
    author: "David M.",
    role: "Pemilik Hotel Butik",
  },
];

export function Testimonials() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <div className="mb-16 flex flex-col items-center text-center md:mb-24">
          <FadeIn>
            <div className="text-foreground-soft mb-8 flex items-center gap-4 text-xs tracking-widest uppercase sm:text-sm">
              <span className="bg-border h-[1px] w-8" />
              <span>Suara Klien</span>
              <span className="bg-border h-[1px] w-8" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl leading-[1.1] font-normal sm:text-5xl">
              Kata Klien Kami.
            </h2>
          </FadeIn>
        </div>

        <StaggerContainer className="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <StaggerItem key={index} className="flex flex-col text-center">
              <p className="font-heading text-foreground mb-8 flex-1 text-xl leading-relaxed font-light italic md:text-2xl">
                &quot;{testimonial.quote}&quot;
              </p>
              <div>
                <p className="text-foreground mb-1 text-sm font-medium tracking-widest uppercase">
                  {testimonial.author}
                </p>
                <p className="text-foreground-soft text-xs tracking-widest uppercase">
                  {testimonial.role}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
