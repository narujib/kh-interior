import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { FadeIn } from "@/components/shared/fade-in";
import { ImageReveal } from "@/components/shared/image-reveal";
import { ContactCTA } from "@/components/sections/contact-cta";
import Image from "next/image";

export const metadata = {
  title: "About | Khakim Interior",
  description:
    "Learn about Khakim Interior's design philosophy, process, and commitment to quiet luxury.",
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-background pt-32 pb-24 md:pt-48 md:pb-32">
        <Container>
          <PageHeading
            title="The Studio"
            subtitle="Creating spaces that transcend trends, focusing on materiality, light, and proportion."
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
                  src="https://images.unsplash.com/photo-1600607688969-a5bfcd64bd28?auto=format&fit=crop&q=80"
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
                  Design Philosophy
                </h2>
              </FadeIn>

              <div className="text-foreground-soft mb-12 space-y-6 text-lg leading-relaxed font-light">
                <FadeIn delay={0.2}>
                  <p>
                    Founded on the principles of quiet luxury and intentional
                    design, Khakim Interior is a boutique studio specializing in
                    high-end residential and commercial spaces. We believe that
                    true luxury is not defined by excess, but by the thoughtful
                    curation of materials, light, and form.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p>
                    Our approach is deeply contextual. Before we sketch a single
                    line or select a material, we seek to intimately understand
                    the architecture of the space, the nuances of natural light
                    throughout the day, and most importantly, the lifestyle and
                    vision of our clients.
                  </p>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <p>
                    We act as editors as much as designers—distilling spaces
                    down to their essential elements to create environments that
                    feel calm, sophisticated, and effortlessly timeless.
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
                      Years of Experience
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-foreground mb-2 text-3xl md:text-4xl">
                      50+
                    </h3>
                    <p className="text-foreground-soft text-xs tracking-widest uppercase">
                      Projects Completed
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
                <span>Our Principles</span>
                <span className="bg-border h-[1px] w-8" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-heading text-foreground text-3xl leading-relaxed font-normal italic sm:text-4xl md:text-5xl">
                &quot;We don&apos;t just decorate rooms; we sculpt environments
                that elevate the everyday human experience.&quot;
              </h2>
            </FadeIn>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
