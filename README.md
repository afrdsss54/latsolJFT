# LatSol JFT A2 v3 — Simulasi CBT independen

Website latihan JFT-Basic A2 mandiri berbasis HTML, CSS, dan JavaScript. **240 soal (6 paket × 40 soal)**, empat bagian (Moji/Goi, Kaiwa/Hyougen, Choukai, Dokkai), timer 60 menit, pengarahan sebelum tiap bagian, pembahasan dan transkrip setelah ujian, profil serta riwayat lokal.

## Pembaruan v3
- Layar instruksi sebelum ujian dimulai dan sebelum tiap bagian; timer baru dimulai saat klik **Mulai ujian 60 menit**.
- Penamaan Jepang setiap bagian dan aturan navigasi lebih jelas.
- Antarmuka CBT yang lebih mudah dibaca di desktop/HP.
- Listening: text-to-speech bahasa Jepang dari browser, **bukan rekaman suara resmi**. Perlu suara ja-JP tersedia di perangkat.

## Instalasi ke GitHub Pages
1. Ekstrak ZIP; upload **isi ZIP** ke root repositori `afrdsss54/latsolJFT`, mengganti file lama.
2. Pastikan `.github/workflows/deploy.yml` ikut ter-upload.
3. Settings → Pages → Source: GitHub Actions.
4. Periksa Actions sampai hijau; kunjungi https://afrdsss54.github.io/latsolJFT/ dan hard refresh bila perlu.

## Batasan
- Ini **bukan** website, desain persis, soal, atau audio resmi The Japan Foundation.
- Hasil berupa persentase latihan; **bukan** konversi skor resmi 10–250 dan bukan penetapan kelulusan resmi. Target internal 80% hanya untuk latihan.
- Profil dan riwayat memakai localStorage browser; tidak ada login server, password, atau sinkronisasi antardevice.
- Beberapa pola soal berulang dengan variasi. Bank soal belum setara bank soal resmi.
- Sesi aktif tersimpan dalam sessionStorage tab; jangan menghapus data browser saat ujian.
- Belum ada rekaman listening profesional, gambar situasional, atau validasi kesetaraan kesulitan resmi.

## Struktur
`index.html`, `style.css`, `app.js`, `questions.js`, `questions.json`, `.nojekyll`, `.github/workflows/deploy.yml`, `README.md`. Tanpa build tools.
