import hizmetlerData from "@/data/hizmetler.json";

export interface HizmetCategory {
  slug: string;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  icon: string;
  accent: string;
  count: number;
  href: string;
}

export interface HizmetService {
  slug: string;
  code: string;
  name: string;
  nameEn: string;
  category: string;
  paymentTerm: "one-time" | "annual";
  featured: boolean;
  hasDetailPage: boolean;
  tagline: string;
  shortDescription: string;
  valueProps: string[];
  whoFor: string;
  icon: string;
  accentColor: string;
}

export interface HizmetlerData {
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    description: string;
  };
  categories: HizmetCategory[];
  services: HizmetService[];
  featuredCallout: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
}

const data = hizmetlerData as HizmetlerData;

export const HIZMETLER = data;
export const HIZMET_CATEGORIES = data.categories;
export const HIZMET_SERVICES = data.services;

export function getServicesByCategory(category: string): HizmetService[] {
  return data.services.filter((s) => s.category === category);
}

export function getServiceBySlug(slug: string): HizmetService | undefined {
  return data.services.find((s) => s.slug === slug);
}

export function getCategoryBySlug(slug: string): HizmetCategory | undefined {
  return data.categories.find((c) => c.slug === slug);
}

export function getFeaturedServices(): HizmetService[] {
  return data.services.filter((s) => s.featured);
}

export function buildServiceHref(service: HizmetService): string {
  if (service.hasDetailPage) {
    return `/hizmetler/${service.category}/${service.slug}`;
  }
  return `/hizmetler/${service.category}#${service.slug}`;
}
