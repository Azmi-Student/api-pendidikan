import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <div className="text-xl font-bold tracking-tight text-gray-900">
                <span className="text-blue-600">API</span> Documentation
              </div>
            </div>
            <div>
              <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                &larr; Kembali ke Explorer
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Pusat Data Pendidikan API</h1>
          <p className="text-lg text-gray-600">
            API gratis dan terbuka untuk mencari data Sekolah (SD, SMP, SMA, SMK), Perguruan Tinggi (Kampus), dan Jurusan / Peminatan Sekolah di seluruh Indonesia.
            Gunakan API ini untuk melengkapi form dan data di aplikasimu secara otomatis (Sudah dilengkapi CORS).
          </p>
        </div>

        <div className="space-y-12">
          
          {/* Data Sources */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Sumber Data
            </h4>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 p-2 rounded-lg text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Data Sekolah Nasional</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Bersumber dari Data Referensi Kementerian Pendidikan Dasar dan Menengah <a href="https://sekolah.data.kemendikdasmen.go.id/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">Pusdatin / Dapodik</a>. Mencakup profil, NPSN, akreditasi, dan alamat sekolah se-Indonesia.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start pt-2">
                <div className="bg-gray-100 p-2 rounded-lg text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Data Perguruan Tinggi (Kampus)</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Bersumber dari portal Seleksi Nasional Penerimaan Mahasiswa Baru <a href="https://snpmb.id/utbk-snbt/daya-tampung-snbt" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">SNPMB BPPP</a>. Mencakup daftar PTN akademik & vokasi, program studi, dan kuota SNBT.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start pt-2">
                <div className="bg-gray-100 p-2 rounded-lg text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Data Jurusan & Peminatan Sekolah</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Bersumber dari standar resmi <strong>Keputusan Kepala BSKAP Kemendikbudristek No. 024/H/KR/2022</strong> tentang Spektrum Keahlian SMK/MAK & Nomenklatur Kurikulum Merdeka (SMA/MA). Dilengkapi rekomendasi linearitas program studi PTN.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Endpoint 1: Sekolah */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 font-mono text-sm font-bold rounded-md">GET</span>
                <code className="text-lg font-mono text-gray-900">/api/sekolah</code>
              </div>
              <p className="text-gray-600 text-sm">Mencari data sekolah berdasarkan nama, daerah, atau NPSN (Dilengkapi Filter & Paginasi).</p>
            </div>
            
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Query Parameters</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-b">Parameter</th>
                      <th className="px-4 py-3 font-semibold border-b">Tipe</th>
                      <th className="px-4 py-3 font-semibold border-b">Wajib</th>
                      <th className="px-4 py-3 font-semibold border-b">Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">q</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">string</td>
                      <td className="px-4 py-3 text-red-500 font-medium border-b border-gray-100">Tidak*</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">Kata kunci pencarian. (*Wajib jika tidak pakai filter lain). Contoh: <code className="bg-gray-100 px-1 rounded">sma negeri 1</code></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">provinsi</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">string</td>
                      <td className="px-4 py-3 text-gray-400 font-medium border-b border-gray-100">Opsional</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">Filter berdasarkan provinsi. Contoh: <code className="bg-gray-100 px-1 rounded">Jawa Barat</code></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">bentuk</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">string</td>
                      <td className="px-4 py-3 text-gray-400 font-medium border-b border-gray-100">Opsional</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">Filter bentuk pendidikan (SD, SMP, SMA, SMK).</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">page</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">integer</td>
                      <td className="px-4 py-3 text-gray-400 font-medium border-b border-gray-100">Opsional</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">Nomor halaman. Default: <code className="bg-gray-100 px-1 rounded">1</code></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600">limit</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">integer</td>
                      <td className="px-4 py-3 text-gray-400 font-medium">Opsional</td>
                      <td className="px-4 py-3 text-gray-600">Jumlah data per halaman. Max: <code className="bg-gray-100 px-1 rounded">100</code>. Default: <code className="bg-gray-100 px-1 rounded">50</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="font-semibold text-gray-900 mt-8 mb-3 text-sm uppercase tracking-wider">Contoh Response (200 OK)</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 font-mono text-sm">
{`{
  "data": [
    {
      "npsn": "20222097",
      "nama": "SMAN 1 BANDUNG",
      "bentuk_pendidikan": "SMA",
      "status_sekolah": "NEGERI",
      "provinsi": "Jawa Barat"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 125
  }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Endpoint 2: Kampus */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 font-mono text-sm font-bold rounded-md">GET</span>
                <code className="text-lg font-mono text-gray-900">/api/kampus</code>
              </div>
              <p className="text-gray-600 text-sm">Mencari data Perguruan Tinggi Negeri (PTN) beserta daftar Program Studi SNBT.</p>
            </div>
            
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Query Parameters</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-b">Parameter</th>
                      <th className="px-4 py-3 font-semibold border-b">Tipe</th>
                      <th className="px-4 py-3 font-semibold border-b">Wajib</th>
                      <th className="px-4 py-3 font-semibold border-b">Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">q</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">string</td>
                      <td className="px-4 py-3 text-red-500 font-medium border-b border-gray-100">Tidak*</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">Kata kunci pencarian kampus. Contoh: <code className="bg-gray-100 px-1 rounded">ugm</code></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">provinsi</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">string</td>
                      <td className="px-4 py-3 text-gray-400 font-medium border-b border-gray-100">Opsional</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">Filter berdasarkan provinsi kampus.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">page</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">integer</td>
                      <td className="px-4 py-3 text-gray-400 font-medium border-b border-gray-100">Opsional</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">Nomor halaman. Default: <code className="bg-gray-100 px-1 rounded">1</code></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600">limit</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">integer</td>
                      <td className="px-4 py-3 text-gray-400 font-medium">Opsional</td>
                      <td className="px-4 py-3 text-gray-600">Jumlah data per halaman. Max: <code className="bg-gray-100 px-1 rounded">100</code>. Default: <code className="bg-gray-100 px-1 rounded">50</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="font-semibold text-gray-900 mt-8 mb-3 text-sm uppercase tracking-wider">Contoh Response (200 OK)</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 font-mono text-sm">
{`{
  "data": [
    {
      "kode_kampus": "1361",
      "nama_kampus": "UNIVERSITAS GADJAH MADA",
      "provinsi": "DI Yogyakarta"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 1
  }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Endpoint 3: Jurusan */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 font-mono text-sm font-bold rounded-md">GET</span>
                <code className="text-lg font-mono text-gray-900">/api/jurusan</code>
              </div>
              <p className="text-gray-600 text-sm">Mendapatkan master jurusan dan peminatan sekolah menengah (SMA, MA, SMK) beserta rekomendasi prodi linear di PTN.</p>
            </div>
            
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Query Parameters</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-b">Parameter</th>
                      <th className="px-4 py-3 font-semibold border-b">Tipe</th>
                      <th className="px-4 py-3 font-semibold border-b">Wajib</th>
                      <th className="px-4 py-3 font-semibold border-b">Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">q</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">string</td>
                      <td className="px-4 py-3 text-gray-400 font-medium border-b border-gray-100">Opsional</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">Kata kunci pencarian jurusan, alias, atau program. Contoh: <code className="bg-gray-100 px-1 rounded">rpl</code>, <code className="bg-gray-100 px-1 rounded">otomotif</code></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">jenjang</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">string</td>
                      <td className="px-4 py-3 text-gray-400 font-medium border-b border-gray-100">Opsional</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">Filter jenjang sekolah: <code className="bg-gray-100 px-1 rounded">SMA</code>, <code className="bg-gray-100 px-1 rounded">MA</code>, atau <code className="bg-gray-100 px-1 rounded">SMK</code></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">bidang</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">string</td>
                      <td className="px-4 py-3 text-gray-400 font-medium border-b border-gray-100">Opsional</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">Filter bidang keahlian SMK. Contoh: <code className="bg-gray-100 px-1 rounded">Teknologi Informasi</code></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">page</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">integer</td>
                      <td className="px-4 py-3 text-gray-400 font-medium border-b border-gray-100">Opsional</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">Nomor halaman. Default: <code className="bg-gray-100 px-1 rounded">1</code></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600">limit</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">integer</td>
                      <td className="px-4 py-3 text-gray-400 font-medium">Opsional</td>
                      <td className="px-4 py-3 text-gray-600">Jumlah data per halaman. Max: <code className="bg-gray-100 px-1 rounded">100</code>. Default: <code className="bg-gray-100 px-1 rounded">50</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="font-semibold text-gray-900 mt-8 mb-3 text-sm uppercase tracking-wider">Contoh Response (200 OK)</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 font-mono text-sm">
{`{
  "data": [
    {
      "id": "SMK-RPL",
      "jenjang": "SMK",
      "bidang": "Teknologi Informasi",
      "program": "Pengembangan Perangkat Lunak dan Gim",
      "nama": "Rekayasa Perangkat Lunak",
      "alias": ["RPL", "Software Engineering"],
      "durasi_tahun": 3,
      "rekomendasi_prodi_ptn": [
        "Teknik Informatika",
        "Ilmu Komputer",
        "Sistem Informasi",
        "Sains Data"
      ]
    }
  ],
  "source": "supabase",
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 1
  }
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Endpoint 4: Rekomendasi PTN Linear */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 font-mono text-sm font-bold rounded-md">GET</span>
                <code className="text-lg font-mono text-gray-900">/api/rekomendasi</code>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">Linearitas SNBT</span>
              </div>
              <p className="text-gray-600 text-sm">
                Mencari rekomendasi Perguruan Tinggi Negeri (PTN) dan Program Studi yang linear dengan jurusan sekolah (SMA/MA/SMK), lengkap dengan daya tampung / kuota SNBT.
              </p>
            </div>
            
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Query Parameters</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-b">Parameter</th>
                      <th className="px-4 py-3 font-semibold border-b">Tipe</th>
                      <th className="px-4 py-3 font-semibold border-b">Wajib</th>
                      <th className="px-4 py-3 font-semibold border-b">Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-mono font-medium text-blue-600 border-b border-gray-100">jurusan <span className="text-gray-400 font-normal">atau</span> q</td>
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs border-b border-gray-100">string</td>
                      <td className="px-4 py-3 text-red-500 font-medium border-b border-gray-100">Wajib</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">
                        Nama jurusan, ID jurusan, atau alias populer. Contoh: <code className="bg-gray-100 px-1 rounded">rpl</code>, <code className="bg-gray-100 px-1 rounded">SMK-RPL</code>, <code className="bg-gray-100 px-1 rounded">mipa</code>, <code className="bg-gray-100 px-1 rounded">dkv</code>, <code className="bg-gray-100 px-1 rounded">akuntansi</code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="font-semibold text-gray-900 mt-8 mb-3 text-sm uppercase tracking-wider">Contoh Request</h4>
              <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-800 break-all mb-4">
                GET /api/rekomendasi?jurusan=rpl
              </div>

              <h4 className="font-semibold text-gray-900 mt-6 mb-3 text-sm uppercase tracking-wider">Contoh Response (200 OK)</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 font-mono text-sm">
{`{
  "jurusan": {
    "id": "SMK-RPL",
    "nama": "Rekayasa Perangkat Lunak",
    "jenjang": "SMK",
    "bidang": "Teknologi Informasi",
    "program": "Pengembangan Perangkat Lunak dan Gim",
    "alias": ["RPL", "Software Engineering"]
  },
  "rekomendasi_prodi_linear": [
    "Teknik Informatika",
    "Ilmu Komputer",
    "Sistem Informasi",
    "Teknologi Informasi",
    "Sains Data"
  ],
  "total_kampus_tersedia": 85,
  "data": [
    {
      "nama_kampus": "UNIVERSITAS GADJAH MADA",
      "kode_kampus": "1361",
      "provinsi": "DI Yogyakarta",
      "kabupaten": "Kab. Sleman",
      "website": "https://ugm.ac.id",
      "total_prodi_linear": 2,
      "prodi_cocok": [
        {
          "nama": "ILMU KOMPUTER",
          "jenjang": "Sarjana",
          "daya_tampung_snbt": 25
        },
        {
          "nama": "TEKNOLOGI INFORMASI",
          "jenjang": "Sarjana",
          "daya_tampung_snbt": 28
        }
      ]
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Authentication Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 flex gap-4">
            <div className="text-blue-500 mt-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900">Tanpa Autentikasi (Open API) & Support CORS</h4>
              <p className="text-sm text-blue-800 mt-1">
                API ini bersifat publik (Open Data), tidak membutuhkan Bearer Token/API Key, dan sudah mensupport <strong>CORS</strong>. Kamu bisa langsung memanggil URL ini dari Frontend (React/Vue/Flutter) milikmu tanpa takut diblokir oleh browser.
              </p>
            </div>
          </div>

        </div>
      </main>

      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-200 mt-12">made by Azmi.dev</footer>
    </div>
  );
}
