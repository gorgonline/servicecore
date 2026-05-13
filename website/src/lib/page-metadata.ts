import type { Metadata } from "next";
import pageMetaData from "@/data/page-meta.json";

interface PageMetaEntry {
  title: string;
  description: string;
}

const pageMetaMap = pageMetaData as Record<string, PageMetaEntry>;

export function pageMetadata(slug: string): Metadata {
  const entry = pageMetaMap[slug];
  if (!entry) {
    throw new Error(`page-meta.json icinde "${slug}" girdisi bulunamadi.`);
  }
  return {
    title: entry.title,
    description: entry.description,
  };
}
