# Analysmall v11 Design Specification

**Status:** Approved for implementation planning on 2026-07-30.

## Goal

Build an internal, versioned analysis system for Börsanalys.se. It keeps reported facts, assumptions, estimates, valuation, theses, recommendation, editorial approval, and immutable snapshots distinct and traceable. It also provides a safe report-automation pipeline that compares incoming events only to the latest approved snapshot.

This specification defines the target architecture. Implementation is incremental: each subsystem must be independently deployable and useful without completion of the full architecture. No release may depend on an all-or-nothing rewrite of the analysis workflow.

## Governing rules

- Every persistent object must have a direct role in analysis quality, automation reliability, editorial efficiency or auditability. If an object cannot justify its long-term value, it should not exist.
- Facts precede conclusions; all decision-bearing objects have explicit dependency IDs.
- Reported, calculated, company guidance, consensus, AI proposals, and approved Börsanalys.se estimates are separate value origins.
- AI may extract, structure, compare, classify, and draft. It cannot approve, change a recommendation, target price, thesis status, snapshot, or publication.
- Approval creates a revision. Approved revisions are never mutated.
- Snapshots are server-created, create-only, RFC 8785 canonical JSON payloads hashed with SHA-256, and include the semantic `analysisModelVersion` that governed their definitions and calculations.
- Snapshots contain approved objects only, and no referenced source may be conflicting.
- Only KÖP, BEVAKA, and AVSTÅ are allowed recommendations.
- DCF, WACC, and terminal value are out of scope for the ordinary engine and must be rejected as valuation methods.

## Architecture

The implementation has eight bounded areas:

1. **Domain schemas:** Zod schemas and TypeScript types for sources, facts, periods, assumptions, estimates, bridges, theses, decisions, documents, and events.
2. **Investment Thesis Engine:** the analytical hub connecting calculated observations, KPI profiles, assumptions, financial-model dependencies, valuation evidence, risks and triggers.
3. **Financial Model Engine:** shared-definition NTM and five-year model bridges, scenario calculations, sensitivity, cash-flow modelling and valuation inputs.
4. **Revision and approval service:** dependency validation, immutable revisions, human-only approval transitions and decision history.
5. **Valuation service:** allowed methods, dilution safeguards, bridge roles, scenario target prices, and non-mechanical recommendation evidence.
6. **Snapshot service:** approved-object assembly, canonical serialization, hashing, immutable persistence, revision-chain links and verification.
7. **Report pipeline:** document registration, paginated extraction boundary, mathematical validation, snapshot comparison, classification, AI drafting, review, and preview.
8. **Editorial API/UI:** authenticated internal workflows; no public release path in the first delivery.

## Formats

`base-analysis` is the only format that can generate an immutable snapshot. `report-commentary` and `market-update` are linked to a snapshot and can never mutate it. The only permitted event types are `quarterly-report`, `annual-report`, `acquisition`, `divestment`, `profit-warning`, `guidance-change`, `management-change`, `capital-raise`, `strategic-event`, and `other`. The only editorial actions are `no-publication`, `report-commentary`, `market-update`, `full-reanalysis-recommended`, and `manual-assessment`.

## Preconditions that require product decisions

Implementation must not silently select policies for: licensed source and consensus providers; materiality thresholds; fiscal-calendar restatements; corporate actions and dilution; source-conflict resolution; snapshot retention/access; the definition of a central editorial claim; and the separate publishing release process.

## Approved editorial product contract — Inwido format in v11

### Purpose

V11 keeps the reader-facing structure of Börsanalys.se's established grundanalys, while turning every decision-bearing element into a structured, source-traceable object. The reader can still consume one coherent analysis. The automation can instead compare a new event against facts, assumptions, estimates, valuation decisions, theses, triggers, and scorecard evidence individually.

The base analysis is both:

1. a human-readable research report; and
2. the only approved, immutable reference state for future report automation.

The automation never treats rendered prose as the comparison source. It reads approved structured objects from the base-analysis snapshot.

### Reader-facing format

