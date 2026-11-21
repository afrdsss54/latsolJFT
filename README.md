# LatSol JFT A2 — v6

Website latihan CBT independen untuk GitHub Pages. **Bukan produk resmi JFT-Basic.**

## Fitur
- 240 butir soal dalam 6 paket (40 per paket), 4 bagian: Moji/Goi, Kaiwa, Choukai, Dokkai.
- Timer 60 menit, navigasi mengikuti batasan bagian, penilaian dan pembahasan.
- Listening: text-to-speech Jepang melalui browser (perlu suara `ja-JP` terinstal). **Belum ada MP3 rekaman penutur asli.**
- V6: kartu dokumen visual terstruktur untuk bacaan Dokkai, pintasan keyboard 1–4 dan panah, perbaikan cache aset.
- Profil dan riwayat nilai tersimpan secara lokal (bukan akun cloud).
- Beberapa pola dan konteks soal masih berulang; belum ada jaminan 240 skenario sepenuhnya berbeda.

## Publikasi
Upload **isi folder** ke root repo `afrdsss54/latsolJFT`, termasuk `.github/workflows/deploy.yml`. Di GitHub Settings → Pages pilih GitHub Actions. Tidak perlu npm.

## Pengujian
Jalankan `node --check app.js` dan `node --check questions.js` untuk cek sintaks. Uji listening pada browser yang memiliki voice Jepang.

## Catatan
Skor persentase adalah skor latihan, bukan skor resmi JFT-Basic 10–250. Jangan menyalin soal resmi atau materi ujian berhak cipta.
