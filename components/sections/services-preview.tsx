import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    title: "Desain Interior",
    description:
      "Layanan desain interior menyeluruh untuk hunian dan ruang komersial butik, mulai dari konsep hingga penataan akhir.",
  },
  {
    title: "Perencanaan Ruang",
    description:
      "Mengoptimalkan tata letak dan alur lingkungan Anda untuk memaksimalkan fungsionalitas dan harmoni estetika.",
  },
  {
    title: "Furnitur Kustom",
    description:
      "Desain dan pembuatan furnitur khusus yang disesuaikan dengan dimensi dan gaya unik ruang Anda.",
  },
  {
    title: "Konsultasi Renovasi",
    description:
      "Panduan ahli di sepanjang proses renovasi, memastikan integritas desain dan eksekusi berkualitas tinggi.",
  },
];

export function ServicesPreview() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          title="Keahlian Kami"
          numbering="02"
          subtitle="Layanan"
          className="mb-16 md:mb-24"
        />

        <StaggerContainer className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <StaggerItem
              key={index}
              className="border-border flex flex-col border-t pt-8"
            >
              <h3 className="font-heading mb-4 text-2xl font-medium md:text-3xl">
                {service.title}
              </h3>
              <p className="text-foreground-soft mb-6 flex-1 leading-relaxed font-light">
                {service.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="border-border mt-16 flex justify-end border-t pt-8 md:mt-24">
          <Link
            href="/services"
            className="text-foreground hover:text-foreground-soft group flex items-center gap-2 pb-2 text-sm font-medium tracking-widest uppercase transition-colors"
          >
            Temukan Semua Layanan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
