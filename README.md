# LatSol JFT — Simulasi JFT-Basic A2

Website latihan ujian JFT-Basic A2 berbasis HTML/CSS/JavaScript murni. Tidak memakai Node, npm, Vite, atau plugin React. Siap deploy GitHub Pages.

## Fitur
- 48 soal orisinal: 12 huruf/kosakata, 12 percakapan/ungkapan, 12 listening, 12 reading.
- Timer 60 menit; otomatis submit saat habis.
- Navigasi dalam bagian; setelah pindah bagian tidak bisa kembali.
- Listening: audio Japanese text-to-speech browser, maksimal dua pemutaran per soal, tidak bisa kembali ke soal sebelumnya.
- Hasil per bagian, review jawaban, penyimpanan riwayat di browser, cetak hasil.
- Skor **latihan** adalah persentase benar, **bukan** skor resmi JFT-Basic (10–250, dihitung dengan equating).

## Cara publish
1. Hapus seluruh file lama dari repositori `afrdsss54/latsolJFT` lalu upload **isi** folder ini ke root repo (termasuk `.github/workflows/deploy.yml`).
2. Settings > Pages > Build and deployment > Source: **GitHub Actions**.
3. Actions > Deploy JFT A2 Practice, tunggu hijau.
4. Buka https://afrdsss54.github.io/latsolJFT/

Untuk tes lokal, cukup buka `index.html` di browser. Chrome/Edge dengan voice Jepang yang tersedia lebih baik untuk listening. Audio menggunakan speech synthesis perangkat, bukan rekaman asli.

Materi tidak berafiliasi dengan The Japan Foundation. Rujukan format: https://www.jpf.go.jp/jft-basic/id/about/
