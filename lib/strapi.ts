import { STRAPI_URL } from "@/lib/constants";
import type {
  Certificate,
  ContactInfo,
  Experience,
  HomeData,
  PortfolioProfile,
  Project,
  SkillCategory,
  StrapiMedia,
  Service,
} from "@/lib/types";

type StrapiSingleResponse<T> = {
  data: T | null;
};

type StrapiCollectionResponse<T> = {
  data: T[];
};

type FetchOptions = {
  revalidate?: number;
};

function buildUrl(path: string) {
  const base = STRAPI_URL.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${base}${cleanPath}`;
}

async function strapiFetch<T>(path: string, options: FetchOptions = {}): Promise<T | null> {
  try {
    const fetchOptions =
      process.env.NODE_ENV === "production"
        ? { next: { revalidate: options.revalidate ?? 600 } }
        : { cache: "no-store" as const };

    const response = await fetch(buildUrl(path), fetchOptions);

    if (!response.ok) {
      throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function getSingle<T>(path: string, revalidate = 3600) {
  const response = await strapiFetch<StrapiSingleResponse<T>>(path, { revalidate });

  return response?.data ?? null;
}

async function getCollection<T>(path: string, revalidate = 600) {
  const response = await strapiFetch<StrapiCollectionResponse<T>>(path, { revalidate });

  return response?.data ?? [];
}

export function getMediaUrl(media?: StrapiMedia | null) {
  if (!media?.url) {
    return "";
  }

  if (media.url.startsWith("http")) {
    return media.url;
  }

  return `${STRAPI_URL.replace(/\/$/, "")}${media.url}`;
}

export function getMediaAlt(media: StrapiMedia | null | undefined, fallback: string) {
  return media?.alternativeText?.trim() || media?.name?.trim() || fallback;
}

export async function getPortfolioProfile() {
  return getSingle<PortfolioProfile>("/api/portfolio-profile?populate=*", 3600);
}

export async function getContactInfo() {
  return getSingle<ContactInfo>("/api/contact-info?populate=*", 3600);
}

export async function getFeaturedProjects() {
  return getCollection<Project>(
    "/api/projects?filters[isFeatured][$eq]=true&filters[isActive][$eq]=true&populate=*&sort=order:asc&pagination[pageSize]=4",
    600,
  );
}

export async function getProjects() {
  return getCollection<Project>(
    "/api/projects?filters[isActive][$eq]=true&populate=*&sort=order:asc&pagination[pageSize]=12",
    600,
  );
}

export async function getProjectBySlug(slug: string) {
  const projects = await getCollection<Project>(
    `/api/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&filters[isActive][$eq]=true&populate=*`,
    600,
  );

  return projects[0] ?? null;
}

export async function getSkillCategories() {
  return getCollection<SkillCategory>(
    "/api/skill-categories?filters[isActive][$eq]=true&populate=*&sort=order:asc",
    3600,
  );
}

export async function getServices() {
  return getCollection<Service>(
    "/api/services?filters[isActive][$eq]=true&populate=*&sort=order:asc",
    3600,
  );
}

export async function getExperiences() {
  return getCollection<Experience>(
    "/api/experiences?filters[isActive][$eq]=true&populate=*&sort=order:asc&pagination[pageSize]=4",
    1800,
  );
}

export async function getCertificates() {
  return getCollection<Certificate>(
    "/api/certificates?filters[isActive][$eq]=true&populate=*&sort=order:asc&pagination[pageSize]=4",
    1800,
  );
}

export async function getHomeData(): Promise<HomeData> {
  const [profile, contact, featuredProjects, skills, services, experiences, certificates] =
    await Promise.all([
      getPortfolioProfile(),
      getContactInfo(),
      getFeaturedProjects(),
      getSkillCategories(),
      getServices(),
      getExperiences(),
      getCertificates(),
    ]);

  return {
    profile,
    contact,
    featuredProjects,
    skills,
    services,
    experiences,
    certificates,
  };
}
