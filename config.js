/* ============================================================
   PENGATURAN KAPSIO DIGITAL
   Ubah nilai di bawah ini, tidak perlu mengubah index.html.
   ============================================================ */
window.KAPSIO = {
  // Nomor WhatsApp CS, format internasional tanpa + dan tanpa spasi.
  wa: "6289683046641",

  // Supabase (gratis). Isi setelah proyek Supabase dibuat.
  // Kunci "anon / publishable" memang aman ditaruh di sini selama RLS aktif (lihat supabase.sql).
  supabaseUrl: "https://gxxfqqrykjjitnzlysdz.supabase.co",
  supabaseKey: "sb_publishable_F_vGdshRExRT47K-TQJBOQ_j3D8wyN7",

  // Harga di website. "normal" = harga biasa (dicoret), "promo" = harga promo akhir tahun.
  harga: {
    rintis: { normal: "Rp1.500.000", promo: "Rp299.000" },   // 1 halaman
    tumbuh: { normal: "Rp3.000.000", promo: "Rp599.000" },   // 5 halaman
    juara:  { normal: "Rp6.000.000", promo: "Rp1.199.000" }, // 12 halaman
    jaga:   { normal: "Rp250.000",   promo: "Rp99.000" }     // perawatan per bulan
  },

  // Promo berakhir (hitung mundur di website). Setelah lewat, harga otomatis kembali normal.
  promoSampai: "2026-12-31T23:59:59+07:00",

  // Rekening / QRIS resmi (tampil di bagian Pembayaran HANYA jika noRekening dan atasNama terisi).
  // qrisGambar: alamat gambar QRIS, contoh "assets/qris.png" (taruh file QRIS di folder assets).
  pembayaran: { bank: "", noRekening: "", atasNama: "", qrisGambar: "" },

  // Akun Instagram Kapsio (tanpa @). Kosongkan jika belum ada.
  instagram: "",

  // Teks banner promo. Kosongkan ("") untuk menyembunyikan banner.
  promo: "Promo akhir tahun 2026: website mulai Rp299 ribu. Berlaku sampai 31 Desember!"
};
