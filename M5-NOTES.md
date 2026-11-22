# M5 — Gamification & Mobile Premium

- XP: modul Academy pertama kali tuntas +20, Smart Practice selesai +35, simulasi CBT selesai +60. Batas XP harian 300.
- Pencapaian: 7 badge, level berdasarkan XP, streak dari tanggal lokal perangkat.
- Data per profil di localStorage (`latsoljft-game-<profile>`). Tidak ada server dan tidak ada sinkronisasi lintas perangkat.
- Deduplikasi: ID modul dan ID aktivitas tersimpan; daftar ID dibatasi 500 agar penyimpanan tidak tumbuh tanpa batas. Aktivitas yang sangat lama mungkin keluar dari daftar.
- Streak dihitung saat aktivitas tuntas; jika melewatkan satu hari, kembali ke 1. Mengubah tanggal perangkat dapat memengaruhi perhitungan.
- UI mobile: grid responsif, tab dapat digeser, fokus keyboard, target sentuh, preferensi reduced motion.
- Bukan sistem sertifikasi resmi. Perlu uji visual di perangkat dan audit aksesibilitas.
