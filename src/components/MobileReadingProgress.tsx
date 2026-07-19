import React from "react";
import AnalysisProgressExperience, { AnalysisContentType } from "./AnalysisProgress";

interface MobileReadingProgressProps {
  label: "analys" | "guide";
  nextTitle?: string;
  nextHref?: string;
  analysisSlug?: string;
  contentType?: AnalysisContentType;
  companyName?: string;
  ticker?: string;
}

export default function MobileReadingProgress({ label, nextTitle, nextHref, analysisSlug, contentType, companyName, ticker }: MobileReadingProgressProps) {
  return <AnalysisProgressExperience label={label} nextTitle={nextTitle} nextHref={nextHref} analysisSlug={analysisSlug} contentType={contentType || (label === "guide" ? "guide" : "analysis")} companyName={companyName} ticker={ticker} />;
}
