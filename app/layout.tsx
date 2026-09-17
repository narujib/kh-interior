import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const fontHeading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Khakim Interior",
    default: "Khakim Interior | Premium Custom Interior Design",
  },
  description:
    "Boutique interior design studio specializing in elegant, minimalist, and timeless spaces. We create environments that whisper quiet luxury.",
  keywords: [
    "Interior Design",
    "Architecture",
    "Luxury",
    "Minimalist",
    "Custom Furniture",
  ],
  authors: [{ name: "Khakim Interior" }],
  creator: "Khakim Interior",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://khakiminterior.com", // This should be replaced with actual domain later
    title: "Khakim Interior | Premium Custom Interior Design",
    description:
      "Boutique interior design studio specializing in elegant, minimalist, and timeless spaces.",
    siteName: "Khakim Interior",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khakim Interior",
    description:
      "Boutique interior design studio specializing in elegant, minimalist, and timeless spaces.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InteriorDesign",
    name: "Khakim Interior",
    url: "https://khakiminterior.com",
    logo: "https://khakiminterior.com/icon.png",
    description:
      "Boutique interior design studio specializing in elegant, minimalist, and timeless spaces.",
  };

  return (
    <html
      lang="id"
      className={`${fontHeading.variable} ${fontBody.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
