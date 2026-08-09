import React from "react";
import { ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import type { AnalysisPresentation } from "./analysisPresentation";
import CompanyVisual from "../company/CompanyVisual";

export default function FeaturedAnalysisCard({ analysis }: { analysis: AnalysisPresentation }) {
  return (
    <article className="featured-analysis-card">
      <div className="featured-analysis-label-row">
        <span className="eyebrow">Utvald analys</span>
        <span className="recommendation-badge"><Eye size={13} aria-hidden="true" />{analysis.recommendation}</span>
      </div>
      <div className="featured-analysis-body">
        <div className="featured-analysis-logo" aria-hidden="true">
          <CompanyVisual ticker={analysis.ticker} className="company-visual--featured" />
        </div>
        <div className="featured-analysis-copy">
          <p className="featured-analysis-company">{analysis.companyName} · {analysis.ticker}</p>
          <h2>{analysis.title}</h2>
          <p>{analysis.summary}</p>
        </div>
        {analysis.potential && (
          <div className="featured-analysis-potential" aria-label={`Beräknad potential ${analysis.potential}`}>
            <span>Potential</span>
            <strong>{analysis.potential}</strong>
          </div>
        )}
      </div>
      <div className="featured-analysis-footer">
        <span className="featured-analysis-note">Kvalitet, värdering och risk i samma ramverk.</span>
        <Link to={analysis.href} className="text-link">Läs analysen <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