The following sections are the canonical order for a v11 base analysis. An implementation may use responsive presentation, but may not remove a section whose required source data exists.

| Section | Reader purpose | Structured v11 objects |
|---|---|---|
| Snabböversikt | Gives the current analytical position and what matters next | market observation, 12-month range, five-year scenarios, risk level, model confidence, catalyst, recommendation decision |
| Investeringstes på 30 sekunder | Explains opportunity, variant view, risk, confirmation and thesis break | thesis, evidence IDs, positive/negative triggers |
| Företagsöversikt och ledning | Assesses governance, ownership and capital allocation | company profile, ownership observations, governance score evidence, capital-allocation assessment |
| Affärsmodell | Explains how the company earns money and key unit economics | revenue streams, cost drivers, segment/KPI facts, business-model score evidence |
| Konkurrensfördelar, bransch och peers | Frames moat, cycle and comparison set | peer observations, market/sector claims, moat evidence, competition score evidence |
| Finansiell utveckling och vinstkvalitet | Separates reported performance from calculated quality measures | reported financial facts, calculated observations, period series, earnings-quality assessment |
| Scorecard | Summarises the manual quality assessment | seven approved score dimensions and score rationale IDs |
| Fundamental värdering | Makes the 12-month and five-year valuation logic inspectable | primary/control bridges, scenario model, dividends, valuation observations |
| Kurszoner: 12 månader och 5 år | Translates approved valuation into non-automatic editorial actions | approved zone rules, range boundaries, handlingsnivå, expiry event |
| Potentiella kursdrivare | Defines events that can change the case | catalysts, evidence, dates, measurement rules |
| Risker och stresstest | Makes temporary and permanent loss risks explicit | risk objects, stress cases, early-warning triggers |
| Vad som kan förändra tesen | Connects monitoring to explicit model changes | monitoring points, trigger rules, dependency links |
| Sammanfattning och investeringsbeslut | Gives the approved editorial conclusion | approved recommendation decision and immutable snapshot reference |

Premium modules may extend this structure but cannot change the snapshot baseline without manual approval.

### Scorecard

The scorecard is fixed at seven dimensions, each manually approved on a 1–5 scale. The maximum is 35 points. AI may propose a score and cite evidence; it may never set the approved score or total rating.

| Dimension | Required judgement |
|---|---|
| Företagsöversikt och ledning | Governance, ownership, incentives, transparency and capital allocation |
| Affärsmodell | Revenue logic, pricing, cost structure, capital needs and scalability |
| Konkurrensfördelar, bransch och peers | Moat, cycle position, peers and relative market position |
| Finansiell kvalitet | Profitability, cash conversion, balance sheet, dilution and return on capital |
| Fundamental värdering | Valuation versus earnings quality, growth, risk and capital intensity |
| Potentiella kursdrivare | Specific, measurable catalysts and their time horizon |
| Riskprofil | Likelihood, severity, permanence and early-warning signals |

`totalRating = sum(approved dimension scores)` is calculated deterministically. `companyQuality` and `investmentAttractiveness` are separate manually approved aggregate assessments; neither may be inferred mechanically from the total.

### Two valuation horizons

V11 keeps distinct 12-month and five-year assessments. They are linked to the same approved source facts and estimate set but solve different questions.

| Horizon | Required model | Output | Not permitted |
|---|---|---|---|
| 12 months | NTM earnings/valuation bridge, expected dividend where relevant, current-price observation and range zones | reasonable value range, course zone, handlingsnivå, validity until next report | a mechanically activated recommendation |
| Five years | bear/base/bull estimate path, dividends, approved end-of-period allowed multiple, probability weights and total-return calculation | case total values, probability-weighted value and CAGR | DCF, WACC or terminal value |

For P/E, P/B, EPRA NAV per share, P/FFO per share and NAV per share, values are already per share and may not be divided by share count again. EV/EBIT and EV/Sales use a clearly labelled diluted-share conversion only when EV is converted to value per share.

### Shared financial-definition layer

The quarterly NTM model and annual five-year model must consume the same approved financial-definition object. A metric cannot have one definition in the 12-month bridge and another in the five-year scenario model.

