# JFT A2 CBT Practice

Website latihan JFT-Basic A2 berbasis React + Vite, dengan timer 60 menit, 20 soal orisinal, 4 bagian, audio menggunakan browser speech synthesis, navigasi soal, penandaan, autosave lokal, skor dan pembahasan.

> **Tidak resmi:** Tidak berafiliasi dengan Japan Foundation. Soal bukan soal ujian asli. Persentase latihan tidak setara dengan skor resmi JFT-Basic (10–250).

## Menjalankan di komputer

1. Instal Node.js 18+.
2. Jalankan `npm install`.
3. Jalankan `npm run dev`.
4. Buka URL localhost yang ditampilkan.

## Publikasi gratis melalui GitHub Pages

1. Buat repository baru di GitHub, misalnya `jft-a2-cbt`.
2. Upload semua file project (jangan upload `node_modules`).
3. Buka **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Workflow `.github/workflows/deploy.yml` akan membangun dan memublikasikan website setiap kali ada push ke branch `main`.
5. Website akan tersedia di `https://USERNAME.github.io/jft-a2-cbt/` (ganti USERNAME dan nama repository sesuai milik Anda).

## Catatan

Audio memakai Web Speech API `ja-JP`; kualitas dan ketersediaan suara Jepang tergantung browser/OS. Tidak membutuhkan backend, dan progres ujian disimpan hanya di localStorage perangkat. Untuk bank soal lebih besar, tambahkan data ke `src/questions.js`.
