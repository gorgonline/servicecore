import AppBackdrop from "@/components/applicore/AppBackdrop";
import ApprovalSection from "@/components/applicore/ApprovalSection";
import {
  DataSection,
  JourneySection,
  ScreensSection,
  StudioSection,
} from "@/components/applicore/BuildSections";
import {
  DemoSection,
  FaqSection,
  NextSection,
  ScaleSection,
} from "@/components/applicore/ClosingSections";
import {
  CliSection,
  IntegrationSection,
  ScriptsSection,
} from "@/components/applicore/DeveloperSections";
import {
  AccessSection,
  AuditSection,
  PublishSection,
  SensitiveSection,
  UsageSection,
} from "@/components/applicore/GovernanceSections";
import HeroSection from "@/components/applicore/HeroSection";
import { InsideSection, WhatSection, WhySection } from "@/components/applicore/IntroSections";
import ReadyAppsSection from "@/components/applicore/ReadyAppsSection";
import SectionNav from "@/components/applicore/SectionNav";
import StagesSection from "@/components/applicore/StagesSection";
import PrivacyContact from "@/components/ui/privacy-contact";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("applicore");

export default function AppliCorePage() {
  return (
    <div className="relative overflow-x-clip bg-(--color-surface-base) selection:bg-(--color-brand-primary)/30">
      <AppBackdrop />
      <SectionNav />
      <div className="relative">
        <HeroSection />
        <WhySection />
        <WhatSection />
        <InsideSection />
        <ReadyAppsSection />
        <JourneySection />
        <StudioSection />
        <DataSection />
        <ScreensSection />
        <StagesSection />
        <ApprovalSection />
        <ScriptsSection />
        <CliSection />
        <IntegrationSection />
        <PublishSection />
        <AuditSection />
        <AccessSection />
        <SensitiveSection />
        <UsageSection />
        <ScaleSection />
        <DemoSection />
        <FaqSection />
        <NextSection />
        <PrivacyContact />
      </div>
    </div>
  );
}
