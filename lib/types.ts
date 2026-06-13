export type StrapiMedia = {
  id?: number;
  documentId?: string;
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
  name?: string | null;
  width?: number | null;
  height?: number | null;
};

export type PortfolioProfile = {
  id?: number;
  documentId?: string;
  name?: string | null;
  headline?: string | null;
  subHeadline?: string | null;
  shortDescription?: unknown;
  profileImage?: StrapiMedia | null;
  cvFile?: StrapiMedia | null;
  email?: string | null;
  location?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  whatsappUrl?: string | null;
  spotifyItems?: SpotifyItem[] | null;
  isOpenToWork?: boolean | null;
};

export type SpotifyItem = {
  id?: number;
  spotify_title?: string | null;
  spotify_url?: string | null;
};

export type ContactInfo = {
  id?: number;
  documentId?: string;
  title?: string | null;
  description?: string | null;
  email?: string | null;
  phone?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  whatsappUrl?: string | null;
};

export type NamedItem = {
  id?: number;
  name?: string | null;
};

export type Project = {
  id?: number;
  documentId?: string;
  title?: string | null;
  slug?: string | null;
  category?: string | null;
  thumbnail?: StrapiMedia | null;
  shortDescription?: string | null;
  problem?: unknown;
  solution?: unknown;
  features?: NamedItem[] | null;
  techStacks?: NamedItem[] | null;
  githubUrl?: string | null;
  liveDemoUrl?: string | null;
  images?: StrapiMedia[] | null;
  isFeatured?: boolean | null;
  order?: number | null;
  isActive?: boolean | null;
};

export type SkillCategory = {
  id?: number;
  documentId?: string;
  title?: string | null;
  description?: string | null;
  icon?: string | null;
  skills?: NamedItem[] | null;
  order?: number | null;
  isActive?: boolean | null;
};

export type Service = {
  id?: number;
  documentId?: string;
  title?: string | null;
  description?: string | null;
  icon?: string | null;
  order?: number | null;
  isActive?: boolean | null;
};

export type Experience = {
  id?: number;
  documentId?: string;
  title?: string | null;
  organization?: string | null;
  type?: "Work" | "Organization" | "Volunteer" | "Academic" | "Project" | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent?: boolean | null;
  description?: unknown;
  responsibilities?: NamedItem[] | null;
  skills?: NamedItem[] | null;
  logo?: StrapiMedia | null;
  order?: number | null;
  isActive?: boolean | null;
};

export type Certificate = {
  id?: number;
  documentId?: string;
  title?: string | null;
  issuer?: string | null;
  year?: number | null;
  description?: string | null;
  skills?: NamedItem[] | null;
  certificateImage?: StrapiMedia | null;
  certificateUrl?: string | null;
  order?: number | null;
  isActive?: boolean | null;
};

export type HomeData = {
  profile: PortfolioProfile | null;
  contact: ContactInfo | null;
  featuredProjects: Project[];
  skills: SkillCategory[];
  services: Service[];
  experiences: Experience[];
  certificates: Certificate[];
};
