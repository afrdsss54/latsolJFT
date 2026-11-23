# S0 regression results

- PASS `test_academy.js`: M3 academy tests passed
- PASS `test_adaptive.js`: PASS adaptive: legacy, snapshots, weights, no duplicates, practice attempts, empty data
- PASS `test_bank_m3.js`: PASS M3 bank: 500 entries, 260 new, 125/section, unique IDs and prompts
- PASS `test_content_m4.js`: M4 content structure checks passed: 100 lessons
- PASS `test_engine.js`: PASS engine: 6 packs x 48, unique IDs, section grouping, deadline, session validation, result snapshots, legacy 40 migration
- PASS `test_exam_pro.js`: M6 Exam Pro tests passed
- PASS `test_final.js`: PASS final: expired render, next, audio, legacy warning, 500 bank items
- PASS `test_gamification.js`: PASS M5: XP, deduplication, streak, achievements, daily cap, levels
- PASS `test_m0.js`: PASS M0: expiry guards, recovery backup, cache version, bank count
- KNOWN BASELINE FAILURE `test_m8.js`: node:internal/assert/utils:281
    throw err;
    ^

AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:

  assert(html.includes('mega-m8
- PASS `test_s0_curriculum.js`: PASS S0: 100 exact legacy IDs, six stages, shared paths, draft content schema
- PASS `test_study.js`: Study engine M2 tests passed

Original runtime files unchanged byte-for-byte (except README appendix). Existing M8 test expects `mega-m8-1` in HTML but baseline M8 HTML lacks this string; S0 does not modify HTML. This pre-existing regression test failure remains open.