| Definition | Required treatment |
|---|---|
| Reported EBIT | Exact reported period value with source locator; never mixed with adjusted EBIT |
| Adjusted EBIT | A calculated observation with explicit adjustment IDs and a manual judgement on recurrence |
| Capex | Explicitly state whether finance-lease principal payments are included; use the same choice in FCF and capex/revenue series |
| FCF | Operating cash flow less the approved capex definition; no acquisition cash flow is silently included or excluded |
| Financial result | Reported or estimated net interest/other financial income or expense, separately from EBIT |
| Tax | Reported tax kept separate from normalized tax-rate assumption; one-off tax effects must have adjustment IDs |
| Share count | Weighted-average diluted shares for EPS; point-in-time diluted shares for market capitalization/EV when available; proxies must be flagged |

Every forecast assumption is an immutable versioned object with the following required fields:

| Attribute | Purpose |
|---|---|
| `value` | Numeric or categorical assumption value |
| `status` | `reported`, `ai-proposed`, `editor-proposed`, or `borsanalys-approved-estimate` |
| `rationale` | Human-readable reason and linked source/observation IDs |
| `warningThreshold` | Deviation at which the next report requires visible editorial attention |
| `materialChangeThreshold` | Deviation at which the classifier must consider escalation |

Thresholds are directional and unit-aware. Example: `capex_to_revenue` may have `baseEstimate: 0.31`, `warningThreshold: { operator: '>', value: 0.33 }` and `materialChangeThreshold: { operator: '>', value: 0.36 }`. A threshold creates a proposed classification input; it never itself changes a conclusion.

### Investment Thesis Engine

The Investment Thesis Engine is the central analytical component. It connects facts and calculated observations to the financial model, valuation and later report automation. It prevents a claim such as “AI improves ad relevance” from being treated as either a reported fact or an unexplained valuation assumption.

The required dependency chain is:

`reported facts → calculated observations → approved investment thesis → assumptions and estimates → financial model → valuation → recommendation → immutable snapshot`

An investment thesis is an immutable, versioned object with these required fields:

| Field | Purpose |
|---|---|
| `thesisId`, `title`, `hypothesis` | Stable identifier and precise, testable claim |
| `observationIds` and `evidenceIds` | Reported and calculated evidence supporting or challenging the claim |
| `assumptionIds`, `estimateIds`, `valuationDependencyIds` | The financial-model and valuation items the thesis affects |
| `confirmationTriggerIds`, `weakeningTriggerIds`, `breakTriggerIds` | Measurable conditions that can confirm, weaken or break the thesis |
| `suggestedStatus` | AI may propose `proposed`, `confirmed`, `weakened` or `broken` |
| `approvedStatus` | A human editor alone may approve the current thesis status |
| `confidence` | Editorial confidence in the thesis's durability: `high`, `medium` or `low` |
| `confidenceRationale` | Required explanation for the editorial confidence assessment |

`confidence` on a thesis is distinct from AI confidence. A thesis may be manually approved as `confirmed` while retaining `medium` confidence if the observed effect is real but its durability is uncertain. A thesis status or confidence change is a new revision and cannot be made by AI.

### Minimal KPI layer

The KPI layer exists to make a thesis measurable without creating a generic hierarchy that does not improve the analysis. It uses exactly four persistent object types:

| Object | Purpose |
|---|---|
| `MetricDefinition` | Stable meaning, formula, unit, currency, valid period type and permitted value origins for a metric |
| `MetricObservation` | One reported or calculated value with period, provenance, source locator and verification status |
| `KPIProfile` | Company-specific selection of relevant metrics, grouping label, analytical purpose and linked thesis IDs |
| `TriggerRule` | Approved comparison rule linking a KPI to a threshold, a thesis, an affected model dependency and a suggested editorial action |

A grouping label is an attribute of `KPIProfile`; it is not a separate persistent `MetricGroup` object. For Meta, a profile may include Family DAP, ARPU, ad impressions, average ad price, Threads users and WhatsApp Business metrics only when they have a defined analytical purpose and a verifiable source.

