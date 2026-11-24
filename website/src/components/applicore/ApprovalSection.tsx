import data from "@/data/applicore/tasarim.json";
import PointList from "./PointList";
import Reveal from "./Reveal";
import Screenshot from "./Screenshot";
import Section from "./Section";

export default function ApprovalSection() {
  const { approval } = data;

  return (
    <Section id={approval.id} eyebrow={approval.eyebrow} title={approval.title} lead={approval.lead}>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Screenshot
            src={approval.image}
            alt={approval.imageAlt}
            caption={approval.imageCaption}
            width={760}
            height={900}
            sizes="(min-width: 1024px) 500px, 100vw"
          />
        </Reveal>
        <PointList points={approval.bullets} className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7" />
      </div>
    </Section>
  );
}
