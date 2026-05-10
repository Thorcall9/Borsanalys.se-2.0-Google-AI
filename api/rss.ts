import type { Request, Response } from 'express';
import { analyses } from '../src/data/analyses/index.js';

export default async function handler(req: Request, res: Response) {
  const baseUrl = 'https://www.borsanalys.se';
  const defaultImage = `${baseUrl}/og-image.png`;

  // Get all analyses and sort by date (newest first)
  const allAnalyses = Object.values(analyses).sort((a, b) => {
    const dateA = a.date || '2000-01-01';
    const dateB = b.date || '2000-01-01';
    return dateB.localeCompare(dateA);
  });

  const rssItems = allAnalyses.map(post => {
    const link = `${baseUrl}/analys/${post.slug}`;
    const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
    const image = post.image || defaultImage;
    
    // Create a rich description with an image
    const description = `
      <![CDATA[
        <p><img src="${image}" alt="${post.title}" style="max-width: 100%; height: auto; margin-bottom: 15px;" /></p>
        <p>${post.summary}</p>
        <p><strong>Rekommendation: ${post.recommendation}</strong></p>
        <p><a href="${link}">Läs hela analysen på Börsanalys.se</a></p>
      ]]>
    `.trim();

    return `
    <item>
      <title><![CDATA[${post.title} Analys]]></title>
      <link>${link}</link>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
      <media:content url="${image}" medium="image" type="image/png" />
      <enclosure url="${image}" length="0" type="image/png" />
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Börsanalys.se - Senaste aktieanalyserna</title>
    <link>${baseUrl}</link>
    <description>Professionella aktieanalyser drivna av data och AI. Vi granskar kvalitet, tillväxt och värdering.</description>
    <language>sv-se</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${defaultImage}</url>
      <title>Börsanalys.se</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.status(200).send(rss);
}
