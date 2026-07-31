# V11 Snapshot Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make each new v11 snapshot server-assembled, RFC 8785-canonicalized, SHA-256-hashed and independently verifiable without changing existing rows.

**Architecture:** The server loads approved revisions and non-conflicting sources, builds a deterministic structured payload, canonicalizes it, hashes it and persists it create-only. Callers never submit canonical JSON or a final hash. Verification reassembles/recanonicalizes stored content and compares the calculated hash in constant time.

**Tech Stack:** TypeScript, Zod, Prisma, Node `crypto`, Node test runner and a maintained RFC 8785 package.

## Global Constraints

- No migration, backfill, database mutation or modification of existing snapshots.
- Assess `json-canonicalize` as the RFC 8785/JCS dependency; do not hand-roll a serializer.
- Use `crypto.createHash('sha256')` and `timingSafeEqual`.
- Hash `schemaVersion`, `analysisModelVersion`, parent ID, approved sources and approved revision objects.
- A legacy row with missing version fields is readable but `legacy-unverifiable` and cannot be used as an automation baseline until a new compliant snapshot exists.
- Preserve same-analysis parent and cycle checks.
- Out of scope: KPI, thesis, financial model, valuation, reports, AI drafting, UI and recommendations.

### Task 1: Canonical JSON and hashing primitive

**Files:** Create `src/lib/v11/canonicalJson.ts`, `tests/v11/canonical-json.test.mjs`; modify `package.json` and lockfile only if package review approves it.

- [ ] Write failing tests: object-key order gives identical canonical output/hash; a changed value gives a different hash; a changed hash fails timing-safe verification.
- [ ] Run `node --experimental-strip-types --test tests/v11/canonical-json.test.mjs`; expect missing module.
- [ ] Implement `canonicalizeSnapshotPayload`, `sha256Hex` and `hashesMatch`.
- [ ] Re-run focused test; expect pass.
- [ ] Commit `feat(v11): canonicalize and hash snapshot payloads`.

### Task 2: Server-side assembly

**Files:** Create `src/lib/v11/snapshotAssembly.ts`, `tests/v11/snapshot-assembly.test.mjs`; modify `src/lib/v11/repository.ts`.

- [ ] Write failing tests: proposed revision, AI proposal and conflicting source are rejected; source/object ordering is deterministic; both version fields change the payload/hash.
- [ ] Run focused test; expect absent assembly behavior.
- [ ] Add read-only repository queries and `assembleSnapshotPayload`; it may consume only approved revisions and non-conflicting sources.
- [ ] Re-run focused test; expect pass.
- [ ] Commit `feat(v11): assemble approved snapshot payloads server-side`.

### Task 3: Restricted creation and read-back verification

**Files:** Modify `src/lib/v11/snapshots.ts`, `src/lib/v11/repository.ts`; create `tests/v11/snapshots.test.mjs`.

- [ ] Write failing tests: snapshot creation API has no caller hash/payload fields; server stores computed artifacts; tampered payload and tampered hash fail; cross-analysis parent and cycles still fail.
- [ ] Run focused test; expect API-contract failures.
- [ ] Implement assembly → canonicalization → hash → create-only persistence, then reassembly/hash verification on read-back.
- [ ] Re-run focused test; expect pass.
- [ ] Commit `feat(v11): harden snapshot creation and verification`.

### Task 4: Legacy policy and acceptance

**Files:** Modify `tests/v11/snapshots.test.mjs`, `tests/v11/repository-contract.test.mjs`.

- [ ] Write a failing test for a null-version legacy row: retained unchanged, verification returns `LEGACY_UNVERIFIABLE`, and baseline selection rejects it.
- [ ] Implement only the non-mutating legacy branch.
- [ ] Run `npx prisma validate`, `npm run lint`, all `tests/v11/*.test.mjs`, and the documented full-suite comparison.
- [ ] Commit `test(v11): verify hardened snapshot integrity`.

## Definition of Done

- New snapshots are server-assembled and cannot receive caller-controlled canonical payloads or hashes.
- Semantically equal payloads hash identically; payload/hash tampering is detected.
- Both version fields participate in the hash.
- Legacy rows remain immutable and explicitly non-automatable.
- No schema migration or Phase 2 capability is introduced.
