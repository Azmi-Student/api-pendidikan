import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
);

// Fallback loader dari file JSON lokal jika Supabase belum di-setup
function getLocalJurusanData() {
  try {
    const jsonPath = path.join(process.cwd(), 'data', 'master_jurusan_sekolah.json');
    if (!fs.existsSync(jsonPath)) return [];
    const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const list: any[] = [];

    // Flatten SMA
    (raw.SMA || []).forEach((item: any) => {
      list.push({
        id: item.id,
        jenjang: 'SMA',
        bidang: item.rumpun || 'Umum',
        program: 'MIPA/IPS/Bahasa',
        nama: item.nama,
        alias: item.alias || [],
        durasi_tahun: 3,
        rekomendasi_prodi_ptn: item.rekomendasi_prodi_ptn || []
      });
    });

    // Flatten MA
    (raw.MA || []).forEach((item: any) => {
      list.push({
        id: item.id,
        jenjang: 'MA',
        bidang: item.rumpun || 'Keagamaan/Umum',
        program: 'Peminatan MA',
        nama: item.nama,
        alias: item.alias || [],
        durasi_tahun: 3,
        rekomendasi_prodi_ptn: item.rekomendasi_prodi_ptn || []
      });
    });

    // Flatten SMK
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
            durasi_tahun: k.durasi_tahun || 3,
            rekomendasi_prodi_ptn: k.rekomendasi_prodi_ptn || []
          });
        });
      });
    });

    return list;
  } catch (e) {
    console.error('Error reading local JSON fallback:', e);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const offset = (page - 1) * limit;

  const jenjang = searchParams.get('jenjang')?.toUpperCase();
  const bidang = searchParams.get('bidang');
  const q = searchParams.get('q')?.trim() || '';

  // 1. Coba query ke Supabase
  try {
    let query = supabase.from('master_jurusan').select('*');

    if (jenjang) {
      query = query.eq('jenjang', jenjang);
    }

    if (bidang) {
      query = query.ilike('bidang', `%${bidang}%`);
    }

    if (q) {
      query = query.or(`nama.ilike.%${q}%,bidang.ilike.%${q}%,program.ilike.%${q}%,id.ilike.%${q}%`);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      return NextResponse.json({
        data,
        source: 'supabase',
        meta: { page, limit, total: data.length }
      });
    }
  } catch (err) {
    console.warn('Supabase query error, switching to local fallback:', err);
  }

  // 2. Fallback: Filter dari file JSON lokal
  let localData = getLocalJurusanData();

  if (jenjang) {
    localData = localData.filter(item => item.jenjang === jenjang);
  }

  if (bidang) {
    const bLower = bidang.toLowerCase();
    localData = localData.filter(item => item.bidang && item.bidang.toLowerCase().includes(bLower));
  }

  if (q) {
    const qLower = q.toLowerCase();
    localData = localData.filter(item => {
      const matchNama = item.nama && item.nama.toLowerCase().includes(qLower);
      const matchBidang = item.bidang && item.bidang.toLowerCase().includes(qLower);
      const matchProgram = item.program && item.program.toLowerCase().includes(qLower);
      const matchId = item.id && item.id.toLowerCase().includes(qLower);
      const matchAlias = (item.alias || []).some((a: string) => a.toLowerCase().includes(qLower));
      const matchProdi = (item.rekomendasi_prodi_ptn || []).some((p: string) => p.toLowerCase().includes(qLower));
      return matchNama || matchBidang || matchProgram || matchId || matchAlias || matchProdi;
    });
  }

  const paginated = localData.slice(offset, offset + limit);

  return NextResponse.json({
    data: paginated,
    source: 'local_master_dataset',
    meta: { page, limit, total: localData.length }
  });
}
