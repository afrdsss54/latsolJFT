# LatSol JFT-Basic A2 — v5 (GitHub Pages)

Simulasi CBT **independen**, bukan situs/soal resmi Japan Foundation.

## Fitur
- 6 paket × 40 soal = 240 butir; empat bagian: Moji/Goi, Kaiwa/Hyougen, Choukai, Dokkai.
- Timer 60 menit; perpindahan bagian terkunci; Listening tidak bisa mundur; maksimal 2 kali putar per soal.
- Dialog Jepang dibacakan **berurutan per pembicara** dengan dua suara Jepang bila tersedia, atau variasi pitch bila hanya ada satu suara. Memerlukan dukungan `speechSynthesis` dan voice `ja-JP` dari perangkat/browser. **Tidak ada MP3 asli**; audio dapat berbeda antarsistem.
- Kartu ilustrasi kategori situasi (emoji) pada listening dan reading. **Bukan gambar situasional detail atau gambar resmi**.
- Pembahasan, transkrip setelah ujian, profil lokal, riwayat nilai, ekspor JSON, print, pemulihan sesi.
- Tidak ada akun online/password/sinkronisasi; data lokal di browser.
- **240 butir tidak seluruhnya unik secara konten**: 60 prompt kosakata unik, 60 prompt Kaiwa unik, 60 butir listening dari 15 dialog dasar, 60 butir Dokkai dari 15 bacaan dasar. Jangan menyamakan variasi dengan 240 situasi unik.
- Persentase adalah skor latihan, bukan skala 10–250 resmi JFT-Basic.

## Cara upload ke `afrdsss54/latsolJFT`
1. Ekstrak ZIP dan upload **isi folder** ke root repositori.
2. **Hapus file lama yang tidak digunakan** (misalnya `package.json`, `vite.config.js`, folder `src`) agar tidak bingung.
3. Pastikan `.github/workflows/deploy.yml` ada. Di GitHub Settings → Pages pilih GitHub Actions.
4. Pantau Actions dan akses https://afrdsss54.github.io/latsolJFT/ . Hard refresh `Ctrl+F5` jika perlu.

## Validasi
Pemeriksaan sintaks JS dan bank soal dapat dijalankan lokal; belum diuji end-to-end di browser atau deploy ke akun pengguna.
