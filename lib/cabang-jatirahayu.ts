/**
 * Data cabang Adira Finance Jatirahayu – Pondok Gede.
 *
 * Seluruh nilai berasal dari dataset milik pemilik
 * (`public/analisis/adira-branches-full.csv`, `branch_id=12`) dan tabel wilayah
 * berkode BPS. Baris yang diberikan pemilik pada 2026-09-21 cocok seluruhnya
 * dengan dataset — termasuk kolom `description`-nya, yang kali ini sudah benar
 * menyebut cabang ini (dua baris sebelumnya, Tajur dan Tebet, masih tertulis
 * "Pasar Baru - Tangerang").
 *
 * Inti halaman ini ada pada satu fakta yang bisa diperiksa: Kota Bekasi punya
 * kecamatan PONDOKGEDE (kode 3275010) DAN kecamatan PONDOKMELATI (3275012).
 * Kantor ini ada di Pondok Melati, kelurahan Jatirahayu — bukan di kecamatan
 * yang jadi namanya. Keduanya bertetangga, dan keduanya benar: "Pondok Gede"
 * pada nama cabang merujuk kawasannya, bukan kecamatannya.
 *
 * Nama pin di Google Maps, verbatim dari `gmaps_link`: "Adira finance gadai
 * bpkb" — bukan nama cabang, melainkan keterangan layanan.
 *
 * Data kontak memang minim: SATU nomor telepon, tanpa faks sama sekali. Itu
 * apa adanya dari dataset, bukan kelalaian.
 *
 * Belum terverifikasi, karena itu belum ditulis: jam operasional, status aktif
 * nomor telepon, foto cabang, nomor blok ruko seperti tertera di lapangan.
 */

export const CABANG = {
  nama: "Adira Finance Pondok Gede",
  namaDataset: "Adira Finance Jatirahayu - Pondok Gede",
  /** Nama pin di Google Maps, verbatim. Berupa keterangan layanan, bukan nama. */
  namaMaps: "Adira finance gadai bpkb",
  jalan: "Jl. Raya Hankam No. 60",
  bentuk: "ruko",
  rtRw: "RT.005/RW.002",
  kelurahan: "Jatirahayu",
  kecamatan: "Pondok Melati",
  /** Kecamatan tetangga yang namanya dipakai cabang ini. */
  kecamatanTetangga: "Pondok Gede",
  kota: "Kota Bekasi",
  provinsi: "Jawa Barat",
  kodePos: "17414",
  /** Satu nomor, tanpa faks — memang begitu di dataset. */
  telepon: "021-84995340",
  lintang: -6.2885743,
  bujur: 106.896083,
  slug: "adira-finance-pondok-gede",
} as const;

/** Dua belas kecamatan Kota Bekasi — `sub_districts.csv`, district_id 3275. Administratif, bukan teritori Adira. */
export const KECAMATAN_KOTA_BEKASI = [
  "Pondok Gede",
  "Jatisampurna",
  "Pondok Melati",
  "Jatiasih",
  "Bantargebang",
  "Mustikajaya",
  "Bekasi Timur",
  "Rawalumbu",
  "Bekasi Selatan",
  "Bekasi Barat",
  "Medan Satria",
  "Bekasi Utara",
] as const;

/** Dua kantor Adira lain di Kota Bekasi. Jarak lurus dari titik ini. */
export const DI_KOTA_BEKASI = [
  { nama: "Adira Finance Bantar Gebang", kecamatan: "Bantargebang", km: 10.4 },
  { nama: "Adira Finance Harapan Indah", kecamatan: "Medan Satria", km: 14.8 },
] as const;

/**
 * Cabang terdekat justru menyeberang provinsi: Tebet, DKI Jakarta, 8,3 km —
 * lebih dekat daripada dua kantor yang sekota. Halamannya sudah ada, jadi
 * ditautkan.
 */
export const TERDEKAT_LINTAS_PROVINSI = {
  nama: "Adira Finance Tebet",
  wilayah: "Jakarta Selatan, DKI Jakarta",
  km: 8.3,
  href: "/adira-finance-tebet",
} as const;

/** Tetangga di Depok, untuk pembaca dari arah selatan. */
export const ARAH_DEPOK = { nama: "Adira Finance Cimanggis", wilayah: "Kota Depok", km: 10.4 } as const;

/**
 * Entri "Adira Finance Sentra Cikarang" muncul lagi — 11,0 km dari sini —
 * padahal koordinatnya sudah terbukti keliru: nama, alamat, dan kecamatannya
 * menunjuk Cikarang Selatan, tetapi titiknya 19 km dari cabang Cikarang lain
 * yang sekecamatan. Tidak dimasukkan ke daftar mana pun. Anomali yang sama
 * sudah dicatat pada halaman Ciputat dan Tebet.
 */
export const ANOMALI_CIKARANG = { nama: "Adira Finance Sentra Cikarang", kmSemu: 11.0 } as const;

export const PETA_URL = `https://www.google.com/maps/search/?api=1&query=${CABANG.lintang},${CABANG.bujur}`;

/** Dari kolom `gmaps_link`. Dimuat hanya setelah diklik — lihat `PetaCabang`. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15863.24343708512!2d106.89608298715818!3d-6.288574299999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d1f20064351%3A0xe554ea2e55a4bf3e!2sAdira%20finance%20gadai%20bpkb!5e0!3m2!1sid!2sid!4v1713275863768!5m2!1sid!2sid";
