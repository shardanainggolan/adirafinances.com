/**
 * Data cabang Adira Finance Jendral Sudirman – Tegal.
 *
 * Diverifikasi 2026-11-18. Baris dataset (`branch_id=55`): alamat & telepon
 * dikuatkan dua direktori; TIDAK ADA listing Google untuk kantornya.
 *
 * DIPAKAI
 * - Dataset: "Jl. Jend. Sudirman No.23-25, Randugunting", sub_district
 *   3376010 = TEGAL SELATAN; telp 0283-322383, 0283-322386, 0283-358858;
 *   faks 0283-320714.
 * - Google Sites "Adira cabang TEGAL-Jend. Sudirman" (dibaca, tanpa tanggal):
 *   "Jl. Jend. Sudirman No. 23 / 25", "Telp: 0283-322383, 0283-322386,
 *   0283-358858", "Facs: 0283-320714". Semua cocok.
 * - alamatpenting.com/adira-finance-tegal/ (dibaca, tanpa tanggal): "Jl. Jend.
 *   Sudirman No. 23/25 Rt/Rw: 001/004 Tegal", "0283-322 383", "Fax :
 *   0283-320 714".
 * - OSM: "Jalan Jenderal Sudirman" (trunk) di Kota Tegal ±0,40 km, bujur
 *   109,1329 → 109,1364. Di peta Google ruas ini menyambung dari Jl. Mayjend
 *   Sutoyo di barat sampai Jl. P. Diponegoro di timur. Jarak patokan diukur
 *   ke RUAS (titik terdekat), arah dari titik tengah ruas (−6,8701 / 109,1347).
 *
 * TIDAK DIPAKAI / TIDAK DITEMUKAN
 * - `gmaps_link` → "Adira Finance Cabang Tegal" (0x2e6fb9d5cf2f761f:
 *   0xcc39ca0b73eb235e): embed TIDAK menampilkan kartu; pencarian Maps
 *   ("Adira Finance Tegal", "Adira Finance Cabang Tegal", "Adira Kota
 *   Tegal", "Adira Dinamika Multi Finance Tegal") tidak memunculkan kantor ini.
 * - Koordinat dataset −6,8699197 / 109,1308667: pusat embed (Jl. Mayjend
 *   Sutoyo dekat Pacific Mall), di luar ruas Jl. Sudirman.
 * - "ATM Danamon TEGAL" — Jl. Jend. Sudirman No.11A, tanpa nama Adira →
 *   bukan bukti kantor ini.
 * - Kode pos: dataset 52125, kartu ATM di jalan yang sama 52131 → tidak
 *   ditampilkan.
 * - Nominatim "Balai Kota Tegal" (→ Balai Yasa) & "Terminal Tegal" (→
 *   Denpasar) salah tempat.
 *
 * KANTOR LAIN
 * - "Mandala Finance Tegal" — "Jl. Sultan Agung No.31A, RT.005/RW.001, Kel.
 *   Kejambon, Kec. Tegal Tim., Kota Tegal 52124", 3,8 (13 ulasan),
 *   ChIJsQPVgp23by4Rncb7LgecGf4; ±1,85 km dari tengah ruas. Merger Mandala →
 *   Adira: Kontan 1 Juli 2025.
 * - "ADIRA TEGAL - satelite slawi" — ChIJoydCdQC_by4RyJQWLbxQxvw, ±13,3 km
 *   (dataset baris 368, Kabupaten Tegal).
 * - Ketanggungan (181) & Bumiayu (183) bernama "- Tegal" di dataset tapi
 *   district 3329 = Kabupaten BREBES → tidak disebut sebagai Tegal.
 */

export const CABANG = {
  nama: "Adira Finance Jendral Sudirman",
  namaDataset: "Adira Finance Jendral Sudirman - Tegal",
  jalan: "Jl. Jend. Sudirman No. 23/25",
  rtRw: "RT 001/RW 004",
  kelurahan: "Randugunting",
  kecamatan: "Tegal Selatan",
  kota: "Kota Tegal",
  provinsi: "Jawa Tengah",
  telepon: ["0283-322383", "0283-322386", "0283-358858"],
  fax: "0283-320714",
  slug: "adira-finance-jendral-sudirman-tegal",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

export const PANJANG_RUAS_M = 400;

/** Jarak lurus ke ruas Jl. Jend. Sudirman (titik terdekat, OSM). */
export const PATOKAN: readonly { nama: string; km: number; arah: string }[] = [
  { nama: "Masjid Agung Kota Tegal", km: 0.32, arah: "timur laut" },
  { nama: "Pacific Mall", km: 0.44, arah: "barat" },
  { nama: "Alun-alun Tegal", km: 0.69, arah: "timur laut" },
  { nama: "Gedung Birao", km: 0.7, arah: "timur laut" },
  { nama: "Stasiun Tegal", km: 0.78, arah: "timur laut" },
];

const peta = (q: string, id: string) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q) + "&query_place_id=" + id;

export const MANDALA = {
  nama: "Mandala Finance Tegal",
  alamat: "Jl. Sultan Agung No. 31A, Kejambon, Tegal Timur",
  ulasan: 13,
  km: 1.85,
  arah: "utara",
  peta: peta("Mandala Finance Tegal", "ChIJsQPVgp23by4Rncb7LgecGf4"),
} as const;

export const SLAWI = {
  nama: "Adira Tegal – satelit Slawi",
  tempat: "Slawi, Kabupaten Tegal",
  km: 13.3,
  arah: "selatan",
  peta: peta("ADIRA TEGAL - satelite slawi", "ChIJoydCdQC_by4RyJQWLbxQxvw"),
} as const;

export const SUMBER_MERGER = "https://keuangan.kontan.co.id/news/merger-dengan-mandala-finance-ini-kata-adira-finance";
export const SUMBER_ALAMATPENTING = "https://alamatpenting.com/adira-finance-tegal/";

/** Pencarian alamat — BUKAN listing kantor (tidak ditemukan). */
export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Jl. Jend. Sudirman No. 23, Randugunting, Kota Tegal");
