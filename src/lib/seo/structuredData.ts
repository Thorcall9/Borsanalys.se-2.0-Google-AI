export const SITE_ORIGIN = "https://www.borsanalys.se";

function absoluteUrl(path: string): string {
  const input = new URL(path, SITE_ORIGIN);
  const url = new URL(SITE_ORIGIN);
  url.pathname = input.pathname.replace(/\/+$/, "") || "/";
  return url.toString();
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
}): Record<string, unknown> {
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(input.path),
    },
    author: {
      "@type": "Person",
      name: input.author || "Börsanalys.se",
    },
    publisher: {
      "@type": "Organization",
      name: "Börsanalys.se",
      url: SITE_ORIGIN,
    },
  };

  if (input.publishedTime) article.datePublished = input.publishedTime;
  if (input.modifiedTime) article.dateModified = input.modifiedTime;
  if (input.image) article.image = absoluteUrl(input.image);

  return article;
}

export function buildWebsiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: "Börsanalys.se",
        url: SITE_ORIGIN,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        name: "Börsanalys.se",
        url: SITE_ORIGIN,
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
    ],
  };
}

export function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
