/**
 * Data cabang Adira Finance Cimanggis – Depok.
 *
 * Diverifikasi 2026-10-29. Baris dataset (`branch_id=22`) SEHAT.
 *
 * - Telepon 021-87714717 / 021-87714727, faks 021-87714730: unik di dataset,
 *   dikuatkan direktori (ringkasan hasil pencarian: telepon.panggon.com,
 *   idfirms, ulasantempat — "+62 21 87714717").
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`, 2026-10-20):
 *   "Adira Cimanggis", "Jl. Raya Jakarta-Bogor No.KM.31, RT.1/RW.5, Cisalak,
 *   Kec. Cimanggis, Kota Depok, Jawa Barat 16452", 154 ulasan.
 * - Titik LISTING (tautan "@" di dalam embed): -6,3755849 / 106,8631263.
 *   Koordinat dataset = parameter pusat embed (!2d/!3d), ±285 m di barat pin —
 *   pola yang sama di 202 dari 203 baris dataset (lihat SKILL.md §8).
 *
 * Kelurahan: listing menulis "Cisalak, Kec. Cimanggis"; idfirms "Cisalak
 * Pasar, Cimanggis"; panggon "Cisalak Sukmajaya". Kelurahan Cisalak ada di
 * Kec. SUKMAJAYA, Cisalak Pasar di Kec. CIMANGGIS (id.wikipedia, kedua
 * halaman kecamatan). OSM tidak punya poligon kelurahan di Depok, jadi tidak
 * bisa diuji. Halaman menyebut Kecamatan Cimanggis (dataset + listing) dan
 * menjelaskan dua "Cisalak" tanpa memilih kelurahannya.
 *
 * Tapos: pemekaran dari Kecamatan Cimanggis (id.wikipedia "Tapos, Depok");
 * tahun/Perda tidak disebut sumber → tidak ditulis. Dari titik wilayah Tapos
 * (poligon OSM), kantor Adira terdekat: Cimanggis 5,4 km.
 *
 * Patokan dari OSM (Overpass), jarak lurus dari titik listing.
 * LRT Harjamukti: ujung Lintas Cibubur LRT Jabodebek, dibuka 28 Agustus 2023
 * (en.wikipedia).
 */

export const CABANG = {
  nama: "Adira Finance Cimanggis",
  namaDataset: "Adira Finance Cimanggis - Depok",
  namaMaps: "Adira Cimanggis",
  jalan: "Jl. Raya Jakarta-Bogor KM 31",
  rtRw: "RT.1/RW.5",
  kecamatan: "Cimanggis",
  kota: "Kota Depok",
  provinsi: "Jawa Barat",
  telepon: ["021-87714717", "021-87714727"],
  fax: "021-87714730",
  slug: "adira-finance-cimanggis-depok",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

export type ButirLegenda = { nama: string; km: number; arah: string };

/** Legenda peta — empat kelompok. */
export const LEGENDA: readonly { judul: string; isi: readonly ButirLegenda[] }[] = [
  {
    judul: "Air — empat situ dalam 1 km",
    isi: [
      { nama: "Situ Bunder", km: 0.47, arah: "barat laut" },
      { nama: "Situ Ciming", km: 0.54, arah: "barat daya" },
      { nama: "Situ Gadog", km: 0.62, arah: "timur" },
      { nama: "Situ Pangarengan", km: 0.87, arah: "barat daya" },
    ],
  },
  {
    judul: "Kampus dan fasilitas",
    isi: [
      { nama: "Universitas Gunadarma Kampus F4", km: 0.21, arah: "utara" },
      { nama: "RSIA Tumbuh Kembang", km: 0.47, arah: "barat laut" },
      { nama: "Kantor Kecamatan Cimanggis", km: 1.1, arah: "timur" },
      { nama: "Grand Cimanggis Mall", km: 1.27, arah: "barat laut" },
    ],
  },
  {
    judul: "Pasar dan jalan",
    isi: [
      { nama: "Pasar Cisalak", km: 0.55, arah: "tenggara" },
      { nama: "Gerbang Tol Cisalak", km: 0.58, arah: "selatan" },
      { nama: "Halte bus Cisalak", km: 0.95, arah: "tenggara" },
    ],
  },
  {
    judul: "Kereta",
    isi: [
      { nama: "Stasiun KRL Pondok Cina", km: 3.51, arah: "barat" },
      { nama: "Stasiun LRT Harjamukti", km: 3.6, arah: "timur" },
    ],
  },
];

/** Kelurahan Kecamatan Cimanggis (id.wikipedia). */
export const KELURAHAN_CIMANGGIS = ["Cisalak Pasar", "Curug", "Harjamukti", "Mekarsari", "Pasir Gunung Selatan", "Tugu"] as const;

/** Kelurahan Kecamatan Tapos (id.wikipedia). */
export const KELURAHAN_TAPOS = ["Cilangkap", "Cimpaeun", "Tapos", "Jatijajar", "Leuwinanggung", "Sukamaju Baru", "Sukatani"] as const;

/**
 * Kantor Adira lain, jarak lurus antar titik LISTING (bukan koordinat
 * dataset). Juanda – Depok tidak dicantumkan: tautan Maps-nya menunjuk
 * listing yang sama persis dengan Margonda.
 */
export const TETANGGA: readonly { nama: string; wilayah: string; km: number; href: string | null }[] = [
  { nama: "Adira Finance Margonda", wilayah: "Beji, Depok", km: 3.8, href: "/adira-finance-margonda-depok" },
  { nama: "Adira Finance Sawangan", wilayah: "Pancoran Mas, Depok", km: 8.2, href: "/adira-finance-sawangan" },
  { nama: "Adira Finance Cibinong", wilayah: "Kabupaten Bogor — jalan yang sama", km: 10.9, href: "/adira-finance-cibinong" },
  { nama: "Adira Finance Jatirahayu", wilayah: "Pondok Gede, Kota Bekasi", km: 11.3, href: "/adira-finance-pondok-gede" },
  { nama: "Adira Finance Mall Cileungsi", wilayah: "Kabupaten Bogor", km: 11.6, href: "/adira-finance-mall-cileungsi" },
];

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Adira Cimanggis, Jl. Raya Jakarta-Bogor KM 31, Cisalak, Depok");

/** Dari `gmaps_link` — listing terverifikasi benar. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.142645994708!2d106.8605513750833!3d-6.375579562364952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec7e6a43e6db%3A0x9a7802c511d05747!2sAdira%20Cimanggis!5e0!3m2!1sid!2sid!4v1713283023263!5m2!1sid!2sid";
