import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { FadeIn } from "@/components/shared/fade-in";
import { ImageReveal } from "@/components/shared/image-reveal";
import { ContactCTA } from "@/components/sections/contact-cta";
import Image from "next/image";

export const metadata = {
  title: "Tentang Kami",
  description:
    "Pelajari filosofi desain, proses, dan komitmen Khakim Interior terhadap kemewahan yang tenang.",
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-background pt-32 pb-24 md:pt-48 md:pb-32">
        <Container>
          <PageHeading
            title="Cerita Kami"
            subtitle="Berawal dari sebuah workshop kecil di Demak pada tahun 2015, berkembang menjadi studio desain interior terpercaya yang mengutamakan kualitas, fungsi, dan presisi."
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
                  src="/images/workshop.jpg"
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
                  Jasa Desain Interior & Custom Furniture
                </h2>
              </FadeIn>

              <div className="text-foreground-soft mb-12 space-y-6 text-lg leading-relaxed font-light">
                <FadeIn delay={0.2}>
                  <p>
                    Berawal dari sebuah workshop kecil di Demak pada tahun 2015, Khakim Interior kini telah berkembang menjadi penyedia 
                    jasa desain interior terpercaya untuk proyek hunian pribadi, apartemen mewah, hingga kantor skala menengah. 
                    Kami bangga dengan pendekatan desain kami yang selalu memadukan estetika minimalis modern dengan 
                    fungsionalitas ruang yang maksimal, menciptakan ruang yang tidak hanya memanjakan mata tetapi juga nyaman ditinggali.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p>
                    Kekuatan utama kami terletak pada tim in-house profesional yang solid. Khakim Interior didukung oleh 
                    desainer interior yang kreatif, <em>drafter</em> teknis yang sangat presisi, operator CNC andal, 
                    spesialis <em>finishing</em>, serta <em>installer</em> berpengalaman. Sinergi inilah yang memastikan 
                    setiap detail rancangan dapat dieksekusi dengan sempurna di lapangan.
                  </p>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p>
                    Berbeda dengan kebanyakan studio lainnya, seluruh tahap produksi furnitur kustom (<em>custom furniture</em>) 
                    dilakukan secara langsung di <strong>workshop in-house</strong> kami sendiri. Dengan mesin potong presisi dan 
                    penggunaan perangkat keras (<em>hardware</em>) premium dari merek-merek terpercaya, kami menjaga kontrol 
                    kualitas yang sangat ketat.
                  </p>
                  <p className="mt-6">
                    Kami juga berkomitmen pada transparansi material; menyediakan <em>mockup finishing</em> beserta sampel material, 
                    sehingga Anda dapat melihat, menyentuh, dan merasakan langsung kualitas premium yang kami tawarkan 
                    sebelum proses produksi massal dimulai.
                  </p>
                </FadeIn>
              </div>

              <FadeIn delay={0.5} className="mt-8">
                <div className="border-border grid grid-cols-2 gap-8 border-t pt-8">
                  <div>
                    <h3 className="font-heading text-foreground mb-2 text-3xl md:text-4xl">
                      10+
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
