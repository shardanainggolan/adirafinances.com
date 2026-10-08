/**
 * Data cabang Adira Finance Mall Cileungsi – Bogor.
 *
 * Diverifikasi 2026-10-08. Baris dataset (`branch_id=19`) hanya SEBAGIAN
 * bisa dipakai:
 *
 * DIPAKAI
 * - Telepon 021-82496928 / 021-82496929, faks 021-82480306 / 021-82480303.
 *   Unik di dataset (tidak disalin dari cabang lain) dan dikuatkan direktori
 *   lama yang independen (portal-alamat 2018, telepon.panggon.com).
 * - Alamat: Mall Cileungsi (Mal Cileungsi Indah), Blok C/15-16,
 *   Jl. Raya Narogong. Nomor blok antarsumber berdekatan dan saling tumpang
 *   tindih (C/15-16 dataset, "C No. 15" panggon, "C14-17" portal-alamat).
 * - Kode pos 16820 — cocok dengan Cileungsi menurut OpenStreetMap.
 *
 * TIDAK DIPAKAI
 * - Kecamatan di dataset: CIBINONG (3201210). Keliru. Kompleks mal ini ada di
 *   Kecamatan Cileungsi, Kelurahan Cileungsi Kidul (Nominatim untuk
 *   "Cileungsi Trade Center"; portal-alamat juga menulis Cileungsi Kidul).
 *   Teks alamat dataset menyebut "Cileungsi, Klapanunggal" — Klapanunggal
 *   kecamatan tetangga, bukan lokasi kantor.
 * - Koordinat dataset (-6,441819 / 106,8733653): jatuh di Cimpaeun, Tapos,
 *   DEPOK — 10,6 km dari Cileungsi Trade Center. Tidak ditampilkan.
 * - `gmaps_link`: menunjuk listing bernama "Rumah Cluster Adira" (5,0 bintang
 *   dari 2 ulasan, dilihat langsung lewat render iframe). Teks alamatnya
 *   menyalin alamat cabang, tetapi pinnya di dekat Klapanunggal, bukan di mal.
 *   Embed ini TIDAK dipasang; halaman justru memperingatkan pembaca.
 *
 * "Mall Cileungsi" = Cileungsi Trade Center (CTC): streetdirectory mencatat
 * "Cileungsi Trade Centre (Mall Cileungsi)"; hasil pencarian Foursquare
 * menempatkan "Adira Finance Cab. Cileungsi" di Cileungsi Trade Center (isi
 * halamannya terkunci login, jadi hanya dari ringkasan pencarian).
 * Metropolitan Mall Cileungsi adalah mal LAIN, 1,8 km dari CTC, di
 * Limusnunggal (Nominatim).
 *
 * Belum terverifikasi, karena itu belum ditulis: jam operasional (sumber agen
 * berbeda-beda), letak persis di dalam kompleks ("sebelah BCA" hanya dari
 * ringkasan situs agen), foto.
 */

export const CABANG = {
  nama: "Adira Finance Mall Cileungsi",
  namaDataset: "Adira Finance Mall Cileungsi - Cileungsi",
  kompleks: "Mall Cileungsi (Mal Cileungsi Indah)",
  namaPeta: "Cileungsi Trade Center",
  blok: "Blok C/15-16",
  jalan: "Jl. Raya Narogong",
  kelurahan: "Cileungsi Kidul",
  kecamatan: "Cileungsi",
  kabupaten: "Kabupaten Bogor",
  provinsi: "Jawa Barat",
  kodePos: "16820",
  telepon: ["021-82496928", "021-82496929"],
  fax: ["021-82480306", "021-82480303"],
  /** place_id Cileungsi Trade Center (dari Waze). Tautan ke MAL, bukan ke listing Adira. */
  placeIdMal: "ChIJAwLjClWUaS4R3RZKx2A2znk",
  slug: "adira-finance-mall-cileungsi",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Format Maps URLs resmi Google. Membuka kompleks mal tempat kantor berada. */
export const PETA_MAL_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Cileungsi Trade Center",
)}&query_place_id=${CABANG.placeIdMal}`;

/**
 * Tetangga dengan pin yang sehat, jarak lurus dari titik Cileungsi Trade
 * Center (Nominatim: -6,40875 / 106,96296) — BUKAN dari koordinat dataset.
 * Dikecualikan karena pin terbukti/diduga salah: kedua Cikarang, Juanda,
 * Parung Panjang.
 */
export const TETANGGA = [
  { nama: "Adira Finance Bantar Gebang", wilayah: "Kota Bekasi", km: 11.0, href: null },
  { nama: "Adira Finance Cimanggis", wilayah: "Kota Depok", km: 11.9, href: null },
  { nama: "Adira Finance Cibinong", wilayah: "Kabupaten Bogor", km: 14.6, href: null },
  { nama: "Adira Finance Jatirahayu", wilayah: "Pondok Gede, Kota Bekasi", km: 15.3, href: "/adira-finance-pondok-gede" },
] as const satisfies readonly { nama: string; wilayah: string; km: number; href: string | null }[];
