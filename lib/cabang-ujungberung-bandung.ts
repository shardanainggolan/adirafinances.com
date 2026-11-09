/**
 * Data cabang Adira Finance Ujungberung – Bandung.
 *
 * Diverifikasi 2026-11-09. Baris dataset (`branch_id=29`): alamat & telepon
 * dikuatkan sumber independen; LOKASI (pin, kecamatan, kode pos) salah.
 *
 * DIPAKAI
 * - Alamat "Jl. Raya Sukamiskin No. 118" + telepon 022-7218491 / 7217591 /
 *   7213996: ramdan.id, "Kantor Perwakilan dan Kantor Cabang Adira Finance
 *   Bandung" (URL 2019/11, tanggal tidak tercetak), entri "Kantor Cabang Adira
 *   Finance Ujung Berung — Jl. Raya Sukamiskin No. 118 Bandung", Telp
 *   022-7218491, 022-721 2547, 022-7219097, 022-7217591, 022-7217303,
 *   022-7216406, 022-7213996, 022-7213148 (dibaca langsung).
 * - Dua listing Google Maps berlabel Ujung Berung (kartu embed dirender
 *   2026-11-09, pin dari parameter !3d/!4d hasil pencarian Maps):
 *   (a) "Adira Bandung Ujung Berung" — "KOMPLEK RUKO TRITAN POINT, Cipadung
 *       Wetan, Kec. Panyileukan, Kota Bandung, Jawa Barat 40614", 3,5 (8
 *       ulasan), kategori Kantor Perusahaan, TANPA nomor telepon.
 *       −6,9301939 / 107,7118644. CID 4590726068210085422.
 *   (b) "Adira Finance (dahulu Mandala Finance) Cabang Ujung Berung" — "Ruko
 *       Nasution Square, Jl. AH. Nasution No.103 Kav. 29, RT.005/RW.001,
 *       Karang Pamulang, Kec. Mandalajati, Kota Bandung, Jawa Barat 40195",
 *       2,0 (4 ulasan), (022) 7204177. −6,9033516 / 107,6661583.
 *       CID 3883554236044521786.
 * - Merger: Kontan, 1 Juli 2025 (dibaca langsung) — "Adira Finance sebagai
 *   entitas penerima penggabungan"; "ditargetkan rampung pada 1 Oktober 2025".
 *   Tanggal efektif tidak dikutip: artikel Bisnis.com yang memuatnya 403.
 *
 * TIDAK DIPAKAI
 * - `gmaps_link` + koordinat dataset: listing "PT. Adira Dinamika Multi
 *   Finance", Kb. Lega, Bojongloa Kidul 40235, 132 ulasan — itu kantor
 *   SOEKARNO HATTA (Gedung Adira No. 380). Kode kecamatan 3273040 (Bojongloa
 *   Kidul) dan kode pos 40235 di baris ini ikut tersalin dari listing itu.
 * - Telepon/faks tambahan dataset (fax 022-7216250, 022-7219435): tidak ada
 *   di sumber lain — tidak ditampilkan.
 *
 * TIDAK DITEMUKAN
 * - Listing Google atau objek OSM di "Jl. Raya Sukamiskin No. 118"; OSM tidak
 *   punya jalan bernama Sukamiskin. Sukamiskin = kelurahan di Kec. Arcamanik
 *   (OSM "Kel. Sukamiskin" + Nominatim "Sukamiskin, Arcamanik"). Tidak ada sumber yang menyamakannya dengan Jl. AH.
 *   Nasution — halaman TIDAK mengklaim itu, dan tidak menebak apakah kantor
 *   Tritan Point adalah pindahan kantor Sukamiskin.
 *
 * Patokan: jarak lurus dari pin listing ke objek OSM (Overpass 2026-11-09).
 */

export const CABANG = {
  nama: "Adira Finance Ujungberung",
  namaDataset: "Adira Finance Ujungberung - Bandung",
  kota: "Kota Bandung",
  provinsi: "Jawa Barat",
  slug: "adira-finance-ujungberung-bandung",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

export type Lokasi = {
  kode: string;
  label: string;
  alamat: string;
  peta: string;
  telepon: string;
  sumber: string;
  nomor?: string;
};

/** Matriks bukti: satu nama, tiga alamat. */
export const TIGA_ALAMAT: readonly Lokasi[] = [
  {
    kode: "A",
    label: "Cabang Ujung Berung (direktori & data kami)",
    alamat: "Jl. Raya Sukamiskin No. 118, Bandung",
    peta: "Tidak ketemu. Belum ada listing Google di alamat ini.",
    telepon: "022-7218491, 022-7217591, 022-7213996",
    sumber: "Direktori ramdan.id (2019) dan data cabang kami",
    nomor: "022-7218491",
  },
  {
    kode: "B",
    label: "Adira Bandung Ujung Berung",
    alamat: "Komplek Ruko Tritan Point, Cipadung Wetan, Kec. Panyileukan, Kota Bandung 40614",
    peta: "Ada di Google Maps (8 ulasan)",
    telepon: "Tidak tercantum",
    sumber: "Listing Google Maps",
  },
  {
    kode: "C",
    label: "Adira Finance (dahulu Mandala Finance) Cabang Ujung Berung",
    alamat: "Ruko Nasution Square, Jl. AH. Nasution No. 103 Kav. 29, Karang Pamulang, Kec. Mandalajati, Kota Bandung 40195",
    peta: "Ada di Google Maps (4 ulasan)",
    telepon: "(022) 7204177",
    sumber: "Listing Google Maps",
    nomor: "022-7204177",
  },
];

/** Patokan per listing yang punya titik di peta. Jarak lurus, OSM. */
export const PATOKAN_TITIK: readonly {
  kode: string;
  judul: string;
  peta: string;
  patokan: readonly { nama: string; km: number; arah: string }[];
}[] = [
  {
    kode: "B",
    judul: "Tritan Point, Cipadung",
    peta: "https://maps.google.com/?cid=4590726068210085422",
    patokan: [
      { nama: "Pos satpam UIN Sunan Gunung Djati", km: 0.5, arah: "tenggara" },
      { nama: "Polsek Ujungberung", km: 1.7, arah: "barat laut" },
      { nama: "Pasar Ujungberung", km: 2.1, arah: "barat laut" },
      { nama: "Alun-alun Ujungberung", km: 2.2, arah: "barat laut" },
      { nama: "Masjid Raya Al-Jabbar", km: 2.2, arah: "barat daya" },
    ],
  },
  {
    kode: "C",
    judul: "Nasution Square, Mandalajati",
    peta: "https://maps.google.com/?cid=3883554236044521786",
    patokan: [
      { nama: "Halte depan Terminal Cicaheum", km: 1.0, arah: "barat" },
      { nama: "Pasar Cicaheum", km: 1.0, arah: "barat" },
      { nama: "Lapas Sukamiskin", km: 1.1, arah: "timur" },
      { nama: "Kantor Lurah Sukamiskin", km: 1.4, arah: "tenggara" },
    ],
  },
];

/** Jarak lurus antar-listing (km). */
export const JARAK = { bKeC: 5.9, bKeSoekarnoHatta: 12.4, cKeSoekarnoHatta: 8.7 } as const;

export const SUMBER_MERGER = "https://keuangan.kontan.co.id/news/merger-dengan-mandala-finance-ini-kata-adira-finance";
