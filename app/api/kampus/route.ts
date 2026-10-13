import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
);

// Kamus khusus untuk singkatan suku kata yang tidak sesuai aturan awal huruf
const aliasSukuKata: Record<string, string> = {
  "unpad": "universitas padjadjaran",
  "undip": "universitas diponegoro",
  "unair": "universitas airlangga",
  "unhas": "universitas hasanuddin",
  "unnes": "universitas negeri semarang",
  "uns": "universitas sebelas maret",
  "usu": "universitas sumatera utara",
  "unesa": "universitas negeri surabaya",
  "unsri": "universitas sriwijaya",
  "unila": "universitas lampung",
  "unram": "universitas mataram",
  "untan": "universitas tanjungpura",
  "unmul": "universitas mulawarman",
  "unpatti": "universitas pattimura",
  "untad": "universitas tadulako",
  "unej": "universitas jember",
  "unsoed": "universitas jenderal soedirman",
  "unima": "universitas negeri manado",
  "unsyiah": "universitas syiah kuala",
  "polban": "politeknik negeri bandung",
  "polinema": "politeknik negeri malang",
  "polines": "politeknik negeri semarang",
  "polsri": "politeknik negeri sriwijaya",
  "polmed": "politeknik negeri medan",
  "polibatam": "politeknik negeri batam",
  "polindra": "politeknik negeri indramayu",
  "polsub": "politeknik negeri subang",
  "poliwangi": "politeknik negeri banyuwangi",
  "polije": "politeknik negeri jember",
  "polimedia": "politeknik negeri media kreatif",
  "polman": "politeknik manufaktur bandung",
  "polnes": "politeknik negeri samarinda",
  "polnep": "politeknik negeri pontianak",
  "polimdo": "politeknik negeri manado",
  "polnam": "politeknik negeri ambon",
  "polbeng": "politeknik negeri bengkalis",
  "polinela": "politeknik negeri lampung",
  "polimarin": "politeknik maritim negeri indonesia",
  "poltera": "politeknik negeri madura",
  "politap": "politeknik negeri ketapang",
  "poltesa": "politeknik negeri sambas",
  "poliban": "politeknik negeri banjarmasin",
  "politala": "politeknik negeri tanah laut",
  "poltekba": "politeknik negeri balikpapan",
  "polnustar": "politeknik negeri nusa utara",
  "polikant": "politeknik perikanan negeri tual",
  "polinef": "politeknik negeri fakfak",
  "pnj": "politeknik negeri jakarta",
  "pnp": "politeknik negeri padang",
  "pnc": "politeknik negeri cilacap",
  "pnm": "politeknik negeri madiun",
  "ppns": "politeknik perkapalan negeri surabaya",
  "pens": "politeknik elektronika negeri surabaya",
  "pnup": "politeknik negeri ujung pandang",
  "pnl": "politeknik negeri lhokseumawe",
  "pnb": "politeknik negeri bali",
  "pnk": "politeknik negeri kupang"
};

function matchAcronym(queryWord: string, text: string): boolean {
  if (!queryWord || queryWord.length < 2 || queryWord.length > 6) return false;
  const pattern = '^' + queryWord.split('').map(char => `${char}\\w*`).join('\\s+');
  const regex = new RegExp(pattern, 'i');
  return regex.test(text);
}

