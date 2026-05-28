import { investorAb } from "../src/data/analyses/investor/investor-ab.ts";
import { sbb } from "../src/data/analyses/sbb/sbb.ts";
import { nvidiaFy2026 } from "../src/data/analyses/nvidia/nvidia-fy2026.ts";
import { apple } from "../src/data/analyses/apple/apple.ts";
import { microsoft } from "../src/data/analyses/microsoft/microsoft.ts";
import { novoNordisk } from "../src/data/analyses/novo-nordisk/novo-nordisk.ts";
import { volvo } from "../src/data/analyses/volvo/volvo.ts";
import { alphabet } from "../src/data/analyses/alphabet/alphabet.ts";
import { evolution2025 } from "../src/data/analyses/evolution/evolution-2025.ts";
import { swedbank2025 } from "../src/data/analyses/swedbank/swedbank-2025.ts";
import { handelsbanken2025 } from "../src/data/analyses/handelsbanken/handelsbanken-2025.ts";
import { ericsson2025 } from "../src/data/analyses/ericsson/ericsson-2025.ts";
import { newWaveGroup2025 } from "../src/data/analyses/new-wave-group/new-wave-group.ts";
import { aqGroup } from "../src/data/analyses/aq-group/aq-group.ts";
import { nibe2026 } from "../src/data/analyses/nibe/nibe-2026.ts";
import { nordea2026 } from "../src/data/analyses/nordea/nordea-bank-2026.ts";
import { saab2026 } from "../src/data/analyses/saab/saab-2026.ts";

const items = {
  "investor-ab": investorAb,
  "sbb": sbb,
  "nvidia-fy2026": nvidiaFy2026,
  "apple": apple,
  "microsoft": microsoft,
  "novo-nordisk": novoNordisk,
  "volvo": volvo,
  "alphabet": alphabet,
  "evolution-2025": evolution2025,
  "swedbank-2025": swedbank2025,
  "ericsson-2025": ericsson2025,
  "handelsbanken-2025": handelsbanken2025,
  "new-wave-group-april-2026": newWaveGroup2025,
  "aq-group": aqGroup,
  "nibe-industrier-2026": nibe2026,
  "nordea-bank-2026": nordea2026,
  "saab-2026": saab2026,
};

for (const [key, item] of Object.entries(items)) {
  const baseScenarioVal = item.scenarios?.find(s => s.type === "base")?.value || "N/A";
  console.log(`KEY: ${key} | PRICE: ${item.price} | RECOM: ${item.recommendation} | TARGET_PRICE: ${item.targetPrice || "N/A"} | BASE_SCENARIO: ${baseScenarioVal}`);
}
