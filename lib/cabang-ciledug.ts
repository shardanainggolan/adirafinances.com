/**
 * Data cabang Adira Finance Ciledug – Kota Tangerang.
 *
 * Diverifikasi 2026-10-16. Berbeda dengan Soleh Iskandar dan Mall Cileungsi,
 * baris dataset ini (`branch_id=3`) SEHAT:
 * - Nomor 021-73446773, 021-7323669, faks 021-7323662 unik di dataset dan
 *   tercantum di direktori independen (alamatelpon.com, 2019).
 * - Kartu listing Google Maps (dirender lewat iframe dari `gmaps_link`):
 *   "Adira Finance Cab Ciledug Baru", "Jl. HOS Cokroaminoto Gang Rawa I No.16,
 *   RT.001/RW.005, Sudimara Tim., Kec. Ciledug, Kota Tangerang, Banten 15151",
 *   3,5 bintang dari 317 ulasan. Pinnya di Jl. HOS Cokroaminoto.
 * - Koordinat dataset jatuh di Sudimara Jaya, kelurahan tetangga di kecamatan
 *   yang sama, praktis di titik listing — dipakai untuk menghitung jarak.
 *
 * Alamat mentah dataset "Gg. Rw. I No.1 6" = "Gang Rawa I No. 16" menurut
 * listing Google. "Rw." di situ singkatan RAWA, bukan RW.
 *
 * Kata "Baru" pada nama listing TIDAK ditafsirkan: tidak ada sumber yang
 * menyebut kantor ini pernah pindah.
 *
 * Jarak penanda dari OpenStreetMap (Nominatim), lurus dari pin cabang:
 * - Halte Transjakarta CBD Ciledug: 0,51 km ke barat. Wikipedia: halte
 *   "terletak di Jalan HOS Tjokroaminoto, Kelurahan Karang Tengah, Kecamatan
 *   Karang Tengah", melayani Koridor 13, dibuka 12 November 2018, dibuka
 *   kembali 14 Juni 2025.
 * - Pasar Saraswati Ciledug: 0,40 km ke barat. OSM menamai jalannya
 *   "Jalan Haji Oemar Said Cokroaminoto" — HOS = Haji Oemar Said.
 * Jam operasional halte TIDAK ditulis: sumber saling bertentangan.
 *
 * Belum terverifikasi, karena itu belum ditulis: jam operasional kantor,
 * patokan di sisi timur (CIPLAZ, RS Sari Asih — terlihat di peta Google tetapi
 * tidak ada di OSM untuk diukur), foto.
 */

export const CABANG = {
  nama: "Adira Finance Ciledug",
  namaDataset: "Adira Finance Ciledug - Tangerang",
  namaMaps: "Adira Finance Cab Ciledug Baru",
  /** Versi listing Google; dataset menulis "Gg. Rw. I No.1 6". */
  jalan: "Jl. HOS Cokroaminoto, Gang Rawa I No. 16",
  rtRw: "RT.001/RW.005",
  kelurahan: "Sudimara Timur",
  kecamatan: "Ciledug",
  kota: "Kota Tangerang",
  provinsi: "Banten",
  kodePos: "15151",
  telepon: ["021-73446773", "021-7323669"],
  fax: "021-7323662",
  slug: "adira-finance-ciledug",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

export const HALTE = { nama: "Halte Transjakarta CBD Ciledug", km: 0.51, koridor: "13" } as const;
export const PASAR = { nama: "Pasar Saraswati Ciledug", km: 0.4 } as const;

/** Tetangga, jarak lurus dari pin cabang (pin terverifikasi). */
export const TETANGGA: readonly { nama: string; wilayah: string; km: number; href: string | null }[] = [
  { nama: "Adira Finance Alam Sutera", wilayah: "Tangerang Selatan", km: 7.5, href: "/adira-finance-alam-sutera" },
  { nama: "Adira Finance Daan Mogot", wilayah: "Jakarta Barat", km: 8.6, href: null },
  { nama: "Adira Finance Pondok Indah Baru", wilayah: "Jakarta Selatan", km: 9.0, href: null },
  { nama: "Adira Finance Ciputat", wilayah: "Tangerang Selatan", km: 10.7, href: "/adira-finance-ciputat" },
  { nama: "Adira Finance Pasar Baru", wilayah: "Kota Tangerang", km: 11.9, href: "/adira-finance-pasar-baru" },
];

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Adira Finance Cab Ciledug Baru");

/** Dari `gmaps_link` — listing-nya terverifikasi benar. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.276674319199!2d106.71191497508137!3d-6.227206360986402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb74598b8c01%3A0xf8a8f8bcab454801!2sAdira%20Finance%20Cab%20Ciledug%20Baru!5e0!3m2!1sid!2sid!4v1713270014423!5m2!1sid!2sid";
