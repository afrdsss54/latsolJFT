# LatSol JFT A2 — CBT Practice v2

Website latihan independen JFT-Basic A2. **240 soal orisinal** dalam **6 paket × 40 soal** (10 soal per bagian). Dibuat dengan HTML/CSS/JavaScript murni; tidak perlu Node, Vite, React, npm, atau backend.

## Fitur
- Empat bagian: Huruf & Kosakata, Percakapan & Ungkapan, Listening, Reading.
- Timer 60 menit per paket; otomatis selesai saat waktu habis.
- Navigasi soal dalam bagian; tidak bisa kembali ke bagian sebelumnya. Listening hanya maju, maksimal 2 kali audio per soal.
- Listening via Web Speech API `speechSynthesis` dengan suara `ja-JP` dari sistem. **Memerlukan suara Jepang terinstal**. Bukan audio rekaman resmi, dan ketersediaannya berbeda menurut perangkat.
- Hasil persentase, hasil per bagian, review jawaban + pembahasan, transkrip listening setelah ujian, cetak hasil.
- Profil peserta lokal, riwayat per profil, ekspor JSON, hapus riwayat.
- Progres ujian disimpan di `sessionStorage` untuk pemulihan setelah refresh dalam tab yang sama; timer tetap berjalan. Hasil dan profil disimpan di `localStorage`.

## Deploy ke repositori afrdsss54/latsolJFT
1. **Ganti** semua file lama dengan file dari ZIP ini, termasuk folder tersembunyi `.github/workflows/deploy.yml`. Pastikan `index.html` ada di root repo.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Commit ke branch `main`, lalu periksa Actions sampai hijau.
4. Buka https://afrdsss54.github.io/latsolJFT/ (bila perlu hard refresh Ctrl+F5).

Tidak ada build step. Workflow mengunggah root repositori ke GitHub Pages.

## Batasan penting
- Profil bukan akun online yang aman dan tidak tersinkron antardevice. Untuk login sungguhan dan sinkronisasi, perlu backend (mis. Supabase/Firebase) dan konfigurasi kredensial terpisah.
- Skor adalah **persentase latihan**, bukan skor resmi JFT-Basic (10–250). Target internal 80% **bukan** ambang kelulusan resmi.
- Ini bukan replika persis atau afiliasi The Japan Foundation; soal dibuat khusus untuk latihan.
- Sebagian pola soal memakai variasi situasi berulang; bank soal berjumlah 240, tetapi bukan 240 skenario yang sepenuhnya berbeda.
- Soal listening memakai text-to-speech browser. Pada perangkat tanpa suara Jepang, pemutaran tidak tersedia.

## Struktur
`index.html`, `style.css`, `app.js`, `questions.js`, `questions.json` (salinan data untuk referensi), `.nojekyll`, `.github/workflows/deploy.yml`, `README.md`.

## Pengembangan
Edit `questions.json` sebagai sumber data, lalu perbarui `questions.js` menjadi `window.JFT_BANK = <isi JSON>;`. Urutan data harus per bagian (60 soal tiap bagian). Semua jawaban menggunakan indeks 0–3.
