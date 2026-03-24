export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  part: number;
  icon: string;
}

export const guides: Record<string, Guide> = {
  "grunderna-i-aktieanalys": {
    slug: "grunderna-i-aktieanalys",
    title: "Grunderna i aktieanalys",
    excerpt: "Lär dig hur du analyserar ett bolag från grunden, steg för steg.",
    content: "<h2>Välkommen till aktieanalysens värld</h2><p>Att analysera en aktie handlar om att förstå bolaget bakom aktien. I den här guiden går vi igenom de viktigaste stegen för att komma igång.</p><h3>1. Förstå affärsmodellen</h3><p>Hur tjänar bolaget pengar? Vilka är deras kunder? Vad gör dem unika?</p>",
    category: "Grundläggande",
    readTime: "5 min",
    part: 1,
    icon: "BookOpen"
  },
  "vardering-av-aktier": {
    slug: "vardering-av-aktier",
    title: "Värdering av aktier",
    excerpt: "Hur vet man om en aktie är billig eller dyr? Vi går igenom de vanligaste nyckeltalen.",
    content: "<h2>Värdering - konsten att sätta ett pris</h2><p>Ett bra bolag är inte alltid en bra investering om priset är för högt. Här lär vi oss om P/E-tal, P/S-tal och substansvärdering.</p>",
    category: "Värdering",
    readTime: "8 min",
    part: 2,
    icon: "Calculator"
  },
  "bygga-en-portfolj": {
    slug: "bygga-en-portfolj",
    title: "Bygga en portfölj",
    excerpt: "Strategier för riskspridning och hur du väljer rätt mix av aktier.",
    content: "<h2>Diversifiering är din bästa vän</h2><p>Lägg inte alla ägg i samma korg. Vi diskuterar hur många aktier man bör äga och hur man tänker kring olika branscher.</p>",
    category: "Strategi",
    readTime: "6 min",
    part: 3,
    icon: "TrendingUp"
  }
};