### Confidence semantics

Confidence must never be used to blur factual verification or editorial authority:

| Attribute | Answers | Applies to |
|---|---|---|
| `verificationStatus` | Is the reported source fact located, validated, approved or conflicting? | Sources and facts |
| `approvalStatus` | Has the editor accepted this version as Börsanalys.se's position? | Decision-bearing objects |
| `aiConfidence` | How certain is the model about its extraction, classification or proposed estimate? | AI proposals only |
| `confidence` | How durable or reliable does the editor judge the estimate or thesis to be? | Approved estimates and investment theses |

Reported facts do not receive editorial `confidence`; their reliability is represented only by source verification and any documented conflict. Approved estimates require `confidence` and `confidenceRationale` in addition to the ordinary rationale.

### Financial Model Engine

The Financial Model Engine is the only component that calculates the NTM bridge, five-year bridge, scenario outputs and sensitivity outputs. It consumes approved definitions, assumptions, estimates, investment-thesis dependencies and share-count policies; it does not approve or edit any of them.

Its stable outputs are revenue, EBIT, financial result, tax, net income, diluted shares, EPS, operating cash flow, capex, FCF, FCF per share, scenario total values and valuation-bridge inputs. It must expose every formula input and calculation version so the 12-month and five-year outputs can be reproduced from the same definitions.

### Model sequence

1. **Shared definitions:** approve reported versus adjusted EBIT, capex/lease treatment, FCF, financial result, tax and share-count definitions.
2. **Investment thesis:** approve testable hypotheses, linked KPI profiles and trigger rules before approving the financial assumptions that depend on them.
3. **Quarterly NTM model:** model Q3 2026 to Q2 2027 by quarter, then sum revenue, EBIT, financial result, tax, net income, diluted shares, EPS, operating cash flow, capex, FCF and FCF per share.
4. **12-month valuation:** show current implicit P/E, NTM EPS, approved forward P/E, dividend, and separate value contribution from earnings, multiple and dividend.
5. **Annual five-year model:** model 2027–2031 by year using the same definition layer, including revenue, EBIT, financial result, tax, net income, diluted shares, EPS, operating cash flow, capex, FCF and FCF per share.
6. **Scenario and sensitivity engine:** apply bear/base/bull revenue, margin, capital-intensity, share-count, period-end allowed-multiple and probability assumptions. Show multiple sensitivity as a range rather than a single unqualified value.
7. **Snapshot:** persist approved theses, KPI profiles, definitions, estimates, thresholds, trigger rules and classification evidence.

P/E remains the primary valuation bridge for Meta when approved. FCF per share and FCF conversion are parallel mandatory control metrics; a positive P/E case cannot be approved without their explicit treatment.

### Decision history

`DecisionRecord` is an immutable audit object that explains a decision-bearing change over time. It supplements snapshots; it does not replace their canonical payloads.

| Field | Purpose |
|---|---|
| `changedObjectId` and `objectType` | Identifies the revised thesis, estimate, bridge, score or other decision-bearing object |
| `previousState` and `newState` | Canonical before/after states or revision IDs |
| `reason` | Editor's concise reason for the change |
| `evidenceIds` | Supporting source facts, observations, comparison results or approved triggers |
| `editorId` and `timestamp` | Records the accountable editor and time |
| `triggeringEventId` | Links the decision to a report or company event when applicable |

AI may propose a reason and evidence set, but only the editor can create an approved `DecisionRecord`. It is immutable once created and is retained with the related snapshot chain.

### Snapshot baseline

An approved base-analysis snapshot must include the structured data needed to reproduce the report and automate the next-event comparison:

