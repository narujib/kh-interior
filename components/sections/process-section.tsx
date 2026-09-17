import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Penemuan",
    description:
      "Konsultasi awal untuk memahami visi, kebutuhan gaya hidup, dan karakteristik unik ruang Anda.",
  },
  {
    number: "02",
    title: "Konsep",
    description:
      "Mengembangkan arahan desain menyeluruh, mencakup mood board, tata letak ruang, dan pemilihan material awal.",
  },
  {
    number: "03",
    title: "Penyempurnaan",
    description:
      "Visualisasi 3D mendetail, pencarian material akhir, dan gambar teknis presisi untuk eksekusi yang sempurna.",
  },
  {
    number: "04",
    title: "Realisasi",
    description:
      "Mengawasi jalannya konstruksi, pembuatan kustom, dan penataan akhir untuk mewujudkan desain tepat seperti yang dibayangkan.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-background py-24 md:py-32">
      <Container>
        <SectionHeading
          title="Cara Kami Bekerja"
          numbering="05"
          subtitle="Proses"
          className="mb-16 md:mb-24"
        />

        <StaggerContainer className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <StaggerItem key={step.number} className="flex flex-col">
              <span className="font-heading text-border mb-6 text-4xl md:text-5xl">
                {step.number}
              </span>
              <h3 className="font-heading mb-4 text-2xl font-medium">
                {step.title}
              </h3>
              <p className="text-foreground-soft leading-relaxed font-light">
                {step.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
