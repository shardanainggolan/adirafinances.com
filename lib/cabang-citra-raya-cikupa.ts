/**
 * Data cabang Adira Finance Citra Raya – Cikupa.
 *
 * Diverifikasi 2026-11-20. Baris dataset (`branch_id=5`): alamat & telepon
 * benar; koordinat = pusat embed.
 *
 * DIPAKAI
 * - Listing Google "Adira Finance Cikupa" (= `gmaps_link`) — kartu embed:
 *   "Perumahan, Jl. Citra Raya Boulevard Raya Citra Raya Blok L 01 / 15 R,
 *   Cikupa, Kec. Cikupa, Kabupaten Tangerang, Banten 15710", 3,0 (109
 *   ulasan). Pin −6,2409196 / 106,5243376, ChIJrUYrOVsHQi4RuJIojG4Kn0k.
 * - Telepon 021-59400382 (dataset) dikuatkan opencorpdata.com untuk place id
 *   yang sama ("(021) 59400382", dibaca) dan Google Sites "Adira cabang
 *   Cikupa-Citra Raya" (bpkbtangerang, dibaca: "Phone : 021-59400382").
 *   Jam buka opencorpdata "08.00–04.00" janggal → tidak dipakai.
 * - OSM: "Jalan Citra Raya Boulevard" = dua jalur satu arah (secondary):
 *   jalur ke SELATAN ±26 m di barat pin, ke UTARA ±45 m di barat pin. Panah
 *   pada peta Google yang dirender COCOK (jalur timur ↓, jalur barat ↑) →
 *   kantor di sisi timur, di kiri bagi yang datang dari utara. Kantor di
 *   mulut Jl. Lenso 2 (OSM ±38 m timur). Nominatim di pin: Citra Raya
 *   Tangerang, Cikupa, 15710.
 * - Patokan: Overpass (named POI, radius 2,5 km), jarak lurus dari pin.
 *   Mal Ciputra Tangerang (Jl. Citra Raya Boulevard) menurut Nominatim
 *   berada di Ciakar, Kec. PANONGAN — Citra Raya melintasi dua kecamatan.
 *
 * TIDAK DIPAKAI
 * - Koordinat dataset −6,2349148 / 106,5155256: pusat embed, ±1,2 km.
 * - Nomor tambahan 59400568/59400667/59400301: hanya di ringkasan pencarian
 *   (panggon) → tidak dikutip.
 */

export const CABANG = {
  nama: "Adira Finance Citra Raya",
  namaDataset: "Adira Finance Citra Raya - Cikupa",
  namaMaps: "Adira Finance Cikupa",
  blok: "Blok L 01/15 R",
  jalan: "Boulevard Raya Citra Raya",
  perumahan: "Perumahan Citra Raya",
  kecamatan: "Cikupa",
  kabupaten: "Kabupaten Tangerang",
  provinsi: "Banten",
  kodePos: "15710",
  telepon: "021-59400382",
  ulasan: 109,
  slug: "adira-finance-citra-raya-cikupa",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Tangga utara → selatan (km negatif = utara). Jarak lurus dari pin, OSM. */
export const TANGGA: readonly { nama: string; km: number; kecamatan?: string; ini?: true }[] = [
  { nama: "Hypermart Citra Raya", km: -1.3 },
  { nama: "Terminal Bus Trans Citraraya", km: -1.0 },
  { nama: "Superindo Citra Raya", km: -0.27 },
  { nama: "Adira Finance Citra Raya", km: 0, kecamatan: "Kec. Cikupa", ini: true },
  { nama: "Ciputra Hospital Tangerang", km: 1.0 },
  { nama: "Eco Plaza", km: 1.05 },
  { nama: "Mal Ciputra Tangerang", km: 2.26, kecamatan: "Kec. Panongan" },
];

export const PETA_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Adira Finance Cikupa Citra Raya") +
  "&query_place_id=ChIJrUYrOVsHQi4RuJIojG4Kn0k";

export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d106.5243376!3d-6.2409196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e42075b392b46ad%3A0x499f0a6e8c2892b8!2sAdira%20Finance%20Cikupa!5e0!3m2!1sid!2sid!4v1763600000000!5m2!1sid!2sid";
