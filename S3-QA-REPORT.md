# S3 QA — Vocabulary & Grammar Mastery

## Implemented
- Kotoba and Kanji flashcards extracted from existing Academy `content` entries separated by semicolons and `=`. Unsupported entries are skipped rather than guessed.
- Grammar Explorer shows existing 25 Bunpou modules, examples, questions and explanations.
- Per-profile, separate localStorage key `latsoljft-jls-s3-mastery-`; no edits to CBT or Academy storage schemas.
- Review scheduling: incorrect 10 minutes; correct streak 1/3/expanding days, capped at 60 days.
- Mastery requires >=3 correct, >=3 attempts, >=80% accuracy, streak >=2 and reviews on >=2 calendar dates. This is an internal heuristic, not validated language proficiency.
- S3 Lab button in learning path dashboard; stage metadata from existing curriculum map.

## Limitations
- Flashcards inherit legacy Academy content quality and need Japanese editorial review.
- Review queue includes new and due cards; all-cards view allows early review.
- Grammar Explorer is read-only learning content; grammar quiz does not affect mastery until a future milestone.
- Browser end-to-end testing not guaranteed; static and Node regression results below.
- No CBT behavior or legacy progress storage changes.


## Verified regression (run from project root)
- test_academy.js: PASS
- test_adaptive.js: PASS
- test_bank_m3.js: PASS
- test_content_m4.js: PASS
- test_engine.js: PASS
- test_exam_pro.js: PASS
- test_final.js: PASS
- test_gamification.js: PASS
- test_m0.js: PASS
- test_m8.js: PASS
- test_s0_curriculum.js: PASS
- test_s1.js: PASS
- test_s2.js: PASS
- test_s3_mastery.js: PASS
- test_study.js: PASS

Cache-version assertions updated to S3; CBT logic unchanged. Browser end-to-end QA pending.
