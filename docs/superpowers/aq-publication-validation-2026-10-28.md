# AQ publication validation

- Production build: passed (`npm run build`).
- Eight targeted tests passed: model/scenario invariance, dates/annualization, financing and FCF, provenance/disclaimer, RVRC preservation, and deep-dive loader compatibility.
- Browser plugin not available; Playwright used with a temporary external Chromium binary, no application dependency changes.
- Desktop 1280×1000 and mobile390×844: new AQ route renders, 260.5SEK value and indexed metadata present, no page errors or document overflow.
- Public signup button opens the account modal; navigation to valuation works.
- Synthetic authenticated state: member result bridge, EV/EBIT, cash budget and thesis thresholds render. Guest state does not render these tables. This tests presentation state, not real account authentication.
- Archive includes the new analysis and displays annualized potential +4.3%/year with MEDEL–HÖG risk.
- Mobile Investment Snapshot is visible above the title and contains recommendation, risk, weighted value, terminal date, dated quote and both potentials.
- Original AQ April metadata/component unchanged; original RVRC files unchanged.
- Full TypeScript check remains blocked only by the pre-existing `server.ts:27` import of missing `src/lib/corsConfig.ts`; HEAD contains that import and lacks the file. No change made outside scope to fix it.
- Local archive market quote API requests fail because the production backend is not started in the UI-only harness; new AQ reference data are fixed canonical values and do not use this API.
- Eight-page updated PDF visually reviewed; no clipping or spill pages. Full dossier and original r1/report PDFs retained in the updated analysis package.
