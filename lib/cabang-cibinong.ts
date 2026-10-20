/**
 * Data cabang Adira Finance Cibinong – Kabupaten Bogor.
 *
 * Diverifikasi 2026-10-20. Baris dataset (`branch_id=26`) SEHAT, dengan satu
 * catatan soal koordinat:
 *
 * - Telepon 021-87908409 / 021-87908410, faks 021-87908900: unik di dataset
 *   (tidak dipakai baris lain). Direktori lama yang independen mencatat nomor
 *   yang sama untuk Adira Cibinong (ringkasan hasil pencarian: portal-alamat,
 *   Yellow Pages; halamannya sendiri tidak bisa dibuka dari mesin ini).
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`):
 *   "Adira Finance", "Jl. Raya Jakarta-Bogor No.8, Cirimekar, Kec. Cibinong,
 *   Kabupaten Bogor, Jawa Barat 16917", 233 ulasan.
 * - Titik LISTING (pusat embed setelah Google memusatkan ke tempatnya):
 *   -6,4725092 / 106,8497279 → Nominatim: "Jalan Raya Bogor, … Cibinong,
 *   16917". Koordinat DATASET (-6,4725039 / 106,847153) meleset ±285 m ke
 *   barat, ke seberang jalan dekat Situ Kibing. Semua jarak di halaman ini
 *   diukur dari titik listing.
 * - Kelurahan: alamat dan listing menulis Cirimekar; batas wilayah OSM di
 *   titik itu terbaca Pabuaran. Keduanya kelurahan di Kecamatan Cibinong.
 *   Yang ditampilkan: Cirimekar (sesuai alamat resmi di listing).
 *
 * Penulisan alamat lain yang beredar di direktori lama (dari ringkasan hasil
 * pencarian, beberapa situs): "Graha Cibinong Blok C1 No. 21-23, Jl. Raya
 * Jakarta-Bogor Km 43, Kel. Cirimekar". Jalan dan kelurahan sama, nomor
 * telepon sama. Kami TIDAK bisa memastikan apakah itu alamat lama atau
 * penulisan lain untuk tempat yang sama — halaman menyebutnya apa adanya.
 *
 * Fakta wilayah: Cibinong ibu kota Kabupaten Bogor, 13 kelurahan, kode pos
 * 16911–16919 (id.wikipedia "Cibinong, Bogor"). Kabupaten Bogor 40 kecamatan
 * (`sub_districts.csv`, district_id 3201).
 *
 * Tidak dipakai: nomor HP di situs agen lain (tidak terkonfirmasi), jam
 * operasional, rating (berubah-ubah dan tidak membantu menemukan kantor).
 */

