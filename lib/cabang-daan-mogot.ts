/**
 * Data cabang Adira Finance Daan Mogot – Kalideres, Jakarta Barat.
 *
 * Diverifikasi 2026-10-19. Baris dataset (`branch_id=9`) SEHAT:
 * - Telepon 021-54376721, 021-54376789, faks 021-54376342: unik di dataset,
 *   dikuatkan direktori independen (telepon.panggon.com, "Jl. Tanah Lot Blok
 *   LC I No. 14").
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`):
 *   "ADIRA Daan Mogot", "Ruko Daan Mogot Baru, Jl. Tanah Lot No.15 Blok LC 14,
 *   RT.8/RW.12, Kalideres, Kec. Kalideres, Jakarta 11840", 3,8 bintang dari
 *   469 ulasan. Pin di dekat bundaran Jl. Gilimanuk / Jl. Tampak Siring,
 *   utara Mall Daan Mogot.
 * - Koordinat dataset: Jl. Kintamani Barat, RW 17, Kalideres (Nominatim) —
 *   praktis di titik listing.
 *
 * Jarak lurus dari pin, OpenStreetMap (Nominatim):
 * - Jl. Tanah Lot 0,29 km; Mall Daan Mogot 0,45 km;
 * - Halte/Terminal Kalideres (Transjakarta Koridor 3) 0,80 km;
 * - Jalan Daan Mogot (jalan raya) 0,86 km — kantor TIDAK di jalan itu;
 *   "Daan Mogot" di sini nama kompleks Daan Mogot Baru.
 * Nama jalan di kompleks (Tanah Lot, Kintamani, Gilimanuk, Tampak Siring,
 * Jimbaran, Ubud) terlihat di peta Google dan sebagian dikonfirmasi OSM.
 *
 * Tidak dipakai: nomor HP di situs pihak ketiga (tidak terkonfirmasi), jam
 * operasional (belum terverifikasi).
 */

export const CABANG = {
  nama: "Adira Finance Daan Mogot",
  namaDataset: "Adira Finance Daan Mogot - Kalideres",
  namaMaps: "ADIRA Daan Mogot",
  kompleks: "Ruko Daan Mogot Baru",
  jalan: "Jl. Tanah Lot No. 15, Blok LC 14",
  rtRw: "RT.8/RW.12",
  kelurahan: "Kalideres",
  kecamatan: "Kalideres",
  kota: "Kota Jakarta Barat",
  provinsi: "DKI Jakarta",
  kodePos: "11840",
  telepon: ["021-54376721", "021-54376789"],
  fax: "021-54376342",
  slug: "adira-finance-daan-mogot",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Delapan kecamatan Kota Jakarta Barat — `sub_districts.csv`, district_id 3174. */
export const KECAMATAN_JAKBAR = [
  "Kembangan",
  "Kebon Jeruk",
  "Palmerah",
  "Grogol Petamburan",
  "Tambora",
  "Taman Sari",
  "Cengkareng",
  "Kalideres",
] as const;

export const JARAK = {
  jalanTanahLot: 0.29,
  mallDaanMogot: 0.45,
  halteKalideres: 0.8,
  jalanDaanMogot: 0.86,
  latumenten: 9.1,
} as const;

/** Nama jalan bernuansa Bali di kompleks — penanda Anda sudah di kompleks yang benar. */
export const JALAN_BALI = ["Tanah Lot", "Kintamani", "Gilimanuk", "Tampak Siring", "Jimbaran", "Ubud"] as const;

export const TETANGGA: readonly { nama: string; wilayah: string; km: number; href: string | null }[] = [
  { nama: "Adira Finance Ciledug", wilayah: "Kota Tangerang", km: 8.6, href: "/adira-finance-ciledug" },
  { nama: "Adira Finance Latumenten", wilayah: "Tambora, Jakarta Barat", km: 9.1, href: null },
  { nama: "Adira Finance Pasar Baru", wilayah: "Kota Tangerang", km: 10.2, href: "/adira-finance-pasar-baru" },
  { nama: "Adira Finance Ketapang", wilayah: "Jakarta Pusat", km: 11.3, href: null },
  { nama: "Adira Finance Alam Sutera", wilayah: "Tangerang Selatan", km: 13.3, href: "/adira-finance-alam-sutera" },
];

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("ADIRA Daan Mogot, Jl. Tanah Lot, Kalideres");

/** Dari `gmaps_link` — listing terverifikasi benar. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.8594338246585!2d106.71123897508039!3d-6.149572960279451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f8171f9d9f2f%3A0xa8d309ac5ca19f2b!2sADIRA%20Daan%20Mogot!5e0!3m2!1sid!2sid!4v1713275273794!5m2!1sid!2sid";
