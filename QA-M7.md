# M7 — QA integrasi dan status rilis

## Ringkasan
**Release Candidate, belum production-verified.** Semua pengujian unit/regresi otomatis yang tersedia berhasil pada lingkungan build. Pengujian interaksi browser/HP dan proofreading Jepang independen **belum selesai**.

## Pemeriksaan otomatis yang dijalankan
- `python validate_bank.py` — 500 soal, 125 per bagian, struktur bank.
- Seluruh `tests/test_*.js` — CBT 48 soal, timer, riwayat lama, adaptive, planner, academy, konten 100 modul, gamification, analytics.
- `node --check` semua JS, validitas JSON, referensi asset lokal dari HTML/PWA, integritas ZIP.

## Temuan dan perubahan M7
- Menyatukan checkpoint M0–M6 dalam satu ZIP, tanpa mengubah kunci data lokal.
- Menyelaraskan label beranda dan metadata ke Mega Release Candidate.
- Memperbarui query cache asset dan nama cache service worker untuk mencegah campuran berkas M6/M7.
- Menambahkan pemeriksaan integritas asset dan dokumentasi deployment/rollback.
- Headless Chromium tersedia, tetapi gagal menghasilkan dump DOM pada percobaan lokal. **Tidak dihitung sebagai browser QA lulus.**

## Risiko terbuka / blocker untuk status production-ready
1. **Editorial:** proofread 500 soal CBT dan 100 modul, termasuk distractor/ambiguitas.
2. **Browser:** Chrome desktop, Chrome Android, Safari iOS; navigasi, penyimpanan, layout 375px, voice Japanese, audio maksimum 2 kali.
3. **Persistence:** migrasi riwayat v15/v16, refresh sesi ujian, timeout, data antar-tab, ekspor/restore (fitur impor penuh tidak tersedia).
4. **PWA:** cache/offline setelah kunjungan pertama, pembaruan service worker, TTS offline bergantung perangkat.
5. **UX:** audit keyboard, screen reader, zoom 200%, dan kontras.

## Checklist penerimaan manual (jalankan setelah staging deploy)
- [ ] Buat profil dan selesaikan simulasi 48 soal; periksa skor, breakdown, pembahasan, riwayat.
- [ ] Refresh di tengah ujian; pastikan sesi dan deadline tetap. Uji auto-submit saat timeout.
- [ ] Pindah bagian: tidak dapat kembali; Choukai tidak dapat mundur, audio maksimal dua kali.
- [ ] Buka riwayat lama 40 soal; lihat peringatan rekonstruksi jika perlu.
- [ ] Academy: semua 100 modul terbuka, kuis, progres per profil, refresh.
- [ ] Adaptive: soal tanpa duplikasi; review due date dan planner.
- [ ] Gamification: XP tidak ganda; streak sesuai hari lokal.
- [ ] Exam Pro: tren sesuai riwayat nyata; data kosong tampil dengan benar.
- [ ] Mobile 375px, 768px, desktop: tanpa horizontal overflow atau tombol terpotong.
- [ ] Uji suara Jepang, kegagalan voice, offline PWA, dan update cache.
- [ ] Ekspor cadangan dan lakukan rollback test di staging.

## Keputusan rilis
**Boleh dibagikan untuk staging/UAT; jangan sebut verified production release** sampai checklist manual dan editorial selesai.
