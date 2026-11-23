# S1 — Learning Path Foundation QA

## Delivered
- Optional entry button on CBT home: Jalur Belajar F0–F5. First visit to this feature prompts choice of two paths.
- From Zero starts at F0; JFT Prep starts at F5; path can be switched; stage F0–F5 can be selected.
- 100 original Academy IDs mapped to stages via S0 metadata; selecting a mapped module opens the existing Academy lesson directly.
- Path preferences saved separately per profile in `latsoljft-jls-path-s1-<profileId>`; existing `latsoljft-v2`, `latsoljft-active-v16`, `latsoljft-center-v16-<profile>` keys remain unchanged.
- Cache bumped to `latsoljft-content-jls-s1-1`; tests for M0/M8 updated to match cache and index versions.

## Tests
- 13 Node test suites passed, including new S1 path storage isolation, switching, mapping, and link checks.
- `python validate_bank.py` passed: 500 questions, 125 per section.
- JavaScript syntax passed; 19 HTML-linked assets verified present.
- Playwright Chromium was launched but HTTP navigation to localhost was blocked by environment policy (`ERR_BLOCKED_BY_ADMINISTRATOR`), so browser UI smoke test remains **unverified**.

## Limitations / next steps
- First-time onboarding appears when user opens the new Learning Path, not automatically on site load. This protects the legacy CBT entry and active session restoration.
- Stage selection is navigational, **not** a mastery certification or automatic unlock system.
- F5 has no legacy Academy modules; S2 must add bridging content.
- S0 mapping is provisional and has not undergone Japanese editorial review.
- Test on actual mobile browsers and verify PWA updates before production deployment.
