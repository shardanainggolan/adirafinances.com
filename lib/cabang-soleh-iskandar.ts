/**
 * Data cabang Adira Finance Soleh Iskandar – Bogor ("Cabang Bogor 3").
 *
 * Diverifikasi 2026-10-07. Baris dataset (`branch_id=25`) ternyata SEBAGIAN
 * SALAH, dan halaman ini dibangun dari hasil pengecekan, bukan dari baris itu
 * mentah-mentah:
 *
 * 1. NOMOR TELEPON & FAKS di baris ini (0251-8390372, 0251-8390373,
 *    faks 0251-8384222) identik dengan baris Tajur. Sumber direktori lama
 *    yang independen (Google Sites "Adira Cabang Bogor 1-Tajur", portal-alamat
 *    2018) mencantumkan ketiganya untuk TAJUR (Bogor 1). Jadi nomor itu milik
 *    Tajur dan TIDAK dipasang untuk cabang ini.
 *    Tiga direktori bisnis (alamatpenting.com, idfirms.com, Foursquare)
 *    mencantumkan 0251-8362825 untuk "Adira Finance Bogor 3". Itu indikasi
 *    kuat, tapi bukan konfirmasi dari Adira — BELUM dipasang. Kalau pemilik
 *    sudah mengonfirmasi, isi `telepon` di bawah; halaman otomatis
 *    menampilkannya.
 *
 * 2. KOORDINAT di baris ini (-6,636304 / 106,7466496) jatuh di Sukaluyu,
 *    Tamansari, KABUPATEN Bogor (reverse geocode Nominatim) — 10,2 km dari
 *    Jl. Sholeh Iskandar di Kedung Badak. Lintangnya nyaris sama dengan Tajur
 *    (selisih 0,00018°): baris ini tampaknya dibuat dengan menyalin baris
 *    Tajur. Koordinat itu TIDAK dipakai di mana pun.
 *
 * 3. LISTING GOOGLE MAPS-nya justru konsisten. FID di `gmaps_link`
 *    (0x2e69c46b5a508161:0xbe2247bd245c5f5f) sama byte demi byte dengan
 *    place_id ChIJYYFQWmvEaS4RX19cJL1HIr4 yang dirujuk Waze untuk
 *    "Adira Finance Cabang Bogor 3". Tautan peta di halaman memakai place_id
 *    itu (format Maps URLs resmi Google), bukan koordinat.
 *
 * 4. ALAMAT diambil dari kartu listing Google Maps yang dirender embed
 *    (dilihat langsung 2026-10-07): "Jalan Sholeh Iskandar.5-6 Ruko, Kel Blok
 *    B, RT.007/RW.007, Kedungbadak, Tanah Sareal, Bogor City, West Java
 *    16164". Nomor 5-6 dikuatkan Waze. Dataset tidak punya nomor rumah; satu
 *    situs agen menulis "476-A" (tidak dipakai). RT/RW berbeda antara dataset
 *    (05/09) dan listing (007/007) — karena itu RT/RW TIDAK dicantumkan.
 *    Kode pos 16164 cocok dengan kelurahan Kedung Badak menurut OpenStreetMap.
 *    Embed itu juga menunjukkan penanda tepat di Kedung Badak, Kota Bogor
 *    utara — jadi embed `gmaps_link` layak dipakai meski koordinat
 *    simpanannya salah.
 *
 * Tidak dipakai karena tidak terverifikasi: jam operasional (sumber berbeda —
 * Sabtu tutup 11:00 vs 12:00), klaim bunga/plafon/waktu cair dari situs agen.
 */

export const CABANG = {
  nama: "Adira Finance Soleh Iskandar",
  namaDataset: "Adira Finance Soleh Iskandar - Bogor",
  /** Nama listing Google Maps, verbatim dari `gmaps_link`. Asal kata kunci "cabang bogor 3". */
  namaMaps: "Adira Finance Cabang Bogor 3",
  jalan: "Jl. Sholeh Iskandar No. 5-6",
  /** Dari listing Google Maps. RT/RW sengaja tidak disimpan — sumbernya bertentangan. */
  ruko: "Ruko Blok B",
  kelurahan: "Kedung Badak",
  kecamatan: "Tanah Sereal",
  kota: "Kota Bogor",
  provinsi: "Jawa Barat",
  kodePos: "16164",
  /** Kosong sampai pemilik mengonfirmasi. Lihat catatan nomor 1 di atas. */
  telepon: [] as readonly string[],
  placeId: "ChIJYYFQWmvEaS4RX19cJL1HIr4",
  slug: "adira-finance-soleh-iskandar",
} as const;

/** Nama badan hukum — "PT Adira Finance" bukan nama resminya. */
export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

/** Nomor-nomor yang beredar untuk cabang ini tetapi milik Tajur. */
export const NOMOR_TAJUR = ["0251-8390372", "0251-8390373"] as const;

/**
 * Tautan Google Maps lewat place_id — format Maps URLs yang didokumentasikan
 * Google (`api=1` + `query_place_id`). Membuka listing "Cabang Bogor 3" itu
 * sendiri, tidak bergantung pada koordinat dataset yang keliru.
 */
export const PETA_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Adira Finance Cabang Bogor 3",
)}&query_place_id=${CABANG.placeId}`;

/**
 * Embed dari `gmaps_link`. Penanda di dalamnya mengikuti FID listing (benar),
 * tetapi pusat pandangannya mengikuti koordinat dataset (keliru) dengan zoom
 * sangat jauh. Dipakai hanya lewat klik — lihat PetaCabang — dan diperiksa
 * visual saat verifikasi.
 */
export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126818.73590639318!2d106.74664955066585!3d-6.636304007394354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c46b5a508161%3A0xbe2247bd245c5f5f!2sAdira%20Finance%20Cabang%20Bogor%203!5e0!3m2!1sid!2sid!4v1713283702968!5m2!1sid!2sid";
