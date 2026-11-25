# LatSol JFT v16 — Final QA checklist

## Automated (run from project root)
- `python validate_bank.py`
- `node tests/test_bank_m3.js`
- `node tests/test_engine.js`
- `node tests/test_final.js`
- `node --check app.js && node --check learning.js && node --check learning-center.js && node --check lessons.js`

## Manual browser acceptance (must run after deploy)
1. Back up history JSON in old version; do not clear site data.
2. Desktop Chrome: create profile, start test, select answers, navigate within section.
3. Refresh mid-exam: answers and remaining time persist; close/reopen tab and check resume.
4. Move to next section: previous section inaccessible. In Choukai: no back navigation; audio maximum twice.
5. Wait until deadline or simulate expiry in browser: submission occurs automatically; refresh expired session and verify result.
6. Finish 48-question exam; inspect breakdown, review, and history. Open legacy 40-question result; reconstructed content may differ if earlier bank changed.
7. Learning Center: all four categories, 16 lessons, quiz and progress persistence, return to CBT.
8. Safari iPhone and Chrome Android: verify audio voices, controls, Dokkai zoom and readability.
9. Test offline after first online visit; TTS may not work offline depending on device.
10. Check no console errors and no horizontal scrolling at 375px width.

## Known limitations
- 500 items are structurally valid, not independently editorially verified.
- 48 questions is LatSol design, not an official fixed JFT question count.
- TTS depends on available Japanese voice; no MP3 fallback.
- Local browser history is not synchronized; clearing browser site data deletes it.
- Old results without original snapshots are reconstructed from the current bank and cannot be guaranteed identical to the original exam.
- Automated checks do not establish real-device browser compatibility.
