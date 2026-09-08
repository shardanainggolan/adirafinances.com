/**
 * Data cabang Adira Finance Sawangan – Depok.
 *
 * Seluruh nilai berasal dari dataset milik pemilik
 * (`public/analisis/adira-branches-full.csv`, `branch_id=23`) dan tabel
 * wilayah berkode BPS. Jarak dihitung dari koordinat pada dataset yang sama.
 * Nomor telepon yang diberikan pemilik (`02177883737`) identik dengan dataset
 * (`2177883737`) — hanya beda awalan nol.
 *
 * DUA CABANG SENGAJA TIDAK DICANTUMKAN karena datanya saling bertentangan, dan
 * yang meragukan tidak terbit:
 *
 * - "Adira Finance Juanda – Depok": alamatnya Jl. Margonda Raya No 88 A-C
 *   (sama persis dengan cabang Margonda), tetapi koordinatnya 0,86 km dari
 *   Sawangan — nyaris 4 km dari Jl. Margonda. Pinnya salah, atau ini entri
 *   ganda cabang Margonda. Menampilkannya berarti mengirim orang ke titik
 *   yang tidak ada kantornya.
 * - "Adira Finance Parung Panjang – Bogor": kecamatan dan koordinatnya
 *   menunjuk PARUNG (7,4 km dari sini), sementara namanya menunjuk Parung
 *   Panjang yang jauh di barat. Salah satu dari keduanya keliru.
 *
 * Belum terverifikasi, jadi belum ditulis: jam operasional cabang, status
 * aktif kedua nomor telepon, dan foto cabang (berkas
 * `adira-cabang-sawangan-depok-1713283334.webp` tidak ada di repo ini).
 */

export const CABANG = {
  nama: "Adira Finance Sawangan",
  namaDataset: "Adira Finance Sawangan - Depok",
  /** Nama tempat di Google Maps, dibaca dari `gmaps_link` pada dataset. */
  namaMaps: "Adira Finance Sawangan",
  jalan: "Jl. Raya Sawangan No. 32",
  kelurahan: "Rangkapan Jaya",
  kecamatan: "Pancoran Mas",
  kota: "Kota Depok",
  provinsi: "Jawa Barat",
  kodePos: "16436",
  /** Nomor kantor cabang — bukan nomor agen. Selalu diberi label pembeda. */
  telepon: ["021-77883737", "021-77885302"],
  fax: "021-77886259",
  lintang: -6.3941585,
  bujur: 106.7885129,
  slug: "adira-finance-sawangan",
} as const;

/**
 * Sebelas kecamatan Kota Depok — `sub_districts.csv`, district_id 3276.
 * Pembagian administratif, BUKAN klaim teritori layanan Adira.
 */
export const KECAMATAN_DEPOK = [
  "Sawangan",
  "Bojongsari",
  "Pancoran Mas",
  "Cipayung",
  "Sukma Jaya",
  "Cilodong",
  "Cimanggis",
  "Tapos",
  "Beji",
  "Limo",
  "Cinere",
] as const;

/** Cabang lain di Kota Depok yang datanya konsisten. Jarak lurus dari titik ini. */
export const CABANG_DEPOK = [
  { nama: "Adira Finance Margonda", kecamatan: "Beji", jalan: "Jl. Margonda No. 88 A-C, Kemiri Muka", km: 4.4 },
  { nama: "Adira Finance Cimanggis", kecamatan: "Cimanggis", jalan: "Jl. Raya Jakarta–Bogor KM 31, Cisalak", km: 8.2 },
] as const;

/** Cabang terdekat di luar Depok. "Terdekat" = fakta geografis, bukan teritori. */
export const CABANG_LUAR_DEPOK = [
  { nama: "Adira Finance Ciputat", wilayah: "Kota Tangerang Selatan", km: 9.8 },
  { nama: "Adira Finance Mall Cileungsi", wilayah: "Kabupaten Bogor", km: 10.8 },
  { nama: "Adira Finance Cibinong", wilayah: "Kabupaten Bogor", km: 10.9 },
  { nama: "Adira Finance Pondok Indah Baru", wilayah: "Kota Jakarta Selatan", km: 14.6 },
] as const;

export const PETA_URL = `https://www.google.com/maps/search/?api=1&query=${CABANG.lintang},${CABANG.bujur}`;

/** Dari kolom `gmaps_link`. Dimuat hanya setelah diklik — lihat `PetaCabang`. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.9987725589285!2d106.78851287508338!3d-6.394158462540081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e939ad12552f%3A0x6a9786c19c99498d!2sAdira%20Finance%20Sawangan!5e0!3m2!1sid!2sid!4v1713283236577!5m2!1sid!2sid";
