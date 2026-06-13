export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-frontend.vercel.app";

export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export const NAV_ITEMS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#certificates", label: "Certificates" },
  { href: "/#contact", label: "Contact" },
];

export const SECTION_LABELS = {
  hero: "01 / SYSTEM PROFILE",
  about: "02 / ABOUT",
  skills: "03 / CAPABILITY MAP",
  services: "04 / SERVICE BAY",
  projects: "05 / FEATURED WORK",
  experience: "06 / FIELD LOG",
  certificates: "07 / CERTIFICATION",
  contact: "08 / CONTACT SIGNAL",
};
