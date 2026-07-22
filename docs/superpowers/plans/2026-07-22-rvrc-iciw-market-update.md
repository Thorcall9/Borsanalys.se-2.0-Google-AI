# RVRC ICANIWILL Market Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with review checkpoints.

**Goal:** Publish the supplied RVRC ICANIWILL market update through the existing market-update route and rendering model.

**Architecture:** Replace the article Markdown source and update only the related analysis metadata. Extend the existing header metric grid just enough to display the supplied dividend value alongside the existing recommendation, price, P/E, and yield fields.

**Tech Stack:** React, TypeScript, Vite, custom Markdown parser, Tailwind CSS.

## Global Constraints

- Preserve `revolutionrace-iciw` and `revolutionrace-2026`.
- Preserve `market-update`, `BEVAKA`, and recommendation change “Ingen”.
- Do not modify the base analysis, score model, or recommendation logic.
- Use only user-supplied copy and figures.

### Task 1: Update article source and metadata

**Files:**
- Modify: `analyses/RVRC/ICANIWILL_marknadsuppdatering_juli2026.md`
- Modify: `src/data/analyses/revolutionrace/revolutionrace-iciw.ts`

- [ ] Replace the Markdown body with the supplied article, omitting the header metric table and `⸻` text markers.
- [ ] Set the title to “RevolutionRace köper ICANIWILL – ett logiskt förvärv som breddar caset”.
- [ ] Set the header values to `59,25 kr`, `19,2×`, `1,35 kr`, and `Cirka 2,3 %`; retain relation, slug, market-update type, and BEVAKA.

### Task 2: Render the dividend metric with the existing header pattern

**Files:**
- Modify: `src/components/analysis/ReportComment.tsx`

- [ ] Add the metadata field to the displayed quick-metrics grid, preserving the existing responsive grid and styling.
- [ ] Do not add a separate Markdown-only header implementation.

### Task 3: Verify

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run the existing analysis relation/content tests.
- [ ] Start the Vite app and inspect `/analys/revolutionrace-iciw` at desktop and mobile widths, checking page identity, visible article content, internal link, metrics, date, and console errors.