export const CABANG = {
  nama: "Adira Finance Cibinong",
  namaDataset: "Adira Finance Cibinong - Bogor",
  namaMaps: "Adira Finance",
  jalan: "Jl. Raya Jakarta-Bogor No. 8",
  kelurahan: "Cirimekar",
  kecamatan: "Cibinong",
  kabupaten: "Kabupaten Bogor",
  provinsi: "Jawa Barat",
  kodePos: "16917",
  telepon: ["021-87908409", "021-87908410"],
  fax: "021-87908900",
  slug: "adira-finance-cibinong",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Penulisan alamat di direktori lama — lihat catatan di atas. */
export const ALAMAT_DIREKTORI_LAMA = "Graha Cibinong Blok C1 No. 21-23, Jl. Raya Jakarta-Bogor Km 43";

/**
 * Patokan di sekitar kantor. Jarak lurus dari titik listing, posisi dari
 * OpenStreetMap (Overpass). "Seberang" = di sisi barat Jalan Raya Bogor,
 * terlihat di peta Google dan konsisten dengan geometri jalan di OSM.
 */
export const PATOKAN: readonly { grup: string; isi: readonly { nama: string; km: number; catatan: string }[] }[] = [
  {
    grup: "Kelihatan dari jalan",
    isi: [
      { nama: "Situ Kibing", km: 0.29, catatan: "danau kecil di seberang jalan" },
      { nama: "RS Trimitra", km: 0.35, catatan: "di seberang jalan" },
      { nama: "Kantor Kecamatan Cibinong", km: 0.4, catatan: "satu sisi dengan kantor, agak masuk ke timur" },
    ],
  },
  {
    grup: "Kalau naik kendaraan umum",
    isi: [
      { nama: "Terminal Bus Cibinong", km: 0.75, catatan: "" },
      { nama: "Stasiun Cibinong", km: 0.97, catatan: "KRL Commuter Line Bogor, cabang Nambo — kereta ke Jakarta Kota dan Nambo" },
    ],
  },
  {
    grup: "Tempat belanja terdekat",
    isi: [
      { nama: "Ramayana Cibinong", km: 0.78, catatan: "" },
      { nama: "Pasar Cibinong", km: 0.92, catatan: "" },
      { nama: "Mall Cibinong Square", km: 0.99, catatan: "" },
    ],
  },
];

/**
 * Kantor Adira terdekat dari titik wilayah beberapa kecamatan di sekitar
 * Cibinong. Titik wilayah = titik yang dikembalikan Nominatim untuk nama
 * kecamatan itu (untuk Bojong Gede: desa Bojonggede). Jarak lurus.
 *
 * Kantor pembanding hanya yang titiknya sudah kami cek: Cibinong, Cimanggis,
 * Margonda, Sawangan, Tajur, Soleh Iskandar (titik listing), Mall Cileungsi
 * (titik Cileungsi Trade Center).
 *
 * Kecamatan di barat (Tajurhalang, Kemang, Parung, Ciseeng, Gunung Sindur,
 * Rancabungur) SENGAJA tidak dimuat: kantor terdekatnya menurut data adalah
 * Parung Panjang, yang nama dan titik petanya tidak cocok (§8 SKILL.md), atau
 * Leuwiliang yang belum kami cek.
 */
export const DARI_KECAMATAN: readonly {
  kecamatan: string;
  terdekat: string;
  kmTerdekat: number;
  kmKeSini: number;
  href: string | null;
}[] = [
  { kecamatan: "Cibinong", terdekat: "kantor ini", kmTerdekat: 2.0, kmKeSini: 2.0, href: null },
  { kecamatan: "Bojong Gede", terdekat: "kantor ini", kmTerdekat: 5.7, kmKeSini: 5.7, href: null },
  { kecamatan: "Citeureup", terdekat: "kantor ini", kmTerdekat: 7.1, kmKeSini: 7.1, href: null },
  { kecamatan: "Sukaraja", terdekat: "Soleh Iskandar (Kota Bogor)", kmTerdekat: 5.7, kmKeSini: 11.1, href: "/adira-finance-soleh-iskandar" },
  { kecamatan: "Babakan Madang", terdekat: "Tajur (Kota Bogor)", kmTerdekat: 9.7, kmKeSini: 12.8, href: "/adira-finance-tajur" },
  { kecamatan: "Klapanunggal", terdekat: "Mall Cileungsi", kmTerdekat: 7.6, kmKeSini: 12.3, href: "/adira-finance-mall-cileungsi" },
  { kecamatan: "Gunung Putri", terdekat: "Mall Cileungsi", kmTerdekat: 3.5, kmKeSini: 12.9, href: "/adira-finance-mall-cileungsi" },
];

/** Cabang lain terdekat, jarak lurus dari titik listing. Juanda dan Parung Panjang dikecualikan (titik salah). */
export const TETANGGA: readonly { nama: string; wilayah: string; km: number; href: string | null }[] = [
  { nama: "Adira Finance Margonda", wilayah: "Beji, Kota Depok", km: 10.2, href: null },
  { nama: "Adira Finance Cimanggis", wilayah: "Cisalak, Kota Depok", km: 10.8, href: null },
  { nama: "Adira Finance Sawangan", wilayah: "Pancoran Mas, Kota Depok", km: 11.0, href: "/adira-finance-sawangan" },
  { nama: "Adira Finance Soleh Iskandar", wilayah: "Tanah Sareal, Kota Bogor", km: 11.9, href: "/adira-finance-soleh-iskandar" },
  { nama: "Adira Finance Mall Cileungsi", wilayah: "Cileungsi, Kabupaten Bogor", km: 14.3, href: "/adira-finance-mall-cileungsi" },
  { nama: "Adira Finance Tajur", wilayah: "Bogor Selatan, Kota Bogor", km: 18.4, href: "/adira-finance-tajur" },
];

/** Cabang Cimanggis — satu jalan dengan cabang ini. Listing dicek 2026-10-20. */
export const CIMANGGIS = {
  alamat: "Jl. Raya Jakarta-Bogor KM 31, Cisalak, Kecamatan Cimanggis, Kota Depok 16452",
  telepon: "021-87714717",
  km: 10.8,
} as const;

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Adira Finance, Jl. Raya Jakarta-Bogor No.8, Cirimekar, Cibinong");

/** Dari `gmaps_link` — listing terverifikasi benar. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.3874867753852!2d106.84715297508448!3d-6.472503863284844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c1c4d000338f%3A0x152b7cdca13979c5!2sAdira%20Finance!5e0!3m2!1sid!2sid!4v1713283915246!5m2!1sid!2sid";
