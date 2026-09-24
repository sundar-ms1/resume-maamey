"use client";

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
  const iconDimensions = {
    sm: "h-9 w-9 sm:h-10 sm:w-10",
    md: "h-11 w-11 sm:h-12 sm:w-12",
    lg: "h-12 w-12 sm:h-14 sm:w-14",
  }[size];

  const textSizes = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-xl sm:text-2xl",
  }[size];

  return (
    <Link
      href={href}
      className="flex items-center gap-3.5 transition hover:opacity-95"
    >
      {/* Logo Icon Container */}
      <div
        className={`relative ${iconDimensions} flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100`}
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

      {/* Brand Title with Gradient Styling */}
      <div className="flex flex-col justify-center">
        <div className={`font-black tracking-tight leading-tight ${textSizes}`}>
          <span style={{ color: "#0a1733" }}>Resume </span>
          <span
            style={{
              background:
                "linear-gradient(90deg, #0062ff 0%, #6342f5 55%, #8f2bf5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Maamey
          </span>
        </div>

        {showSubtitle && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Free ATS Resume Maker
          </span>
        )}
      </div>
    </Link>
  );
}

export default Brand;