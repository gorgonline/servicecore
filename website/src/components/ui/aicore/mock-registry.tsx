import type { ReactNode } from "react";
import { AssetLifecycleMock } from "./mocks/asset-lifecycle";
import { AuditMock } from "./mocks/audit";
import { BudgetMock } from "./mocks/budget";
import { CallcenterMock } from "./mocks/callcenter";
import { ChatcoreSelfMock } from "./mocks/chatcore-self";
import { ClassificoreManageMock } from "./mocks/classificore-manage";
import { CoachMock } from "./mocks/coach";
import { ContractMock } from "./mocks/contract";
import { DiscoreMock } from "./mocks/discore";
import { FlowCoreMock } from "./mocks/flowcore";
import { ImpacticoreMock } from "./mocks/impacticore";
import { KBCoreMock } from "./mocks/kbcore";
import { KnowCoreMock } from "./mocks/knowcore";
import { MergeMock } from "./mocks/merge";
import { PredicticoreMock } from "./mocks/predicticore";
import { PrioritycoreMock } from "./mocks/prioritycore";
import { ProjectplanpredictMock } from "./mocks/projectplanpredict";
import { ReplycoreSolveMock } from "./mocks/replycore-solve";
import { RootCoreMock } from "./mocks/rootcore";
import { ScoreMock } from "./mocks/score";
import { SentimentMock } from "./mocks/sentiment";
import { ShiftMock } from "./mocks/shift";
import { StormMock } from "./mocks/storm";
import { ToneMock } from "./mocks/tone";
import { TranslateMock } from "./mocks/translate";
import { VendorMock } from "./mocks/vendor";
import { VisicoreMock } from "./mocks/visicore";
import { VoiceMock } from "./mocks/voice";

interface MockProps {
  accent: string;
}

const REGISTRY: Record<string, (props: MockProps) => ReactNode> = {
  "chatcore-self": ChatcoreSelfMock,
  "classificore-manage": ClassificoreManageMock,
  prioritycore: PrioritycoreMock,
  impacticore: ImpacticoreMock,
  merge: MergeMock,
  knowcore: KnowCoreMock,
  kbcore: KBCoreMock,
  score: ScoreMock,
  sentiment: SentimentMock,
  tone: ToneMock,
  "replycore-solve": ReplycoreSolveMock,
  predicticore: PredicticoreMock,
  discore: DiscoreMock,
  rootcore: RootCoreMock,
  storm: StormMock,
  flowcore: FlowCoreMock,
  translate: TranslateMock,
  voice: VoiceMock,
  callcenter: CallcenterMock,
  visicore: VisicoreMock,
  shift: ShiftMock,
  audit: AuditMock,
  "asset-lifecycle": AssetLifecycleMock,
  vendor: VendorMock,
  contract: ContractMock,
  budget: BudgetMock,
  coach: CoachMock,
  projectplanpredict: ProjectplanpredictMock,
};

export function hasMock(slug: string): boolean {
  return slug in REGISTRY;
}

export function AicoreMock({ slug, accent }: { slug: string; accent: string }) {
  const Mock = REGISTRY[slug];
  if (!Mock) return null;
  return <Mock accent={accent} />;
}
