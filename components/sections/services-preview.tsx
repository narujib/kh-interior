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
    title: "Interior Design",
    description:
      "Full-service interior design for residential and boutique commercial spaces, from conceptualization to final styling.",
  },
  {
    title: "Space Planning",
    description:
      "Optimizing the layout and flow of your environment to maximize both functionality and aesthetic harmony.",
  },
  {
    title: "Custom Furniture",
    description:
      "Bespoke furniture design and fabrication tailored specifically to the unique dimensions and style of your space.",
  },
  {
    title: "Renovation Consultancy",
    description:
      "Expert guidance throughout the renovation process, ensuring design integrity and high-quality execution.",
  },
];

export function ServicesPreview() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          title="Our Expertise"
          numbering="02"
          subtitle="Services"
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
            Discover All Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
