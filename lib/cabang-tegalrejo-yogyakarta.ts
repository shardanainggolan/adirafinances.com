/**
 * Data cabang Adira Finance Tegalrejo – Yogyakarta.
 *
 * Diverifikasi 2026-11-17. Baris dataset (`branch_id=63`).
 *
 * KANTOR COKROAMINOTO (halaman ini)
 * - Dataset: "Jl. H.O.S. Cokroaminoto No. 221 Rt. 10/04", sub_district
 *   3471140 = TEGALREJO; telp 0274-555007, 0274-555085; faks 0274-555062,
 *   0274-589859.
 * - alamatpenting.com/adira-finance-yogyakarta/ (dibaca; tanpa tanggal):
 *   "Jl. H.O.S. Cokroaminoto No. 221 Yogyakarta", "No. Telepon : 0274-555085
 *   Fax : 0274-555062". Sumber kedua untuk alamat, 555085, dan faks 555062.
 *   0274-555007 & faks 589859: dataset saja.
 * - Listing Google "ADIRA FINANCE PT." — "Jl. HOS Cokroaminoto No.232,
 *   Tegalrejo, Kec. Tegalrejo, Kota Yogyakarta 55244", tanpa ulasan, tanpa
 *   telepon. Pin −7,7823591 / 110,3523311, ChIJ7ctbZhZYei4R9iXDV1ROx84.
 *   NOMOR 232 (Google) vs 221 (dataset + direktori) — tidak bisa diputuskan;
 *   halaman menyebut keduanya.
 * - OSM: "Jalan Haji Oemar Said Cokroaminoto" (primary, dua arah) ±40 m di
 *   TIMUR pin → kantor di sisi barat; bertemu Jl. Kyai Mojo ±75 m di utara
 *   pin. Nominatim di pin: Tegalrejo, Kota Yogyakarta, 55244.
 * - ketikus.com (Athar Emil, 2 Sep 2023, dibaca): "Adira Finance, Tegalrejo —
 *   Jln. Hos Cokroaminoto, Kel Tegalrejo, Yogyakarta" (tanpa nomor/telepon).
 *
 * KANTOR ITC (embed dataset)
 * - `gmaps_link` → "ITC Adira Multi Finance PT" — "Jl. Magelang No.76, Kutu
 *   Asem, Karangwaru, Kec. Tegalrejo, Kabupaten Sleman … 55242", tanpa
 *   ulasan. Pin −7,7570283 / 110,3618779, ChIJk-dTsDhYei4Rgt1HrrwpPrc.
 *   Kode pos 55242 di dataset berasal dari listing ini. Nominatim di pin:
 *   "Sinduadi, Mlati, Sleman" — kartu dan OSM tidak sepakat soal wilayah;
 *   halaman menulis "Jl. Magelang No. 76" saja.
 * - ketikus.com 2023: "Adira Multi Finance, ITC — Jl.Magelang, Karangwaru",
 *   Kecamatan "Tegalrejo", "(0274) 623232". Satu sumber.
 * - Koordinat dataset (−7,7570283 / 110,3237691): lintang = pin ITC, bujur =
 *   pusat embed → tidak dipakai.
 *
 * LAIN-LAIN
 * - Baris Umbulharjo (64) memakai telepon & faks yang SAMA PERSIS dengan
 *   baris ini; listing Google Umbulharjo (Jl. Ipda Tut Harsono) mencantumkan
 *   (0274) 9253000 → nomor 5550xx milik Tegalrejo, tersalin ke Umbulharjo.
 * - Kantor Adira lain di Kota Yogyakarta (pencarian Maps 2026-11-17), jarak
 *   lurus dari pin Cokroaminoto: "ADIRA FINANCE" Jl. Jend. Sudirman No.42
 *   (2,0 km), "Adira Finance" Jl. Ipda Tut Harsono (4,6 km), "ADIRA FINANCE
 *   Kantor Branch Yogyakarta – Kusumanegara" Jl. Kusumanegara No.284f (5,8 km).
 *
 * Patokan: Nominatim (OSM), jarak lurus dari pin Cokroaminoto.
 */

