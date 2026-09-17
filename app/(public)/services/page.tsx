import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { FadeIn } from "@/components/shared/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";
import { ContactCTA } from "@/components/sections/contact-cta";
import Image from "next/image";

const SERVICES = [
  {
    title: "Desain Interior",
    description:
      "Layanan desain interior menyeluruh untuk hunian dan ruang komersial butik, mulai dari konsep awal hingga penataan akhir. Kami bekerja erat dengan Anda untuk memahami gaya hidup, preferensi, dan karakteristik unik ruang Anda, menghasilkan desain kohesif yang menyeimbangkan bentuk dan fungsi dengan sempurna.",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80",
    features: [
      "Pengembangan Konsep",
      "Pemilihan Material",
      "Desain Furnitur Kayu Kustom",
      "Penataan & Aksesori",
    ],
  },
  {
    title: "Perencanaan Ruang",
    description:
      "Ruang yang didesain dengan baik harus direncanakan dengan baik pula. Kami menganalisis cara Anda menggunakan lingkungan dan menciptakan tata letak optimal yang meningkatkan alur, memaksimalkan luas ruang yang dapat digunakan, serta menyempurnakan pengalaman spasial secara keseluruhan tanpa mengorbankan estetika.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80",
    features: [
      "Optimasi Denah Lantai",
      "Analisis Alur Lalu Lintas Ruang",
      "Tata Letak Furnitur",
      "Ergonomi Spasial",
    ],
  },
  {
    title: "Furnitur Kustom",
    description:
      "Ketika produk siap pakai tidak memenuhi standar tinggi Anda, layanan furnitur kustom kami memberikan solusi khusus. Kami merancang dan mengawasi pembuatan karya unik yang disesuaikan secara khusus dengan dimensi, gaya, dan kebutuhan fungsional proyek Anda.",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80",
    features: [
      "Kabinet Khusus",
      "Pelapis Furnitur Kustom",
      "Meja Makan & Kopi Unik",
      "Solusi Penyimpanan Bawaan",
    ],
  },
];

export const metadata = {
  title: "Layanan | Khakim Interior",
  description:
    "Layanan desain interior komprehensif termasuk perencanaan ruang, furnitur kustom, dan konsultasi renovasi.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="bg-surface-muted pt-32 pb-24 md:pt-48 md:pb-32">
        <Container>
          <PageHeading
            title="Layanan Kami"
            subtitle="Keahlian yang didorong oleh filosofi kemewahan yang tenang dan desain yang bertujuan."
            align="center"
          />
        </Container>
      </div>

      <section className="bg-background py-24 md:py-32">
        <Container>
          <div className="flex flex-col gap-32 md:gap-48">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className={`flex flex-col items-center gap-12 lg:flex-row lg:gap-24 ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="bg-surface-muted relative aspect-[4/3] w-full overflow-hidden lg:aspect-[3/4] lg:w-1/2">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="flex w-full flex-col justify-center lg:w-1/2">
                  <FadeIn>
                    <div className="text-foreground-soft mb-4 text-sm tracking-widest uppercase">
                      0{index + 1}
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.1}>
                    <h2 className="font-heading mb-6 text-3xl md:text-5xl">
                      {service.title}
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <p className="text-foreground-soft mb-10 text-lg leading-relaxed font-light">
                      {service.description}
                    </p>
                  </FadeIn>

                  <StaggerContainer className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                    {service.features.map((feature, i) => (
                      <StaggerItem key={i} className="flex items-center gap-3">
                        <div className="bg-foreground h-1.5 w-1.5 rounded-full" />
                        <span className="text-foreground-soft font-light">
                          {feature}
                        </span>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
