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
    title: "Kitchenset Custom",
    description:
      "Dapur adalah jantung dari setiap rumah. Layanan kitchen set kustom kami berfokus pada perpaduan sempurna antara fungsionalitas dan estetika. Kami mendesain kabinet, area persiapan, hingga kompartemen penyimpanan spesifik yang sepenuhnya disesuaikan dengan kebiasaan memasak serta gaya interior keseluruhan rumah Anda.",
    image:
      "/images/kitchenset.jpg",
    features: [
      "Optimalisasi Alur Memasak",
      "Material Tahan Lama & Tahan Air",
      "Pencahayaan Kabinet Terintegrasi",
      "Sistem Penyimpanan Cerdas",
    ],
  },
  {
    title: "Wardrobe Custom",
    description:
      "Ciptakan area penyimpanan pakaian impian Anda dengan lemari (wardrobe) yang dirancang khusus. Mulai dari lemari tanam (built-in) hingga walk-in closet yang mewah, kami memastikan setiap potong pakaian, aksesori, dan sepatu Anda memiliki tempatnya sendiri dengan tampilan elegan yang tak lekang oleh waktu.",
    image:
      "/images/wardrobe.jpg",
    features: [
      "Desain Walk-in Closet",
      "Organisasi Ruang Fleksibel",
      "Lemari Built-in Estetik",
      "Pilihan Finishing Premium",
    ],
  },
  {
    title: "Backdrop TV & Living Room",
    description:
      "Ruang keluarga adalah pusat berkumpul dan bersantai. Kami merancang backdrop TV dan furnitur living room yang tidak hanya menyembunyikan kabel secara rapi, tetapi juga menciptakan titik fokus ruangan yang memukau, hangat, dan selaras dengan tema keseluruhan interior Anda.",
    image:
      "/images/backdrop-living-room.jpg",
    features: [
      "Manajemen Kabel Tersembunyi",
      "Integrasi Rak Pajangan",
      "Kombinasi Tekstur Kayu & Batu",
      "Pencahayaan Aksen Sekitar TV",
    ],
  },
  {
    title: "Meja & Storage Custom",
    description:
      "Ketika produk siap pakai tidak memenuhi standar atau ukuran ruang Anda, meja kerja, meja rias, dan solusi penyimpanan kustom adalah jawabannya. Kami membuat furnitur yang presisi sesuai dengan proporsi ruangan Anda, menghadirkan estetika premium tanpa mengorbankan utilitas.",
    image:
      "/images/storage.jpg",
    features: [
      "Meja Kerja Ergonomis",
      "Meja Rias & Konsol Unik",
      "Solusi Penyimpanan Bawah Tangga",
      "Rak Buku Kustom",
    ],
  },
];

export const metadata = {
  title: "Layanan",
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
