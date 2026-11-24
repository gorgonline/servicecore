import { En } from "@/components/ui/En";

interface AppliCoreNameProps {
  className?: string;
}

/** Urun ailesinin yazimi: "Core", onundeki parcadan bir tik agir. */
export default function AppliCoreName({ className }: AppliCoreNameProps) {
  return (
    <En className={className}>
      <span className="font-normal">Appli</span>
      <span className="font-medium">Core</span>
    </En>
  );
}
