/**
 * Data cabang Adira Finance AP Pettarani – Makassar.
 *
 * Diverifikasi 2026-11-19. Baris dataset (`branch_id=130`): alamat & listing
 * benar; koordinat = pusat embed.
 *
 * DIPAKAI
 * - Listing Google "PT. Adira Dinamika Multi Finance" (= `gmaps_link`) —
 *   kartu embed: "Kompleks Ruko … Delta Ramayana Jade, Jl. A. P. Pettarani,
 *   Masale, Kec. Panakkukang, Kota Makassar, Sulawesi Selatan 90232",
 *   2,7 (78 ulasan). Telepon di hasil pencarian Maps: "(0411) 421006" — sama
 *   dengan telp1 dataset. Pin −5,1533587 / 119,4375363,
 *   ChIJsTn3B7Xivi0RPJT2bEoqovg. (Teks kartu memuat potongan aneh
 *   "CS (O856)_O4232655" — tidak dikutip.)
 * - Dataset: "Jl. A.P. Pettarani Kompleks Ruko Delta Ramayana Jade 4-5",
 *   sub_district 7371100 = PANAKKUKANG, kode pos 90232 (sama dengan kartu);
 *   telp 0411-421006, 0411-421007, 0411-435333; faks 0411-425109, 425110,
 *   421129. Hanya 421006 punya sumber kedua (Google).
 * - OSM: "Jalan Andi Pangerang Pettarani" = dua jalur satu arah (trunk):
 *   jalur ke SELATAN ±26 m di barat pin, jalur ke UTARA ±46 m di barat pin
 *   (OSM). PANAH di peta Google tampak berlawanan → arah jalur TIDAK ditulis
 *   di halaman. →
 *   kantor di sisi timur, langsung dari jalur ke selatan. Di atasnya "Jalan
 *   Tol Layang A.P. Pettarani" (motorway, bridge=yes, layer 1 & 2) ±45 m.
 *   Nominatim di pin: Masale, Panakkukang.
 * - Peta Google: Ramayana Pettarani & Farmers Market Makassar Pettarani di
 *   kompleks yang sama, di selatan pin.
 *
 * TIDAK DIPAKAI
 * - Koordinat dataset −5,153362 / 119,4280083: pusat embed, ±1,06 km di barat.
 * - Baris Sinjai Selatan (356) juga "Jl. AP. Pettarani" — kota lain (Kab.
 *   Sinjai); disebut di halaman untuk pencari "Adira AP Pettarani".
 * - Baris Gowa (132) memakai telepon yang sama persis dengan Perintis (131).
 *
 * KANTOR LAIN DI MAKASSAR (pencarian Maps 2026-11-19)
 * - "Adira Finance Cabang Makassar (Mobil)" — Jl. Perintis Kemerdekaan No.4,
 *   0853-9979-9931, 3,3; ±4,7 km timur laut. ChIJqdkFPhrjvi0R-JnBxzH3ATY.
 * - "Adira Finance Cab. Durable Mks" — Ruko Surya Villa Mas, Jl. Toddopuli
 *   Raya No.23, (0411) 4663786, 4,3; ±2,0 km tenggara.
 *   ChIJF0N-Hubivi0Rb1p1rMeBmWs.
 *
 * Patokan: Nominatim (OSM), jarak lurus dari pin.
 */

export const CABANG = {
  nama: "Adira Finance AP Pettarani",
  namaDataset: "Adira Finance AP Pettarani - Makassar",
  namaMaps: "PT. Adira Dinamika Multi Finance",
  kompleks: "Kompleks Ruko Delta Ramayana Jade 4–5",
  jalan: "Jl. A.P. Pettarani",
  kelurahan: "Masale",
  kecamatan: "Panakkukang",
  kota: "Kota Makassar",
  provinsi: "Sulawesi Selatan",
  kodePos: "90232",
  telepon: [
    { nomor: "0411-421006", sumber: "data kami + Google Maps" },
    { nomor: "0411-421007", sumber: "data kami saja" },
    { nomor: "0411-435333", sumber: "data kami saja" },
  ],
  fax: ["0411-425109", "0411-425110", "0411-421129"],
  ulasan: 78,
  slug: "adira-finance-ap-pettarani-makassar",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Jarak lurus dari pin listing (Nominatim/OSM). */
export const PATOKAN: readonly { nama: string; km: number; arah: string }[] = [
  { nama: "Mall Panakkukang", km: 1.1, arah: "tenggara" },
  { nama: "Kantor Gubernur Sulawesi Selatan", km: 2.3, arah: "timur laut" },
  { nama: "Masjid Al-Markaz Al-Islami", km: 2.9, arah: "barat laut" },
  { nama: "Pantai Losari", km: 3.5, arah: "barat" },
];

const peta = (q: string, id: string) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q) + "&query_place_id=" + id;

export const MAKASSAR_LAIN: readonly { nama: string; alamat: string; km: number; arah: string; peta: string }[] = [
  {
    nama: "Adira Finance Cab. Durable Makassar",
    alamat: "Ruko Surya Villa Mas, Jl. Toddopuli Raya No. 23",
    km: 2.0,
    arah: "tenggara",
    peta: peta("Adira Finance Cab. Durable Mks", "ChIJF0N-Hubivi0Rb1p1rMeBmWs"),
  },
  {
    nama: "Adira Finance Cabang Makassar (Mobil)",
    alamat: "Jl. Perintis Kemerdekaan No. 4",
    km: 4.7,
    arah: "timur laut",
    peta: peta("Adira Finance Cabang Makassar (Mobil)", "ChIJqdkFPhrjvi0R-JnBxzH3ATY"),
  },
];

export const PETA_URL = peta("PT. Adira Dinamika Multi Finance Delta Ramayana Jade Pettarani", "ChIJsTn3B7Xivi0RPJT2bEoqovg");

export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d119.4375363!3d-5.1533587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee2b507f739b1%3A0xf8a22a4a6cf6943c!2sPT.%20Adira%20Dinamika%20Multi%20Finance!5e0!3m2!1sid!2sid!4v1763520000000!5m2!1sid!2sid";
