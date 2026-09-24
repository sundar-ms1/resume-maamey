import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
}

export function Brand({
  href = "/",
  size = "lg",
  showSubtitle = true,
}: BrandProps) {
  // Dimensions tuned for clarity across desktop and mobile
  const iconDimensions = {
    sm: "h-9 w-9 sm:h-10 sm:w-10",
    md: "h-11 w-11 sm:h-12 sm:w-12",
    lg: "h-12 w-12 sm:h-14 sm:w-14",
  }[size];

  const textSizes = {
    sm: "text-sm",
    md: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl",
  }[size];

  return (
    <Link href={href} className="flex items-center gap-3.5 transition hover:opacity-95">
      {/* Enlarged Logo Container */}
      <div
        className={`relative ${iconDimensions} flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-canvas`}
      >
        <Image
          src="/logo.png"
          alt="Resume Maamey Logo"
          width={64}
          height={64}
          priority
          className="h-full w-full object-contain p-1"
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`font-black tracking-tight text-ink ${textSizes}`}>
          Resume Maamey
        </span>
        {showSubtitle && (
          <span className="text-[11px] font-medium text-ink-500">
            Free ATS Resume Maker
          </span>
        )}
      </div>
    </Link>
  );
}

export default Brand;