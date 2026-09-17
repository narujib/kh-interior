import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "An initial consultation to understand your vision, lifestyle requirements, and the unique characteristics of your space.",
  },
  {
    number: "02",
    title: "Concept",
    description:
      "Developing a comprehensive design direction, including mood boards, spatial layouts, and preliminary material selections.",
  },
  {
    number: "03",
    title: "Refinement",
    description:
      "Detailed 3D visualizations, final material sourcing, and precise technical drawings for flawless execution.",
  },
  {
    number: "04",
    title: "Realization",
    description:
      "Overseeing the construction, custom fabrication, and final styling to bring the design to life exactly as envisioned.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-background py-24 md:py-32">
      <Container>
        <SectionHeading
          title="How We Work"
          numbering="05"
          subtitle="Process"
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
