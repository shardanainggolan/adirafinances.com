/**
 * Data cabang Adira Finance Soekarno Hatta – Bandung.
 *
 * Diverifikasi 2026-10-27. Baris dataset (`branch_id=27`): alamat benar,
 * TELEPON, KOORDINAT, KODE POS dan `gmaps_link` bermasalah.
 *
 * DIPAKAI
 * - Alamat Gedung Adira, Jl. Soekarno-Hatta No. 380, Kebon Lega, Kec.
 *   Bojongloa Kidul — sama di dataset, listing Maps, dan direktori.
 * - Telepon 022-5210766: tiga sumber independen — ramdan.id (2019, "Jl.
 *   Soekarno Hatta No. 380 … Telp: 022-5210766, 022-5224430"), Waze (place
 *   "Adira Finance Soekarno Hatta, 380 Soekarno-Hatta"), alamatpenting.com
 *   ("Adira Finance Bandung 1 (Non Honda)", faks 022-5210796).
 *   022-5224430: ramdan.id. Faks 022-5229716: kolom fax2 dataset + direktori.
 * - Titik lokasi: pusat embed listing "ATM DANAMON BANDUNG ADIRA SOEKARNO
 *   HATTA" (ATM di dalam Gedung Adira; 27 ulasan) — -6,9479092 / 107,6013091;
 *   Nominatim: "Jalan Soekarno-Hatta, Kebonlega, Bojongloa Kidul, 40235".
 *
 * TIDAK DIPAKAI
 * - Telepon 022-88882452 dan faks 022-88882594: IDENTIK dengan baris Adira
 *   Jaksanaranata – Baleendah (branch_id 33); ramdan.id 2019 mencatat
 *   022-88882452 sebagai nomor kantor Baleendah. Tersalin. Halaman memberi
 *   tahu pembaca.
 * - Koordinat dataset (-6,947873 / 107,5632042): Cigondewah Rahayu, Bandung
 *   Kulon — ±4 km di barat.
 * - Kode pos 40112 (dataset & teks listing ATM): Nominatim di titik itu 40235.
 *   Kode pos tidak ditampilkan.
 * - `gmaps_link` sebagai peta kantor: itu listing ATM, bukan kantor; tidak
 *   disematkan.
 *
 * Jalan Soekarno-Hatta (OSM, ways bernama persis "Jalan Soekarno-Hatta"):
 * bentang timur-barat ±15,7 km, dari Cibuntu (Bandung Kulon) sampai Cipadung
 * Kidul (Panyileukan). Kantor ±3,0 km dari ujung barat. Terminal Leuwipanjang
 * ±2,2 km dari ujung barat.
 *
 * Kantor lain di Kota Bandung pada dataset — pin Ujungberung (jatuh di Jl.
 * Soekarno-Hatta, Kebonlega, ±0,3 km dari kantor ini), Setiabudi (Bandung
 * Barat, 32,9 km) dan Pasir Koja (Babakan Ciparay, tak cocok alamat; listing
 * "Superland") SALAH — jarak tidak ditampilkan. Pungkur benar (2,3 km).
 */

export const CABANG = {
  nama: "Adira Finance Soekarno Hatta",
  namaDataset: "Adira Finance Soekarno Hatta - Bandung",
  gedung: "Gedung Adira",
  jalan: "Jl. Soekarno-Hatta No. 380",
  kelurahan: "Kebon Lega",
  kecamatan: "Bojongloa Kidul",
  kota: "Kota Bandung",
  provinsi: "Jawa Barat",
  telepon: ["022-5210766", "022-5224430"],
  fax: "022-5229716",
  slug: "adira-finance-soekarno-hatta-bandung",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Penggaris Jalan Soekarno-Hatta: posisi km dari ujung barat (komponen timur-barat, OSM). */
export const PANJANG_JALAN_KM = 15.7;
export const PENGGARIS: readonly { nama: string; km: number; kantor?: true }[] = [
  { nama: "Ujung barat (Cibuntu)", km: 0 },
  { nama: "Terminal Leuwipanjang", km: 2.2 },
  { nama: "Gedung Adira No. 380", km: 3.0, kantor: true },
  { nama: "Ujung timur (Cipadung Kidul)", km: 15.7 },
];

/** Patokan, jarak lurus dari titik listing; OSM/Nominatim. */
export const PATOKAN: readonly { nama: string; km: number; arah: string; catatan?: string }[] = [
  { nama: "Terminal Leuwipanjang", km: 0.81, arah: "barat", catatan: "SAMSAT Leuwipanjang ada di kompleks yang sama" },
  { nama: "Kantor Telkom Tegalega", km: 0.82, arah: "timur" },
  { nama: "Pasar Kembar Mas", km: 0.89, arah: "timur" },
  { nama: "Museum Sri Baduga", km: 1.16, arah: "utara" },
  { nama: "Taman Tegalega", km: 1.51, arah: "utara" },
  { nama: "TVRI Jawa Barat", km: 1.53, arah: "barat daya" },
  { nama: "Alun-Alun Kota Bandung", km: 2.99, arah: "utara" },
];

/**
 * Lima kantor Adira di Kota Bandung pada dataset. `km` hanya diisi bila pin
 * dataset jatuh di alamatnya. Alamat Setiabudi: dataset "Jl. Peta No.156",
 * ramdan.id 2019 "Jl. Setiabudi No.206" — ditulis keduanya.
 */
export const KOTA_BANDUNG: readonly { nama: string; alamat: string; km: number | null; ini?: true }[] = [
  { nama: "Adira Finance Soekarno Hatta", alamat: "Jl. Soekarno-Hatta No. 380, Bojongloa Kidul", km: null, ini: true },
  { nama: "Adira Finance Pungkur", alamat: "Jl. Pungkur No. 117, Regol", km: 2.3 },
  { nama: "Adira Finance Pasir Koja", alamat: "Jl. Terusan Pasirkoja, Astanaanyar", km: null },
  { nama: "Adira Finance Ujungberung", alamat: "Jl. Raya Sukamiskin No. 118", km: null },
  { nama: "Adira Finance Setiabudi", alamat: "Jl. Peta No. 156 (data kami) / Jl. Setiabudi No. 206 (direktori 2019)", km: null },
];

/** Kantor-kantor lain bernama "Soekarno Hatta" di dataset. */
export const SOEKARNO_HATTA_LAIN = ["Semarang", "Kendal", "Pasuruan", "Palu", "Malili (Luwu Timur)"] as const;

export const BALEENDAH = { nama: "Adira Finance Jaksanaranata – Baleendah", km: 6.5 } as const;

/** Membuka tempat ATM di Gedung Adira — gedungnya sama; bukan listing kantor. */
export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Gedung Adira, Jl. Soekarno-Hatta No.380, Kebon Lega, Bandung");
