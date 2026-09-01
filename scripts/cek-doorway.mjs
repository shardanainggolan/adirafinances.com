/**
 * Gerbang sebelum menerbitkan halaman cabang baru.
 *
 *   node scripts/cek-doorway.mjs <url-a> <url-b>
 *   node scripts/cek-doorway.mjs http://localhost:3000/adira-finance-alam-sutera \
 *                                http://localhost:3000/adira-finance-ciledug
 *
 * Membandingkan HANYA isi <main> dari dua halaman cabang, lalu melaporkan
 * berapa persen frasa 6-kata yang sama. Header dan footer dikecualikan: nav dan
 * blok legal memang wajib identik di setiap halaman, dan memasukkannya hanya
 * mengaburkan angka yang benar-benar penting.
 *
 * Kenapa ini ada: adiracabang.id menerbitkan 372 halaman cabang dari satu
 * cetakan dan kehilangan peringkat lokalnya saat spam update Agustus 2026.
 * Pesaing yang masih bertahan pun halaman cabangnya 74–84% identik satu sama
 * lain. Cacat itu tidak terlihat saat menulis halaman kedua — hanya terlihat
 * kalau diukur.
 *
 * AMBANG DI BAWAH INI BUKAN ATURAN GOOGLE. Google tidak menerbitkan angka apa
 * pun soal ini. Ini patokan kerja proyek, diturunkan dari pengukuran nyata:
 * pesaing 74–84% (buruk), halaman Alam Sutera 43,7% dengan sisa yang hampir
 * seluruhnya disclosure wajib.
 */
const AMBANG = 50;

const KATA_NORMAL = 6;

/** Token yang selalu berbeda antar cabang; dinormalkan agar tidak menyanjung skor. */
function normalkan(teks) {
  return teks
    .replace(/\d+[.,]?\d*/g, "#")
    .replace(/[^\p{L}\p{N}\s#]/gu, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();
}

function isiMain(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!m) throw new Error("Tidak menemukan <main> — halaman ini bukan halaman konten?");
  return m[1]
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function frasa(teks) {
  const kata = normalkan(teks).split(" ").filter(Boolean);
  const set = new Set();
  for (let i = 0; i + KATA_NORMAL <= kata.length; i++) set.add(kata.slice(i, i + KATA_NORMAL).join(" "));
  return set;
}

async function ambil(url) {
  const res = await fetch(url, { headers: { "User-Agent": "cek-doorway/1.0" } });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.text();
}

const [urlA, urlB] = process.argv.slice(2);
if (!urlA || !urlB) {
  console.error("Pakai: node scripts/cek-doorway.mjs <url-a> <url-b>");
  process.exit(2);
}

const [a, b] = await Promise.all([ambil(urlA), ambil(urlB)]);
const teksA = isiMain(a);
const teksB = isiMain(b);
const fa = frasa(teksA);
const fb = frasa(teksB);
const sama = [...fa].filter((x) => fb.has(x));
const persen = (sama.length / Math.min(fa.size, fb.size)) * 100;

const kata = (t) => t.split(/\s+/).filter(Boolean).length;
console.log(`A: ${urlA}\n   ${kata(teksA)} kata di <main>, ${fa.size} frasa`);
console.log(`B: ${urlB}\n   ${kata(teksB)} kata di <main>, ${fb.size} frasa`);
console.log(`\nkemiripan isi : ${persen.toFixed(1)}%   (ambang proyek ${AMBANG}%)`);
console.log(`khas          : ${(100 - persen).toFixed(1)}%`);

if (persen > AMBANG) {
  console.error(
    `\nGAGAL — di atas ambang. Halaman kedua sebagian besar cetakan yang sama.\n` +
      `Perbaiki dengan MENGURANGI prosa umum, bukan menambah kata:\n` +
      `  · keluarkan uraian produk/syarat ke halaman kanonik, cukup tautkan\n` +
      `  · judul & pengantar tiap section menyebut lokasinya, bukan kalimat generik\n` +
      `  · tambahkan pengetahuan tangan pertama yang hanya berlaku di cabang itu\n` +
      `Pengulangan yang SAH: pernyataan OJK, disclosure agen, dan peringatan\n` +
      `bahwa nomor WhatsApp kami bukan nomor cabang.`,
  );
  process.exit(1);
}
console.log("\nLOLOS.");
