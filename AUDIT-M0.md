# Audit M0 — v16 Final → v17–v20 Mega Upgrade

## Scope
Baseline: v16 Final M6, 500 questions, 16 Learning Center lessons, 48-question CBT, 60-minute timer. Target: one final Mega ZIP for v17–v20; M0 is a **stabilization checkpoint**, not the final Mega ZIP.

## Findings and risk register
| Severity | Finding | Resolution in M0 | Follow-up |
|---|---|---|---|
| High | Answer/navigation/keyboard event handlers did not re-check the deadline; actions could occur after timeout before interval callback | Added deadline guard to answer, nav, prev, finish, keyboard | Real-browser race testing |
| Medium | Corrupted/invalid saved active session silently discarded by home reset | Preserve invalid session JSON to `latsoljft-invalid-session-backup` before clearing | Add user-facing recovery UI later |
| Medium | Incomplete legacy history could cause empty/invalid result view | Add result fallback message | Review legacy migration coverage |
| Medium | PWA cache version could retain old files | Cache key and asset version bumped | Manual PWA update tests |
| High | 500 question items are structurally validated but not linguistically reviewed | Not resolved | Native-level editorial review of answer keys, explanations and duplicates |
| Medium | TTS voices differ by device; no offline guarantee | Not resolved (user chose browser TTS) | Chrome/Edge/Android/Safari manual testing |
| Medium | Old 40-question results may be reconstructed from updated bank | Existing warning retained | Prefer original snapshots whenever present |
| Medium | Multiple tabs can race over localStorage exam session | Not resolved | Design cross-tab lock in subsequent milestone |
| Medium | localStorage quota/clearing can remove progress | Existing alert/export retained | Backup/restore and storage monitoring |

## Validation performed
- Python question validator
- Node bank, CBT engine, final QA and new M0 regression tests
- Node syntax checks
- ZIP CRC/integrity

## Not verified
- Browser interaction, accessibility, audio behavior on devices, real Vercel deployment, editorial accuracy of all 500 items.

## Next steps for single Mega ZIP
1. M1 Adaptive Practice + analytics schema
2. M2 Spaced Repetition + Planner
3. M3 Academy structure and pilot modules
4. M4 Expand toward 100 reviewed modules
5. M5 Gamification + mobile UI
6. M6 Exam Pro and analytics
7. M7 integration, migration, browser QA, editorial QA, final Mega ZIP

## Upgrade precautions
Back up v16 history JSON before replacing files; preserve local browser storage; test an existing 40-question history entry and an existing 48-question entry after update.
