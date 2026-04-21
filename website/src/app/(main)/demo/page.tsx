import { Metadata } from "next";
import demoData from "@/data/demo.json";
import { DemoForm } from "@/components/ui/demo-form";
import { DemoInfo } from "@/components/ui/demo-info";

export const metadata: Metadata = {
  title: "Demo Talebi | ServiceCore",
  description: demoData.page.description,
};

export default function DemoPage() {
  return (
    <main className="relative min-h-screen bg-(--color-surface-base) pb-32 pt-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-linear-to-b from-(--color-brand-primary)/10 via-(--color-brand-primary)/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-(--color-brand-accent)/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-(--color-brand-primary)/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 mt-4">
            <span className="w-2 h-2 rounded-full bg-(--color-brand-primary) animate-pulse" />
            <span className="text-xs font-semibold text-(--color-text-overline) tracking-[0.2em] uppercase">Canlı Sunum</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-primary) to-(--color-brand-accent)">Servicecore</span>{" "}
            Demo
          </h1>
          
          <p className="text-lg md:text-xl text-(--color-text-secondary) font-light leading-relaxed max-w-2xl mx-auto">
            {demoData.page.description}
          </p>
        </div>

        {/* Content Section - Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Demo Form (takes half space, 6 cols) */}
          <div className="lg:col-span-6 h-full">
            <DemoForm />
          </div>

          {/* Right Column: Demo Info */}
          <div className="lg:col-span-6 h-full pt-8 lg:pt-0">
            <DemoInfo />
          </div>
        </div>
      </div>
    </main>
  );
}
