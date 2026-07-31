# Analysmall v11 Design Specification

**Status:** Approved for implementation planning on 2026-07-30.

## Goal

Build an internal, versioned analysis system for Börsanalys.se. It keeps reported facts, assumptions, estimates, valuation, theses, recommendation, editorial approval, and immutable snapshots distinct and traceable. It also provides a safe report-automation pipeline that compares incoming events only to the latest approved snapshot.

## Governing rules

- Facts precede conclusions; all decision-bearing objects have explicit dependency IDs.
- Reported, calculated, company guidance, consensus, AI proposals, and approved Börsanalys.se estimates are separate value origins.
- AI may extract, structure, compare, classify, and draft. It cannot approve, change a recommendation, target price, thesis status, snapshot, or publication.
- Approval creates a revision. Approved revisions are never mutated.
- Snapshots are server-created, create-only, RFC 8785 canonical JSON payloads hashed with SHA-256.
- Snapshots contain approved objects only, and no referenced source may be conflicting.
- Only KÖP, BEVAKA, and AVSTÅ are allowed recommendations.
- DCF, WACC, and terminal value are out of scope for the ordinary engine and must be rejected as valuation methods.

## Architecture

The implementation has six bounded areas:

1. **Domain schemas:** Zod schemas and TypeScript types for sources, facts, periods, assumptions, estimates, bridges, theses, decisions, documents, and events.
2. **Revision and approval service:** dependency validation, immutable revisions, and human-only approval transitions.
3. **Valuation service:** allowed methods, dilution safeguards, bridge roles, scenario target prices, and non-mechanical recommendation evidence.
4. **Snapshot service:** approved-object assembly, canonical serialization, hashing, immutable persistence, and verification.
5. **Report pipeline:** document registration, paginated extraction boundary, mathematical validation, snapshot comparison, classification, AI drafting, review, and preview.
6. **Editorial API/UI:** authenticated internal workflows; no public release path in the first delivery.

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

### Snapshot baseline

An approved base-analysis snapshot must include the structured data needed to reproduce the report and automate the next-event comparison:

- approved source register, hashes, locators and verification statuses;
- reported facts, calculated observations and company guidance as distinct origins;
- approved own estimates and separately labelled consensus estimates by period;
- assumptions and their dependency IDs;
- 12-month primary bridge, control bridges, price zones and valuation observations;
- five-year bear/base/bull scenarios, probability weights, dividends and total-return calculation;
- seven approved score dimensions and their reasons;
- approved theses, risks, catalysts, positive/negative triggers and monitoring points;
- approved recommendation/range decisions if and only if their valuation dependencies are approved;
- company-specific materiality rules;
- sector-specific KPIs and data-quality flags.

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

### Materiality evaluation

Materiality combines deterministic thresholds and human context. A single variance does not automatically create a reanalysis. The classifier must record each impacted object and why the aggregate impact is material.

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

## Resolved product decisions

- There is one editor. The same authenticated editor may approve every required step, but each approval is still separately recorded.
- `KÖP`, `BEVAKA` and `AVSTÅ` are the only recommendation values. They remain inactive until an approved primary valuation bridge exists.
- A single analysis can contain both a 12-month value range and a five-year scenario analysis. They do not replace each other.
- The reader-facing report is an output of approved structured data; it is not the source of truth for automation.
