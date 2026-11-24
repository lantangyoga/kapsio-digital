# Website Kapsio Digital

Situs statis (HTML, CSS, JavaScript) tanpa proses build. Gratis di GitHub Pages, formulir tersimpan di Supabase.

## Isi folder
- `index.html`: seluruh halaman website
- `config.js`: nomor WhatsApp, harga, teks promo, dan kunci Supabase (ubah di sini saja)
- `supabase.sql`: pembuat tabel `leads` beserta aturan keamanannya

## Langkah pasang
1. **Isi `config.js`:** ganti `wa` dengan nomor WhatsApp CS (format 62812xxxxxxx), cek harga dan teks promo.
2. **Supabase:** buat proyek gratis di supabase.com, buka SQL Editor, tempel isi `supabase.sql`, lalu Run. Salin Project URL dan kunci publishable/anon dari Project Settings > API ke `config.js`.
3. **GitHub:** buat repository (misalnya `kapsio-digital`), unggah semua file di folder ini.
4. **GitHub Pages:** di repository, Settings > Pages > Source: Deploy from a branch > pilih `main` dan folder `/ (root)` > Save. Website tayang di `https://NAMA-AKUN.github.io/kapsio-digital/`.
5. **Domain sendiri (opsional):** beli domain, lalu di Settings > Pages isi Custom domain dan atur DNS sesuai petunjuk GitHub.

## Melihat calon klien
Buka dashboard Supabase > Table Editor > tabel `leads`. Pengunjung website hanya bisa menambah data, tidak bisa membacanya.

## Catatan keamanan
Kunci anon Supabase memang terlihat publik di website, aman selama RLS aktif seperti di `supabase.sql`. Jangan pernah menaruh kunci `service_role` di `config.js`.

## Logo, maskot, dan folder assets
Semua file brand ada di `assets/` (logo SVG + PNG, ikon, favicon, maskot Kapsi, gambar share `og-image.png`, font Poppins).
Agar gambar share tampil di WhatsApp/Instagram, ubah `og:image` di index.html menjadi alamat penuh,
contoh `https://namaakun.github.io/kapsio/assets/og-image.png` (atau domain sendiri) setelah website tayang.

## Harga dan promo
Ubah di `config.js`: harga normal, harga promo, dan tanggal `promoSampai`. Setelah tanggal lewat, harga otomatis kembali normal dan banner promo hilang.

## Kasir
Dua tabel `pesanan` dan `pembayaran` ada di akhir `supabase.sql` (privat). Penjelasan alur ada di dokumen "Sistem Pembayaran dan Kasir Kapsio Digital".

## Status Supabase
Proyek `kapsio-digital` sudah dibuat dan tabel `leads`, `pesanan`, `pembayaran` sudah terpasang. URL dan kunci publik sudah terisi di `config.js`.
Daftar calon klien dan permintaan audit gratis ada di Supabase > Table Editor > leads (kolom `sumber`: website, chat, atau audit).

## Paket
Rintis (1 halaman), Tumbuh (5 halaman), Juara (12 halaman), Jaga (perawatan). Harga diubah di `config.js`.
