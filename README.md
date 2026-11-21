# LatSol JFT A2 — Mega Edition (v7–v10)

Website latihan **independen**, bukan situs/soal resmi JFT-Basic. Dibangun dari paket v6, dengan tambahan dashboard, flashcard, latihan adaptif, bookmark, backup, dan PWA offline.

## Fitur aktif
- 6 paket x 40 soal = 240 butir bank soal dari versi sebelumnya (beberapa konteks berulang).
- CBT 60 menit, 4 bagian, pembahasan dan riwayat nilai lokal.
- Listening **speech synthesis** browser (bukan MP3 rekaman penutur asli).
- Dashboard nilai per bagian, rekomendasi bagian terlemah.
- Flashcard Moji/Goi dengan level 0–5 tersimpan lokal.
- Smart Practice 10 soal acak berbobot berdasarkan nilai simulasi.
- Bookmark soal, ekspor/impor backup data Learning.
- PWA: instalasi dan cache aset untuk akses offline setelah kunjungan online pertama. TTS offline bergantung pada suara Jepang yang terpasang pada perangkat.

## Batasan penting
- **Belum ada akun online, database cloud, sinkronisasi lintas perangkat, audio MP3 natural, maupun 240 skenario unik**. Profil adalah lokal per browser.
- Hasil berupa persentase latihan; **bukan** skor resmi JFT-Basic.
- Browser dapat menghapus data lokal. Backup rutin dianjurkan.
- Smart Practice hanya memprioritaskan bagian yang lebih lemah berdasarkan nilai sebelumnya, bukan sistem AI adaptif.

## Deploy GitHub Pages
1. Ekstrak ZIP, unggah **isi folder** ke root branch `main` repositori `afrdsss54/latsolJFT`.
2. Hapus file lama yang tidak diperlukan seperti `package.json` dan `vite.config.js` agar tidak membingungkan (tidak diperlukan).
3. Pastikan `.github/workflows/deploy.yml` ada. Di Settings → Pages pilih **GitHub Actions**.
4. Tunggu Actions hijau, buka `https://afrdsss54.github.io/latsolJFT/` lalu refresh paksa bila cache versi lama.
5. Uji profil → simulasi → hasil → Smart Learning → flashcard → bookmark → backup.

## Untuk akun online sungguhan
Butuh layanan autentikasi dan database, misalnya Supabase. Buat project Supabase, atur kebijakan RLS untuk tabel profil dan nilai, lalu integrasikan Supabase Auth pada frontend. **Jangan pernah menyimpan service_role key di GitHub Pages.** Tidak ada integrasi online palsu dalam ZIP ini.

## Catatan privasi
Data ujian dan profil disimpan di `localStorage` dan `sessionStorage`. Hindari data sensitif, khususnya pada komputer publik.
