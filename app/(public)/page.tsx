import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";

import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesPreview } from "@/components/sections/services-preview";
import { AboutPreview } from "@/components/sections/about-preview";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { ProcessSection } from "@/components/sections/process-section";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ServicesPreview />
      <AboutPreview />
      <GalleryPreview />
      <ProcessSection />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
