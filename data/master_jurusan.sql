-- ==============================================================================
-- MASTER DATASET JURUSAN & PEMINATAN SEKOLAH MENENGAH (SMA, MA, SMK)
-- Standar Resmi: Keputusan Kepala BSKAP Kemendikbudristek No. 024/H/KR/2022
-- ==============================================================================

-- 1. Buat Tabel master_jurusan
CREATE TABLE IF NOT EXISTS master_jurusan (
    id VARCHAR(50) PRIMARY KEY,
    jenjang VARCHAR(10) NOT NULL,              -- SMA, MA, SMK
    bidang VARCHAR(100),                       -- Bidang Keahlian (khusus SMK)
    program VARCHAR(100),                      -- Program Keahlian (khusus SMK)
    nama VARCHAR(150) NOT NULL,                -- Nama Resmi Jurusan / Peminatan
    alias TEXT[] DEFAULT '{}',                 -- Singkatan / Nama Populer (RPL, TKJ, dll)
    durasi_tahun INT DEFAULT 3,                -- Durasi tempuh (3 atau 4 tahun)
    rekomendasi_prodi_ptn TEXT[] DEFAULT '{}', -- Program Studi Kuliah yang Linear / Cocok
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing agar pencarian cepat
CREATE INDEX IF NOT EXISTS idx_master_jurusan_jenjang ON master_jurusan(jenjang);
CREATE INDEX IF NOT EXISTS idx_master_jurusan_nama ON master_jurusan(nama);

-- 2. Insert Data SMA
INSERT INTO master_jurusan (id, jenjang, bidang, program, nama, alias, durasi_tahun, rekomendasi_prodi_ptn) VALUES
('SMA-MIPA', 'SMA', 'Sains dan Teknologi', 'MIPA', 'MIPA (Matematika dan Ilmu Pengetahuan Alam)', 
 ARRAY['IPA', 'Ilmu Alam', 'Sains', 'MIPA'], 3, 
 ARRAY['Kedokteran', 'Kedokteran Gigi', 'Farmasi', 'Teknik Informatika', 'Teknik Sipil', 'Teknik Elektro', 'Teknik Mesin', 'Teknik Industri', 'Sistem Informasi', 'Sains Data', 'Statistika', 'Matematika', 'Fisika', 'Kimia', 'Biologi', 'Arsitektur', 'Bioteknologi', 'Teknik Lingkungan', 'Teknik Kimia', 'Ilmu Komputer']),

('SMA-IPS', 'SMA', 'Sosial dan Humaniora', 'IPS', 'IPS (Ilmu Pengetahuan Sosial)', 
 ARRAY['IPS', 'Sosial', 'Humaniora', 'Soshum'], 3, 
 ARRAY['Ilmu Hukum', 'Manajemen', 'Akuntansi', 'Ilmu Komunikasi', 'Psikologi', 'Hubungan Internasional', 'Ilmu Administrasi Bisnis', 'Ilmu Administrasi Publik', 'Sosiologi', 'Ilmu Politik', 'Ekonomi Pembangunan', 'Perencanaan Wilayah dan Kota', 'Pendidikan Guru Sekolah Dasar (PGSD)', 'Kriminologi']),

('SMA-BAHASA', 'SMA', 'Bahasa, Budaya, dan Seni', 'Bahasa', 'Bahasa dan Budaya', 
 ARRAY['Bahasa', 'Ilmu Bahasa', 'Sastra'], 3, 
 ARRAY['Sastra Inggris', 'Sastra Indonesia', 'Sastra Jepang', 'Sastra Arab', 'Hubungan Internasional', 'Linguistik', 'Pariwisata', 'Ilmu Komunikasi', 'Pendidikan Bahasa Inggris', 'Pendidikan Bahasa Indonesia', 'Seni Teater'])
ON CONFLICT (id) DO UPDATE SET 
 nama = EXCLUDED.nama, alias = EXCLUDED.alias, rekomendasi_prodi_ptn = EXCLUDED.rekomendasi_prodi_ptn;

-- 3. Insert Data MA (Madrasah Aliyah)
INSERT INTO master_jurusan (id, jenjang, bidang, program, nama, alias, durasi_tahun, rekomendasi_prodi_ptn) VALUES
('MA-IPA', 'MA', 'Sains dan Teknologi', 'MIPA', 'MIPA (Ilmu Alam)', 
 ARRAY['IPA MA', 'MIPA'], 3, 
 ARRAY['Kedokteran', 'Teknik Informatika', 'Farmasi', 'Teknik Sipil', 'Sains Data']),

('MA-IPS', 'MA', 'Sosial dan Humaniora', 'IPS', 'IPS (Ilmu Sosial)', 
 ARRAY['IPS MA', 'IPS'], 3, 
 ARRAY['Ilmu Hukum', 'Manajemen', 'Akuntansi', 'Psikologi', 'Komunikasi']),

('MA-KEAGAMAAN', 'MA', 'Studi Keislaman dan Hukum Islam', 'Keagamaan', 'Ilmu-Ilmu Keagamaan (Keagamaan)', 
 ARRAY['Keagamaan', 'Agama', 'PK', 'Program Keagamaan'], 3, 
 ARRAY['Hukum Keluarga Islam (Ahwal Syakhshiyyah)', 'Hukum Ekonomi Syariah', 'Ilmu Al-Qur''an dan Tafsir', 'Komunikasi dan Penyiaran Islam', 'Pendidikan Agama Islam', 'Sastra Arab', 'Bimbingan dan Konseling Islam']),

('MA-BAHASA', 'MA', 'Bahasa dan Sastra', 'Bahasa', 'Bahasa dan Budaya', 
 ARRAY['Bahasa MA'], 3, 
 ARRAY['Sastra Arab', 'Sastra Inggris', 'Pendidikan Bahasa', 'Hubungan Internasional'])
ON CONFLICT (id) DO UPDATE SET 
 nama = EXCLUDED.nama, alias = EXCLUDED.alias, rekomendasi_prodi_ptn = EXCLUDED.rekomendasi_prodi_ptn;

-- 4. Insert Data SMK
INSERT INTO master_jurusan (id, jenjang, bidang, program, nama, alias, durasi_tahun, rekomendasi_prodi_ptn) VALUES
-- Teknologi Informasi
('SMK-RPL', 'SMK', 'Teknologi Informasi', 'Pengembangan Perangkat Lunak dan Gim', 'Rekayasa Perangkat Lunak', 
 ARRAY['RPL', 'Software Engineering', 'Rekayasa Perangkat Lunak dan Gim'], 3, 
 ARRAY['Teknik Informatika', 'Ilmu Komputer', 'Sistem Informasi', 'Rekayasa Perangkat Lunak', 'Teknologi Informasi', 'Sains Data']),

('SMK-GIM', 'SMK', 'Teknologi Informasi', 'Pengembangan Perangkat Lunak dan Gim', 'Pengembangan Gim', 
 ARRAY['Game Dev', 'Game Development', 'Teknologi Gim'], 3, 
 ARRAY['Teknologi Permainan (Game Tech)', 'Teknik Informatika', 'Desain Komunikasi Visual', 'Animasi']),

('SMK-TKJ', 'SMK', 'Teknologi Informasi', 'Teknik Jaringan Komputer dan Telekomunikasi', 'Teknik Komputer dan Jaringan', 
 ARRAY['TKJ', 'Network Engineering', 'Teknik Jaringan'], 3, 
 ARRAY['Teknik Komputer', 'Teknik Informatika', 'Teknik Telekomunikasi', 'Keamanan Siber (Cyber Security)', 'Sistem Informasi']),

('SMK-TJAT', 'SMK', 'Teknologi Informasi', 'Teknik Jaringan Komputer dan Telekomunikasi', 'Teknik Jaringan Akses Telekomunikasi', 
 ARRAY['TJAT', 'Fiber Optik', 'Akses Telekomunikasi'], 3, 
 ARRAY['Teknik Telekomunikasi', 'Teknik Elektro', 'Teknik Komputer']),

('SMK-TTT', 'SMK', 'Teknologi Informasi', 'Teknik Jaringan Komputer dan Telekomunikasi', 'Teknik Transmisi Telekomunikasi', 
 ARRAY['Transmisi Telekomunikasi', 'TTT', 'Radio & Wireless'], 3, 
 ARRAY['Teknik Telekomunikasi', 'Teknik Elektro']),

('SMK-SIJA', 'SMK', 'Teknologi Informasi', 'Sistem Informasi Jaringan dan Aplikasi', 'Sistem Informasi, Jaringan, dan Aplikasi', 
 ARRAY['SIJA', 'Cloud & DevOps', 'SIJA 4 Tahun'], 4, 
 ARRAY['Sistem Informasi', 'Teknik Informatika', 'Teknologi Rekayasa Komputer', 'Rekayasa Cloud']),

-- Bisnis dan Manajemen
('SMK-BD', 'SMK', 'Bisnis dan Manajemen', 'Pemasaran', 'Bisnis Digital', 
 ARRAY['Bisnis Digital', 'Digital Marketing', 'E-Commerce'], 3, 
 ARRAY['Bisnis Digital', 'Manajemen', 'Pemasaran Digital', 'Ilmu Komunikasi', 'Administrasi Bisnis']),

('SMK-BR', 'SMK', 'Bisnis dan Manajemen', 'Pemasaran', 'Bisnis Ritel', 
 ARRAY['Bisnis Ritel', 'Pemasaran', 'Tata Niaga', 'Retail'], 3, 
 ARRAY['Manajemen Pemasaran', 'Administrasi Bisnis', 'Manajemen Retail']),

('SMK-MP', 'SMK', 'Bisnis dan Manajemen', 'Manajemen Perkantoran dan Layanan Bisnis', 'Manajemen Perkantoran', 
 ARRAY['OTKP', 'Otomatisasi dan Tata Kelola Perkantoran', 'Administrasi Perkantoran', 'Sekretaris'], 3, 
 ARRAY['Administrasi Perkantoran', 'Manajemen', 'Ilmu Komunikasi', 'Administrasi Publik']),

('SMK-LP', 'SMK', 'Bisnis dan Manajemen', 'Manajemen Perkantoran dan Layanan Bisnis', 'Layanan Perbankan', 
 ARRAY['Perbankan', 'Perbankan Mikro', 'Banking'], 3, 
 ARRAY['Perbankan', 'Keuangan dan Perbankan', 'Akuntansi', 'Manajemen Keuangan']),

('SMK-AKL', 'SMK', 'Bisnis dan Manajemen', 'Akuntansi dan Keuangan Lembaga', 'Akuntansi', 
 ARRAY['AKL', 'Akuntansi dan Keuangan Lembaga', 'Akuntansi Perpajakan'], 3, 
 ARRAY['Akuntansi', 'Perpajakan', 'Manajemen Keuangan', 'Ekonomi Pembangunan']),

('SMK-PKS', 'SMK', 'Bisnis dan Manajemen', 'Akuntansi dan Keuangan Lembaga', 'Perbankan Syariah', 
 ARRAY['Perbankan Syariah', 'Bank Syariah'], 3, 
 ARRAY['Perbankan Syariah', 'Ekonomi Syariah', 'Akuntansi Syariah', 'Hukum Ekonomi Syariah']),

-- Teknologi Manufaktur dan Rekayasa
('SMK-TPM', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Mesin', 'Teknik Pemesinan', 
 ARRAY['Mesin Bubut', 'Teknik Mesin', 'Machining', 'CNC'], 3, 
 ARRAY['Teknik Mesin', 'Teknik Manufaktur', 'Pendidikan Teknik Mesin', 'Teknik Material']),

('SMK-DGM', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Mesin', 'Desain Gambar Mesin', 
 ARRAY['Mechanical Drafting', 'CAD Mesin', 'Gambar Mesin'], 3, 
 ARRAY['Teknik Mesin', 'Desain Produk', 'Teknik Industri']),

('SMK-TPL', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Mesin', 'Teknik Pengecoran Logam', 
 ARRAY['Pengecoran Logam', 'Foundry Engineering'], 3, 
 ARRAY['Teknik Metalurgi dan Material', 'Teknik Mesin']),

('SMK-TMI', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Mesin', 'Teknik Mekanik Industri', 
 ARRAY['Mekanik Pabrik', 'Industrial Maintenance'], 3, 
 ARRAY['Teknik Mesin', 'Teknik Industri', 'Mekatronika']),

('SMK-TKR', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Otomotif', 'Teknik Kendaraan Ringan', 
 ARRAY['TKR', 'Otomotif Mobil', 'Teknik Kendaraan Ringan Otomotif'], 3, 
 ARRAY['Teknik Otomotif', 'Teknik Mesin', 'Pendidikan Teknik Otomotif', 'Teknik Konversi Energi']),

('SMK-TBSM', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Otomotif', 'Teknik Bisnis Sepeda Motor', 
 ARRAY['TBSM', 'TSM', 'Otomotif Motor', 'Sepeda Motor'], 3, 
 ARRAY['Teknik Otomotif', 'Teknik Mesin', 'Teknik Industri']),

('SMK-TAB', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Otomotif', 'Teknik Alat Berat', 
 ARRAY['TAB', 'Alat Berat', 'Heavy Equipment'], 3, 
 ARRAY['Teknik Mesin', 'Teknik Pertambangan', 'Teknik Otomotif']),

('SMK-TBK', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Otomotif', 'Teknik Bodi Kendaraan', 
 ARRAY['Bodi Otomotif', 'Pengecatan Mobil', 'Body Repair'], 3, 
 ARRAY['Teknik Mesin', 'Desain Produk', 'Teknik Material']),

('SMK-TOT', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Otomotif', 'Teknik Ototronik', 
 ARRAY['Ototronik', 'Elektronika Otomotif'], 3, 
 ARRAY['Teknik Otomotif', 'Teknik Elektro', 'Mekatronika']),

('SMK-LAS', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Pengelasan dan Fabrikasi Logam', 'Teknik Pengelasan', 
 ARRAY['Welding', 'Las Listrik / Argon', 'SMAW / GTAW'], 3, 
 ARRAY['Teknik Mesin', 'Teknik Metalurgi dan Material', 'Teknik Perkapalan']),

('SMK-TAV', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Elektronika', 'Teknik Audio Video', 
 ARRAY['TAV', 'Audio Video', 'Elektronika Rumah Tangga'], 3, 
 ARRAY['Teknik Elektro', 'Teknik Telekomunikasi', 'Teknik Komputer']),

('SMK-TEI', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Elektronika', 'Teknik Elektronika Industri', 
 ARRAY['TEI', 'PLC & Otomasi', 'Elektronika Pabrik'], 3, 
 ARRAY['Teknik Elektro', 'Teknik Mekatronika', 'Teknik Otomasi Industri', 'Teknik Fisika']),

('SMK-MEKA', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Elektronika', 'Teknik Mekatronika', 
 ARRAY['Mekatronika', 'Robotika', 'Robotics'], 3, 
 ARRAY['Teknik Mekatronika', 'Teknik Robotika dan Kecerdasan Buatan', 'Teknik Elektro', 'Teknik Mesin']),

('SMK-AP', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Pesawat Udara', 'Airframe and Powerplant', 
 ARRAY['Teknik Penerbangan', 'Airframe Powerplant', 'Mesin Pesawat'], 3, 
 ARRAY['Teknik Penerbangan (Kedirgantaraan)', 'Teknik Mesin', 'Manajemen Penerbangan']),

('SMK-AV', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Pesawat Udara', 'Electrical Avionics', 
 ARRAY['Avionik', 'Kelistrikan Pesawat', 'Aircraft Avionics'], 3, 
 ARRAY['Teknik Kedirgantaraan', 'Teknik Elektro', 'Teknik Telekomunikasi']),

('SMK-KAPAL', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Perkapalan', 'Konstruksi Kapal Baja', 
 ARRAY['Teknik Perkapalan', 'Desain Rancang Bangun Kapal', 'Galangan Kapal'], 3, 
 ARRAY['Teknik Perkapalan', 'Teknik Sistem Perkapalan', 'Teknik Kelautan']),

('SMK-GRAFIKA', 'SMK', 'Teknologi Manufaktur dan Rekayasa', 'Teknik Grafika', 'Desain dan Produksi Grafika', 
 ARRAY['Percetakan', 'Grafika', 'Printing'], 3, 
 ARRAY['Desain Komunikasi Visual', 'Teknologi Cetak Grafika', 'Penerbitan']),

-- Seni dan Ekonomi Kreatif
('SMK-DKV', 'SMK', 'Seni dan Ekonomi Kreatif', 'Desain Komunikasi Visual', 'Desain Komunikasi Visual', 
 ARRAY['DKV', 'Desain Grafis', 'Multimedia', 'Visual Communication'], 3, 
 ARRAY['Desain Komunikasi Visual', 'Desain Produk', 'Seni Rupa Murni', 'Animasi', 'Periklanan']),

('SMK-ANIMASI', 'SMK', 'Seni dan Ekonomi Kreatif', 'Animasi', 'Animasi', 
 ARRAY['Animasi 2D', 'Animasi 3D', '3D Modeling', 'Animator'], 3, 
 ARRAY['Animasi', 'Film dan Televisi', 'Desain Komunikasi Visual', 'Teknologi Permainan']),

('SMK-BC', 'SMK', 'Seni dan Ekonomi Kreatif', 'Broadcasting dan Perfilman', 'Produksi dan Siaran Program Televisi', 
 ARRAY['Broadcasting', 'Penyiaran Radio & TV', 'Kamera & Editing'], 3, 
 ARRAY['Ilmu Komunikasi', 'Jurnalistik', 'Film dan Televisi', 'Hubungan Masyarakat']),

('SMK-FILM', 'SMK', 'Seni dan Ekonomi Kreatif', 'Broadcasting dan Perfilman', 'Produksi Film', 
 ARRAY['Sinematografi', 'Film Maker', 'Perfilman'], 3, 
 ARRAY['Film dan Televisi', 'Kajian Seni Sinema', 'Ilmu Komunikasi']),

('SMK-KRIYA-TEKSTIL', 'SMK', 'Seni dan Ekonomi Kreatif', 'Desain dan Produksi Kriya', 'Kriya Kreatif Batik dan Tekstil', 
 ARRAY['Batik', 'Tekstil', 'Kriya Tekstil'], 3, 
 ARRAY['Kriya Seni', 'Desain Mode / Fashion', 'Pendidikan Seni Rupa']),

('SMK-KRIYA-KAYU', 'SMK', 'Seni dan Ekonomi Kreatif', 'Desain dan Produksi Kriya', 'Kriya Kreatif Kayu dan Rotan', 
 ARRAY['Ukir Kayu', 'Kriya Kayu'], 3, 
 ARRAY['Kriya Seni', 'Desain Produk', 'Desain Interior']),

('SMK-KRIYA-KERAMIK', 'SMK', 'Seni dan Ekonomi Kreatif', 'Desain dan Produksi Kriya', 'Kriya Kreatif Keramik', 
 ARRAY['Gerabah', 'Kriya Keramik', 'Ceramic'], 3, 
 ARRAY['Kriya Seni', 'Seni Rupa Murni', 'Desain Produk']),

('SMK-KRIYA-LOGAM', 'SMK', 'Seni dan Ekonomi Kreatif', 'Desain dan Produksi Kriya', 'Kriya Kreatif Logam dan Perhiasan', 
 ARRAY['Perhiasan', 'Kriya Logam', 'Jewelry'], 3, 
 ARRAY['Kriya Seni', 'Desain Produk']),

('SMK-MUSIK', 'SMK', 'Seni dan Ekonomi Kreatif', 'Seni Pertunjukan', 'Seni Musik', 
 ARRAY['Musik Klasik', 'Musik Pop', 'Seni Musik'], 3, 
 ARRAY['Etnomusikologi', 'Pendidikan Seni Musik', 'Seni Musik Murni']),

('SMK-TARI', 'SMK', 'Seni dan Ekonomi Kreatif', 'Seni Pertunjukan', 'Seni Tari', 
 ARRAY['Tari Tradisional', 'Tari Kreasi'], 3, 
 ARRAY['Seni Tari', 'Pendidikan Seni Tari', 'Seni Pertunjukan']),

('SMK-KARAWITAN', 'SMK', 'Seni dan Ekonomi Kreatif', 'Seni Pertunjukan', 'Seni Karawitan', 
 ARRAY['Gamelan', 'Karawitan Tradisional'], 3, 
 ARRAY['Seni Karawitan', 'Etnomusikologi', 'Pendidikan Seni']),

('SMK-TEATER', 'SMK', 'Seni dan Ekonomi Kreatif', 'Seni Pertunjukan', 'Seni Teater', 
 ARRAY['Pemeranan', 'Drama', 'Tata Artistik Teater'], 3, 
 ARRAY['Seni Teater', 'Film dan Televisi', 'Sastra Indonesia']),

-- Pariwisata
('SMK-TABA', 'SMK', 'Pariwisata', 'Kuliner', 'Kuliner', 
 ARRAY['Tata Boga', 'Boga', 'Culinary', 'Chef', 'Pastry & Bakery'], 3, 
 ARRAY['Seni Kuliner', 'Pendidikan Tata Boga', 'Pengelolaan Perhotelan', 'Manajemen Pariwisata', 'Ilmu Gizi']),

('SMK-HOTEL', 'SMK', 'Pariwisata', 'Perhotelan', 'Perhotelan', 
 ARRAY['Akomodasi Perhotelan', 'Hospitality', 'Hotel'], 3, 
 ARRAY['Pengelolaan Perhotelan', 'Manajemen Pariwisata', 'Destinasi Pariwisata', 'Bahasa Asing']),

('SMK-UPW', 'SMK', 'Pariwisata', 'Usaha Layanan Pariwisata', 'Usaha Layanan Pariwisata', 
 ARRAY['UPW', 'Usaha Perjalanan Wisata', 'Tour & Travel', 'Tour Guide'], 3, 
 ARRAY['Manajemen Pariwisata', 'Destinasi Pariwisata', 'Hubungan Masyarakat', 'Manajemen Konvensi dan Acara (MICE)']),

('SMK-CANTIK', 'SMK', 'Pariwisata', 'Kecantikan dan Spa', 'Tata Kecantikan Kulit dan Rambut', 
 ARRAY['Tata Kecantikan', 'Beauty Therapy', 'Make Up Artist', 'Tata Rias'], 3, 
 ARRAY['Pendidikan Tata Rias', 'Tata Kecantikan', 'Kesehatan Masyarakat']),

('SMK-SPA', 'SMK', 'Pariwisata', 'Kecantikan dan Spa', 'Spa dan Beauty Therapy', 
 ARRAY['Spa Therapist', 'Perawatan Tubuh'], 3, 
 ARRAY['Fisioterapi', 'Tata Kecantikan', 'Manajemen Perhotelan']),

-- Kesehatan dan Pekerjaan Sosial
('SMK-PERAWAT', 'SMK', 'Kesehatan dan Pekerjaan Sosial', 'Layanan Kesehatan', 'Asisten Keperawatan dan Caregiver', 
 ARRAY['Keperawatan', 'Asisten Perawat', 'Caregiver'], 3, 
 ARRAY['Ilmu Keperawatan', 'Kebidanan', 'Fisioterapi', 'Kesehatan Masyarakat', 'Kesehatan Lingkungan']),

('SMK-DENTAL', 'SMK', 'Kesehatan dan Pekerjaan Sosial', 'Layanan Kesehatan', 'Asisten Dental', 
 ARRAY['Keperawatan Gigi', 'Dental Assistant'], 3, 
 ARRAY['Terapis Gigi dan Mulut', 'Kesehatan Gigi', 'Kedokteran Gigi']),

('SMK-FARMASI-KLINIS', 'SMK', 'Kesehatan dan Pekerjaan Sosial', 'Farmasi', 'Farmasi Klinis dan Komunitas', 
 ARRAY['Farmasi', 'Asisten Apoteker', 'Apotek'], 3, 
 ARRAY['Farmasi', 'Kimia', 'Analis Farmasi dan Makanan', 'Biologi', 'Kedokteran']),

('SMK-FARMASI-IND', 'SMK', 'Kesehatan dan Pekerjaan Sosial', 'Farmasi', 'Farmasi Industri', 
 ARRAY['Produksi Obat', 'Industri Farmasi'], 3, 
 ARRAY['Farmasi', 'Teknik Kimia', 'Teknologi Industri Pertanian']),

('SMK-TLM', 'SMK', 'Kesehatan dan Pekerjaan Sosial', 'Teknologi Laboratorium Medik', 'Teknologi Laboratorium Medik', 
 ARRAY['TLM', 'Analis Kesehatan', 'Laboratorium Medis'], 3, 
 ARRAY['Teknologi Laboratorium Medis', 'Biomedis', 'Kimia', 'Biologi', 'Kesehatan Masyarakat']),

('SMK-PEKSOS', 'SMK', 'Kesehatan dan Pekerjaan Sosial', 'Pekerjaan Sosial', 'Pekerjaan Sosial', 
 ARRAY['Social Work', 'Peksos', 'Pelayanan Sosial'], 3, 
 ARRAY['Ilmu Kesejahteraan Sosial', 'Sosiologi', 'Bimbingan dan Konseling', 'Psikologi']),

-- Teknologi Konstruksi dan Bangunan
('SMK-DPIB', 'SMK', 'Teknologi Konstruksi dan Bangunan', 'Desain Pemodelan dan Informasi Bangunan', 'Desain Pemodelan dan Informasi Bangunan', 
 ARRAY['DPIB', 'Gambar Bangunan', 'Arsitektur Bangunan', 'Drafting CAD / BIM'], 3, 
 ARRAY['Arsitektur', 'Teknik Sipil', 'Desain Interior', 'Perencanaan Wilayah dan Kota']),

('SMK-TKP', 'SMK', 'Teknologi Konstruksi dan Bangunan', 'Teknik Konstruksi dan Perumahan', 'Teknik Konstruksi dan Perumahan', 
 ARRAY['TKP', 'Konstruksi Kayu/Batu/Beton', 'Konstruksi Gedung'], 3, 
 ARRAY['Teknik Sipil', 'Manajemen Konstruksi', 'Pendidikan Teknik Bangunan']),

('SMK-SIPIL', 'SMK', 'Teknologi Konstruksi dan Bangunan', 'Konstruksi dan Perawatan Bangunan Sipil', 'Konstruksi Jalan, Irigasi, dan Jembatan', 
 ARRAY['Jalan & Jembatan', 'Teknik Sipil Basah', 'Irigasi'], 3, 
 ARRAY['Teknik Sipil', 'Teknik Pengairan / Sumber Daya Air', 'Teknik Lingkungan']),

('SMK-FURNITUR', 'SMK', 'Teknologi Konstruksi dan Bangunan', 'Teknik Furnitur', 'Desain dan Produksi Furnitur', 
 ARRAY['Furnitur', 'Mebel', 'Interior Furnitur'], 3, 
 ARRAY['Desain Interior', 'Desain Produk', 'Kriya Seni']),

-- Agribisnis dan Agriteknologi
('SMK-ATPH', 'SMK', 'Agribisnis dan Agriteknologi', 'Agribisnis Tanaman', 'Agribisnis Tanaman Pangan dan Hortikultura', 
 ARRAY['ATPH', 'Pertanian Pangan', 'Sayur & Buah', 'Hortikultura'], 3, 
 ARRAY['Agroteknologi', 'Agronomi', 'Agribisnis', 'Ilmu Tanah', 'Proteksi Tanaman']),

('SMK-ATP', 'SMK', 'Agribisnis dan Agriteknologi', 'Agribisnis Tanaman', 'Agribisnis Tanaman Perkebunan', 
 ARRAY['ATP', 'Kelapa Sawit', 'Karet', 'Kopi', 'Kakao'], 3, 
 ARRAY['Teknologi Pengelolaan Perkebunan', 'Agroteknologi', 'Agribisnis']),

('SMK-ATR', 'SMK', 'Agribisnis dan Agriteknologi', 'Agribisnis Ternak', 'Agribisnis Ternak Ruminansia', 
 ARRAY['ATR', 'Ternak Sapi', 'Kambing & Domba', 'Ruminansia'], 3, 
 ARRAY['Peternakan', 'Ilmu Nutrisi dan Teknologi Pakan', 'Kedokteran Hewan']),

('SMK-ATU', 'SMK', 'Agribisnis dan Agriteknologi', 'Agribisnis Ternak', 'Agribisnis Ternak Unggas', 
 ARRAY['ATU', 'Ternak Ayam', 'Unggas', 'Broiler / Layer'], 3, 
 ARRAY['Peternakan', 'Teknologi Hasil Peternakan', 'Agribisnis']),

('SMK-KESWAN', 'SMK', 'Agribisnis dan Agriteknologi', 'Agribisnis Ternak', 'Kesehatan Hewan', 
 ARRAY['Paramedik Veteriner', 'Kesehatan Ternak', 'Perawat Hewan'], 3, 
 ARRAY['Kedokteran Hewan', 'Peternakan', 'Kesehatan Hewan']),

('SMK-IKAN', 'SMK', 'Agribisnis dan Agriteknologi', 'Agribisnis Perikanan', 'Agribisnis Perikanan Air Tawar, Payau, dan Laut', 
 ARRAY['Budidaya Ikan', 'Akuakultur', 'Tambak Udang', 'Perikanan'], 3, 
 ARRAY['Akuakultur / Budidaya Perairan', 'Ilmu Kelautan', 'Pemanfaatan Sumberdaya Perikanan', 'Teknologi Hasil Perikanan']),

('SMK-APHP', 'SMK', 'Agribisnis dan Agriteknologi', 'Agriteknologi Pengolahan Hasil Pertanian', 'Agribisnis Pengolahan Hasil Pertanian', 
 ARRAY['APHP', 'Teknologi Pangan', 'Pengolahan Makanan / Hasil Bumi'], 3, 
 ARRAY['Teknologi Pangan', 'Teknologi Industri Pertanian (TIP)', 'Ilmu dan Teknologi Pangan', 'Ilmu Gizi']),

('SMK-HUTAN', 'SMK', 'Agribisnis dan Agriteknologi', 'Kehutanan', 'Konservasi dan Pengelolaan Hutan', 
 ARRAY['Kehutanan', 'Rimbawan', 'Konservasi Hutan'], 3, 
 ARRAY['Kehutanan', 'Konservasi Sumberdaya Hutan dan Ekowisata', 'Teknologi Hasil Hutan']),

-- Kemaritiman
('SMK-NKN', 'SMK', 'Kemaritiman', 'Pelayaran Kapal Niaga', 'Nautika Kapal Niaga', 
 ARRAY['NKN', 'Pelayaran Niaga', 'Nahkoda', 'Deck Officer'], 3, 
 ARRAY['Nautika', 'Manajemen Transportasi Laut', 'Teknik Kelautan']),

('SMK-TKN', 'SMK', 'Kemaritiman', 'Pelayaran Kapal Niaga', 'Teknika Kapal Niaga', 
 ARRAY['TKN', 'Mesin Kapal Niaga', 'Engineer Kapal'], 3, 
 ARRAY['Teknika', 'Teknik Sistem Perkapalan', 'Teknik Mesin']),

('SMK-NKPI', 'SMK', 'Kemaritiman', 'Pelayaran Kapal Penangkap Ikan', 'Nautika Kapal Penangkap Ikan', 
 ARRAY['NKPI', 'Kapal Ikan', 'Navigasi Nelayan'], 3, 
 ARRAY['Pemanfaatan Sumberdaya Perikanan', 'Nautika Perikanan Laut']),

('SMK-TKPI', 'SMK', 'Kemaritiman', 'Pelayaran Kapal Penangkap Ikan', 'Teknika Kapal Penangkap Ikan', 
 ARRAY['TKPI', 'Mesin Kapal Ikan'], 3, 
 ARRAY['Teknik Sistem Perkapalan', 'Permesinan Perikanan']),

-- Energi dan Pertambangan
('SMK-TITL', 'SMK', 'Energi dan Pertambangan', 'Teknik Ketenagalistrikan', 'Teknik Instalasi Tenaga Listrik', 
 ARRAY['TITL', 'Listrik Bangunan', 'Listrik Industri', 'Instalasi Listrik'], 3, 
 ARRAY['Teknik Elektro', 'Teknik Tenaga Listrik', 'Teknik Sistem Energi', 'Pendidikan Teknik Elektro']),

('SMK-PL', 'SMK', 'Energi dan Pertambangan', 'Teknik Ketenagalistrikan', 'Teknik Pembangkit Tenaga Listrik', 
 ARRAY['Pembangkit Listrik', 'PLTU / PLTA / PLTN'], 3, 
 ARRAY['Teknik Konversi Energi', 'Teknik Elektro', 'Teknik Mesin']),

('SMK-EBT', 'SMK', 'Energi dan Pertambangan', 'Teknik Energi Terbarukan', 'Teknik Energi Surya, Hidro, dan Angin', 
 ARRAY['Energi Terbarukan', 'Panel Surya / Solar Cell', 'EBT'], 3, 
 ARRAY['Teknik Energi Terbarukan', 'Teknik Fisika', 'Teknik Elektro', 'Teknik Konversi Energi']),

('SMK-TAMBANG', 'SMK', 'Energi dan Pertambangan', 'Teknik Geologi Pertambangan', 'Geologi Pertambangan', 
 ARRAY['Tambang', 'Geologi', 'Eksplorasi Mineral'], 3, 
 ARRAY['Teknik Pertambangan', 'Teknik Geologi', 'Teknik Geofisika', 'Teknik Perminyakan']),

('SMK-MIGAS', 'SMK', 'Energi dan Pertambangan', 'Teknik Minyak dan Gas Bumi', 'Teknik Produksi Minyak dan Gas Bumi', 
 ARRAY['Migas', 'Pemboran Minyak', 'Kilang Minyak'], 3, 
 ARRAY['Teknik Perminyakan', 'Teknik Kimia', 'Teknik Pengolahan Sawit dan Mineral'])
ON CONFLICT (id) DO UPDATE SET 
 nama = EXCLUDED.nama, alias = EXCLUDED.alias, rekomendasi_prodi_ptn = EXCLUDED.rekomendasi_prodi_ptn;