export const CABANG = {
  nama: "Adira Finance Tegalrejo",
  namaDataset: "Adira Finance Tegalrejo - Yogyakarta",
  jalan: "Jl. H.O.S. Cokroaminoto",
  nomorData: "221",
  nomorGoogle: "232",
  kelurahan: "Tegalrejo",
  kecamatan: "Tegalrejo",
  kota: "Kota Yogyakarta",
  provinsi: "Daerah Istimewa Yogyakarta",
  kodePos: "55244",
  telepon: [
    { nomor: "0274-555085", sumber: "data kami + alamatpenting.com" },
    { nomor: "0274-555007", sumber: "data kami saja" },
  ],
  fax: "0274-555062",
  slug: "adira-finance-tegalrejo-yogyakarta",
} as const;

export const NAMA_PT = "PT Adira Dinamika Multi Finance, Tbk";

export const ITC = {
  nama: "ITC Adira Multi Finance PT",
  alamat: "Jl. Magelang No. 76",
  telepon: "(0274) 623232",
  km: 3.0,
  arah: "utara",
  peta:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("ITC Adira Multi Finance PT Jl. Magelang 76") +
    "&query_place_id=ChIJk-dTsDhYei4Rgt1HrrwpPrc",
} as const;

export const SUMBER_KETIKUS = "https://ketikus.com/adira-finance-jogja-alamat-kantor-telepon-jam-operasional/";
export const SUMBER_ALAMATPENTING = "https://alamatpenting.com/adira-finance-yogyakarta/";

/** Jarak lurus dari pin listing Cokroaminoto (Nominatim/OSM). */
export const PATOKAN: readonly { nama: string; km: number; arah: string }[] = [
  { nama: "Simpang Jl. HOS Cokroaminoto – Jl. Kyai Mojo", km: 0.08, arah: "utara" },
  { nama: "Museum Sasana Wiratama (Monumen Pangeran Diponegoro)", km: 0.47, arah: "selatan" },
  { nama: "Stasiun Yogyakarta (Tugu)", km: 1.5, arah: "tenggara" },
  { nama: "Pasar Kranggan", km: 1.5, arah: "timur" },
  { nama: "Tugu Pal Putih", km: 1.6, arah: "timur" },
  { nama: "Malioboro", km: 2.1, arah: "tenggara" },
];

const peta = (q: string, id: string) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q) + "&query_place_id=" + id;

export const KOTA_YOGYA: readonly { nama: string; alamat: string; km: number; arah: string; peta: string }[] = [
  {
    nama: "Adira Finance Jl. Jend. Sudirman",
    alamat: "Jl. Jend. Sudirman No. 42",
    km: 2.0,
    arah: "timur",
    peta: peta("ADIRA FINANCE Jl. Jend. Sudirman No.42 Yogyakarta", "ChIJcbVMpjFYei4RVnjWT-HS32Y"),
  },
  {
    nama: "Adira Finance Umbulharjo",
    alamat: "Jl. Ipda Tut Harsono",
    km: 4.6,
    arah: "timur",
    peta: peta("Adira Finance Jl. Ipda Tut Harsono Yogyakarta", "ChIJcyLkZNhZei4RCnMNPYTPgns"),
  },
  {
    nama: "Adira Finance Kusumanegara",
    alamat: "Jl. Kusumanegara No. 284F",
    km: 5.8,
    arah: "tenggara",
    peta: peta("ADIRA FINANCE Kantor Branch Yogyakarta Kusumanegara", "ChIJmQc9XWNXei4RlI5kXy984HU"),
  },
];

export const PETA_URL = peta("ADIRA FINANCE PT. Jl. HOS Cokroaminoto Yogyakarta", "ChIJ7ctbZhZYei4R9iXDV1ROx84");

export const PETA_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d110.3523311!3d-7.7823591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5816665bcbed%3A0xcec74e5457c325f6!2sADIRA%20FINANCE%20PT.!5e0!3m2!1sid!2sid!4v1763350000000!5m2!1sid!2sid";
