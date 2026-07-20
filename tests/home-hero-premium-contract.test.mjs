import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const heroUrl = new URL("../src/components/Hero.tsx", import.meta.url);
const stylesUrl = new URL("../src/index.css", import.meta.url);
const methodologyUrl = new URL("../src/components/MethodologySection.tsx", import.meta.url);
const homeUrl = new URL("../src/pages/Home.tsx", import.meta.url);
const publicationsUrl = new URL("../src/components/community/RecentPublications.tsx", import.meta.url);

test("homepage hero uses free optical typography and a dominant search interaction", async () => {
  const hero = await readFile(heroUrl, "utf8");
  const styles = await readFile(stylesUrl, "utf8");

  assert.match(hero, /hero-title-line-primary/);
  assert.match(hero, /hero-title-line-accent/);
  assert.match(hero, /Sök efter bolag, analyser eller guider/);
  assert.match(hero, /primary-action[^\n]*hero-primary-action|hero-primary-action[^\n]*primary-action/);
  assert.match(hero, /secondary-action[^\n]*hero-secondary-action|hero-secondary-action[^\n]*secondary-action/);
  assert.match(styles, /\.homepage-hero/);
  assert.match(styles, /\.hero-title[\s\S]*max-w-\[84rem\]/);
  assert.match(hero, /max-w-\[88rem\]/);
  assert.match(hero, /text-\[clamp\(2\.25rem,8vw,8rem\)\]/);
  assert.match(hero, /hero-content-column/);
  assert.match(hero, /tracking-\[-0\.025em\]/);
  assert.match(styles, /\.hero-title-line[\s\S]*md:leading-\[0\.96\]/);
  assert.doesNotMatch(styles, /\.hero-title-line-accent[^}]*text-\[/);
  assert.doesNotMatch(styles, /\.hero-title-line-accent[\s\S]*translate-x/);
  assert.doesNotMatch(hero, /bg-muted[^\n]*<h1|<h1[^>]*bg-muted/);
});

test("homepage hero keeps the Swedish value proposition and both actions", async () => {
  const hero = await readFile(heroUrl, "utf8");

  assert.match(hero, /Förstå bolaget\./);
  assert.match(hero, /Investera smartare\./);
  assert.match(hero, /Förstå affärsmodell, värdering och risk innan ditt nästa investeringsbeslut/);
  assert.match(hero, /Utforska analyser/);
  assert.match(hero, /Bli medlem gratis/);
  assert.match(hero, /openSearch\("hero"\)/);
  assert.match(hero, /openLoginModal/);
});

test("homepage supporting surfaces keep a restrained premium hierarchy", async () => {
  const methodology = await readFile(methodologyUrl, "utf8");
  const home = await readFile(homeUrl, "utf8");
  const publications = await readFile(publicationsUrl, "utf8");

  assert.match(methodology, /METHODOLOGY_STEPS\.slice\(0, 7\)/);
  assert.match(methodology, /surface-card surface-card-hover group/);
  assert.match(methodology, /methodology-icon/);
  assert.match(home, /25 \/ 35/);
  assert.match(home, /BEVAKA/);
  for (const scenario of ["Bull", "Base", "Bear"]) assert.match(home, new RegExp(scenario));
  assert.match(publications, /const isPrimary = index === 0/);
  assert.match(publications, /recent-publication-primary/);
  assert.match(publications, /Se alla analyser/);
});
