import type { Metadata } from "next";
import blogData from "@/data/blog.json";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  pageTitle?: string;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = (blogData.posts as BlogPost[]).find((p) => p.slug === slug);
  if (!post) {
    return { title: "Yazi Bulunamadi | ServiceCore" };
  }
  return {
    title: post.pageTitle ?? `${post.title} | ServiceCore Blog`,
    description: post.subtitle ?? post.excerpt ?? undefined,
  };
}

export default async function Layout({ children }: LayoutProps) {
  return children;
}
