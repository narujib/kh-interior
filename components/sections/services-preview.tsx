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
    title: "Kitchenset Custom",
    description:
      "Desain dan pembuatan kitchen set yang fungsional, estetis, dan disesuaikan secara presisi dengan kebutuhan memasak serta gaya interior Anda.",
  },
  {
    title: "Wardrobe Custom",
    description:
      "Solusi lemari pakaian kustom yang mengoptimalkan ruang penyimpanan dengan desain elegan, memaksimalkan tata letak ruangan Anda.",
  },
  {
    title: "Backdrop TV & Living Room",
    description:
      "Pusat hiburan dan ruang keluarga yang dirancang khusus untuk menciptakan titik fokus yang menawan dan selaras dengan tema ruangan.",
  },
  {
    title: "Meja & Storage Custom",
    description:
      "Pembuatan meja kerja, meja rias, dan berbagai solusi penyimpanan inovatif yang dirancang khusus mengikuti dimensi dan kebutuhan unik Anda.",
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
