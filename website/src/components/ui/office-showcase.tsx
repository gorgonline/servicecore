"use client";

import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

interface OfficeShowcaseProps {
  image: string;
  alt: string;
  label: string;
  address: string;
  phone: string;
  mapQuery: string;
  reverse?: boolean;
}

export function OfficeShowcase({
  image,
  alt,
  label,
  address,
  phone,
  mapQuery,
  reverse = false,
}: OfficeShowcaseProps) {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image side */}
        <div className="relative h-80 md:h-96 lg:h-112 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover blur-[2px] scale-105 opacity-70"
          />
          <div className="absolute inset-0 bg-linear-to-br from-(--color-surface-base)/50 via-(--color-surface-base)/30 to-(--color-surface-base)/60" />

          {/* Blue info box */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 max-w-[85%] md:max-w-[75%] rounded-2xl bg-(--color-brand-primary) border border-white/20 shadow-2xl p-6 md:p-7 backdrop-blur-md">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
              {label}
            </h3>
            <div className="flex items-start gap-2.5 mb-3">
              <MapPin className="w-4 h-4 text-white/90 shrink-0 mt-0.5" />
              <p className="text-sm md:text-[15px] text-white/95 font-light leading-relaxed">
                {address}
              </p>
            </div>
            {phone && (
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white/90 shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-sm md:text-[15px] text-white font-semibold tracking-tight hover:underline cursor-pointer"
                >
                  {phone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Map side */}
        <div className="relative h-80 md:h-96 lg:h-112 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-(--color-surface-elevated)">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              mapQuery,
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="grayscale-40 hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
}
