import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/data/projects";

export async function FeaturedProjects() {
  // Fetch up to 4 featured projects from the database
  const projects = await getFeaturedProjects(4);

  if (!projects || projects.length === 0) {
    return null;
  }

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
          {projects.map((project, index) => (
            <StaggerItem
              key={project.id}
              className={index % 2 !== 0 ? "md:mt-24" : ""}
            >
              <ProjectCard
                title={project.title}
                slug={project.slug}
                coverImage={project.coverImageUrl}
                clientName={project.clientName}
                priority={index <= 1}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
