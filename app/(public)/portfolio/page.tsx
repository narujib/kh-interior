import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/stagger-container";
import { ContactCTA } from "@/components/sections/contact-cta";
import { getProjects } from "@/lib/data/projects";

export const metadata = {
  title: "Portfolio | Khakim Interior",
  description:
    "Explore our selected works of premium custom interior design and architectural projects.",
};

export default async function PortfolioPage() {
  // Fetch from our Query Layer
  const projects = await getProjects();

  // If no projects in DB yet, fallback to some mock data for display purposes
  // Normally we would just show an empty state, but for the demo we show the aesthetic
  const displayProjects =
    projects.length > 0
      ? projects
      : [
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
          {
            id: "5",
            title: "Modern Oasis",
            slug: "modern-oasis",
            clientName: "Tech Executive",
            coverImageUrl:
              "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80",
          },
          {
            id: "6",
            title: "Coastal Villa",
            slug: "coastal-villa",
            clientName: "Summer Retreat",
            coverImageUrl:
              "https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80",
          },
        ];

  return (
    <>
      <div className="bg-surface pt-32 pb-24 md:pt-48 md:pb-32">
        <Container>
          <PageHeading
            title="Selected Works"
            subtitle="A curated selection of our finest interior design projects, showcasing our commitment to quiet luxury and timeless aesthetics."
            align="left"
          />
        </Container>
      </div>

      <section className="bg-surface pb-24 md:pb-32">
        <Container>
          {displayProjects.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24">
              {displayProjects.map((project, index) => (
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
          ) : (
            <div className="border-border border-t py-32 text-center">
              <p className="text-foreground-soft font-light">
                No projects found.
              </p>
            </div>
          )}
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
