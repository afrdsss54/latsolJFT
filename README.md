# LatSol JFT A2 v16 — M5 Learning Center

## Baru di M5
- Learning Center **terpisah** dari Smart Learning dan CBT, dengan empat kategori: Kotoba, Bunpou, Kanji, Kaiwa.
- 16 pelajaran awal yang ditulis untuk modul ini (4 per kategori), masing-masing dengan contoh Jepang, arti Indonesia, satu kuis empat pilihan, dan pembahasan.
- Progres jawaban benar tersimpan per profil di `localStorage` (`latsoljft-center-v16-<profile>`). Jawaban salah dapat dicoba ulang.
- TTS Jepang untuk contoh kalimat jika perangkat memiliki suara Jepang.
- Perbaikan dashboard Smart Learning lama agar hasil 48 soal v16 memakai snapshot, bukan indeks 40 soal v15.
- CBT M4 dan bank 500 entri dipertahankan. Tidak ada Supabase atau API berbayar.

## Batasan
- 16 materi awal adalah fondasi, **bukan kurikulum A2 lengkap**. Materi dan soal belum melalui review penutur/pengajar independen.
- Bank 500 entri masih perlu audit editorial, terutama kesamaan pola soal.
- TTS bergantung browser/perangkat, bukan audio rekaman.
- Progres tersimpan lokal dan tidak disinkronkan antarperangkat.
- Pengujian browser end-to-end belum dilakukan. Validasi sintaks dan struktur bukan pengganti QA perangkat.

## Deploy
Ekspor cadangan riwayat dari versi sebelumnya. Upload seluruh isi ZIP ke root repo GitHub, commit `main`, tunggu Vercel deploy, lalu hard-refresh. `index.html` harus berada di root. Jika service worker menyajikan cache lama, lakukan reload/clear site cache dengan hati-hati (menghapus site data juga dapat menghapus riwayat lokal).

## Tes manual
1. Buat/pilih profil → Learning Center → keempat kategori → buka materi → jawab kuis → periksa → kembali → progres tetap.
2. Periksa TTS contoh dan pesan fallback tanpa suara Jepang.
3. Masuk CBT, selesaikan sesi 48 soal, cek riwayat dan Smart Learning dashboard.
4. Buka hasil lama v15 40 soal dan pastikan pembahasannya tetap sesuai.