- `schemaVersion` and semantic `analysisModelVersion`; both are part of the canonical payload and SHA-256 hash;
- server-issued `snapshotId` and nullable `parentSnapshotId`, forming an explicit per-company snapshot revision chain;
- approved source register, hashes, locators and verification statuses;
- reported facts, calculated observations and company guidance as distinct origins;
- approved own estimates and separately labelled consensus estimates by period;
- assumptions and their dependency IDs;
- approved investment theses with confidence, evidence, confirmation/weaken/break triggers and model dependencies;
- IDs for related approved decision-history records;
- metric definitions, KPI profiles, metric observations and trigger rules used by those theses;
- 12-month primary bridge, control bridges, price zones and valuation observations;
- five-year bear/base/bull scenarios, probability weights, dividends and total-return calculation;
- seven approved score dimensions and their reasons;
- approved risks, catalysts, positive/negative triggers and monitoring points;
- approved recommendation/range decisions if and only if their valuation dependencies are approved;
- company-specific materiality-assessment configuration and its explainable component weights;
- sector-specific KPIs and data-quality flags.

`analysisModelVersion` follows semantic versioning. It changes whenever an approved calculation method, financial definition, interpretation rule or model policy changes in a way that can affect reproduced output. It does not change merely because a new company fact or estimate revision is approved. A later version can compare an older snapshot, but must display the version difference to the editor.

### Analysis Health

`AnalysisHealth` is derived operational data generated from approved snapshot data and approved health configuration. It is not independently editable and can never become a source of truth. It shows whether an analysis is sufficiently complete and trustworthy for its intended editorial use. It is not reader-facing by default, does not affect a scorecard or recommendation, and cannot substitute for the editor's approval.

| Field | Meaning |
|---|---|
| `dataCompleteness` | Share of required source facts and periods present for the chosen analysis format |
| `estimateCoverage` | Share of required forecast periods and scenario inputs covered by approved estimates |
| `kpiCoverage` | Share of KPIProfile metrics with current, valid observations and trigger rules where required |
| `sourceVerification` | Share of central sources/facts meeting their required verification state |
| `thesisConfidence` | Roll-up display of the editor-approved thesis confidences; never a replacement for individual thesis review |
| `automationReadiness` | `low`, `medium` or `high`, determined from configured completeness gates and unresolved conflicts |

The stored health result must include its calculation inputs and the `analysisModelVersion`. A conflicting source, an unapproved central dependency or missing required comparison baseline prevents `automationReadiness: high`.

### Event-to-editorial-action rules

Incoming documents are compared only with the latest manually approved snapshot for the same company. The system first creates an `eventType` proposal and a separate `editorialAction` proposal. Both remain unapproved until the editor accepts them.

| Event pattern | Suggested editorial action | System limitation |
|---|---|---|
| Quarterly or annual report with limited deviations | `report-commentary` | Cannot mutate estimates, scorecard, recommendation, range or snapshot |
| Acquisition, divestment, capital raise, management change, guidance change or strategic event | `market-update` | Cannot create or replace a base analysis |
| Material change to estimate path, investment thesis, balance-sheet flexibility, capital allocation, scorecard evidence or valuation basis | `full-reanalysis-recommended` | May only explain why a manual new base-analysis revision is required |
| Ambiguous, conflicting or insufficient facts | `manual-assessment` | Cannot create an editorial draft beyond a limited factual summary |
| No material, editorially useful difference | `no-publication` | Cannot silently discard the document; audit trail remains |

`full-reanalysis-recommended` is never an automatic "new analysis". It is an explicit editor task with the comparison evidence and affected dependencies attached.

The classifier uses this escalation sequence after applying the approved thresholds:

| Comparison outcome | Suggested action |
|---|---|
| Within normal variation | `no-publication` |
| One limited KPI deviation with no affected core dependency | `report-commentary` |
| Several material model deviations that require explanation but leave the long-term thesis intact | `market-update` |
| A changed or broken principal thesis, or a material break in the long-term model/valuation basis | `full-reanalysis-recommended` |

### Materiality Assessment

`MaterialityAssessment` is reproducible derived data from its stored, versioned configuration, validated comparison inputs and stored component results. It is an explainable 0–100 structured assessment, not an objective score or autonomous decision. It combines approved deterministic threshold results with documented qualitative context. A single variance does not automatically create a reanalysis. The classifier must record each impacted object and why the aggregate impact is material.

