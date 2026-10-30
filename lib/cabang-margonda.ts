/**
 * Data cabang Adira Finance Margonda – Depok.
 *
 * Diverifikasi 2026-10-30. Baris dataset (`branch_id=20`) SEHAT.
 *
 * - Telepon 021-77204222 / 021-77204333 / 021-77204888, faks 021-77200022 /
 *   021-77205111: unik di dataset; telepon dikuatkan direktori (ringkasan hasil
 *   pencarian: telepon.panggon.com "Jl. Margonda Raya No 88 A-C",
 *   adirafinance.id, alamatpenting).
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`, 2026-10-20):
 *   "Adira Finance", "Jl. Margonda No.88 A-C, Kemiri Muka, Kecamatan Beji,
 *   Kota Depok, Jawa Barat 16423", 216 ulasan.
 * - Titik LISTING (tautan "@"): -6,3837222 / 106,8296457. Koordinat dataset =
 *   pusat embed, ±285 m di barat (SKILL.md §8).
 *
 * Jalan Raya Margonda (OSM): dua jalur satu arah, ±4,9 km utara–selatan di
 * bentang yang diambil. Titik kantor 13 m dari jalur yang mengarah ke
 * SELATAN, di sisi kirinya → sisi timur jalan. Dari arah utara (UI) kantor di
 * kiri; dari arah selatan (pusat kota) kantor di seberang.
 *
 * "88": D'Mall Depok beralamat "Jl. Margonda Raya Kav. 88, Kemiri Muka"
 * (Tripadvisor; OSM "No.88"), Margonda Residence juga "Kav 88" (Travelio).
 * D'Mall ±0,45 km di selatan, sisi BARAT jalan (geometri OSM) — seberang.
 * Sisi patokan lain (geometri OSM per lintang, 2026-10-30): Pondok Cina,
 * Detos, ITC, Terminal, Stasiun Depok Baru, Balai Kota = BARAT; Margo City,
 * Mitra10 = TIMUR (sisi kantor). Datang dari utara: timur = kiri.
 *
 * Baris "Adira Finance Juanda – Depok" (branch_id 21): alamat "Jl. Margonda
 * Raya No 88 A-C", telepon sendiri 021-77207408 / faks 021-77207409, dan
 * `gmaps_link`-nya menunjuk listing yang SAMA dengan Margonda. Direktori lama
 * (ringkasan pencarian, rajotuho) menulis Juanda di "Jl. Ir. Juanda No 25-26"
 * dengan nomor yang sama. Belum bisa dipastikan apakah Juanda kini satu gedung
 * dengan Margonda atau kantor terpisah — halaman menyebutnya apa adanya.
 *
 * Tidak dipakai: jam operasional (situs agen), nomor HP agen lain, rating.
 */

export const CABANG = {
  nama: "Adira Finance Margonda",
  namaDataset: "Adira Finance Margonda - Depok",
  namaMaps: "Adira Finance",
  jalan: "Jl. Margonda Raya No. 88 A-C",
  kelurahan: "Kemiri Muka",
  kecamatan: "Beji",
  kota: "Kota Depok",
  provinsi: "Jawa Barat",
  kodePos: "16423",
  telepon: ["021-77204222", "021-77204333", "021-77204888"],
  fax: ["021-77200022", "021-77205111"],
  slug: "adira-finance-margonda-depok",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

export const JUANDA = { telepon: "021-77207408", fax: "021-77207409", alamatLama: "Jl. Ir. H. Juanda No. 25-26" } as const;

/**
 * Urutan patokan untuk dua arah datang. `sebelum` = jarak utara–selatan
 * (bukan jarak tempuh) dari kantor, km. Posisi dari Nominatim/OSM.
 */
export const DARI_UTARA: readonly { nama: string; km: number; catatan: string }[] = [
  { nama: "Universitas Indonesia", km: 2.6, catatan: "masih jauh di utara" },
  { nama: "Stasiun Pondok Cina", km: 1.6, catatan: "di sisi kanan, agak masuk" },
  { nama: "Margo City dan Depok Town Square", km: 1.2, catatan: "berhadapan — Margo City di kiri, Detos di kanan" },
  { nama: "Kantor Adira Margonda", km: 0, catatan: "di sisi kiri jalan" },
  { nama: "Mitra10 Depok", km: 0.1, catatan: "di sisi kiri, tak jauh lewat dari kantor" },
];

export const DARI_SELATAN: readonly { nama: string; km: number; catatan: string }[] = [
  { nama: "Balai Kota Depok", km: 1.1, catatan: "titik awal dari pusat kota" },
  { nama: "ITC Depok", km: 1.0, catatan: "" },
  { nama: "Terminal Depok / Stasiun Depok Baru", km: 0.9, catatan: "" },
  { nama: "D'Mall Depok (Kav. 88)", km: 0.4, catatan: "di sisi kiri — nomornya sama, tapi bukan kantor Adira" },
  { nama: "Kantor Adira Margonda", km: 0, catatan: "di SEBERANG jalan, sisi kanan" },
];

/** Kantor Adira lain, jarak lurus antar titik LISTING. */
export const TETANGGA: readonly { nama: string; wilayah: string; km: number; href: string | null }[] = [
  { nama: "Adira Finance Cimanggis", wilayah: "Cisalak, Depok", km: 3.8, href: "/adira-finance-cimanggis-depok" },
  { nama: "Adira Finance Sawangan", wilayah: "Pancoran Mas, Depok", km: 4.4, href: "/adira-finance-sawangan" },
  { nama: "Adira Finance Cibinong", wilayah: "Kabupaten Bogor", km: 10.1, href: "/adira-finance-cibinong" },
  { nama: "Adira Finance Pondok Indah Baru", wilayah: "Jakarta Selatan", km: 14.2, href: null },
];

/** Dari `gmaps_link` — listing terverifikasi benar. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.0796827418426!2d106.82707077508326!3d-6.383716862441557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ebf9d5ef8259%3A0x98879cbef66dac70!2sAdira%20Finance!5e0!3m2!1sid!2sid!4v1713282603522!5m2!1sid!2sid";

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Adira Finance, Jl. Margonda No.88 A-C, Kemiri Muka, Depok");
