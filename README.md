# 🎓 Pusat Data Pendidikan API

API publik (Open Data) gratis, super cepat, dan terbuka untuk mencari data **Sekolah Nasional (SD, SMP, SMA, SMK)**, **Perguruan Tinggi Negeri (Kampus)**, **Master Jurusan / Peminatan Sekolah**, serta **Rekomendasi Linearitas Program Studi PTN (SNBT)** di seluruh Indonesia.

Sangat cocok digunakan untuk fitur *Autocomplete/Search* pada form pendaftaran siswa/mahasiswa di aplikasi *mobile* maupun *website*.

---

## 🚀 Fitur Utama

- **Cepat & Instan:** Respon API super cepat (<50ms) dengan caching teroptimasi.
- **Pencarian Cerdas Multi-Dimensi:**
  - Kampus dapat dicari berdasarkan **Nama Kampus**, **Akronim/Singkatan** (contoh: *UI, ITB, UGM, Undip, Polinema*), maupun **Nama Program Studi** (contoh: *Teknik Informatika, Kedokteran, Hukum, Farmasi*).
  - Sekolah dilengkapi pendeteksi singkatan otomatis (contoh: *sman* &rarr; *sma negeri*, *smkn* &rarr; *smk negeri*).
- **Rekomendasi Linearitas PTN (SNBT):** Otomatis mencocokkan jurusan SMA/SMK dengan pilihan program studi PTN yang linear beserta kuota daya tampung SNBT.
- **Dukungan CORS Penuh:** Bisa langsung dipanggil dari *frontend* manapun (React, Vue, Next.js, Flutter, Android, iOS) tanpa takut diblokir oleh *browser*.
- **Tanpa Auth:** Terbuka bebas tanpa repot mendaftar API Key atau memakai token otorisasi.

---

## 📊 Sumber Data Resmi

1. **Data Sekolah Nasional (Dapodik Kemendikdasmen):** Profil sekolah, NPSN, akreditasi, status (Negeri/Swasta), dan alamat lengkap.
2. **Data Perguruan Tinggi (SNPMB BPPP Kemendikbudristek):** Profil kampus PTN (Akademik & Vokasi), daftar prodi, dan daya tampung jalur SNBT.
3. **Data Jurusan & Spektrum Keahlian:** Standar resmi **Keputusan BSKAP No. 024/H/KR/2022** tentang Spektrum Keahlian SMK & Nomenklatur Kurikulum Merdeka (SMA/MA).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS (UI Explorer & Dokumentasi)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

---

## 📖 Panduan Endpoint API

Dokumentasi interaktif dapat diakses langsung di:  
👉 **[api-pendidikan.vercel.app/docs](https://api-pendidikan.vercel.app/docs)**

### 1. Data Sekolah
```http
GET /api/sekolah?q={kata_kunci}&bentuk={SMA|SMK|SMP|SD}&provinsi={provinsi}&page=1&limit=50
```
Mencari sekolah berdasarkan nama, daerah, atau NPSN.

### 2. Data Perguruan Tinggi
```http
GET /api/kampus?q={kata_kunci_atau_prodi}&provinsi={provinsi}&page=1&limit=50
```
Mencari kampus berdasarkan nama kampus, singkatan kampus (contoh: `itb`, `unpad`), atau nama program studi (contoh: `teknik informatika`, `kedokteran`).

### 3. Master Jurusan Sekolah
```http
GET /api/jurusan?q={kata_kunci_atau_alias}&jenjang={SMA|MA|SMK}&bidang={bidang}&page=1&limit=50
```
Mendapatkan master jurusan dan peminatan sekolah menengah Kurikulum Merdeka beserta daftar program studi PTN yang linear.

### 4. Rekomendasi PTN Linear
```http
GET /api/rekomendasi?jurusan={nama_jurusan_atau_alias}
```
Mendapatkan rekomendasi kampus PTN dan program studi yang linear dengan jurusan sekolah siswa, lengkap dengan kuota daya tampung SNBT.  
*Contoh:* `/api/rekomendasi?jurusan=rpl`

---

## 💻 Panduan Menjalankan Secara Lokal

Jika ingin mengembangkan atau menjalankan proyek ini di komputermu:

```bash
# 1. Clone repository ini
git clone https://github.com/Azmi-Student/api-pendidikan.git

# 2. Masuk ke folder proyek
cd api-pendidikan

# 3. Install dependencies
npm install

# 4. Buat file .env.local dan masukkan credentials Supabase
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-key

# 5. Jalankan development server
npm run dev
```

Buka **`http://localhost:3000`** di browser untuk membuka Explorer dan Dokumentasi API.

---

> **Credit & Disclaimer:**  
> Proyek ini dikembangkan oleh **Azmi.dev**. Segala data yang disajikan merupakan hasil agregasi dari sumber resmi kementerian (Kemendikdasmen & SNPMB BPPP) dan ditujukan murni sebagai sarana edukasi publik (*Open Source*).
