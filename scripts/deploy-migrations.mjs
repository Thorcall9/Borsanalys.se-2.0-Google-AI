import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const migrationName = "20260719120000_add_stock_checklists";
const migrationFile = path.join(root, "prisma", "migrations", migrationName, "migration.sql");

function run(args) {
  return spawnSync("npx", ["prisma", ...args], { cwd: root, encoding: "utf8", stdio: ["inherit", "pipe", "pipe"] });
}

const deploy = run(["migrate", "deploy"]);
process.stdout.write(deploy.stdout || "");
process.stderr.write(deploy.stderr || "");
if (deploy.status === 0) process.exit(0);

const output = `${deploy.stdout || ""}\n${deploy.stderr || ""}`;
if (!output.includes("P3005")) process.exit(deploy.status || 1);

console.warn("Prisma hittade en befintlig databas utan migrationshistorik. Applicerar checklistmigrationen och baselinar den.");
const execute = run(["db", "execute", "--file", migrationFile]);
process.stdout.write(execute.stdout || "");
process.stderr.write(execute.stderr || "");
if (execute.status !== 0) process.exit(execute.status || 1);

const resolve = run(["migrate", "resolve", "--applied", migrationName]);
process.stdout.write(resolve.stdout || "");
process.stderr.write(resolve.stderr || "");
process.exit(resolve.status || 0);
