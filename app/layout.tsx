import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SITE_URL } from "@/lib/constants";
import { getPortfolioProfile } from "@/lib/strapi";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Samuel | Web Developer & QA Enthusiast",
    template: "%s | Samuel Portfolio",
  },
  description:
    "Portfolio Samuel, mahasiswa Informatika yang berfokus pada web development, software testing, dan pengembangan aplikasi berbasis teknologi.",
  openGraph: {
    title: "Samuel | Web Developer & QA Enthusiast",
    description:
      "Portfolio dinamis Samuel untuk project, skill, pengalaman, sertifikat, dan kontak profesional.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel | Web Developer & QA Enthusiast",
    description:
      "Portfolio dinamis Samuel untuk project, skill, pengalaman, sertifikat, dan kontak profesional.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getPortfolioProfile();

  return (
    <html
      lang="id"
      className={`${inter.variable} ${oswald.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-background text-foreground">
        <Navbar profile={profile} />
        <main className="min-h-screen">{children}</main>
        <Footer profile={profile} />
      </body>
    </html>
  );
}
