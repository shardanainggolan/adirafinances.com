/**
 * Data cabang Adira Finance Tajur – Bogor.
 *
 * Seluruh nilai berasal dari dataset milik pemilik
 * (`public/analisis/adira-branches-full.csv`, `branch_id=24`) dan tabel wilayah
 * berkode BPS. Baris yang diberikan pemilik pada 2026-09-16 cocok seluruhnya
 * dengan dataset. (Kolom `description` di baris itu masih berbunyi
 * "Pasar Baru - Tangerang" — sisa salin-tempel di database; tidak dipakai di
 * sini karena deskripsi cetakan memang tidak pernah dipakai.)
 *
 * Nama pin di Google Maps, verbatim dari `gmaps_link`:
 * "Kredit Adira finance bogor 1 - marketing". Tidak menyebut Tajur. Kata
 * "bogor 1" dan "marketing" TIDAK ditafsirkan di halaman — tidak ada sumber
 * yang menjelaskannya.
 *
 * Korroborasi OSM (2026-09-16): jalan trunk terdekat dari titik cabang adalah
 * "Jalan Raya Bogor - Sukabumi" pada 0,42 km — Jl. Raya Tajur bagian dari
 * koridor itu. Pencarian nama tempat lain tidak dijalankan.
 *
 * Belum terverifikasi, karena itu belum ditulis: jam operasional, status aktif
 * nomor telepon/faks, foto cabang.
 */

export const CABANG = {
  nama: "Adira Finance Tajur",
  namaDataset: "Adira Finance Tajur - Bogor",
  /** Nama pin di Google Maps, verbatim dari `gmaps_link`. */
  namaMaps: "Kredit Adira finance bogor 1 - marketing",
  jalan: "Jl. Raya Tajur No. 162E",
  rtRw: "RT.01/RW.06",
  kelurahan: "Pakuan",
  kecamatan: "Bogor Selatan",
  kota: "Kota Bogor",
  provinsi: "Jawa Barat",
  kodePos: "16134",
  /** Nomor kantor cabang — bukan nomor agen. */
  telepon: ["0251-8390372", "0251-8390373"],
  fax: "0251-8384222",
  lintang: -6.6364867,
  bujur: 106.8264765,
  /** Dari OSM: trunk road terdekat, 0,42 km. */
  koridor: "Jalan Raya Bogor – Sukabumi",
  slug: "adira-finance-tajur",
} as const;

/** Enam kecamatan Kota Bogor — `sub_districts.csv`, district_id 3271. Administratif, bukan teritori Adira. */
export const KECAMATAN_KOTA_BOGOR = [
  "Bogor Selatan",
  "Bogor Timur",
  "Bogor Utara",
  "Bogor Tengah",
  "Bogor Barat",
  "Tanah Sereal",
] as const;

/**
 * Cabang lain yang namanya memuat "Bogor", dipilah menurut wilayah
 * administratifnya. Inilah inti kebingungannya: hanya satu yang sekota.
 * Jarak lurus dari titik Tajur.
 *
 * "Parung Panjang – Bogor" (25,3 km) sengaja tidak dicantumkan: kecamatan dan
 * koordinatnya menunjuk Parung, namanya menunjuk tempat lain — data yang saling
 * bertentangan tidak diterbitkan.
 */
export const DI_KOTA_BOGOR = [
  { nama: "Adira Finance Soleh Iskandar", kecamatan: "Tanah Sereal", km: 8.8 },
] as const;

export const DI_KABUPATEN_BOGOR = [
  { nama: "Adira Finance Cibinong", kecamatan: "Cibinong", km: 18.4 },
  { nama: "Adira Finance Leuwiliang", kecamatan: "Cibungbulang", km: 20.8 },
  { nama: "Adira Finance Mall Cileungsi", kecamatan: "Cibinong", km: 22.3 },
] as const;

/** Arah Sukabumi, mengikuti koridor jalan yang sama. */
export const ARAH_SUKABUMI = { nama: "Adira Finance Cicurug", wilayah: "Kabupaten Sukabumi", km: 24.7 } as const;

export const PETA_URL = `https://www.google.com/maps/search/?api=1&query=${CABANG.lintang},${CABANG.bujur}`;

/** Dari kolom `gmaps_link`. Dimuat hanya setelah diklik — lihat `PetaCabang`. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.084027112942!2d106.8264764750865!3d-6.6364866648761005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c8af8300001d%3A0x95db940fdfa06132!2sKredit%20Adira%20finance%20bogor%201%20-%20marketing!5e0!3m2!1sid!2sid!4v1713283487280!5m2!1sid!2sid";
