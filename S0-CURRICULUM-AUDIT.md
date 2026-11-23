# S0 — Curriculum Audit & Mapping

## Scope and source
Audited the **100 actual entries** in `lessons.json` from M8. This is a structural and curriculum-design audit, **not** independent Japanese-language editorial verification. S0 is data-only: no changes to CBT, UI, JavaScript engines, storage keys, or existing lesson IDs.

## Inventory
- Total lessons: **100**; unique IDs: **100**.
- Categories: kotoba 30, bunpou 25, kanji 20, kaiwa 25.
- One multiple-choice question per lesson: **100** (total).
- Invalid four-choice/answer-index/duplicate-options structures: **0**. This does not establish answer correctness.
- Explicit playable audio assets attached to lesson entries: **0**.
- Structured speech-recognition or speaking exercises attached: **0**.

## Provisional stage distribution
- F0: 3 legacy modules
- F1: 19 legacy modules
- F2: 21 legacy modules
- F3: 46 legacy modules
- F4: 11 legacy modules
- F5: 0 legacy modules

F5 is an **assessment bridge**, not a dumping ground for legacy Academy lessons. All 100 entries are mapped to F0–F4; F5 requires new integrative learning/assessment units. Mapping is provisional and must be reviewed by a Japanese educator before release.

## Content gaps — prioritized
1. **Critical F0**: dedicated hiragana/katakana instruction, kana decoding practice, pronunciation and mora basics. Existing greeting/number modules are not a substitute.
2. **Critical F1**: explicit step-by-step です/ます, basic sentence order, and foundational particles; existing grammar modules mostly start at intermediate constructions.
3. **High F2**: complete て・ない・た form formation and progression, not just isolated pattern explanations.
4. **High Listening**: actual audio-linked comprehension items, transcript alignment, listening difficulty sequence and fallback. Existing Japanese examples are text, not audio lessons.
5. **High Speaking**: repeat/shadowing/roleplay prompts, self-review rubrics and optional recognition fallback.
6. **High Reading**: notices, forms, messages and multi-sentence passages with graded comprehension.
7. **High Assessments**: varied practice formats, several independent items per competency, mastery checks, spaced review. One multiple-choice item per module is insufficient for mastery claims.
8. **High Editorial QA**: check Japanese naturalness, Indonesian translations, keys, plausible distractors and explanation quality individually.
9. **Medium Curriculum linkage**: CBT-to-competency mapping, prerequisite DAG, exercise-to-audio links, and specific stage objectives need content-authoring passes.

## Safeguards
- Preserve all legacy IDs and old storage keys; the new mapping references originals without rewriting them.
- Both paths use shared competency IDs; the JFT path may recommend prerequisite lessons without resetting the from-zero path.
- Empty CBT/audio/speaking links are intentionally **unmapped**, never fabricated.
- No official proficiency equivalence, official pass prediction or independent content validation is claimed.

## Deliverables
- `curriculum/competency-matrix.json`: 23 proposed competencies across F0–F5.
- `curriculum/legacy-module-map.json`: 100 module mappings with explicit provisional review status.
- `curriculum/learning-paths.json`: onboarding and shared progress contract.
- `curriculum/learning-unit.schema.example.json`: draft content format, unpublished.
- `tests/test_s0_curriculum.js`: structural validation.

## Next S1 acceptance criteria
- Onboarding route selection persists **without changing existing progress records**.
- Both routes share skill progress, and switching routes does not erase results.
- Migration/backup and rollback tests pass on real browser.
- No new units published until content and answer keys are reviewed.

## Baseline regression issue discovered
The inherited `tests/test_m8.js` fails because it asserts `index.html` contains `mega-m8-1`, while the M8 source HTML does not contain that string. This is an **existing M8 source/test mismatch**. To honor S0's no-runtime-changes requirement, neither HTML nor the inherited test was modified. The other 11 JavaScript test suites, including the new S0 test, passed. Fix and browser-verify cache/version consistency in the next implementation/QA milestone.
