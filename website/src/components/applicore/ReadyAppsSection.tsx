import data from "@/data/applicore/uygulamalar.json";
import NumberedSteps from "./NumberedSteps";
import ReadyAppTabs from "./ReadyAppTabs";
import Reveal from "./Reveal";
import Screenshot from "./Screenshot";
import Section from "./Section";
import SubHeading from "./SubHeading";

export default function ReadyAppsSection() {
  return (
    <Section id={data.id} eyebrow={data.eyebrow} title={data.title} lead={data.lead}>
      <ReadyAppTabs />

      <Reveal className="mt-16">
        <Screenshot
          src={data.image}
          alt={data.imageAlt}
          caption={data.imageCaption}
          width={1412}
          height={772}
          sizes="(min-width: 1280px) 1184px, 100vw"
        />
      </Reveal>

      <SubHeading className="mt-20 mb-8">{data.installTitle}</SubHeading>
      <NumberedSteps steps={data.installSteps} className="sm:grid-cols-2 lg:grid-cols-5" />
      <p className="mt-6 max-w-4xl text-sm font-light leading-relaxed text-(--color-text-secondary)">{data.installNote}</p>
    </Section>
  );
}
