/**
 * Data cabang Adira Finance Binjai (dataset: "Binjai - Medan").
 *
 * Diverifikasi 2026-11-13. Baris dataset (`branch_id=89`): alamat & telepon
 * benar; peta, kecamatan, dan kode pos milik perusahaan LAIN.
 *
 * DIPAKAI
 * - Listing Google Maps "Adira Finance" — kartu embed: "Jl. Sultan Hasanuddin
 *   No.12, Satria, Kec. Binjai Kota, Kota Binjai, Sumatera Utara 20741",
 *   4,7 (7 ulasan), Lembaga Keuangan. Pin 3,6016738 / 98,4829462.
 *   ChIJ72zpFyDWMDARmi7_KpTi5ag.
 * - Listing kedua "Kantor Adira Binjai" — "JF2M+M6G, Jl. Sultan Hasanuddin,
 *   Satria, Kec. Binjai Kota … 20741", 1,0 (1 ulasan), pin 3,6016768 /
 *   98,4829344 (±1 m). Dua listing, satu kantor.
 * - alamatelpon.com, "Kantor Adira Finance di Sumatera Utara" (Rosida Tri,
 *   25 Feb 2019, dibaca langsung): di bawah "Kantor Cabang Adira di Medan" —
 *   "Kantor Adira Finance cabang Medan 3 - Binjai", "Jl. Sultan Hasanuddin
 *   No. 12 Binjai", "Telp: 061 – 8828880 | Fax: 061 - 8820479". Sumber kedua
 *   untuk telepon & faks. (Halaman yang sama juga punya "cabang MEDAN 3 -
 *   Titi Kuning" — penomoran tidak ditafsirkan.)
 * - Nominatim di pin: "Jalan Sultan Hasanuddin, Binjai Kota".
 *
 * TIDAK DIPAKAI
 * - `gmaps_link`: listing "RADANA FINANCE CABANG BINJAI" — "Jl. Sultan
 *   Hasanuddin, Rambung Bar., Kec. Binjai Sel., Kota Binjai 20742", 15
 *   ulasan. Perusahaan pembiayaan lain di jalan yang sama. Kecamatan Binjai
 *   Selatan (1276010) dan kode pos 20742 di baris dataset cocok dengan kartu
 *   Radana, bukan Adira → dikoreksi ke Binjai Kota / 20741.
 * - Nomor "12A" (dataset) vs "12" (Google & 2019) → halaman memakai No. 12.
 * - Polres Binjai: Nominatim salah tempat (Dumai) → tidak dipakai.
 *
 * Kantor "Medan" di dataset (nama saja; koordinatnya pusat embed):
 * Medan Selayang (87), Titi Kuning (88), Ringroad (233), Marelan (234).
 */

export const CABANG = {
  nama: "Adira Finance Binjai",
  namaDataset: "Adira Finance Binjai - Medan",
  jalan: "Jl. Sultan Hasanuddin No. 12",
  kelurahan: "Satria",
  kecamatan: "Binjai Kota",
  kota: "Kota Binjai",
  provinsi: "Sumatera Utara",
  kodePos: "20741",
  telepon: "061-8828880",
  fax: "061-8820479",
  slug: "adira-finance-binjai-medan",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Jarak lurus dari pin listing (Nominatim/OSM). */
export const PATOKAN: readonly { nama: string; km: number; arah: string }[] = [
  { nama: "Kantor Walikota Binjai", km: 0.16, arah: "utara" },
  { nama: "Lapangan Merdeka Binjai", km: 0.23, arah: "barat laut" },
  { nama: "Pasar Tavip", km: 1.1, arah: "timur laut" },
  { nama: "Binjai Supermall", km: 1.6, arah: "timur laut" },
  { nama: "Masjid Agung Binjai", km: 1.75, arah: "timur laut" },
  { nama: "Terminal Binjai", km: 1.8, arah: "timur laut" },
];

export const KANTOR_MEDAN = ["Medan Selayang", "Titi Kuning", "Ringroad", "Marelan"] as const;

export const SUMBER_2019 = "https://www.alamatelpon.com/2019/02/kantor-adira-finance-di-sumatera-utara.html";

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Adira Finance Jl. Sultan Hasanuddin No.12 Binjai") +
  "&query_place_id=ChIJ72zpFyDWMDARmi7_KpTi5ag";

export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d98.4829462!3d3.6016738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3030d62017e96cef%3A0xa8e5e2942aff2e9a!2sAdira%20Finance!5e0!3m2!1sid!2sid!4v1763000000000!5m2!1sid!2sid";
