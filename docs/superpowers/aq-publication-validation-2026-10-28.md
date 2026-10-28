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

## R3 model review, 28 October 2026

R3 supersedes r2's publication-ready assessment. Current status is AWAITING_AUTHOR_DISCLOSURE; the author has not reconfirmed ownership or other conflicts since 28 May. The route remains a protected preview and now defaults to noindex.

Base Q4 total growth is 15% (12% organic + 3% acquired + 0% FX); 2026 revenue 10,171.45 MSEK grows 11% per year to 12,532.243545 MSEK in 2028. The lower starting level propagates through earnings and FCF. Bear and Bull Q4 bridges are explicit too. No unannounced M&A or acquired earnings enters the forward model. Closing net cash is residual after FCF, dividends and 9 MSEK deferred Norlake consideration. No cash is added to P/E values.

Explicit hurdle: nominal 10% before tax; hypothetical dividends paid 30 April 2027/2028. IRR is computed on weighted dated cash flows, not the weighted average scenario IRR. Weighted terminal value 257.4127423639104 SEK, total return IRR 5.415184646719451%, conditional 10% entry price 214.07925973289133 SEK from dated quote 234.60 SEK at 15:21 CET. Scenario dispersion and isolated margin/multiple sensitivity are displayed.

Validation: five financial consistency tests pass; production bundle build passes. PDF ten-page render reviewed. This turn's browser smoke run could not start: the existing temporary Chromium binary exited with SIGSEGV before page creation. Prior r2 UI checks do not constitute a fresh r3 browser pass. Existing unrelated full TypeScript check limitation (missing src/lib/corsConfig.ts in server.ts) remains documented above. No production deployment or merge is authorized by this model revision.
