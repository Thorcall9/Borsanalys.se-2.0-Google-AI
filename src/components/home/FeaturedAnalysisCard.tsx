import React from "react";
import { ArrowRight, Eye, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";
import type { AnalysisPresentation } from "./analysisPresentation";

export default function FeaturedAnalysisCard({ analysis }: { analysis: AnalysisPresentation }) {
  const scorePercent = analysis.score ? (analysis.score.value / analysis.score.max) * 100 : 0;
  const circumference = 2 * Math.PI * 29;

  return (
    <article className="featured-analysis-card">
      <div className="featured-analysis-label-row">
        <span className="eyebrow">Utvald analys</span>
        <span className="recommendation-badge"><Eye size={13} aria-hidden="true" />{analysis.recommendation}</span>
      </div>
      <div className="featured-analysis-body">
        <div className="featured-analysis-logo" aria-hidden="true">
          {analysis.image ? <img src={analysis.image} alt="" /> : <ImageOff size={28} />}
        </div>
        <div className="featured-analysis-copy">
          <p className="featured-analysis-company">{analysis.companyName} · {analysis.ticker}</p>
          <h2>{analysis.title}</h2>
          <p>{analysis.summary}</p>
        </div>
        {analysis.score && (
          <div className="score-ring" aria-label={`Totalpoäng ${analysis.score.value} av ${analysis.score.max}`}>
            <svg viewBox="0 0 72 72" aria-hidden="true">
              <circle className="score-ring-track" cx="36" cy="36" r="29" />
              <circle className="score-ring-progress" cx="36" cy="36" r="29" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - scorePercent / 100)} />
            </svg>
            <strong>{analysis.score.value}</strong>
            <span>av {analysis.score.max}</span>
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
