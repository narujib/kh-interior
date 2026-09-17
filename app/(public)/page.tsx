import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";

export default function Home() {
  return (
    <div className="pt-32 pb-24 min-h-screen flex flex-col">
      <Container>
        <PageHeading
          title="Home Page"
          subtitle="This is a placeholder for the Khakim Interior homepage."
        />
      </Container>
    </div>
  );
}
