import Image from "next/image";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x border-white/10 md:grid-cols-4",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-white/10" />

      {/* Row 1 */}
      <LogoCard
        className="relative border-r border-b border-white/10 bg-white/5"
        logo={{
          src: "/logos/sabanci.png",
          alt: "Sabancı Holding",
          className: "brightness-0 invert",
        }}
      />

      <LogoCard
        className="border-b border-white/10 md:border-r bg-transparent"
        logo={{
          src: "/logos/boyner.png",
          alt: "Boyner",
          className: "scale-[1.2] brightness-0 invert",
        }}
      />

      <LogoCard
        className="relative border-r border-b border-white/10 md:bg-white/5"
        logo={{
          src: "/logos/roketsan.png",
          alt: "Roketsan",
          className: "brightness-0 invert",
        }}
      />

      <LogoCard
        className="relative border-b border-white/10 bg-white/5 md:bg-transparent"
        logo={{
          src: "/logos/toyota.png",
          alt: "Toyota",
          className: "brightness-0 invert",
        }}
      />

      {/* Row 2 */}
      <LogoCard
        className="relative border-r border-b border-white/10 bg-white/5 md:bg-transparent"
        logo={{
          src: "/logos/logo.png",
          alt: "Logo Yazılım",
          className: "scale-90 brightness-0 invert",
        }}
      />

      <LogoCard
        className="border-b border-white/10 bg-transparent md:border-r md:bg-white/5"
        logo={{
          src: "/logos/qnb.png",
          alt: "QNB",
          className: "scale-90 brightness-0 invert",
        }}
      />

      <LogoCard
        className="border-r border-b border-white/10 bg-transparent"
        logo={{
          src: "/logos/kazanciV2.png",
          alt: "Kazancı",
          className: "scale-95 brightness-0 invert",
        }}
      />

      <LogoCard
        className="border-b border-white/10 bg-white/5"
        logo={{
          src: "/logos/misyon.png",
          alt: "Misyon Bank",
          className: "scale-[0.85] brightness-0 invert",
        }}
      />

      {/* Row 3 */}
      <LogoCard
        className="relative border-r border-b border-white/10 bg-white/5 md:border-b-0 md:bg-transparent"
        logo={{
          src: "/logos/bulutistan.png",
          alt: "Bulutistan",
          className: "scale-[1.05] brightness-0 invert",
        }}
      />

      <LogoCard
        className="border-b border-white/10 bg-transparent md:border-r md:border-b-0 md:bg-white/5"
        logo={{
          src: "/logos/aydinli.png",
          alt: "Aydınlı",
          className: "scale-[1.05] brightness-0 invert",
        }}
      />

      <LogoCard
        className="border-r border-white/10 bg-transparent"
        logo={{
          src: "/logos/uludag-enerji.png",
          alt: "Uludağ Enerji",
          className: "scale-[1.05] brightness-0 invert",
        }}
      />

      <LogoCard
        className="bg-white/5"
        logo={{
          src: "/logos/diyanet.png",
          alt: "T.C. Cumhurbaşkanlığı Diyanet İşleri Başkanlığı",
          className: "scale-[0.95] brightness-0 invert",
        }}
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-white/10" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo & { className?: string };
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-transparent px-6 py-10 md:py-12 md:px-10",
        className
      )}
      {...props}
    >
      <div className="relative w-full h-10 md:h-12 flex items-center justify-center">
        <Image
          alt={logo.alt}
          width={logo.width ?? 170}
          height={logo.height ?? 48}
          className={cn(
            "pointer-events-none max-h-full max-w-35 md:max-w-42.5 object-contain select-none transition-all duration-300 drop-shadow-sm",
            logo.className || "opacity-90 hover:opacity-100"
          )}
          src={logo.src}
        />
      </div>
      {children}
    </div>
  );
}
