'use client';

import { useState, useEffect } from 'react';

export default function Page() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"sekolah" | "kampus" | "jurusan">("sekolah");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

    const renderText = (val: any) => {
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return String(val);
    if (Array.isArray(val) && val.length > 0) {
      const item = val[0];
      if (typeof item === 'string') return item;
      return item?.nama_kota || item?.nama_prov1 || item?.nama || '-';
    }
    if (typeof val === 'object' && val !== null) {
      return val.nama_kota || val.nama_prov1 || val.nama || '-';
    }
    return '-';
  };

  const handleCariKampusProdi = (prodiName: string) => {
    setSelectedItem(null);
    setActiveTab("kampus");
    setQuery(prodiName);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }
      
      setLoading(true);
      fetch(`/api/${activeTab}?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, activeTab]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4">
            
            <div className="flex items-center mb-4 md:mb-0">
              <div className="text-xl font-bold tracking-tight text-gray-900">
                Pusat Data Pendidikan
              </div>
              <a href="/docs" className="ml-4 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-600 rounded-full text-xs font-semibold hover:bg-blue-100 transition-colors">API Docs &rarr;</a>
            </div>
            
            <div className="mt-2 md:mt-0 flex-1 md:ml-8 md:max-w-lg relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 focus:bg-white transition-colors"
                placeholder={
                  activeTab === "sekolah"
                    ? "Cari sekolah (Cth: SMAN 1 Banjarnegara)..."
                    : activeTab === "kampus"
                    ? "Cari kampus (Cth: Universitas Indonesia)..."
                    : "Cari jurusan (Cth: RPL, DKV, Akuntansi, MIPA, Mesin)..."
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {loading && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                </div>
              )}
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-8 mt-2 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => { setActiveTab("sekolah"); setQuery(""); }}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "sekolah" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Sekolah Nasional
            </button>
            <button
              onClick={() => { setActiveTab("kampus"); setQuery(""); }}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "kampus" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Perguruan Tinggi
            </button>
            <button
              onClick={() => { setActiveTab("jurusan"); setQuery(""); }}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "jurusan" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Jurusan & Peminatan
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Empty State */}
        {query.trim() === "" && (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200 border-dashed">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Mulai Pencarian</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === "sekolah" && "Ketik nama sekolah atau NPSN di kolom pencarian di atas."}
              {activeTab === "kampus" && "Ketik nama perguruan tinggi (Cth: UI, ITB, Unpad, dll)."}
              {activeTab === "jurusan" && "Ketik nama jurusan atau singkatan (Cth: RPL, DKV, Akuntansi, MIPA, Otomotif, Tata Boga)."}
            </p>
          </div>
        )}

        {/* No Results */}
        {query.trim() !== "" && !loading && results.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Tidak menemukan hasil untuk <span className="font-semibold text-gray-900">"{query}"</span>.</p>
          </div>
        )}

        {/* Data Table */}
        {results.length > 0 && (
          <div className="bg-white shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {activeTab === "sekolah" ? (
                    <>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sm:pl-6">Identitas Sekolah</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="hidden md:table-cell px-3 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Alamat & Lokasi</th>
                    </>
                  ) : activeTab === "kampus" ? (
                    <>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sm:pl-6">Identitas Kampus</th>
                      <th scope="col" className="hidden md:table-cell px-3 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Daftar Program Studi</th>
                    </>
                  ) : (
                    <>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sm:pl-6">Nama Jurusan & Alias</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Jenjang & Bidang</th>
                      <th scope="col" className="hidden md:table-cell px-3 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rekomendasi Prodi Linear</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {results.map((item, idx) => (
                  <tr 
                    key={idx} 
                    onClick={() => setSelectedItem(item)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {activeTab === "sekolah" ? (
                      <>
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 align-top">
                          <div className="font-medium text-gray-900">{item.nama}</div>
                          <div className="text-gray-500 mt-1">NPSN: {item.npsn}</div>
                          <div className="text-gray-500">{item.bentuk_pendidikan}</div>
                          <div className="md:hidden mt-2 text-xs text-gray-400">Klik untuk melihat detail lokasi & alamat</div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 align-top">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status_sekolah === 'NEGERI' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {item.status_sekolah}
                          </span>
                          <div className="mt-2 text-gray-600">
                            Akred: <span className="font-semibold text-gray-900">{item.akreditasi || '-'}</span>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-3 py-4 text-sm text-gray-500 align-top max-w-md">
                          <div className="text-gray-900">{item.alamat_jalan || '-'}</div>
                          <div className="mt-1 text-gray-500">
                            Kec. {item.kecamatan}, {item.kabupaten}
                          </div>
                          <div className="text-gray-500">{item.provinsi}</div>
                        </td>
                      </>
                    ) : activeTab === "kampus" ? (
                      <>
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 align-top w-full md:w-1/3">
                          <div className="font-medium text-gray-900">{item.nama_kampus}</div>
                          <div className="text-gray-500 mt-1 font-mono text-xs">Kode: {item.kode_kampus}</div>
                          <div className="md:hidden mt-2 text-xs text-blue-500">Klik untuk melihat {item.prodi?.length || 0} program studi</div>
                        </td>
                        <td className="hidden md:table-cell px-3 py-4 text-sm text-gray-500 align-top">
                          <div className="flex flex-wrap gap-2">
                            {item.prodi?.slice(0, 8).map((p: any, i: number) => {
                              const isMatch = query.trim() !== '' && p.nama?.toLowerCase().includes(query.toLowerCase().trim());
                              return (
                                <span 
                                  key={i} 
                                  className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border transition-all ${
                                    isMatch 
                                      ? 'bg-blue-100 text-blue-900 border-blue-300 font-semibold shadow-xs' 
                                      : 'bg-gray-100 text-gray-600 border-gray-200'
                                  }`}
                                >
                                  {isMatch && <span className="mr-1">🎯</span>}
                                  {p.nama} ({p.jenjang}) {p.daya_tampung_snbt ? `- Kuota: ${p.daya_tampung_snbt}` : ''}
                                </span>
                              );
                            })}
                            {item.prodi?.length > 8 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200">
                                +{item.prodi.length - 8} prodi lainnya
                              </span>
                            )}
                            {(!item.prodi || item.prodi.length === 0) && (
                              <span className="text-gray-400 italic">Data program studi tidak tersedia</span>
                            )}
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 align-top">
                          <div className="font-semibold text-gray-900">{item.nama}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Alias: <span className="font-medium text-gray-700">{item.alias && item.alias.length > 0 ? item.alias.join(', ') : '-'}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">Program: {item.program || '-'}</div>
                          <div className="md:hidden mt-2 text-xs text-blue-500">Klik untuk melihat rekomendasi prodi kampus</div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 align-top">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            item.jenjang === 'SMK' 
                              ? 'bg-purple-100 text-purple-800' 
                              : item.jenjang === 'SMA' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {item.jenjang} ({item.durasi_tahun || 3} Thn)
                          </span>
                          <div className="mt-1.5 text-xs text-gray-700 font-medium">{item.bidang}</div>
                        </td>
                        <td className="hidden md:table-cell px-3 py-4 text-sm text-gray-500 align-top">
                          <div className="flex flex-wrap gap-1.5">
                            {(item.rekomendasi_prodi_ptn || []).slice(0, 5).map((p: string, i: number) => (
                              <button
                                key={i}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCariKampusProdi(p);
                                }}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer"
                                title={`Cari kampus dengan prodi ${p}`}
                              >
                                <span>🎓 {p}</span>
                                <span className="text-blue-500">&rarr;</span>
                              </button>
                            ))}
                            {(item.rekomendasi_prodi_ptn || []).length > 5 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200">
                                +{item.rekomendasi_prodi_ptn.length - 5} lainnya
                              </span>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal Detail */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setSelectedItem(null)} />
            
            <div className="relative inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold leading-6 text-gray-900">
                    {activeTab === 'sekolah' ? selectedItem.nama : activeTab === 'kampus' ? selectedItem.nama_kampus : selectedItem.nama}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 font-mono">
                    {activeTab === 'sekolah' ? `NPSN: ${selectedItem.npsn}` : activeTab === 'kampus' ? `KODE PT: ${selectedItem.kode_kampus}` : `KODE: ${selectedItem.id} | Jenjang: ${selectedItem.jenjang}`}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none bg-gray-100 rounded-full p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="mt-6">
                {activeTab === 'sekolah' ? (
                  <div className="space-y-6">
                    {/* Badge Info Sekolah */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{selectedItem.bentuk_pendidikan}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedItem.status_sekolah === 'NEGERI' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {selectedItem.status_sekolah}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Akreditasi {selectedItem.akreditasi || '-'}</span>
                    </div>

                    {/* Alamat Sekolah */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Informasi Lokasi</h4>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                        <div>
                          <dt className="text-xs text-gray-500 uppercase">Jalan</dt>
                          <dd className="text-sm font-medium text-gray-900 mt-1">{selectedItem.alamat_jalan || '-'}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500 uppercase">Dusun / RT RW</dt>
                          <dd className="text-sm font-medium text-gray-900 mt-1">{selectedItem.nama_dusun || '-'} {selectedItem.rt ? `(RT ${selectedItem.rt}/RW ${selectedItem.rw})` : ''}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500 uppercase">Kecamatan</dt>
                          <dd className="text-sm font-medium text-gray-900 mt-1">{selectedItem.kecamatan || '-'}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500 uppercase">Kabupaten/Kota</dt>
                          <dd className="text-sm font-medium text-gray-900 mt-1">{selectedItem.kabupaten || '-'}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500 uppercase">Provinsi</dt>
                          <dd className="text-sm font-medium text-gray-900 mt-1">{selectedItem.provinsi || '-'}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500 uppercase">Kode Pos</dt>
                          <dd className="text-sm font-medium text-gray-900 mt-1">{selectedItem.kode_pos || '-'}</dd>
                        </div>
                      </dl>
                    </div>

                    {selectedItem.path_file && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Foto Sekolah</h4>
                        <img src={selectedItem.path_file} alt="Foto Sekolah" className="w-full h-auto max-h-64 object-cover rounded-lg border border-gray-200" />
                      </div>
                    )}
                  </div>
                ) : activeTab === 'kampus' ? (
                  <div className="space-y-6">
                    {/* Badge Info Kampus */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Perguruan Tinggi Negeri (PTN)</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Jalur SNBT</span>
                    </div>

                    {/* Info Alamat Kampus */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Informasi Kampus</h4>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                        <div className="sm:col-span-2">
                          <dt className="text-xs text-gray-500 uppercase">Jalan</dt>
                          <dd className="text-sm font-medium text-gray-900 mt-1">{selectedItem.alamat_jalan || '-'}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500 uppercase">Wilayah</dt>
                          <dd className="text-sm font-medium text-gray-900 mt-1">{renderText(selectedItem.kabupaten)}, {renderText(selectedItem.provinsi)}</dd>
                        </div>
                        {selectedItem.website && (
                          <div>
                            <dt className="text-xs text-gray-500 uppercase">Website</dt>
                            <dd className="text-sm font-medium text-blue-600 mt-1"><a href={selectedItem.website.startsWith('http') ? selectedItem.website : `https://${selectedItem.website}`} target="_blank" rel="noreferrer">{selectedItem.website}</a></dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    {/* Prodi Kampus */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Daftar Program Studi ({selectedItem.prodi?.length || 0})</h4>
                      <div className="max-h-60 overflow-y-auto border border-gray-100 rounded-lg bg-gray-50 p-2">
                        {selectedItem.prodi && selectedItem.prodi.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.prodi.map((p: any, i: number) => {
                              const isMatch = query.trim() !== '' && p.nama?.toLowerCase().includes(query.toLowerCase().trim());
                              return (
                                <span 
                                  key={i} 
                                  className={`inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium border shadow-xs transition-all ${
                                    isMatch 
                                      ? 'bg-blue-100 text-blue-900 border-blue-400 font-semibold ring-1 ring-blue-400' 
                                      : 'bg-white text-gray-700 border-gray-200'
                                  }`}
                                >
                                  {isMatch && <span className="mr-1">🎯</span>}
                                  {p.nama} ({p.jenjang}) {p.daya_tampung_snbt ? `- Kuota SNBT: ${p.daya_tampung_snbt}` : ''}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 p-2">Data program studi tidak tersedia.</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Badge Info Jurusan */}
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        selectedItem.jenjang === 'SMK' 
                          ? 'bg-purple-100 text-purple-800' 
                          : selectedItem.jenjang === 'SMA' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Jenjang {selectedItem.jenjang}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                        Durasi {selectedItem.durasi_tahun || 3} Tahun
                      </span>
                    </div>

                    {/* Informasi Klasifikasi Jurusan */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Rincian Klasifikasi</h4>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                        <div>
                          <dt className="text-xs text-gray-500 uppercase">Bidang Keahlian / Rumpun</dt>
                          <dd className="text-sm font-medium text-gray-900 mt-1">{selectedItem.bidang || '-'}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-gray-500 uppercase">Program Keahlian</dt>
                          <dd className="text-sm font-medium text-gray-900 mt-1">{selectedItem.program || '-'}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-xs text-gray-500 uppercase">Alias & Singkatan Populer</dt>
                          <dd className="text-sm font-medium text-gray-900 mt-1">
                            {selectedItem.alias && selectedItem.alias.length > 0 ? selectedItem.alias.join(', ') : '-'}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Rekomendasi Prodi Linear PTN */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center justify-between">
                        <span>Rekomendasi Program Studi PTN yang Linear</span>
                        <span className="text-xs font-normal text-blue-600 font-mono">
                          {selectedItem.rekomendasi_prodi_ptn?.length || 0} Rekomendasi
                        </span>
                      </h4>
                      <div className="max-h-60 overflow-y-auto border border-gray-100 rounded-lg bg-gray-50 p-3">
                        {selectedItem.rekomendasi_prodi_ptn && selectedItem.rekomendasi_prodi_ptn.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.rekomendasi_prodi_ptn.map((prodi: string, i: number) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleCariKampusProdi(prodi)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:border-blue-400 shadow-sm transition-all group cursor-pointer"
                                title={`Cari kampus yang membuka prodi ${prodi}`}
                              >
                                <span>🎓</span>
                                <span className="font-semibold">{prodi}</span>
                                <span className="text-blue-500 group-hover:text-blue-700 transition-colors">&rarr; Cari Kampus</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Data prodi linear tidak tersedia.</p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <span>💡</span>
                        <span>Klik salah satu program studi di atas untuk langsung mencari Perguruan Tinggi Negeri yang menyediakannya.</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none"
                  onClick={() => setSelectedItem(null)}
                >
                  Tutup
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-6 text-sm text-gray-500 mt-auto border-t border-gray-100">made by Azmi.dev</footer>
    </div>
  );
}
