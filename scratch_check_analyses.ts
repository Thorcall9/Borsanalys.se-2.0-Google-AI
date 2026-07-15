import { analyses } from "./src/data/analyses/index.ts";

for (const [key, val] of Object.entries(analyses)) {
  console.log(`${key}: ticker = ${val?.ticker}`);
}
