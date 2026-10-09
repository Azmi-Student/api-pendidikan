# ?? Pusat Data Pendidikan API

API publik (Open Data) gratis, super cepat, dan terbuka untuk mencari data **Sekolah Nasional (SD, SMP, SMA, SMK)** dan **Perguruan Tinggi Negeri (Kampus)** di seluruh wilayah Indonesia.

Sangat cocok digunakan untuk fitur *Autocomplete/Search* di form pendaftaran aplikasi *mobile* maupun *website*.

---

## ?? Fitur Utama

- **Cepat & Instan:** Ditenagai oleh PostgreSQL dengan teknologi `GIN Index` (pencarian kurang dari 50ms).
- **Acronym Engine:** Pintar mendeteksi singkatan (contoh: "sman" otomatis menjadi "sma negeri", "polban" menjadi "politeknik negeri bandung").
- **Dukungan CORS:** Bisa dipanggil langsung dari *frontend* manapun (React, Vue, Vanilla JS, Flutter) tanpa diblokir oleh *browser*.
- **Tanpa Auth:** Tidak perlu repot mendaftar API Key atau memakai token otorisasi.
- **Data Lengkap:** 
  - Data Sekolah (Dapodik Kemendikdasmen): Berisi profil, status, akreditasi, dan wilayah operasional.
  - Data Kampus (SNPMB BPPP): Berisi informasi Perguruan Tinggi (Akademik/Vokasi) beserta list prodi dan kuota daya tampung SNBT.

---

## ?? Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS (untuk UI Explorer & Dokumentasi)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

---

## ?? Panduan API

Silakan kunjungi halaman dokumentasi API untuk melihat penjelasan *Endpoint*, parameter, dan format JSON secara detail:
?? **[Lihat Dokumentasi API Lengkap](https://api-pendidikan.vercel.app/docs)**

### Endpoint Tersedia:
1. `GET /api/sekolah?q={kata_kunci}` (Pencarian Sekolah)
2. `GET /api/kampus?q={kata_kunci}` (Pencarian Kampus)

*(Telah mendukung filter pagination dengan menambahkan parameter `page` dan `limit`)*

---

## ?? Panduan Menjalankan Secara Lokal

Jika kamu ingin mengembangkan proyek ini secara mandiri, ikuti langkah berikut:

```bash
# 1. Clone repository ini
git clone https://github.com/Azmii-Student/api-pendidikan.git

# 2. Masuk ke folder proyek
cd api-pendidikan

# 3. Install dependencies
npm install

# 4. Buat file .env.local dan masukkan API Keys Supabase-mu
# NEXT_PUBLIC_SUPABASE_URL=xxx
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=xxx

# 5. Jalankan development server
npm run dev
```

Buka `http://localhost:3000` di browser untuk melihat UI Explorer dan Dokumentasi API.

---

> **Credit & Disclaimer:** 
> Proyek ini dikembangkan oleh [Azmi.dev]. Segala data yang disajikan merupakan hasil agregasi dari *platform* resmi kementerian (Kemendikdasmen & SNPMB BPPP) dan ditujukan murni sebagai sarana edukasi (Open Source).

