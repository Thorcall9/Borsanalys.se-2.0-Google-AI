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

## R4 transparency update, 28 October 2026

Primary assumptions, scenario weights, dated reference quote and primary values remain unchanged from r3. Base-light is an unweighted sensitivity: Q4 +15%, then annual growth 8%, terminal EBIT margin 9.5%, P/E 22. EPS 9.678170053956523 and terminal value 212.91974118704348 SEK; total-return IRR -3.2855674094812326% assuming unchanged Base dividends to isolate the sensitivity. This is not a fourth weighted outcome or a recalculated cash forecast.

Weight sensitivity 30/50/20 gives 249.6818903127367 SEK and 3.9526162752558824% IRR; 35/45/20 gives 241.951038261563 SEK and 2.465593425216672% IRR. Main BEVAKA conclusion remains below the 10% hurdle in each alternative.

EV/EBIT is renamed an alternative valuation bridge; 271.2 SEK is explicitly shown and not used as independent confirmation. P/E 24 is conditional on underpinned FCF normalization; both cash and premium must be reviewed if normalization is not supported. No mechanical conversion-to-multiple rule is invented. Existing terminal FCF remains explicitly provisional. Base is labeled a favorable outcome, with terminal EBIT margin above Q3 10.1% and R12 9.7%; Q3 EBT 10.0% is kept separate. Source: Q3 report, printed page 1.

Seven financial consistency tests pass, including preserved main scenarios, isolated Base-light, reweighted values and dated IRRs. Build passes. Twelve-page PDF inspected; no layout overflow. No fresh browser smoke claim is made; prior Chromium launch limitation remains. Author disclosure remains pending; no production merge or publication.

## R5 component cash-flow model, 28 October 2026

Replaces the previous scaled FCF budgets for all scenarios and all forward periods with EBT + D&A + other noncash - cash taxes - operating working capital absorption - gross capex - lease principal. Historical R12 bridge ties to reported CFO 753 and FCF 345 with an explicitly identified -1 MSEK rounding difference. D&A 350 is the directly reported R12 figure; the sum of rounded annual/nine-month components can produce 351.

Operating working capital proxy at 30 September: inventory 1696 + receivables 2505 + other current assets ex tax 250 - payables 1070 - contract liabilities 128 - other current liabilities 561 = 2692 MSEK; 27.4051% of R12 revenue 9823. The current higher ratio is held constant; year-end 2025 proxy ratio was 24.4515%. No assumed efficiency gain or one-time release. D&A 3.5%, capex 3.0% (vs R12 2.6%), lease amortization 1.6%, cash tax normalized to 21–22% of EBT rather than extrapolating R12 paid-tax ratio 13.7%. Other noncash adjustments assumed zero. Forecast Q4 margins 9/10.1/10.5% and FY2027 margins 8.5/10.1/10.8%; 2028 operating scenarios remain unchanged. All assumptions are identified as editorial, not guidance. The WC proxy is not a complete forecast balance sheet and does not purport to explain historical currency/acquisition/other liability differences.

Base terminal FCF 541.5410871754234 MSEK, conversion 53.10534937425551%; revised closing net cash 1057.85 MSEK (see canonical full precision). Slow growth reduces incremental cash absorption in Bear; Bull uses cash for high growth. The previous 67% assumption was not forced into the model. Base PE reduced 24 to 22, Bull 28 to 26 by editorial judgment in response to cash requirements, without a mechanical conversion/multiple rule. EV/EBIT is explicitly derived as PE*(1-tax) and is an algebraic alternative bridge, not independent evidence.

Weighted terminal value 239.27367455067719 SEK; weighted cash-flow IRR 1.9699603874142713%; 10% hurdle price 199.3384954034733 SEK. Base terminal 243.85293977876418, IRR 2.8639829649337867%, hurdle price 203.11186293746968. Algebraic EV/EBIT bridge 250.58887204793203 SEK. Dated 234.60 SEK quote remains unchanged at 28 October 15:21 CET to isolate model revision.

Adds Bull 15% sensitivities with the reallocated weight made explicit and a four-scenario illustration using updated values, not stale r4 values. Base-light remains unweighted and unchanged at 212.91974118704348. Front-page Base-light conclusion, no duplicated sales-path paragraphs, source-ID gap explanation. PDF shortened 12 to 9 pages with cashflow tables and assumption rationale retained. R4 dossier archived immutably.

Validation: 10 financial consistency tests pass (actual bridge/rounding, independent scenario EPS/EV arithmetic, component FCF to cumulative cash, dated IRR/PV, scenario reweights, four-scenario isolation, unchanged operating assumptions and revised premium). Production bundle build passes. Nine-page PDF visually reviewed, including component cash table and revised sensitivity table. No fresh browser smoke pass claimed; temporary Chromium launch limitation from r3 remains. Current author disclosure and other conflict confirmation remain pending. No merge or production publication.
