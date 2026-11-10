/**
 * Data cabang Adira Finance Mayor Abdurachman – Sumedang.
 *
 * Diverifikasi 2026-11-10. Baris dataset (`branch_id=35`): NAMA benar,
 * hampir semua data lokasi menunjuk tempat lain.
 *
 * DIPAKAI
 * - Listing Google Maps "ADIRA FINANCE" — kartu embed: "Kotakaler, Kec.
 *   Sumedang Utara, Kabupaten Sumedang, Jawa Barat", 3,1 (8 ulasan), kategori
 *   Bank. Pin −6,8432958 / 107,9249762. CID 4477926622368794711.
 * - Listing "ATM DANAMON SUMEDANG ADIRA MAYOR ABDURACHMAN" — "Jl. Mayor
 *   Abdurahman No.103, Kotakaler, Kec. Sumedang Utara, Kabupaten Sumedang,
 *   Jawa Barat 46521", tanpa ulasan. Pin −6,843332 / 107,9249507 (±4 m dari
 *   listing kantor). Nomor 103 dipakai sebagai alamat gedung, dengan sumbernya.
 * - Nominatim di pin: "Adira, Gang Koramil, lembur tengah, Sumedang, 45321"
 *   — OSM punya objek Adira di titik yang sama.
 * - OSM: "Jalan Mayor Abdurrahman", highway=secondary, oneway=yes, arah
 *   selatan → utara; ruasnya ±13 m di TIMUR pin → kantor di sisi barat = kiri
 *   bagi kendaraan yang melaju ke utara. Jl. Tampomas (timurnya) oneway ke
 *   selatan.
 * - Ejaan: "Abdurachman" (dataset, ATM), "Abdurahman" (alamat ATM),
 *   "Abdurrahman" (OSM). Halaman menyebut ketiganya.
 *
 * TIDAK DIPAKAI (ditulis di "lembar ralat")
 * - Alamat dataset "Jl. Raya Bandung - Sumedang No.170, RT.01, Jatisari",
 *   kode pos 45362, sub_district 3211030 = TANJUNGSARI. Jatisari ada di Kec.
 *   Tanjungsari (listing Adira Tanjungsari: "Jatisari, Kec. Tanjungsari",
 *   CID 7282596938490343984; Nominatim di pinnya: "Jatisari, Sumedang,
 *   45362"). Halaman TIDAK menyimpulkan alamat itu milik kantor Tanjungsari.
 * - Koordinat dataset −6,9051969 / 107,6472901: pusat embed zoom 12 di
 *   Bandung, ±31,4 km dari kantor. Place id embed (0x2e68db3b5dfc34d7:
 *   0xfaca1034e909e566) tidak menampilkan kartu listing apa pun lagi.
 * - Kode pos: tiga angka beredar (45362 dataset, 45321 Nominatim, 46521
 *   kartu ATM) → tidak ditampilkan.
 *
 * BELUM ADA SUMBER KEDUA
 * - Telepon 0261-201099, 0261-201299, 0261-202190; faks 0261-208256 — hanya
 *   dataset. Pencarian nomor & alamatpenting/ramdan.id: tidak ada.
 *   Halaman menyatakannya.
 * - Kompas (sejarah Mayor Abdurahman) tidak bisa dibuka (DNS) → tidak dipakai.
 *
 * Patokan: Nominatim (OSM), jarak lurus dari pin listing.
 */

export const CABANG = {
  nama: "Adira Finance Mayor Abdurachman",
  namaDataset: "Adira Finance Mayor Abdurachman - Sumedang",
  namaMaps: "ADIRA FINANCE",
  jalan: "Jl. Mayor Abdurahman No. 103",
  kelurahan: "Kotakaler",
  kecamatan: "Sumedang Utara",
  kabupaten: "Kabupaten Sumedang",
  provinsi: "Jawa Barat",
  telepon: ["0261-201099", "0261-201299", "0261-202190"],
  fax: "0261-208256",
  slug: "adira-finance-mayor-abdurachman-sumedang",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Lembar ralat: yang tertulis di data cabang kami vs yang ditemukan. */
export const RALAT: readonly { bagian: string; tertulis: string; temuan: string; sumber: string }[] = [
  {
    bagian: "Alamat",
    tertulis: "Jl. Raya Bandung – Sumedang No. 170, Jatisari",
    temuan: "Jl. Mayor Abdurahman No. 103, Kotakaler",
    sumber: "Listing Google ATM Adira di titik yang sama dengan kantor",
  },
  {
    bagian: "Kecamatan",
    tertulis: "Tanjungsari (menurut kode wilayahnya)",
    temuan: "Sumedang Utara",
    sumber: "Listing Google kantor dan ATM",
  },
  {
    bagian: "Titik peta",
    tertulis: "Bandung, sekitar 31 km dari kantor",
    temuan: "Jl. Mayor Abdurrahman, Sumedang kota",
    sumber: "Listing Google \"ADIRA FINANCE\" (8 ulasan); OpenStreetMap juga mencatat objek Adira di titik itu",
  },
  {
    bagian: "Kode pos",
    tertulis: "45362",
    temuan: "Tidak kami tulis",
    sumber: "Tiga sumber, tiga angka: 45362, 45321, 46521",
  },
];

/** Jarak lurus dari pin listing (Nominatim/OSM). */
export const PATOKAN: readonly { nama: string; km: number; arah: string }[] = [
  { nama: "Pusat Pemerintahan Kabupaten Sumedang", km: 0.8, arah: "barat laut" },
  { nama: "Halte RSUD Sumedang", km: 1.6, arah: "selatan" },
  { nama: "Alun-alun Sumedang", km: 1.9, arah: "selatan" },
  { nama: "Masjid Agung Sumedang", km: 1.9, arah: "selatan" },
  { nama: "Museum Prabu Geusan Ulun", km: 2.0, arah: "selatan" },
  { nama: "Terminal Ciakar", km: 2.0, arah: "utara" },
];

export const TANJUNGSARI = {
  nama: "Adira Finance Tanjungsari",
  tempat: "Jatisari, Kec. Tanjungsari",
  km: 15.7,
  arah: "barat daya",
  peta: "https://maps.google.com/?cid=7282596938490343984",
} as const;

export const PETA_URL = "https://maps.google.com/?cid=4477926622368794711";

/** Embed dibangun dari place id listing kantor, dipusatkan di pinnya (zoom ±17). */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d107.9249762!3d-6.8432958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68d1374210f211%3A0x3e24ca89b88e8857!2sADIRA%20FINANCE!5e0!3m2!1sid!2sid!4v1762750000000!5m2!1sid!2sid";
