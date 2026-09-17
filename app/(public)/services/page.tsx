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
    title: "Interior Design",
    description:
      "Our comprehensive interior design service covers everything from initial conceptualization to final installation. We work closely with you to understand your lifestyle, preferences, and the unique characteristics of your space, delivering a cohesive design that perfectly balances form and function.",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80",
    features: [
      "Concept Development",
      "Material Selection",
      "Custom Millwork Design",
      "Styling & Accessorizing",
    ],
  },
  {
    title: "Space Planning",
    description:
      "A well-designed space must first be well-planned. We analyze how you use your environment and create optimized layouts that improve flow, maximize usable square footage, and enhance the overall spatial experience without compromising on aesthetics.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80",
    features: [
      "Floor Plan Optimization",
      "Traffic Flow Analysis",
      "Furniture Layouts",
      "Spatial Ergonomics",
    ],
  },
  {
    title: "Custom Furniture",
    description:
      "When off-the-shelf pieces don't meet your exacting standards, our custom furniture service provides bespoke solutions. We design and oversee the fabrication of unique pieces tailored specifically to the dimensions, style, and functional needs of your project.",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80",
    features: [
      "Bespoke Cabinetry",
      "Custom Upholstery",
      "Unique Dining & Coffee Tables",
      "Built-in Storage Solutions",
    ],
  },
];

export const metadata = {
  title: "Services | Khakim Interior",
  description:
    "Comprehensive interior design services including space planning, custom furniture, and renovation consultancy.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="bg-surface-muted pt-32 pb-24 md:pt-48 md:pb-32">
        <Container>
          <PageHeading
            title="Our Services"
            subtitle="Expertise driven by a philosophy of quiet luxury and intentional design."
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