The assessment stores a versioned configuration, each component's raw evidence and contribution, the total, and the AI-proposed editorial action. At minimum it contains:

| Component | Required stored output |
|---|---|
| Revenue impact | relevant revenue, operating-KPI and guidance deviations, plus contribution 0–100 |
| Margin impact | EBIT, margin, EPS and earnings-quality deviations, plus contribution 0–100 |
| Cash-flow impact | operating cash flow, FCF and capex deviations, plus contribution 0–100 |
| Balance-sheet impact | liquidity, debt, leasing, dilution and financial-flexibility deviations, plus contribution 0–100 |
| Thesis impact | affected thesis statuses, triggers, new risks and qualitative context, plus contribution 0–100 |
| Total | calculated 0–100 total, inputs, weights, rationale and model/configuration version |

The total is a review aid. It cannot independently set `editorialAction`, change a thesis, initiate a new base analysis, alter a valuation or authorize publication. The editor receives the component breakdown and decides the approved action.

| Comparison family | Indicative evaluation | Escalation examples |
|---|---|---|
| Revenue and KPIs | Actual versus own estimate, guidance and relevant operating KPI | sustained miss/beat, changed growth driver, broken segment trend |
| EBIT, margin and EPS | Actual versus own estimate; reported versus calculated effects kept separate | margin reset, recurring cost step-up, changed earnings quality |
| Cash flow and capex | FCF conversion, capex guide and balance-sheet flexibility | higher structural capital intensity, persistent weaker conversion |
| Capital allocation | Debt, dilution, acquisitions, buybacks and dividends | financed acquisition, material dilution, leverage change |
| Thesis and risks | Trigger status and new evidence | confirmed/broken trigger, regulatory or strategic change |
| Valuation | Current observation relative to approved zones | a zone can require editorial review but cannot execute a recommendation change |

### AI boundaries

Raw PDF text is available only to the extraction step. The editorial drafting model receives only validated facts, explicit comparisons, classification, snapshot objects and source locators. It may propose a report commentary, market update, score changes, scenario changes or a reanalysis rationale. It may not approve any of them.

### Required editorial workflow

1. The editor creates or revises the base analysis from structured draft objects.
2. The editor approves objects in dependency order: sources/facts, assumptions, estimates, valuation/observations, theses/risks/scorecard, then recommendation/ranges.
3. The server creates a new immutable snapshot containing approved objects only.
4. A new report is extracted, validated and compared to that snapshot.
5. The system proposes event type and editorial action, with evidence.
6. The editor chooses whether to publish a report commentary, market update, start a manual base-analysis revision, or take no publication action.

## Incremental delivery sequence

The target architecture must be delivered in independently deployable stages. A later stage may consume earlier interfaces but may not require an unfinished later stage.

| Stage | Deliverable boundary | Included subsystems |
|---|---|---|
| 1. Core | A versioned, approvable base analysis can create and verify an immutable snapshot chain | Domain schemas, revisions, approval, `DecisionRecord`, snapshot service |
| 2. Analysis engine | The editor can create a traceable NTM and five-year model connected to testable theses | Investment Thesis Engine, minimal KPI layer, Financial Model Engine, valuation service |
| 3. Automation | A validated new document can be compared to an approved snapshot and receive a reviewable proposal | Report pipeline, `MaterialityAssessment`, `AnalysisHealth`, classifier |
| 4. Editorial delivery | The sole editor can operate the workflow safely through the admin UI and separately approved publication path | Editorial UI/workflows, previews, release/version presentation |

Every stage defines its own acceptance tests and can be deployed without the next stage. A stage cannot grant AI additional editorial authority beyond the governing rules.

## Resolved product decisions

- There is one editor. The same authenticated editor may approve every required step, but each approval is still separately recorded.
- `KÖP`, `BEVAKA` and `AVSTÅ` are the only recommendation values. They remain inactive until an approved primary valuation bridge exists.
- A single analysis can contain both a 12-month value range and a five-year scenario analysis. They do not replace each other.
- The reader-facing report is an output of approved structured data; it is not the source of truth for automation.