function getLocalKampusData(): any[] {
  try {
    const jsonPath = path.join(process.cwd(), 'data', 'master_kampus.json');
    if (!fs.existsSync(jsonPath)) return [];
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Gagal membaca data/master_kampus.json:', err);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Extract pagination
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const offset = (page - 1) * limit;

  // Extract filters
  const provinsiFilter = (searchParams.get('provinsi') || '').toLowerCase().trim();
  const kabupatenFilter = (searchParams.get('kabupaten') || searchParams.get('kota') || '').toLowerCase().trim();
  let rawQ = (searchParams.get('q') || searchParams.get('prodi') || '').trim();

  // 1. Coba baca dari master_kampus.json lokal (ultra fast ~1ms & supports prodi search)
  const localList = getLocalKampusData();
  
  if (localList.length > 0) {
    let filtered = localList;

    if (provinsiFilter) {
      filtered = filtered.filter(k => (k.provinsi || '').toLowerCase().includes(provinsiFilter));
    }

    if (kabupatenFilter) {
      filtered = filtered.filter(k => (k.kabupaten || '').toLowerCase().includes(kabupatenFilter));
    }

    if (rawQ) {
      const lowerQ = rawQ.toLowerCase();
      const expandedQ = aliasSukuKata[lowerQ] || lowerQ;
      const searchTerms = expandedQ.split(/\s+/).filter(Boolean);

      const matchedResults: any[] = [];

      for (const k of filtered) {
        const namaKampusLower = (k.nama_kampus || '').toLowerCase();
        const kodeKampusLower = (k.kode_kampus || '').toLowerCase();
        const listProdi = Array.isArray(k.prodi) ? k.prodi : [];

        // Cek kecocokan nama kampus atau kode kampus
        const isNameMatch = 
          namaKampusLower.includes(expandedQ) || 
          kodeKampusLower.includes(expandedQ) ||
          matchAcronym(lowerQ, namaKampusLower) ||
          searchTerms.every(term => namaKampusLower.includes(term));

        // Cek kecocokan nama program studi (seperti: "teknik informatika", "kedokteran", dll)
        const matchedProdis = listProdi.filter((p: any) => {
          const pNamaLower = (p.nama || '').toLowerCase();
          return pNamaLower.includes(lowerQ) || searchTerms.every(term => pNamaLower.includes(term));
        });

        if (isNameMatch || matchedProdis.length > 0) {
          // Susun agar prodi yang cocok langsung muncul di preview tabel terdepan
          const otherProdis = listProdi.filter((p: any) => !matchedProdis.includes(p));
          matchedResults.push({
            ...k,
            prodi: [...matchedProdis, ...otherProdis],
            _isNameMatch: isNameMatch,
            _matchedProdiCount: matchedProdis.length
          });
        }
      }

      // Urutkan: kecocokan nama kampus teratas, disusul jumlah prodi yang cocok
      matchedResults.sort((a, b) => {
        if (a._isNameMatch && !b._isNameMatch) return -1;
        if (!a._isNameMatch && b._isNameMatch) return 1;
        return b._matchedProdiCount - a._matchedProdiCount;
      });

      const paginated = matchedResults.slice(offset, offset + limit).map(item => {
        const { _isNameMatch, _matchedProdiCount, ...rest } = item;
        return rest;
      });

      return NextResponse.json({
        data: paginated,
        source: 'local_master',
        meta: {
          page,
          limit,
          total: matchedResults.length
        }
      });
    }

    const paginated = filtered.slice(offset, offset + limit);
    return NextResponse.json({
      data: paginated,
      source: 'local_master',
      meta: {
        page,
        limit,
        total: filtered.length
      }
    });
  }

  // 2. Fallback ke Supabase jika file lokal tidak ditemukan
  let query = supabase.from('kampus').select('*');
  if (provinsiFilter) query = query.ilike('provinsi', `%${provinsiFilter}%`);
  if (kabupatenFilter) query = query.ilike('kabupaten', `%${kabupatenFilter}%`);
  query = query.range(offset, offset + limit - 1);

  if (rawQ) {
    const lowerQ = rawQ.toLowerCase().trim();
    const effectiveQ = aliasSukuKata[lowerQ] || rawQ;
    const words = effectiveQ.split(' ').filter(w => w.trim() !== '');
    words.forEach(word => {
      query = query.or(`nama_kampus.ilike.%${word}%,kode_kampus.ilike.%${word}%`);
    });
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, source: 'supabase', meta: { page, limit, total: null } });
}
