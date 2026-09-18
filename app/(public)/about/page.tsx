import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { FadeIn } from "@/components/shared/fade-in";
import { ImageReveal } from "@/components/shared/image-reveal";
import { ContactCTA } from "@/components/sections/contact-cta";
import Image from "next/image";

export const metadata = {
  title: "Tentang Kami | Khakim Interior",
  description:
    "Pelajari filosofi desain, proses, dan komitmen Khakim Interior terhadap kemewahan yang tenang.",
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-background pt-32 pb-24 md:pt-48 md:pb-32">
        <Container>
          <PageHeading
            title="Studio Kami"
            subtitle="Menciptakan ruang yang melampaui tren sesaat, berfokus pada material, cahaya, dan proporsi."
            align="left"
          />
        </Container>
      </div>

      <section className="bg-background pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
            <div className="relative h-[50vh] min-h-[400px] lg:col-span-5 lg:h-auto lg:min-h-[700px]">
              <ImageReveal className="h-full w-full">
                <Image
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80"
                  alt="Khakim Interior Studio Details"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </ImageReveal>
            </div>

            <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
              <FadeIn delay={0.1}>
                <h2 className="font-heading mb-8 text-3xl leading-[1.1] md:text-5xl">
                  Filosofi Desain
                </h2>
              </FadeIn>

              <div className="text-foreground-soft mb-12 space-y-6 text-lg leading-relaxed font-light">
                <FadeIn delay={0.2}>
                  <p>
                    Dibangun di atas prinsip kemewahan yang tenang dan desain
                    yang bertujuan, Khakim Interior adalah studio butik yang
                    berspesialisasi dalam ruang hunian dan komersial kelas atas.
                    Kami percaya bahwa kemewahan sejati tidak ditentukan oleh
                    kemegahan yang berlebihan, melainkan oleh kurasi cermat
                    terhadap material, cahaya, dan bentuk.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p>
                    Pendekatan kami sangat berdasar pada konteks. Sebelum kami
                    menarik satu garis pun atau memilih material, kami berusaha
                    untuk memahami secara mendalam arsitektur ruang, nuansa
                    cahaya alami sepanjang hari, dan yang terpenting, gaya hidup
                    serta visi dari klien kami.
                  </p>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p>
                    Kami bertindak sebagai desainer sekaligus editor—menyaring
                    elemen ruang hingga ke bagian yang paling esensial untuk
                    menciptakan lingkungan yang terasa tenang, canggih, dan
                    elegan tanpa lekang oleh waktu.
                  </p>
                </FadeIn>
              </div>

              <FadeIn delay={0.5} className="mt-8">
                <div className="border-border grid grid-cols-2 gap-8 border-t pt-8">
                  <div>
                    <h3 className="font-heading text-foreground mb-2 text-3xl md:text-4xl">
                      15+
                    </h3>
                    <p className="text-foreground-soft text-xs tracking-widest uppercase">
                      Tahun Pengalaman
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-foreground mb-2 text-3xl md:text-4xl">
                      50+
                    </h3>
                    <p className="text-foreground-soft text-xs tracking-widest uppercase">
                      Proyek Selesai
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Manifesto Section */}
      <section className="bg-surface-muted py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <FadeIn>
              <div className="text-foreground-soft mb-12 flex items-center justify-center gap-4 text-xs tracking-widest uppercase">
                <span className="bg-border h-[1px] w-8" />
                <span>Prinsip Kami</span>
                <span className="bg-border h-[1px] w-8" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-heading text-foreground text-3xl leading-relaxed font-normal italic sm:text-4xl md:text-5xl">
                &quot;Kami tidak hanya mendekorasi ruangan; kami memahat
                lingkungan yang meningkatkan pengalaman manusia
                sehari-hari.&quot;
              </h2>
            </FadeIn>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
