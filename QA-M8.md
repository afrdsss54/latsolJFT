# M8 — Browser QA, regresi dan temuan

## Kesimpulan
**Belum lulus verifikasi browser nyata.** Chromium dan Python Playwright terpasang, dan Chromium berhasil diluncurkan. Namun navigasi ke localhost dan file:// ditolak dengan `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Percobaan menjalankan HTML dengan `page.set_content` juga timeout, sehingga tidak ada pengujian end-to-end yang boleh diklaim lulus. Tidak ada bukti visual valid dari sesi ini. Jangan gunakan checkpoint ini sebagai production stable.

## Pengujian yang berhasil
- `python validate_bank.py`: 500 soal, 125 per bagian, validasi pilihan, audio dan bacaan.
- Seluruh 10 file `tests/test_*.js`: berhasil (CBT, migrasi, adaptive, study, academy, 100 modul, gamification, analytics, final, M0).
- `node --check` untuk seluruh JS: berhasil.
- Arsip ZIP: integritas diperiksa setelah pengemasan.

## Perbaikan M8
1. **Listening TTS:** pada error pemutaran, kesempatan putar yang gagal dikembalikan dan tombol dapat dicoba ulang; sebelumnya kesempatan tetap terpakai saat suara gagal. Tidak bisa memastikan perilaku perangkat sampai tes browser/TTS nyata.
2. **PWA:** versi cache diubah ke `latsoljft-content-mega-m8-1`.
3. **Asset:** query cache HTML diselaraskan ke `mega-m8-1`.

## Pengujian yang masih wajib
- Browser desktop/Android/iOS: profil, CBT 48 soal, batas 60 menit, 4 bagian, audio maksimum 2 kali, refresh/resume, hasil, riwayat.
- Academy 100 modul, adaptive, spaced repetition, planner, XP/streak, analytics.
- 375/768/1280 px tanpa overflow; keyboard, aksesibilitas, TTS Japanese voice dan PWA offline.
- Pengujian migrasi data nyata v15/v16, tab paralel, backup/restore.
- Proofreading editorial 500 soal dan 100 modul oleh reviewer bahasa Jepang.

## Cara menguji di perangkat pengguna
Ekstrak ZIP, jalankan `python -m http.server 8000` dari folder proyek, buka `http://localhost:8000` di Chrome. Jangan mengandalkan file:// untuk service worker. Gunakan checklist QA-M7.md sebagai dasar, dan dokumentasikan screenshot/console error.
