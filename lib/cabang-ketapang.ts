/**
 * Data cabang Adira Finance Ketapang – Jakarta Pusat.
 *
 * Diverifikasi 2026-10-21. Baris dataset (`branch_id=8`) SEHAT, dengan teks
 * alamat yang tumpang tindih:
 *
 * - Teks alamat dataset menggabungkan dua versi: "Jalan KH Zainul Arifin Blok
 *   A3-A4 No. 27, Petojo Utara, Gambir, RT.8" dan "Jl. Kyai Haji Zainul Arifin
 *   No.27A, RT.8/RW.1". Direktori independen (telepon.panggon.com, ringkasan
 *   hasil pencarian) menulis "No. 27 Blok A3-A4", satu situs lain "27A".
 *   Ditampilkan: No. 27, Blok A3-A4, dengan catatan bahwa "27A" juga beredar.
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`):
 *   "Adira Finance", "Petojo, Jl. Kyai Haji Zainul Arifin, RT.2/RW.1, Petojo
 *   Utara, Kecamatan Gambir, Kota Jakarta Pusat 10130", 220 ulasan. RT di
 *   dataset 8, di listing 2 — RT tidak ditampilkan.
 * - Titik LISTING (pusat embed): -6,1605212 / 106,8152659 → Nominatim: dekat
 *   Jl. KH Zainul Arifin No. 31, Petojo Utara, Gambir, 10130. Koordinat
 *   dataset ±270 m di baratnya. Semua jarak diukur dari titik listing.
 * - Telepon 021-6322707 / 021-6322708, faks 021-6322709 dan 021-63859422:
 *   unik di dataset; 6322707/08/09 dikuatkan direktori independen.
 *
 * "Ketapang" nama kawasan, bukan kelurahan atau kecamatan. Di OSM nama itu
 * menempel pada Jalan Ketapang Utara, Sekolah Kristen Ketapang 1, GPDI
 * Ketapang, Gereja Kristus Ketapang di sekitar kantor. Secara administratif
 * kantornya di Kel. Petojo Utara, Kec. Gambir. Titik ±0,2 km ke barat laut
 * sudah Kel. Krukut, Kec. Taman Sari, Jakarta Barat (Nominatim); titik 0,1 km
 * ke utara (gedung PGN) masih Petojo Utara — jadi batas kota TIDAK tepat di
 * jalan, dan halaman tidak mengatakannya begitu.
 *
 * Kabupaten Ketapang, Kalimantan Barat (district 6106): tidak ada kantor Adira
 * di dataset. Kantor Adira Kalbar di dataset: Pontianak (2), Singkawang,
 * Sintang, Sambas, Sungai Pinyuh (Mempawah), Nanga Pinoh (Melawi),
 * Bengkayang. Jarak tidak ditampilkan (garis lurus melintasi laut/hutan
 * menyesatkan; dan "terdekat" mentah menunjuk Soekarno Hatta–Palu yang pinnya
 * salah — bujur 110,13, padahal Palu di ±119,9).
 *
 * Tidak dipakai: jam operasional (hanya dari situs agen, tidak terverifikasi),
 * nomor HP di situs agen lain, rating.
 */

