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
            API gratis dan terbuka untuk mencari data Sekolah (SD, SMP, SMA, SMK) dan Perguruan Tinggi (Kampus) di seluruh Indonesia.
            Gunakan API ini untuk melengkapi data di aplikasimu secara otomatis. (Sudah dilengkapi CORS).
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
                    Bersumber dari Data Referensi Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi <a href="https://sekolah.data.kemendikdasmen.go.id/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">KEMDIKBUDRISTEK / Dapodik</a>. Mencakup profil, NPSP, dan lokasi SD, SMP, SMA, dan SMK di seluruh Indonesia.
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
                    Bersumber dari portal Seleksi Nasional Penerimaan Mahasiswa Baru <a href="https://snpmb.id/utbk-snbt/daya-tampung-snbt" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">SNPMB BPPP</a>. Mencakup daftar PTN (Akademik & Vokasi) beserta daftar program studi dan kuota daya tampung SNBT.
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
      "provinsi": "Jawa Barat",
      // ... field lainnya
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
      "provinsi": "DI Yogyakarta",
      // ... field lainnya
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



