-- Jalankan di Supabase: menu SQL Editor, tempel, lalu Run.
-- Tabel untuk menyimpan calon klien dari formulir website.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nama        text not null check (char_length(nama) between 2 and 80),
  whatsapp    text not null check (char_length(whatsapp) between 8 and 20),
  jenis_usaha text check (jenis_usaha is null or char_length(jenis_usaha) <= 80),
  kebutuhan   text check (kebutuhan is null or char_length(kebutuhan) <= 80),
  link_akun   text check (link_akun is null or char_length(link_akun) <= 200),  -- Instagram/website untuk audit gratis
  sumber      text default 'website',
  status      text not null default 'baru'
);

alter table public.leads enable row level security;

-- Pengunjung website (anon) hanya boleh MENAMBAH data baru, tidak boleh membaca atau mengubah.
drop policy if exists "anon boleh tambah lead" on public.leads;
create policy "anon boleh tambah lead"
  on public.leads for insert
  to anon
  with check (status = 'baru' and sumber in ('website','chat','audit'));

-- Data hanya bisa dibaca lewat dashboard Supabase (Table Editor) oleh pemilik proyek.

-- ============================================================
-- KASIR (pesanan dan pembayaran). PRIVAT: tanpa policy untuk anon,
-- jadi hanya pemilik (login Supabase / service role di dashboard) yang bisa baca dan tulis.
-- ============================================================
create table if not exists public.pesanan (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  no_invoice text unique not null,            -- contoh: KAP-2612-001
  nama text not null,
  whatsapp text not null,
  paket text not null,                        -- Rintis / Tumbuh / Juara / Jaga
  harga_normal bigint not null default 0,
  harga_promo bigint not null default 0,
  total bigint not null,                      -- yang harus dibayar klien
  status text not null default 'baru'
    check (status in ('baru','dp_dibayar','dikerjakan','revisi','menunggu_pelunasan','lunas','tayang','batal')),
  catatan text
);
create table if not exists public.pembayaran (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  pesanan_id uuid not null references public.pesanan(id) on delete cascade,
  jenis text not null check (jenis in ('dp','pelunasan','lainnya')),
  nominal bigint not null check (nominal > 0),
  metode text not null check (metode in ('qris','transfer','ewallet','tunai')),
  tanggal_masuk date,
  bukti_url text,
  status text not null default 'menunggu' check (status in ('menunggu','diterima','ditolak'))
);
alter table public.pesanan enable row level security;
alter table public.pembayaran enable row level security;
-- Sengaja TIDAK ada policy: anon tidak bisa membaca atau menulis dua tabel ini.
