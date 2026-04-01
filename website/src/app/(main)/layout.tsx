import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-20 lg:pt-24 min-h-screen flex flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
