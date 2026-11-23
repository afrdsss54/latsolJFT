# S6 QA Report — 2026-11-23

## Scope
- Adaptive recommendations for two paths, F0–F5, 100 Academy modules, 22 seven-step units, Listening, Speaking and Mastery cards.
- Existing progress keys are read-only in S6; no data migration or writes.
- S6 introduces no new storage key: personal plan computed on demand.

## Automated checks
- 22/22 Node regression scripts passed (including S6 tests).
- 500-question validation passed.
- JS syntax checks passed.
- HTML and service-worker assets resolved.
- 14 protected legacy engine/content files byte-identical to S5 ZIP.
- ZIP archive integrity checked.

## Browser status
- Chromium binary present, but headless smoke test timed out in this environment. Browser E2E and interaction QA NOT verified.

## Known limitations
- Recommendations are deterministic heuristics, not validated skill estimates.
- F3–F5 have Academy mapping but no seven-step content.
- Prerequisites depend on two-day mastery and may block some recommendations.
- Speaking completion is self-assessment, not measured pronunciation.
- Source curriculum mapping and Japanese editorial review remain provisional.
- S6 plan is advisory and not persisted; user can change study path anytime.
