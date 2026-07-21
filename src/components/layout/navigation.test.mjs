import assert from "node:assert/strict";
import { navItems } from "./navigation.ts";

assert.equal(navItems.some((item) => item.path === "/marknad"), false);
console.log("navigation test passed");
