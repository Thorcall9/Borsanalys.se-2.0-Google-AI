import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  const baseUrl = 'https://www.borsanalys.se';

  const posts = [
    {
      title: 'Nvidia analys',
      description: 'Fullständig analys av Nvidia 2026',
      link: `${baseUrl}/analyser/nvidia`,
      pubDate: new Date().toUTCString(),
    },
    {
      title: 'Microsoft analys',
      description: 'Djupdykning i Microsoft',
      link: `${baseUrl}/analyser/microsoft`,
      pubDate: new Date().toUTCString(),
    },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Börsanalys</title>
    <link>${baseUrl}</link>
    <description>Senaste analyser från Börsanalys</description>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.link}</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${post.pubDate}</pubDate>
      <guid>${post.link}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.status(200).send(rss);
}
