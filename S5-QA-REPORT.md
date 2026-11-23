# S5 Speaking Learning Lab — QA Report

## Scope and implementation
- Source: S4.4 checkpoint ZIP, extracted and extended without changing the CBT app engine.
- 22 original Speaking items, one for each F0–F2 seven-step unit, derived from existing original LatSol examples and Listening dialogue.
- Modes: repeat-after-me, shadowing, and contextual roleplay; TTS model with study-only rate selection.
- Optional Web Speech recognition (`SpeechRecognition`/`webkitSpeechRecognition`) when supported, plus fully manual fallback.
- Text transcript equality is **not** a pronunciation, fluency, accent, or intonation score. No microphone audio is stored by LatSol. Browser speech recognition may process audio remotely.
- New profile-specific key: `latsoljft-jls-s5-speaking-` + URL-encoded profile; prior keys untouched.
- Speaking Lab accessible from Learning Path, seven-step unit list and Listening Lab detail.

## Automated verification
- **21/21 Node.js test suites PASS**, including `tests/test_s5_speaking.js`.
- `validate_bank.py`: **500 CBT questions PASS**, 125 per section.
- JavaScript syntax check: all JavaScript files PASS.
- All service-worker precache assets exist.
- **14 protected source files byte-for-byte identical** to S4.4, including `app.js`, question bank, Academy, seven-step and Listening engines/data.
- Cache version intentionally updated to `latsoljft-content-jls-s5-1` and corresponding asset query string `jls-s5-1`; legacy cache tests updated to check the active version.

## Known limitations and manual QA required
- Browser E2E attempted with Playwright but Chromium headless executable was not installed (`BrowserType.launch: Executable doesn't exist`); automated Node tests do not test real microphone permissions, speech synthesis, recognition services or screen interaction.
- Speech recognition depends on browser/device, permissions, HTTPS or localhost, language support, and sometimes an external recognition service.
- Roleplay responses are self-assessed; manual completion records practice, not verified skill.
- TTS is not recorded native audio; no formal Japanese editorial proofreading or native-speaker pronunciation assessment completed.
- Existing S4.4 editorial issues remain open.
- Checkpoint is **not Production Stable** until browser testing and editorial review are completed.
