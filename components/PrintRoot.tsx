"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ResumeDocument } from "./resume/ResumeDocument";
import { useResume } from "@/lib/store";

export default function PrintRoot() {
  const [mounted, setMounted] = useState(false);
  const { data } = useResume();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      id="resume-pdf-root"
      className="resume-pdf-root"
      aria-hidden="true"
    >
      <div className="resume-pdf-page">
        <ResumeDocument
          data={data}
        />
      </div>
    </div>,
    document.body
  );
}