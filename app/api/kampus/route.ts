import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
);

// Kamus khusus untuk singkatan suku kata yang nggak sesuai aturan awal huruf
const aliasSukuKata: Record<string, string> = {
  "unpad": "universitas padjadjaran",
  "undip": "universitas diponegoro",
  "unair": "universitas airlangga",
  "unhas": "universitas hasanuddin",
  "unnes": "universitas negeri semarang", "uns": "universitas sebelas maret", "usu": "universitas sumatera utara",
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

// Mesin Pembuat Pola Akronim Otomatis (Contoh: "itb" -> "i% t% b%")
function getAcronymPattern(word: string) {
  if (/^[a-zA-Z]{2,6}$/.test(word)) {
    return word.split('').join('% ') + '%';
  }
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Extract pagination
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const offset = (page - 1) * limit;

  // Extract filters
  const provinsiFilter = searchParams.get('provinsi');
  const kabupatenFilter = searchParams.get('kabupaten') || searchParams.get('kota');
  let q = searchParams.get('q') || '';
  
  // 1. Cek kamus manual dulu
  const lowerQ = q.toLowerCase().trim();
  if (aliasSukuKata[lowerQ]) {
    q = aliasSukuKata[lowerQ];
  }
  
    let query = supabase.from('kampus').select('*', { count: 'exact' });
  
  // Apply direct filters if provided
  if (provinsiFilter) query = query.ilike('provinsi', `%${provinsiFilter}%`);
  if (kabupatenFilter) query = query.ilike('kabupaten', `%${kabupatenFilter}%`);
  
  query = query.range(offset, offset + limit - 1);
  
  if (q) {
    const words = q.split(' ').filter(w => w.trim() !== '');
    
    words.forEach(word => {
      let orString = `nama_kampus.ilike.%${word}%,kode_kampus.ilike.%${word}%`;
      
      // 2. Suntikkan Algoritma Pola Huruf Depan
      const acronym = getAcronymPattern(word);
      if (acronym) {
        orString += `,nama_kampus.ilike.${acronym}`;
      }
      
      query = query.or(orString);
    });
  }
  
  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, meta: { page, limit, total: count } });
}





