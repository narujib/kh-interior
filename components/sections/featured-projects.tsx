import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Mock data until DB is ready
const MOCK_PROJECTS = [
  {
    id: "1",
    title: "The Glass House",
    slug: "glass-house",
    clientName: "Private Residence",
    coverImageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Minimalist Loft",
    slug: "minimalist-loft",
    clientName: "Boutique Hotel",
    coverImageUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Urban Retreat",
    slug: "urban-retreat",
    clientName: "Private Client",
    coverImageUrl:
      "https://images.unsplash.com/photo-1600607687644-aac4c15a819c?auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    title: "Heritage Restoration",
    slug: "heritage-restoration",
    clientName: "Cultural Trust",
    coverImageUrl:
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80",
  },
];

export function FeaturedProjects() {
  return (
    <section className="bg-background py-24 md:py-32">
      <Container>
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <SectionHeading
            title="Karya Pilihan"
            numbering="01"
            subtitle="Portofolio"
            className="mb-0"
          />
          <Link
            href="/portfolio"
            className="text-foreground hover:text-foreground-soft group flex items-center gap-2 pb-2 text-sm font-medium tracking-widest uppercase transition-colors"
          >
            Lihat Semua Proyek
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
          {MOCK_PROJECTS.map((project, index) => (
            <StaggerItem
              key={project.id}
              className={index % 2 !== 0 ? "md:mt-24" : ""}
            >
              <ProjectCard
                title={project.title}
                slug={project.slug}
                coverImage={project.coverImageUrl}
                clientName={project.clientName}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
