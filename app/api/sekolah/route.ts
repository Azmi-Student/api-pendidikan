import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
);

// Peta normalisasi
const normalizeMap: Record<string, string> = {
  "sma negeri ": "sman ",
  "sma n ": "sman ",
  "smp negeri ": "smpn ",
  "smp n ": "smpn ",
  "sd negeri ": "sdn ",
  "sd n ": "sdn ",
  "smk negeri ": "smkn ",
  "smk n ": "smkn ",
  "mts negeri ": "mtsn ",
  "mts n ": "mtsn ",
  "mi negeri ": "min ",
  "mi n ": "min ",
  "ma negeri ": "man ",
  "ma n ": "man ",
  "sma swasta ": "smas ",
  "smp swasta ": "smps ",
  "sd swasta ": "sds ",
  "smk swasta ": "smks ",
  "taman kanak": "tk",
  "sd islam terpadu": "sdit",
  "smp islam terpadu": "smpit",
  "sma islam terpadu": "smait",
  "madrasah tsanawiyah negeri ": "mtsn ",
  "madrasah aliyah negeri ": "man ",
  "madrasah ibtidaiyah negeri ": "min "
};

// Peta ekspansi
const expandMap: Record<string, string[]> = {
  "sman": ["sma negeri", "sma n"],
  "smpn": ["smp negeri", "smp n"],
  "sdn": ["sd negeri", "sd n"],
  "smkn": ["smk negeri", "smk n"],
  "smas": ["sma swasta"],
  "smps": ["smp swasta"],
  "sds": ["sd swasta"],
  "smks": ["smk swasta"],
  "mtsn": ["mts negeri", "mts n", "madrasah tsanawiyah negeri"],
  "min": ["mi negeri", "mi n", "madrasah ibtidaiyah negeri"],
  "man": ["ma negeri", "ma n", "madrasah aliyah negeri"],
  "tk": ["taman kanak"],
  "sdit": ["sd islam terpadu", "sds it", "sd it"],
  "smpit": ["smp islam terpadu", "smps it", "smp it"],
  "smait": ["sma islam terpadu", "smas it", "sma it"],
  "smak": ["sma katolik", "sma kristen", "smas k"],
  "smpk": ["smp katolik", "smp kristen", "smps k"],
  "sdk": ["sd katolik", "sd kristen", "sds k"],
  "smai": ["sma islam", "smas islam"],
  "smpi": ["smp islam", "smps islam"],
  "sdi": ["sd islam", "sds islam"]
};

function getAcronymPattern(word: string) {
  if (/^[a-zA-Z]{2,4}$/.test(word)) {
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
  const bentukFilter = searchParams.get('bentuk_pendidikan') || searchParams.get('bentuk');
  const statusFilter = searchParams.get('status_sekolah') || searchParams.get('status');
  let q = searchParams.get('q') || '';
  
  if (!q) return NextResponse.json({ data: [] });

  let qLower = q.toLowerCase().replace(/-/g, ' ') + " "; 
  
  for (const [long, short] of Object.entries(normalizeMap)) {
    qLower = qLower.split(long).join(short);
  }
  
    let query = supabase.from('sekolah').select('*');
  
  // Apply direct filters if provided
  if (provinsiFilter) query = query.ilike('provinsi', `%${provinsiFilter}%`);
  if (bentukFilter) query = query.ilike('bentuk_pendidikan', `%${bentukFilter}%`);
  if (statusFilter) query = query.ilike('status_sekolah', `%${statusFilter}%`);
  
  query = query.range(offset, offset + limit - 1);
  const words = qLower.split(' ').filter(w => w.trim() !== '');
  
  words.forEach(word => {
    let orString = `nama.ilike.%${word}%,kabupaten.ilike.%${word}%,provinsi.ilike.%${word}%`;
    
    const acronym = getAcronymPattern(word);
    if (acronym) {
      orString += `,provinsi.ilike.${acronym},kabupaten.ilike.${acronym}`;
    }
    
    if (expandMap[word]) {
      expandMap[word].forEach(expanded => {
        orString += `,nama.ilike.%${expanded}%,kabupaten.ilike.%${expanded}%,provinsi.ilike.%${expanded}%`;
      });
    }
    
    query = query.or(orString);
  });
  
  const { data, error } = await query; const count = null;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, meta: { page, limit, total: count } });
}



