# Featured Score Spacing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the featured analysis score ring closer to the summary copy on mobile.

**Architecture:** Keep the existing `FeaturedAnalysisCard` markup and score calculation unchanged. Adjust only the mobile CSS grid spacing and score-ring offset in `src/index.css`, preserving the desktop layout.

**Tech Stack:** React, Vite, Tailwind CSS v4, plain responsive CSS.

## Global Constraints

- Do not change score values, card copy, or desktop layout.
- Keep the score ring accessible and visually attached to the featured analysis content.
- Verify the rendered mobile page after the CSS change.

---

### Task 1: Tighten mobile score-ring spacing

**Files:**
- Modify: `src/index.css:350-355`
- Test: `tests/home-featured-analysis-contract.test.mjs`

**Interfaces:**
- Consumes: Existing `.featured-analysis-body` and `.score-ring` styles.
- Produces: A mobile featured analysis card whose score ring sits closer to the summary copy.

- [ ] **Step 1: Add a contract assertion for the mobile spacing rule**

Add an assertion that the mobile CSS uses a reduced row gap and a small upward score offset.

- [ ] **Step 2: Run the focused contract test and confirm it fails**

Run: `node --test tests/home-featured-analysis-contract.test.mjs`

Expected: FAIL because the new mobile spacing declarations are not present yet.

- [ ] **Step 3: Add the minimal mobile CSS adjustment**

In the existing `@media (max-width: 640px)` block, update the featured analysis body and score ring rules:

```css
.featured-analysis-body { grid-template-columns: 4.7rem minmax(0, 1fr); gap: 0.45rem 0.8rem; }
.score-ring { grid-column: 1 / -1; justify-self: start; width: 3.6rem; height: 3.6rem; margin-top: -0.2rem; }
```

- [ ] **Step 4: Run focused and type checks**

Run: `node --test tests/home-featured-analysis-contract.test.mjs`

Expected: PASS.

Run: `npm run lint`

Expected: PASS with exit code 0.

- [ ] **Step 5: Verify the rendered mobile card**

Run the Vite app and inspect the homepage at a mobile viewport. Confirm the score ring is visibly closer to the summary, remains inside the card, and the footer still has readable separation.
