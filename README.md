# LatSol JFT A2 — Mega Upgrade v17–v20 (M7 Release Candidate)

**Status: Release Candidate / menunggu QA perangkat dan review editorial.** Satu ZIP lengkap untuk deployment statis ke GitHub/Vercel. Tidak ada backend, login cloud, atau API AI berbayar.

## Isi
- CBT 48 soal / 60 menit, bank 500 soal, hasil dan riwayat lokal.
- Adaptive Practice, Spaced Repetition, Study Planner 7/14/30 hari.
- Japanese Learning Academy 100 modul: 30 Kotoba, 25 Bunpou, 20 Kanji, 25 Kaiwa.
- Gamification: XP, level, streak, achievement; tampilan responsif.
- Exam Pro: tren nilai, analisis per bagian, indikator kesiapan **internal**.

## Instalasi
1. **Backup riwayat lama** menggunakan tombol ekspor di website lama. Jangan hapus data browser.
2. Ekstrak ZIP; unggah **isi folder**, bukan folder pembungkus, ke root repo GitHub.
3. Pastikan Vercel project terhubung ke repo dan menggunakan konfigurasi static/Other tanpa build command; output directory root (`.`) bila diminta.
4. Buka situs; uji dengan checklist `QA-M7.md` pada desktop dan HP. Jika ada bug, rollback ke commit sebelumnya.

## Pengujian otomatis
Jalankan `python validate_bank.py`, lalu `node tests/test_*.js` satu per satu; `node --check` untuk semua `.js`. Lihat `QA-M7.md` untuk laporan dan batasannya.

## Penting
- **Belum diverifikasi di browser/HP nyata** pada lingkungan ini. Headless Chromium tidak berhasil menghasilkan output DOM untuk inspeksi, sehingga tidak boleh diklaim lulus browser QA.
- Review editorial independen untuk 500 soal dan 100 modul belum selesai. 84 modul baru memakai satu soal kuis per modul, dan beberapa distraktor masih sederhana.
- TTS tergantung suara Jepang perangkat. Tidak ada audio MP3 offline. LocalStorage/IndexedDB tidak tersinkron lintas perangkat.
- LatSol independen, tidak berafiliasi dengan The Japan Foundation. Hasil bukan nilai atau prediksi resmi JFT-Basic.


## S0 Japanese Learning System — Curriculum Mapping (data only)
See `S0-CURRICULUM-AUDIT.md` and `curriculum/`. This checkpoint does not activate a new UI or modify CBT or existing user progress. Run `node tests/test_s0_curriculum.js`.

## S1 — Japanese Learning System Learning Path
Open **Jalur Belajar F0–F5** on the CBT home screen. Choose Belajar dari Nol or Persiapan JFT-Basic A2, then browse mapped Academy modules. Choices are stored locally in a separate per-profile key. This checkpoint does not migrate or rewrite existing CBT/Academy progress. See `S1-QA-REPORT.md`.


## S2 Interactive Lesson Engine
Open Jalur Belajar > Bab interaktif S2. Three pilot lessons; see `S2-QA-REPORT.md`. No changes to CBT or legacy Academy progress.


## S3 Mastery Lab
Open **Jalur Belajar → Mastery Lab S3** for Kotoba/Kanji flashcards and Grammar Explorer. See `S3-QA-REPORT.md`.


## S4.0 Curriculum Reference Mapping
This checkpoint adds planning-only curriculum files; see `S4.0-CURRICULUM-AUDIT.md` and `S4.0-TEST-RESULTS.md`. No runtime behavior, CBT bank or existing progress keys were modified. Reference mapping is provisional pending source verification.


## S4.1 — Seven-Step Pilot
From **Jalur Belajar**, choose **Belajar 7 Langkah S4.1**. Four original F0–F1 units implement goals, vocabulary, grammar, listening (browser TTS), active practice, speaking self-check and delayed mastery review. Progress is stored under `latsoljft-jls-s41-<profile>`; existing CBT and Academy storage keys remain unchanged. See `S4.1-QA-REPORT.md`.


## S4.2 Expanded Japanese Content
18 new original seven-step units (22 total), F0–F2 stage filtering, unchanged legacy CBT and progress keys. See S4.2-CONTENT-PLAN.md and S4.2-QA-REPORT.md.


## S4.3 Listening Content Lab
Buka Jalur Belajar → Listening Lab. 22 unit F0–F2, comprehension, dictation, Japanese TTS 0.75×–1.25× (hanya mode belajar), transkrip setelah menjawab, progres baru per profil. Lihat `S4.3-QA-REPORT.md`.


## S4.4 Listening Quality Upgrade
See `S4.4-QA-REPORT.md` and `S4.4-EDITORIAL-ISSUES.md`. Listening translations and review features are a development checkpoint. Existing CBT and S4.3 listening storage prefix remain unchanged.


## S5 Speaking Learning Lab
Buka Jalur Belajar → Speaking Lab. Tersedia 22 unit F0–F2, repeat-after-me, shadowing, roleplay, TTS, mikrofon opsional dan fallback manual. Progres S5 terpisah per profil. Lihat `S5-QA-REPORT.md`.
