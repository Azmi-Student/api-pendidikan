import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
);

function getAllJurusan() {
  try {
    const jsonPath = path.join(process.cwd(), 'data', 'master_jurusan_sekolah.json');
    if (!fs.existsSync(jsonPath)) return [];
    const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const list: any[] = [];

    (raw.SMA || []).forEach((item: any) => {
      list.push({
        id: item.id,
        jenjang: 'SMA',
        bidang: item.rumpun || 'Umum',
        program: 'MIPA/IPS/Bahasa',
        nama: item.nama,
        alias: item.alias || [],
        rekomendasi_prodi_ptn: item.rekomendasi_prodi_ptn || []
      });
    });

    (raw.MA || []).forEach((item: any) => {
      list.push({
        id: item.id,
        jenjang: 'MA',
        bidang: item.rumpun || 'Keagamaan/Umum',
        program: 'Peminatan MA',
        nama: item.nama,
        alias: item.alias || [],
        rekomendasi_prodi_ptn: item.rekomendasi_prodi_ptn || []
      });
    });

    (raw.SMK || []).forEach((b: any) => {
      (b.program_keahlian || []).forEach((p: any) => {
        (p.konsentrasi_keahlian || []).forEach((k: any) => {
          list.push({
            id: k.id,
            jenjang: 'SMK',
            bidang: b.bidang_keahlian,
            program: p.nama_program,
            nama: k.nama,
            alias: k.alias || [],
            rekomendasi_prodi_ptn: k.rekomendasi_prodi_ptn || []
          });
        });
      });
    });

    return list;
  } catch (e) {
    console.error('Error reading local jurusan data:', e);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('jurusan') || searchParams.get('q') || searchParams.get('id') || '').trim().toLowerCase();

  if (!q) {
    return NextResponse.json({
      error: 'Parameter jurusan wajib diisi. Contoh: /api/rekomendasi?jurusan=rpl atau /api/rekomendasi?jurusan=mipa'
    }, { status: 400 });
  }

  const allJurusan = getAllJurusan();
  const matchedJurusan = allJurusan.find(item => {
    return (
      item.id.toLowerCase() === q ||
      item.nama.toLowerCase().includes(q) ||
      (item.alias || []).some((a: string) => a.toLowerCase() === q || a.toLowerCase().includes(q))
    );
  });

  if (!matchedJurusan) {
    return NextResponse.json({
      error: `Jurusan '${q}' tidak ditemukan. Silakan cek master jurusan di /api/jurusan.`,
      saran: allJurusan.slice(0, 10).map(j => ({ id: j.id, nama: j.nama, alias: j.alias }))
    }, { status: 404 });
  }

  const targetProdis: string[] = matchedJurusan.rekomendasi_prodi_ptn || [];

  let kampusList: any[] = [];
  try {
    const { data, error } = await supabase.from('kampus').select('*');
    if (!error && data) {
      kampusList = data;
    }
  } catch (err) {
    console.warn('Gagal fetch kampus dari Supabase:', err);
  }

  const hasilRekomendasi: any[] = [];

  for (const kampus of kampusList) {
    const listProdi = Array.isArray(kampus.prodi) ? kampus.prodi : [];
    const prodiCocok: any[] = [];

    for (const p of listProdi) {
      const pNamaLower = (p.nama || '').toLowerCase();
      const isMatch = targetProdis.some(tp => {
        const tpLower = tp.toLowerCase();
        return pNamaLower.includes(tpLower) || tpLower.includes(pNamaLower);
      });

      if (isMatch) {
        prodiCocok.push({
          nama: p.nama,
          jenjang: p.jenjang,
          daya_tampung_snbt: p.daya_tampung_snbt || null
        });
      }
    }

    if (prodiCocok.length > 0) {
      hasilRekomendasi.push({
        nama_kampus: kampus.nama_kampus,
        kode_kampus: kampus.kode_kampus,
        provinsi: kampus.provinsi,
        kabupaten: kampus.kabupaten,
        website: kampus.website,
        total_prodi_linear: prodiCocok.length,
        prodi_cocok: prodiCocok
      });
    }
  }

  hasilRekomendasi.sort((a, b) => b.total_prodi_linear - a.total_prodi_linear);

  return NextResponse.json({
    jurusan: {
      id: matchedJurusan.id,
      nama: matchedJurusan.nama,
      jenjang: matchedJurusan.jenjang,
      bidang: matchedJurusan.bidang,
      program: matchedJurusan.program,
      alias: matchedJurusan.alias
    },
    rekomendasi_prodi_linear: targetProdis,
    total_kampus_tersedia: hasilRekomendasi.length,
    data: hasilRekomendasi
  });
}
