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


## S6 — Adaptive Path Integration
Jalur Belajar → Rencana Adaptif S6. Shows progress across Academy (100), seven-step (22), Listening, Speaking, Mastery due cards; ranks overdue reviews, Listening errors, incomplete units and Academy gaps. Offers five suggested sessions. Reads existing localStorage keys only. See `S6-QA-REPORT.md`.


## S7.0 Curriculum Alignment Audit
Lihat `S7.0-CURRICULUM-ALIGNMENT-AUDIT.md`, `S7.0-ROADMAP.md`, `curriculum/s70-alignment-matrix.json`, `curriculum/s70-reference-coverage.csv`. Audit-only: seluruh aplikasi dan key progres S6 tidak diubah. Referensi berstatus kandidat belum divalidasi per bab/Can-do.


## S7.1
Read-only Curriculum Architecture dashboard: Jalur Belajar → Audit Kurikulum S7.1. See `S7.1-VERIFICATION-REPORT.md`, `S7.1-QA-REPORT.md`, `S7.1-ROADMAP.md`. Source mapping is not official equivalence.


## S7.2 — Evidence-led Curriculum Verification
Read `S7.2-CURRICULUM-VERIFICATION.md`, `S7.2-QA-REPORT.md` and CSVs in `curriculum/`. Activity-level verification is partial and explicitly labeled.


## S7.3 Chapter-Based Learning
Buka Jalur Belajar → Belajar per BAB S7.3. Ada 14 BAB internal LatSol F0–F5, mode urut dan adaptif, resume, progres turunan dari storage lama. Baca S7.3-CURRICULUM-MAPPING.md dan S7.3-QA-REPORT.md.

## S7.4
Topic-based chapter grouping and explicit gap notices; see S7.4-QA-REPORT.md.

## S8.0
BAB 01 → Kana Academy. See S8.0-QA-REPORT.md.

## S8.1
Jalur Belajar → Belajar per BAB → BAB 02–11 → Materi tambahan S8.1. Lihat S8.1-COVERAGE.md dan S8.1-QA-REPORT.md.

## S8.2
Six new F3–F5 units in BAB 12–14; see S8.2-COVERAGE.md and S8.2-QA-REPORT.md.

## S8.3
Open Jalur Belajar → Belajar per BAB → BAB 02–14 → Deep Learning S8.3. See S8.3-COVERAGE.md and S8.3-QA-REPORT.md.

## S8.4.1
Unified storage and supplemental adaptive dashboard. See S8.4.1-QA-REPORT.md before deployment.

## S8.4.2
BAB 02–14 → Complete Learning S8.4.2. See S8.4.2-QA-REPORT.md.

## S8.4.3
Jalur Belajar → Belajar per BAB → Evaluasi BAB S8.4.3. See S8.4.3-QA-REPORT.md.

## S8.4.4
Adaptive Path lama → Adaptive Path 2.0. See S8.4.4-QA-REPORT.md.

## S8.4.5
Stabilization checkpoint; see S8.4.5-QA-REPORT.md. Browser E2E blocked; not production stable.
