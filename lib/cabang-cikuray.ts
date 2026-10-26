/**
 * Data cabang Adira Finance Cikuray – Garut Kota, Kabupaten Garut.
 *
 * Diverifikasi 2026-10-26. Baris dataset (`branch_id=42`) TERCAMPUR dari tiga
 * sumber — hanya sebagian yang dipakai:
 *
 * DIPAKAI
 * - Alamat Jl. Cikuray No. 38, Regol, Garut Kota. Dikuatkan direktori lama
 *   independen (bukuteleponpenting.blogspot.com, 22 Mei 2018: "Jl. Cikuray
 *   No.38, Regol, Garut Kota, Kabupaten Garut, Jawa Barat 44117").
 * - Telepon berkode Garut 0262-240969 (sama dengan sumber 2018) dan
 *   0262-238209 (telp3 dataset).
 * - Kode pos 44117: sumber 2018 + Nominatim untuk Regol. Dataset menulis
 *   44161 — tidak dipakai.
 *
 * TIDAK DIPAKAI
 * - Telepon 0265-327525 dan faks 0265-313358 / 0265-327528: berkode
 *   Tasikmalaya, dan dua yang pertama IDENTIK dengan baris Adira Juanda –
 *   Tasikmalaya (branch_id 41, baris tepat di atasnya); faks kedua juga milik
 *   baris 41. Disalin dari Tasikmalaya. Halaman memberi tahu pembaca.
 * - `gmaps_link`: menunjuk listing "AXI ADIRA FINANCE GARUT (AGEN RESMI ADIRA
 *   FINANCE)", Jl. Garut - Tasikmalaya, Cilawu, 15 ulasan — kantor AGEN di
 *   Cilawu, ±7 km dari Jl. Cikuray, bukan kantor cabang. Awalan "Jl. Garut -
 *   Tasikmalaya" di teks alamat dataset berasal dari listing itu. Tidak
 *   disematkan.
 * - Koordinat dataset (-7,2179458 / 107,9019919): jatuh di Regol (Kantor
 *   BKD, Jl. Kiansantang), ±295 m di barat Jalan Cikuray — dekat, tapi bukan
 *   di jalannya. Tidak ditampilkan.
 *
 * Belum ditemukan: listing Google Maps untuk kantor cabang ini sendiri, dan
 * posisi persis No. 38 di Jalan Cikuray (OSM: ruas utara–selatan ±510 m, tanpa
 * objek Adira). Jarak patokan karena itu diukur ke RUAS Jalan Cikuray
 * (geometri OSM) dan dibulatkan.
 *
 * KA Cikuray (en.wikipedia): Garut – Pasar Senen, KAI, diresmikan 25 Maret
 * 2022; nama dari Gunung Cikuray.
 */

export const CABANG = {
  nama: "Adira Finance Cikuray",
  namaDataset: "Adira Finance Cikuray - Garut",
  jalan: "Jl. Cikuray No. 38",
  kelurahan: "Regol",
  kecamatan: "Garut Kota",
  kabupaten: "Kabupaten Garut",
  provinsi: "Jawa Barat",
  kodePos: "44117",
  telepon: ["0262-240969", "0262-238209"],
  slug: "adira-finance-cikuray-garut",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Jarak lurus ke ruas Jalan Cikuray (OSM), dibulatkan. */
export const PATOKAN: readonly { nama: string; jarak: string; arah: string }[] = [
  { nama: "Stasiun Garut", jarak: "±300 m", arah: "utara" },
  { nama: "Alun-alun Garut", jarak: "±350 m", arah: "barat laut" },
  { nama: "Pendopo Garut", jarak: "±400 m", arah: "barat" },
  { nama: "Masjid Agung Garut", jarak: "±450 m", arah: "barat laut" },
  { nama: "RSUD dr. Slamet", jarak: "±900 m", arah: "barat" },
  { nama: "Terminal Guntur", jarak: "±1,7 km", arah: "utara" },
];

/**
 * Empat kantor Adira di Kabupaten Garut pada dataset, urut utara → selatan.
 * Jarak lurus dari titik tengah Jalan Cikuray. Pin ketiga kantor lain jatuh
 * di tempat yang sesuai namanya (Nominatim, 2026-10-26); ketiganya tanpa
 * nomor telepon di dataset.
 */
export const KANTOR_GARUT: readonly { nama: string; tempat: string; km: number | null; arah: string; ini?: true }[] = [
  { nama: "Adira Finance Limbangan", tempat: "Jl. Raya Limbangan, Limbangan", km: 21.0, arah: "utara" },
  { nama: "Adira Finance Cikuray", tempat: "Jl. Cikuray, Garut Kota", km: null, arah: "", ini: true },
  { nama: "Adira Finance Cikajang", tempat: "Jl. Raya Cikajang, Cikajang", km: 18.8, arah: "barat daya" },
  { nama: "Adira Finance Pameungpeuk", tempat: "Jl. Raya Cigodeg, Pameungpeuk", km: 50.9, arah: "selatan" },
];

/** Kantor asal nomor 0265 yang tersalin ke data cabang ini. */
export const JUANDA_TASIK = { nama: "Adira Finance Juanda – Tasikmalaya", km: 34.7 } as const;

/** Pencarian alamat — BUKAN listing kantor (belum ditemukan). */
export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Jl. Cikuray No. 38, Regol, Garut Kota, Garut");
