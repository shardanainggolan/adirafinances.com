/**
 * Data cabang Adira Finance Wahidin – Cirebon.
 *
 * Diverifikasi 2026-11-12. Baris dataset (`branch_id=44`): alamat benar,
 * koordinat = pusat embed; telepon tanpa sumber kedua.
 *
 * DIPAKAI
 * - `gmaps_link` menunjuk listing "ATM DANAMON CIREBON ADIRA WAHIDIN SUDIRO
 *   HUSODO" — kartu embed: "Jl. Dr. Wahidin Sudirohusodo No.57, Sukapura, Kec.
 *   Kejaksan, Kota Cirebon, Jawa Barat 45122", 2,6 (33 ulasan). Telepon di
 *   hasil pencarian Maps "1 500 090" (layanan Danamon, bukan nomor cabang).
 *   Pin −6,7077245 / 108,5512606. Place id 0x2e6ee26a5d5c28e5:0x72b0ca89f59a84f4,
 *   ChIJ5ShcXWribi4R9ISa9YnKsHI. Alamat SAMA PERSIS dengan dataset.
 * - Nominatim (reverse) di pin: "Adira Finance, Jalan Dokter Wahidin
 *   Sudirohusodo, Sukapura, Kejaksan, Cirebon, 45122" — OSM punya objek
 *   kantor Adira di titik yang sama. Sumber independen untuk lokasi.
 * - OSM: Jl. Dokter Wahidin Sudirohusodo di depan kantor = dua jalur satu
 *   arah (secondary, oneway=yes): jalur ke UTARA ±28 m di barat pin, jalur ke
 *   SELATAN ±19 m di barat pin. Kantor di sisi timur → langsung dari jalur ke
 *   selatan (kantor di kiri); dari jalur ke utara kantor ada di seberang.
 * - Pencarian Maps "Adira Finance Cirebon" / "Adira Dinamika Multi Finance
 *   Cirebon" (2026-11-12): di Kota Cirebon hanya listing ATM ini; kantor
 *   Adira terdekat lain: "PT. Adira Dinamika Multi Finance, Tbk - Kuningan"
 *   (−6,9736513 / 108,4809522) dan "Adira Dinamika Multi Finance. PT Tbk -
 *   Jatibarang" (−6,4788418 / 108,2946741, (0234) 352919).
 *
 * TIDAK DIPAKAI
 * - Koordinat dataset −6,7229524 / 108,5260811: pusat embed, ±3,3 km dari pin.
 * - "No. 63": hanya terlihat di ringkasan pencarian (panggon.com dialihkan ke
 *   situs lain; foursquare & petalokasi gagal dibuka) → tidak dikutip.
 * - Rute jalan kaki OSRM-foot dari stasiun (±567 m) lewat gang tanpa nama →
 *   tidak dijadikan petunjuk.
 *
 * BELUM ADA SUMBER KEDUA
 * - Telepon 0231-230750, 0231-248979, 0231-225674; faks 0231-225672,
 *   0231-232481 — dataset + situs agen yang menyalinnya. Halaman menyatakannya.
 *
 * Patokan: Nominatim (OSM), jarak lurus dari pin.
 */

export const CABANG = {
  nama: "Adira Finance Wahidin",
  namaDataset: "Adira Finance Wahidin - Cirebon",
  jalan: "Jl. Dr. Wahidin Sudirohusodo No. 57",
  kelurahan: "Sukapura",
  kecamatan: "Kejaksan",
  kota: "Kota Cirebon",
  provinsi: "Jawa Barat",
  kodePos: "45122",
  telepon: ["0231-230750", "0231-248979", "0231-225674"],
  fax: ["0231-225672", "0231-232481"],
  namaMaps: "ATM DANAMON CIREBON ADIRA WAHIDIN SUDIRO HUSODO",
  slug: "adira-finance-wahidin-cirebon",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Jarak lurus dari pin (Nominatim/OSM). */
export const PATOKAN: readonly { nama: string; km: number; arah: string }[] = [
  { nama: "Hotel Santika Cirebon (Jl. Dr. Wahidin No. 32)", km: 0.25, arah: "barat laut" },
  { nama: "Stasiun Cirebon (Kejaksan)", km: 0.5, arah: "timur laut" },
  { nama: "Grage Mall", km: 0.6, arah: "selatan" },
  { nama: "Balai Kota Cirebon", km: 0.7, arah: "timur" },
  { nama: "Masjid Raya At-Taqwa", km: 0.8, arah: "timur" },
  { nama: "Alun-alun Kejaksan", km: 0.9, arah: "timur" },
  { nama: "CSB Mall", km: 1.2, arah: "selatan" },
];

export const SEKITAR_CIREBON: readonly { nama: string; tempat: string; km: number; arah: string; peta: string }[] = [
  {
    nama: "Adira Finance Kuningan",
    tempat: "Kabupaten Kuningan",
    km: 30.6,
    arah: "selatan",
    peta:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("PT. Adira Dinamika Multi Finance, Tbk - Kuningan"),
  },
  {
    nama: "Adira Finance Jatibarang",
    tempat: "Kabupaten Indramayu",
    km: 38.1,
    arah: "barat laut",
    peta:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Adira Dinamika Multi Finance. PT Tbk - Jatibarang"),
  },
];

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Adira Wahidin Sudirohusodo 57 Cirebon") +
  "&query_place_id=ChIJ5ShcXWribi4R9ISa9YnKsHI";

/** Embed listing ATM di gedung yang sama, dipusatkan di pinnya (bukan pusat embed lama). */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d108.5512606!3d-6.7077245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ee26a5d5c28e5%3A0x72b0ca89f59a84f4!2sATM%20Bank%20Danamon%20Adira%20Kota%20Cirebon!5e0!3m2!1sid!2sid!4v1762920000000!5m2!1sid!2sid";