export const CABANG = {
  nama: "Adira Finance Ketapang",
  namaDataset: "Adira Finance Ketapang - Jakarta Pusat",
  namaMaps: "Adira Finance",
  jalan: "Jl. KH Zainul Arifin No. 27, Blok A3-A4",
  kelurahan: "Petojo Utara",
  kecamatan: "Gambir",
  kota: "Kota Jakarta Pusat",
  provinsi: "DKI Jakarta",
  kodePos: "10130",
  telepon: ["021-6322707", "021-6322708"],
  fax: ["021-6322709", "021-63859422"],
  slug: "adira-finance-ketapang",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Delapan kecamatan Kota Jakarta Pusat — `sub_districts.csv`, district_id 3173. */
export const KECAMATAN_JAKPUS = [
  "Tanah Abang",
  "Menteng",
  "Senen",
  "Johar Baru",
  "Cempaka Putih",
  "Kemayoran",
  "Sawah Besar",
  "Gambir",
] as const;

/** Kota/kabupaten di Kalimantan Barat yang punya kantor Adira di dataset. */
export const KALBAR_ADA_KANTOR = [
  "Pontianak",
  "Singkawang",
  "Sintang",
  "Sambas",
  "Mempawah (Sungai Pinyuh)",
  "Melawi (Nanga Pinoh)",
  "Bengkayang",
] as const;

export type Patokan = { nama: string; km: number; arah?: string };

/**
 * Sekeliling kantor menurut arah mata angin. Posisi dari OpenStreetMap, jarak
 * lurus dari titik listing; `arah` diisi bila arahnya miring (barat laut dsb.).
 */
export const KOMPAS: Record<"utara" | "timur" | "selatan" | "barat", { judul: string; isi: readonly Patokan[]; catatan?: string }> = {
  utara: {
    judul: "Utara — seberang jalan",
    isi: [
      { nama: "Gedung PT Perusahaan Gas Negara (PGN)", km: 0.1, arah: "timur laut" },
      { nama: "Jalan Ketapang Utara", km: 0.19, arah: "barat laut" },
    ],
    catatan: "Sekitar 0,2 km ke barat laut sudah masuk Kelurahan Krukut, Taman Sari — Jakarta Barat.",
  },
  timur: {
    judul: "Timur — arah Jalan Gajah Mada",
    isi: [
      { nama: "favehotel Zainul Arifin", km: 0.13 },
      { nama: "Hypermart", km: 0.28 },
      { nama: "Gajah Mada Plaza", km: 0.32 },
      { nama: "Halte Transjakarta Sawah Besar dan Harmoni (Koridor 1)", km: 0.5 },
    ],
  },
  selatan: {
    judul: "Selatan — ke dalam Petojo Utara",
    isi: [
      { nama: "Hotel Trinity", km: 0.25, arah: "tenggara" },
      { nama: "Kantor Lurah Petojo Utara", km: 0.34, arah: "tenggara" },
      { nama: "Kantor pusat PT PELNI", km: 0.49, arah: "tenggara" },
    ],
  },
  barat: {
    judul: "Barat — sepanjang Zainul Arifin",
    isi: [
      { nama: "Sekolah Kristen Ketapang 1", km: 0.12 },
      { nama: "GPDI Ketapang", km: 0.2 },
      { nama: "Pasar Petojo", km: 0.43, arah: "barat daya" },
    ],
  },
};

/** Stasiun KRL terdekat (OSM). */
export const STASIUN = [
  { nama: "Sawah Besar", km: 1.37 },
  { nama: "Duri", km: 1.65 },
  { nama: "Mangga Besar", km: 1.76 },
  { nama: "Juanda", km: 1.81 },
] as const;

/**
 * Cabang lain terdekat, jarak lurus dari titik listing. Latumenten diukur dari
 * titik listing-nya (dicek 2026-10-21: "Jl. Prof. Dr. Latumeten, Jemb. Besi,
 * Tambora 11320", pin di kompleks Seasons City). Sentra Cikarang dikecualikan
 * (pin salah, SKILL.md §8).
 */
export const TETANGGA: readonly { nama: string; wilayah: string; km: number; href: string | null }[] = [
  { nama: "Adira Finance Latumenten", wilayah: "Tambora, Jakarta Barat", km: 2.2, href: null },
  { nama: "Adira Finance Kelapa Gading", wilayah: "Jakarta Utara", km: 7.6, href: "/adira-finance-kelapa-gading" },
  { nama: "Adira Finance Tebet", wilayah: "Jakarta Selatan", km: 8.5, href: "/adira-finance-tebet" },
  { nama: "Adira Finance Daan Mogot", wilayah: "Kalideres, Jakarta Barat", km: 11.6, href: "/adira-finance-daan-mogot" },
  { nama: "Adira Finance Pondok Indah Baru", wilayah: "Jakarta Selatan", km: 11.9, href: null },
];

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Adira Finance, Jl. Kyai Haji Zainul Arifin, Petojo Utara, Gambir");

/** Dari `gmaps_link` — listing terverifikasi benar. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.777471921427!2d106.81281757508052!3d-6.160550560378808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6743c0f55c1%3A0x82896964213fc311!2sAdira%20Finance!5e0!3m2!1sid!2sid!4v1713275049798!5m2!1sid!2sid";
