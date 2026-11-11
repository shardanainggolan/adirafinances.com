/**
 * Data cabang Adira Finance Langkai – Palangka Raya.
 *
 * Diverifikasi 2026-11-11. Baris dataset (`branch_id=121`). BUKTI LEMAH —
 * pemilik memilih "buat dengan pengungkapan jujur" (2026-11-11).
 *
 * YANG ADA
 * - Alamat "Jl. RTA. Milono Km. 4,3 Rt.04 / RW 13" (dataset). Dikuatkan
 *   idalamat.com (dibaca langsung): "Adira Finance — palangkaraya (Jl RTA
 *   Milono), Palangka Raya, Kalimantan Tengah 73111", TANPA telepon, tanpa
 *   peta, tanpa tanggal.
 * - OSM/Nominatim: "Jalan Raden Tumenggung Ario Milono, Langkai, Palangka
 *   Raya" — jalan ini melintasi Kelurahan Langkai. Ruasnya tercatat dengan
 *   dua kode pos (73111 dan 74874) → kode pos tidak ditampilkan.
 * - sub_district 6271010 = PAHANDUT.
 *
 * YANG TIDAK BISA DIPASTIKAN
 * - Telepon 0536-3223701: hanya dataset + situs agen yang menyalinnya.
 * - Listing Google: place id di `gmaps_link` (0x2dfcb2cdc7b2d3d9:
 *   0x74d58fd1176e0f0c) tidak menampilkan kartu di embed (embed Mandala yang
 *   dibangun sama persis menampilkan kartunya). CATATAN: tes `?cid=` TIDAK
 *   andal — CID Mandala yang jelas ada pun tidak dialihkan. Pencarian Maps "Adira Finance
 *   Palangkaraya", "Adira Kalimantan Tengah", dll. (2026-11-11) tidak
 *   memunculkan kantor Adira di Kota Palangka Raya.
 * - Koordinat dataset = pusat embed (Jl. G. Obos), ±3,7 km dari pusat Kel.
 *   Langkai → tidak dipakai. Posisi Km 4,3 tidak bisa dipetakan → tanpa peta.
 *
 * RENCANA B
 * - Listing "PT MANDALA MULTIFINANCE Tbk CABANG KALIMANTAN TENGAH KOTA
 *   PALANGKARAYA" — "Depan Polda Kalteng, Jl. Cilik Riwut No.Km 1,
 *   RT.002/RW.003, Palangka, Kec. Jekan Raya, Kota Palangka Raya, Kalimantan
 *   Tengah 74874", 4,2 (36 ulasan); telepon di hasil pencarian Maps
 *   0812-5583-7259. Pin −2,2013651 / 113,9132118, CID 10241242782639893892.
 *   Polda Kalteng (Nominatim) 0,18 km.
 * - Merger: Kontan 1 Juli 2025 — Adira "entitas penerima penggabungan",
 *   target rampung 1 Okt 2025. Halaman TIDAK mengklaim kantor Mandala ini
 *   memproses pengajuan Adira.
 * - "Adira Finance" Kasongan (Katingan): pin −1,9191984 / 113,3773612 (=
 *   dataset baris 297), CID 694323814935899700, ±70 km dari Langkai.
 */

export const CABANG = {
  nama: "Adira Finance Langkai",
  namaDataset: "Adira Finance Langkai - Palangkaraya",
  jalan: "Jl. RTA Milono Km 4,3",
  rtRw: "RT 04/RW 13",
  kelurahan: "Langkai",
  kecamatan: "Pahandut",
  kota: "Kota Palangka Raya",
  provinsi: "Kalimantan Tengah",
  telepon: "0536-3223701",
  slug: "adira-finance-langkai-palangkaraya",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

export const STATUS: readonly { hal: string; pasti: boolean; isi: string }[] = [
  {
    hal: "Alamat",
    pasti: true,
    isi: "Jl. RTA Milono Km 4,3 tercatat di data cabang kami dan di direktori idalamat.com.",
  },
  {
    hal: "Nama jalan",
    pasti: true,
    isi: "RTA kepanjangan dari Raden Tumenggung Ario. Di OpenStreetMap jalan ini melintasi Kelurahan Langkai.",
  },
  {
    hal: "Telepon",
    pasti: false,
    isi: "0536-3223701 hanya ada di data cabang kami dan situs-situs yang menyalinnya. Belum ada sumber lain.",
  },
  {
    hal: "Listing Google Maps",
    pasti: false,
    isi: "Listing yang dulu tercatat untuk kantor ini sudah tidak muncul. Kami juga tidak menemukan listing Adira lain di Kota Palangka Raya.",
  },
];

export const NASKAH: readonly { tanya: string; alasan: string }[] = [
  {
    tanya: "\"Apakah kantor Adira di Jl. RTA Milono Km 4,3 masih buka?\"",
    alasan: "Pertanyaan paling penting. Listing Google-nya hilang, jadi kantor ini bisa saja sudah pindah.",
  },
  {
    tanya: "\"Kalau sudah pindah, alamat barunya di mana?\"",
    alasan: "Minta alamat lengkap sampai nomor atau patokannya. Jangan hanya nama jalan.",
  },
  {
    tanya: "\"Saya mau gadai BPKB motor (atau mobil). Berkas apa yang perlu saya siapkan?\"",
    alasan: "Supaya tidak bolak-balik. Untuk mobil, biasanya NPWP ikut diminta.",
  },
  {
    tanya: "\"Survei kendaraannya di rumah atau saya bawa ke kantor?\"",
    alasan: "Jawabannya menentukan kapan Anda benar-benar perlu datang.",
  },
];

export const MANDALA = {
  nama: "PT Mandala Multifinance Tbk Cabang Kalimantan Tengah Kota Palangkaraya",
  alamat: "Depan Polda Kalteng, Jl. Cilik Riwut Km 1, Palangka, Kec. Jekan Raya",
  telepon: "0812-5583-7259",
  ulasan: 36,
  kmDariLangkai: 3.2,
  peta:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("PT MANDALA MULTIFINANCE Tbk CABANG KALIMANTAN TENGAH KOTA PALANGKARAYA"),
} as const;

export const KASONGAN = {
  nama: "Adira Finance Kasongan",
  tempat: "Kasongan, Kabupaten Katingan",
  km: 70,
  peta: "https://www.google.com/maps/search/?api=1&query=Adira%20Finance%20Kasongan&query_place_id=ChIJ_RmPTiEe_S0RNC5ZvNS7ogk",
} as const;

export const SUMBER_MERGER = "https://keuangan.kontan.co.id/news/merger-dengan-mandala-finance-ini-kata-adira-finance";
