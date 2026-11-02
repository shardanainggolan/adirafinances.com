/**
 * Data cabang Adira Finance MT. Haryono – Kota Semarang.
 *
 * Diverifikasi 2026-11-02. Baris dataset (`branch_id=49`): alamat benar,
 * TELEPON salah.
 *
 * - Kartu listing Google Maps (render iframe dari `gmaps_link`): "Adira
 *   Finance", "Jl. MT. Haryono No.657a, Wonodri, Kec. Semarang Selatan, Kota
 *   Semarang, Jawa Tengah 50242", 387 ulasan.
 * - Titik LISTING (tautan "@"): -6,9969466 / 110,4318179. Koordinat dataset =
 *   pusat embed, tidak dipakai (SKILL.md §8).
 * - Telepon dataset 0294-571013: kode 0294 bukan Semarang (024), dan nomor
 *   yang sama ada di baris Soekarno Hatta – Kendal (branch_id 50, baris tepat
 *   di bawahnya). Tersalin; TIDAK dipakai.
 * - Telepon 024-8318866, faks 024-8416800: alamatpenting.com ("Adira Finance
 *   Semarang 1 – Jl. Mt. Haryono", "Jl. MT. Haryono 657 A Semarang"; halaman
 *   tanpa tanggal, dibaca langsung). Hasil pencarian juga mengaitkan nomor itu
 *   dengan polomap dan listing lama, tetapi halaman itu tak bisa dibuka; halaman
 *   Waze yang dibuka tidak menampilkan nomor. Jadi satu sumber terbaca — halaman
 *   menulisnya dengan keterangan itu dan pemilik diminta konfirmasi.
 *
 * Arah jalan (geometri + tag `oneway` OSM, 2026-11-02; cocok dengan panah di
 * peta Google):
 * - Jl. MT. Haryono di depan kantor: satu arah ke UTARA, dari titik temu ±440 m
 *   di selatan kantor. Titik kantor 22 m di barat jalan → sisi kiri.
 * - Jl. Kompol Maksum: satu arah ke SELATAN, sejajar ±200 m di timur, berujung
 *   di titik temu yang sama; ada ruas sambungan (trunk_link) dari sana ke
 *   MT. Haryono arah utara.
 * - Selatan titik temu: MT. Haryono dua jalur terpisah.
 * - Google memberi label "Jl. Mataram" untuk ruas di utara Jl. Siwalan; OSM
 *   tetap menamainya MT. Haryono.
 *
 * Tidak dipakai: jam operasional (situs agen), nomor HP agen lain, rating.
 */

export const CABANG = {
  nama: "Adira Finance MT. Haryono",
  namaDataset: "Adira Finance MT. Haryono - Semarang",
  namaMaps: "Adira Finance",
  namaDirektori: "Adira Finance Semarang 1",
  jalan: "Jl. MT. Haryono No. 657A",
  kelurahan: "Wonodri",
  kecamatan: "Semarang Selatan",
  kota: "Kota Semarang",
  provinsi: "Jawa Tengah",
  kodePos: "50242",
  telepon: "024-8318866",
  fax: "024-8416800",
  teleponSalah: "0294-571013",
  slug: "adira-finance-mt-haryono-semarang",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Jarak lurus dari titik listing; posisi dari OSM/Nominatim. */
export const PATOKAN: readonly { nama: string; km: number; arah: string }[] = [
  { nama: "PT Taspen", km: 0.13, arah: "tenggara" },
  { nama: "Ombudsman RI", km: 0.14, arah: "barat laut" },
  { nama: "Politeknik Ilmu Pelayaran", km: 0.34, arah: "barat" },
  { nama: "Siloam Hospitals Semarang", km: 0.34, arah: "tenggara, di Jl. Kompol Maksum" },
  { nama: "Pasar Wonodri", km: 0.59, arah: "selatan" },
  { nama: "Simpang Lima", km: 1.24, arah: "barat laut" },
  { nama: "Lawang Sewu", km: 2.73, arah: "barat laut" },
  { nama: "Stasiun Semarang Poncol", km: 3.26, arah: "barat laut" },
  { nama: "Stasiun Semarang Tawang", km: 3.64, arah: "utara" },
];

/** Kantor Adira lain; jarak lurus. Kendal & Salatiga dari titik listing, sisanya dari titik street view dataset. */
export const TETANGGA: readonly { nama: string; wilayah: string; km: number }[] = [
  { nama: "Adira Finance Soekarno Hatta", wilayah: "Jl. Supriyadi, Kalicari, Kota Semarang", km: 2.7 },
  { nama: "Adira Finance Demak", wilayah: "Kabupaten Demak", km: 24.3 },
  { nama: "Adira Finance Soekarno Hatta", wilayah: "Kabupaten Kendal", km: 27.4 },
  { nama: "Adira Finance Ambarawa", wilayah: "Kabupaten Semarang", km: 29.0 },
  { nama: "Adira Finance Osamaliki", wilayah: "Kota Salatiga", km: 37.8 },
];

export const MT_HARYONO_LAIN = ["Sintang", "Bone", "Purbalingga"] as const;

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Adira Finance, Jl. MT. Haryono No.657a, Wonodri, Semarang");

/** Dari `gmaps_link` — listing terverifikasi benar. */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1042652463047!2d110.42922880947441!3d-6.997000968497054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708d07375bec25%3A0x1251faa06a20a3de!2sAdira%20Finance!5e0!3m2!1sid!2sid!4v1713325185624!5m2!1sid!2sid";
