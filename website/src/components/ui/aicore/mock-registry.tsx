import type { ReactNode } from "react";
import { AssetCoreMock } from "./mocks/assetcore";
import { AuditCoreMock } from "./mocks/auditcore";
import { BudgetCoreMock } from "./mocks/budgetcore";
import { CallCoreMock } from "./mocks/callcore";
import { ChatCoreMock } from "./mocks/chatcore";
import { ClassifyCoreMock } from "./mocks/classifycore";
import { CoachCoreMock } from "./mocks/coachcore";
import { ContractCoreMock } from "./mocks/contractcore";
import { DiscoverCoreMock } from "./mocks/discovercore";
import { FlowCoreMock } from "./mocks/flowcore";
import { ImpactCoreMock } from "./mocks/impactcore";
import { KBCoreMock } from "./mocks/kbcore";
import { KnowCoreMock } from "./mocks/knowcore";
import { MergeCoreMock } from "./mocks/mergecore";
import { PredictCoreMock } from "./mocks/predictcore";
import { PriorityCoreMock } from "./mocks/prioritycore";
import { ProjectCoreMock } from "./mocks/projectcore";
import { ReplyCoreMock } from "./mocks/replycore";
import { ReportCoreMock } from "./mocks/reportcore";
import { RisiCoreMock } from "./mocks/risicore";
import { RootCoreMock } from "./mocks/rootcore";
import { SentimentCoreMock } from "./mocks/sentimentcore";
import { ShiftCoreMock } from "./mocks/shiftcore";
import { SolveCoreMock } from "./mocks/solvecore";
import { StormCoreMock } from "./mocks/stormcore";
import { ToneCoreMock } from "./mocks/tonecore";
import { TranslateCoreMock } from "./mocks/translatecore";
import { VendorCoreMock } from "./mocks/vendorcore";
import { VisionCoreMock } from "./mocks/visioncore";
import { VoiceCoreMock } from "./mocks/voicecore";

interface MockProps {
  accent: string;
}

const REGISTRY: Record<string, (props: MockProps) => ReactNode> = {
  chatcore: ChatCoreMock,
  replycore: ReplyCoreMock,
  classifycore: ClassifyCoreMock,
  prioritycore: PriorityCoreMock,
  impactcore: ImpactCoreMock,
  predictcore: PredictCoreMock,
  mergecore: MergeCoreMock,
  knowcore: KnowCoreMock,
  reportcore: ReportCoreMock,
  risicore: RisiCoreMock,
  solvecore: SolveCoreMock,
  sentimentcore: SentimentCoreMock,
  kbcore: KBCoreMock,
  tonecore: ToneCoreMock,
  rootcore: RootCoreMock,
  stormcore: StormCoreMock,
  flowcore: FlowCoreMock,
  discovercore: DiscoverCoreMock,
  translatecore: TranslateCoreMock,
  voicecore: VoiceCoreMock,
  callcore: CallCoreMock,
  visioncore: VisionCoreMock,
  shiftcore: ShiftCoreMock,
  auditcore: AuditCoreMock,
  assetcore: AssetCoreMock,
  vendorcore: VendorCoreMock,
  contractcore: ContractCoreMock,
  budgetcore: BudgetCoreMock,
  coachcore: CoachCoreMock,
  projectcore: ProjectCoreMock,
};

export function hasMock(slug: string): boolean {
  return slug in REGISTRY;
}

export function AicoreMock({ slug, accent }: { slug: string; accent: string }) {
  const Mock = REGISTRY[slug];
  if (!Mock) return null;
  return <Mock accent={accent} />;
}
