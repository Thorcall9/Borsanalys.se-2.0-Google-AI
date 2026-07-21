import React from "react";
import { Helmet } from "react-helmet-async";
import { serializeJsonLd } from "../lib/seo/structuredData";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterHandle?: string;
  noindex?: boolean;
  nofollow?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  publishedTime?: string;
  modifiedTime?: string;
}

export const SITE_ORIGIN = "https://www.borsanalys.se";

export function normalizeCanonical(input?: string): string {
  const source = input || (typeof window !== "undefined" ? window.location.pathname : "/");
  const parsed = new URL(source, SITE_ORIGIN);
  parsed.search = "";
  parsed.hash = "";
  let pathname = parsed.pathname.replace(/\/+$/, "") || "/";

  if (pathname === "/analyser") pathname = "/analys";
  if (pathname.startsWith("/analyser/")) pathname = `/analys/${pathname.slice("/analyser/".length)}`;

  return `${SITE_ORIGIN}${pathname}`;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "/og-image.png",
  twitterHandle = "@borsanalys",
  noindex = false,
  nofollow = false,
  jsonLd,
  publishedTime,
  modifiedTime,
}) => {
  const siteName = "Börsanalys.se";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "Professionella aktieanalyser drivna av data och AI. En minimalistisk och kraftfull plattform för moderna investerare.";
  const metaDescription = description || defaultDescription;
  const url = normalizeCanonical(canonical);
  const robots = noindex ? (nofollow ? "noindex, nofollow" : "noindex, follow") : undefined;
  const jsonLdItems = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {robots && <meta name="robots" content={robots} />}
      {!noindex && <link rel="canonical" href={url} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      {!noindex && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={siteName} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {jsonLdItems.map((item, index) => (
        <script
          key={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
        />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
    </Helmet>
  );
};

export default SEO;
