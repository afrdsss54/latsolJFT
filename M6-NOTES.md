# M6 — Exam Pro & Analytics (checkpoint)

## Implemented
- New Exam Pro dashboard, last 5/10/20 attempts, score trend, average duration.
- Per-section accuracy only from verifiable question snapshots or matching IDs; missing evidence explicitly excluded.
- Internal readiness index available only after 3 attempts with verifiable section coverage. Formula shown in UI, not a JFT score or pass prediction.
- JSON export of analytics, button to Smart Learning adaptive practice.
- Profile-local history, no server and no changes to v15/v16 history keys.

## Limitations
- Older history without verifiable questions contributes to overall scores but not section accuracy.
- Historical duration is total session elapsed, not per-question time.
- Chart is a bar-based trend visualization, not a standardized JFT score.
- Real browser/mobile testing and editorial Japanese review remain open for M7.
