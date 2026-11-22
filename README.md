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
