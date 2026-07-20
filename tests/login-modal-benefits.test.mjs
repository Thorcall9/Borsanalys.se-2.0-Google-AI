import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const source = fs.readFileSync(new URL("../src/components/LoginModal.tsx", import.meta.url), "utf8");

test("login modal explains the membership benefits", () => {
  for (const [title, description] of [
    ["Spara analyser", "Samla intressanta bolag och hitta enkelt tillbaka till dem senare."],
    ["Följa bolag", "Se när en ny analys, rapportkommentar eller viktig uppdatering publiceras."],
    ["Påverka vad som analyseras härnäst", "Rösta på de bolag du vill läsa mer om."],
    ["Få en personlig överblick", "Håll ordning på dina sparade analyser, bevakningar och senaste uppdateringar."],
    ["Följa hur caset utvecklas", "Se nya rapportkommentarer och förändringar i bedömningen över tid."],
  ]) {
    assert.match(source, new RegExp(title));
    assert.match(source, new RegExp(description));
  }
  assert.match(source, /Få mer värde av varje analys/);
  assert.match(source, /SKAPA KONTO GRATIS/);
});
