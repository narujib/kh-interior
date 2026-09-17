import { Container } from "@/components/shared/container";
import { PageHeading } from "@/components/shared/page-heading";
import { FadeIn } from "@/components/shared/fade-in";
import { ContactForm } from "@/components/forms/contact-form";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Kontak | Khakim Interior",
  description:
    "Hubungi kami untuk mendiskusikan proyek desain interior atau arsitektur Anda berikutnya.",
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-surface pt-32 pb-16 md:pt-48 md:pb-24">
        <Container>
          <PageHeading
            title="Hubungi Kami"
            subtitle="Kami ingin mendengar tentang visi Anda. Hubungi kami untuk mendiskusikan proyek Anda, dan mari kita ciptakan sesuatu yang luar biasa bersama."
            align="left"
          />
        </Container>
      </div>

      <section className="bg-surface pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5 lg:pr-12">
              <FadeIn delay={0.1}>
                <div className="flex flex-col gap-12">
                  <div>
                    <h3 className="text-foreground mb-6 flex items-center gap-3 text-sm font-medium tracking-widest uppercase">
                      <MapPin className="h-4 w-4" />
                      Studio
                    </h3>
                    <p className="text-foreground-soft leading-relaxed font-light">
                      123 Design District Avenue
                      <br />
                      Suite 450
                      <br />
                      Jakarta, Indonesia 12190
                    </p>
                  </div>

                  <div>
                    <h3 className="text-foreground mb-6 flex items-center gap-3 text-sm font-medium tracking-widest uppercase">
                      <Phone className="h-4 w-4" />
                      Telepon
                    </h3>
                    <p className="text-foreground-soft font-light">
                      +62 811 2345 6789
                    </p>
                  </div>

                  <div>
                    <h3 className="text-foreground mb-6 flex items-center gap-3 text-sm font-medium tracking-widest uppercase">
                      <Mail className="h-4 w-4" />
                      Email
                    </h3>
                    <p className="text-foreground-soft font-light">
                      hello@khakiminterior.com
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="border-border border-t pt-16 lg:col-span-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <FadeIn delay={0.2}>
                <h2 className="font-heading mb-12 text-3xl">Kirim Pesan</h2>
                <ContactForm />
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
