# LatSol JFT-Basic A2 — v4

Website latihan CBT **independen**, bukan situs atau soal resmi Japan Foundation.

## Isi
- 6 paket × 40 soal (240 butir), 4 bagian: Moji/Goi, Kaiwa/Hyougen, Choukai, Dokkai.
- Choukai: 15 skenario dialog/pengumuman yang didistribusikan dalam 60 butir, menggunakan suara Jepang text-to-speech browser (bukan audio rekaman).
- Dokkai: 15 jenis teks fungsional (jadwal, pesan, pengumuman, menu, dll.) didistribusikan dalam 60 butir.
- **Perhatian:** skenario dasar dapat berulang antarpaket. Ini belum 240 soal unik sepenuhnya.
- Timer 60 menit, navigasi antarbagian terkunci, review jawaban, riwayat lokal, ekspor JSON.
- Profil hanya disimpan pada browser, bukan akun online dan tidak tersinkron.
- Skor adalah persentase latihan, bukan skor resmi JFT-Basic 10–250.

## Deploy ke GitHub Pages
1. Unggah **isi** ZIP ke root repositori `afrdsss54/latsolJFT` (ganti file lama).
2. Pastikan `.github/workflows/deploy.yml` ikut terunggah.
3. Di Settings → Pages, pilih Source: **GitHub Actions**.
4. Periksa tab Actions dan buka https://afrdsss54.github.io/latsolJFT/

## Keterbatasan
Suara Japanese perlu tersedia di OS/browser. Tidak ada file MP3. Pengujian interaksi manual di browser dan deployment GitHub belum dilakukan.
