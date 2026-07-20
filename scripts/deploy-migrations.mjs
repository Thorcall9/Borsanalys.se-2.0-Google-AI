import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const migrationName = "20260719120000_add_stock_checklists";
const migrationFile = path.join(root, "prisma", "migrations", migrationName, "migration.sql");
const schemaFile = path.join(root, "prisma", "schema.prisma");

function run(args) {
  return spawnSync("npx", ["prisma", ...args], { cwd: root, encoding: "utf8", stdio: ["inherit", "pipe", "pipe"] });
}

function wait(seconds) {
  spawnSync("sleep", [String(seconds)], { stdio: "ignore" });
}

let deploy;
let output = "";
const maxAttempts = 4;

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  deploy = run(["migrate", "deploy"]);
  process.stdout.write(deploy.stdout || "");
  process.stderr.write(deploy.stderr || "");
  output = `${deploy.stdout || ""}\n${deploy.stderr || ""}`;

  if (deploy.status === 0 || !output.includes("P1002") || attempt === maxAttempts) break;

  console.warn(`Prisma-migreringen väntar på ett annat deploy-lås. Försöker igen om 5 sekunder (${attempt}/${maxAttempts - 1}).`);
  wait(5);
}

if (deploy.status === 0) process.exit(0);

if (!output.includes("P3005")) process.exit(deploy.status || 1);

console.warn("Prisma hittade en befintlig databas utan migrationshistorik. Applicerar checklistmigrationen och baselinar den.");
const execute = run(["db", "execute", "--schema", schemaFile, "--file", migrationFile]);
process.stdout.write(execute.stdout || "");
process.stderr.write(execute.stderr || "");
if (execute.status !== 0) process.exit(execute.status || 1);

const resolve = run(["migrate", "resolve", "--applied", migrationName]);
process.stdout.write(resolve.stdout || "");
process.stderr.write(resolve.stderr || "");
process.exit(resolve.status || 0);
