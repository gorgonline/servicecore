import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("fark-var");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
