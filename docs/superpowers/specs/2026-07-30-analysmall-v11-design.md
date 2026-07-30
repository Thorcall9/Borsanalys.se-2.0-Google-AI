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

Implementation must not silently select policies for: editorial roles/four-eyes approval; licensed source and consensus providers; materiality thresholds; fiscal-calendar restatements; corporate actions and dilution; source-conflict resolution; snapshot retention/access; the definition of a central editorial claim; and the separate publishing release process.
