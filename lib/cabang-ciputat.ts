/**
 * Data cabang Adira Finance Ciputat – Tangerang Selatan.
 *
 * Seluruh nilai berasal dari dataset milik pemilik
 * (`public/analisis/adira-branches-full.csv`, `branch_id=7`) dan tabel wilayah
 * berkode BPS (`sub_districts.csv` 3674040 = CIPUTAT, `districts.csv` 3674 =
 * KOTA TANGERANG SELATAN, `provinces.csv` 36 = BANTEN). Nomor telepon yang
 * diberikan pemilik (`0217415209`, `0217403679`, fax `0217406974`) identik
 * dengan dataset — hanya beda awalan nol.
 *
 * Patokan diambil dari OpenStreetMap (Overpass, diperiksa 2026-09-14) dalam
 * radius 2,5 km dari koordinat dataset, lalu jaraknya dihitung garis lurus.
 * Yang dicantumkan hanya tempat bernama dengan jenis yang jelas (pasar, rumah
 * sakit, mal, kampus, jalan besar). Ini fakta peta, bukan petunjuk rute —
 * halaman tidak menyebut "belok kiri/kanan" karena itu tidak kami verifikasi
 * di lapangan.
 *
 * TIGA CABANG SENGAJA TIDAK DICANTUMKAN di daftar sekitar karena datanya
 * saling bertentangan, dan yang meragukan tidak terbit:
 *
 * - "Adira Finance Juanda – Depok" (9,3 km): alamatnya Jl. Margonda Raya
 *   No 88 A-C — sama persis dengan cabang Margonda — tetapi pinnya ~4 km dari
 *   Jl. Margonda. Sudah dicatat juga di `cabang-sawangan.ts`.
 * - "Adira Finance Parung Panjang – Bogor" (12,4 km): kecamatan dan
 *   koordinatnya menunjuk PARUNG, namanya menunjuk Parung Panjang jauh di barat.
 * - "Adira Finance Sentra Cikarang" (11,8 km): mustahil — Cikarang ada puluhan
 *   kilometer di timur Jakarta. Pinnya jatuh di DKI Jakarta; koordinatnya salah.
 *
 * Belum terverifikasi, jadi belum ditulis: jam operasional cabang, status
 * aktif kedua nomor telepon, nomor blok ruko yang sebenarnya di lapangan, dan
 * foto cabang (berkas `adira-cabang-ciputat-*.webp` tidak ada di repo ini).
 */

export const CABANG = {
  nama: "Adira Finance Ciputat",
  namaDataset: "Adira Finance Ciputat - Tangerang Selatan",
  /** Nama tempat di Google Maps, dibaca dari `gmaps_link` pada dataset. */
  namaMaps: "Adira Finance Ciputat",
  kompleks: "Komplek Ruko Ciputat LOT",
  jalan: "Jl. Dewi Sartika Kav. 22-23",
  rtRw: "RT 02 / RW 09",
  /**
   * Kelurahan tidak ada di tabel dataset. Nilai ini dari dua sumber yang
   * saling cocok: kata terakhir kolom alamat ("…, Ciputat"), dan batas
   * administratif OSM level 7 di koordinat kantor = "Ciputat" (2026-09-14).
   * Batas level 6 di titik yang sama = "Ciputat", sesuai sub_district 3674040.
   * Kampus UIN Syarif Hidayatullah (1,5 km) jatuh di level 6 "Ciputat Timur",
   * level 7 "Pisangan" — dasar kalimat "kecamatan sebelah" di halaman.
   */
  kelurahan: "Ciputat",
  kecamatan: "Ciputat",
  kota: "Kota Tangerang Selatan",
  provinsi: "Banten",
  kodePos: "15411",
  /** Nomor kantor cabang — bukan nomor agen. Selalu diberi label pembeda. */
  telepon: ["021-7415209", "021-7403679"],
  fax: "021-7406974",
  lintang: -6.3184827,
  bujur: 106.7432908,
  slug: "adira-finance-ciputat",
} as const;

/**
 * Tujuh kecamatan Kota Tangerang Selatan — `sub_districts.csv`, district_id
 * 3674. Pembagian administratif, BUKAN klaim teritori layanan Adira. Dipakai
 * hanya untuk menegaskan bahwa Ciputat dan Ciputat Timur adalah dua kecamatan
 * yang berbeda.
 */
export const KECAMATAN_TANGSEL = [
  "Setu",
  "Serpong",
  "Pamulang",
  "Ciputat",
  "Ciputat Timur",
  "Pondok Aren",
  "Serpong Utara",
] as const;

export type Patokan = { nama: string; jenis: string; meter: number };

/** Jalan besar bernama dalam 600 m dari titik kantor (OSM: trunk/secondary). */
export const JALAN_SEKITAR: readonly Patokan[] = [
  { nama: "Jl. Aria Putra", jenis: "jalan", meter: 280 },
  { nama: "Jl. Dewi Sartika", jenis: "jalan", meter: 353 },
  { nama: "Jl. Laksamana R.E. Martadinata", jenis: "jalan", meter: 425 },
  { nama: "Jl. Otto Iskandardinata", jenis: "jalan", meter: 504 },
] as const;

/** Tempat yang dikenal warga, dalam 2,5 km. Diurutkan dari yang terdekat. */
export const PATOKAN: readonly Patokan[] = [
  { nama: "Pasar Ciputat", jenis: "pasar", meter: 649 },
  { nama: "RS Sari Asih Ciputat", jenis: "rumah sakit", meter: 762 },
  { nama: "Plaza Ciputat", jenis: "pusat belanja", meter: 797 },
  { nama: "RSIA Bunda Ciputat", jenis: "rumah sakit", meter: 1088 },
  { nama: "Mega Mall Ciputat", jenis: "pusat belanja", meter: 1198 },
  { nama: "UIN Syarif Hidayatullah Jakarta", jenis: "kampus", meter: 1512 },
  { nama: "RSUD Kota Tangerang Selatan", jenis: "rumah sakit", meter: 2188 },
] as const;

/**
 * Cabang lain terdekat, dikelompokkan menurut kota asal pembaca. Jarak lurus
 * dari koordinat dataset. "Terdekat" adalah fakta geografis — bukan
 * pernyataan tentang cabang mana yang melayani wilayah tertentu.
 *
 * `href` hanya diisi bila halaman cabangnya sudah ada di situs ini.
 */
export const CABANG_SEKITAR = [
  {
    dari: "Jakarta Selatan",
    cabang: [{ nama: "Adira Finance Pondok Indah Baru", km: 7.7, href: null }],
  },
  {
    dari: "Depok",
    cabang: [
      { nama: "Adira Finance Sawangan", km: 9.8, href: "/adira-finance-sawangan" },
      { nama: "Adira Finance Margonda", km: 11.8, href: null },
    ],
  },
  {
    dari: "Kota Tangerang",
    cabang: [{ nama: "Adira Finance Ciledug", km: 10.7, href: null }],
  },
  {
    dari: "Serpong dan sekitarnya",
    cabang: [{ nama: "Adira Finance Alam Sutera", km: 12.9, href: "/adira-finance-alam-sutera" }],
  },
] as const;

export const PETA_URL = `https://www.google.com/maps/search/?api=1&query=${CABANG.lintang},${CABANG.bujur}`;

/** Dari kolom `gmaps_link`. Dimuat hanya setelah diklik — lihat `PetaCabang`. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.582190036174!2d106.74329077508247!3d-6.318482661830189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69efea1327651d%3A0x55de2beef905de75!2sAdira%20Finance%20Ciputat!5e0!3m2!1sid!2sid!4v1713271308579!5m2!1sid!2sid";

/** 649 → "649 m", 1512 → "1,5 km". */
export function jarakTeks(meter: number): string {
  return meter < 1000 ? `${meter} m` : `${(meter / 1000).toFixed(1).replace(".", ",")} km`;
}
