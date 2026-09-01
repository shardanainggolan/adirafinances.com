/**
 * Tabel angsuran referensi — pinjaman dana jaminan BPKB.
 *
 * Sumber: `public/images/table-referenstatif.webp` (tabel referensi Adira).
 * Ditranskripsi dan diverifikasi ulang dari gambar pada 2026-08-31.
 *
 * Angka di sini sengaja disalin apa adanya dari sumber — JANGAN "diperbaiki"
 * secara diam-diam. Lihat `CATATAN_ANOMALI` di bawah.
 *
 * Alasan data ini ada sebagai teks, bukan hanya gambar: Google tidak dapat
 * membaca angka di dalam file .webp. Selama nominal hanya ada di gambar, kueri
 * seperti "angsuran gadai BPKB motor 5 juta" tidak akan pernah dijawab oleh
 * halaman ini.
 */

export type TabelAngsuran = {
  id: string;
  label: string;
  /** Tenor dalam bulan, urut sesuai kolom sumber. */
  tenor: number[];
  /** [pinjaman, ...angsuran per tenor] */
  baris: number[][];
};

export const TABEL_MOTOR: TabelAngsuran = {
  id: "motor",
  label: "BPKB Motor",
  tenor: [11, 17, 23, 29, 35],
  baris: [
    [3_000_000, 439_000, 319_000, 264_000, 233_000, 214_000],
    [3_500_000, 498_000, 362_000, 300_000, 265_000, 243_000],
    [4_000_000, 557_000, 405_000, 336_000, 296_000, 272_000],
    [4_500_000, 616_000, 448_000, 371_000, 328_000, 301_000],
    [5_000_000, 675_000, 491_000, 407_000, 359_000, 330_000],
    [5_500_000, 734_000, 534_000, 443_000, 391_000, 359_000],
    [6_000_000, 793_000, 578_000, 478_000, 423_000, 388_000],
    [6_500_000, 852_000, 621_000, 514_000, 454_000, 417_000],
    [7_000_000, 911_000, 664_000, 550_000, 486_000, 447_000],
    [7_500_000, 970_000, 707_000, 586_000, 518_000, 476_000],
    [8_000_000, 1_029_000, 750_000, 621_000, 549_000, 505_000],
    [8_500_000, 1_088_000, 793_000, 657_000, 581_000, 534_000],
    [9_000_000, 1_147_000, 836_000, 693_000, 612_000, 563_000],
    [9_500_000, 1_206_000, 879_000, 729_000, 644_000, 592_000],
    [10_000_000, 1_265_000, 922_000, 764_000, 676_000, 621_000],
    [10_500_000, 1_324_000, 965_000, 800_000, 707_000, 650_000],
    [11_000_000, 1_380_000, 1_005_000, 833_000, 736_000, 676_000],
    [11_500_000, 1_449_000, 1_058_000, 879_000, 778_000, 716_000],
    [12_000_000, 1_505_000, 1_098_000, 912_000, 807_000, 742_000],
    [12_500_000, 1_562_000, 1_139_000, 944_000, 835_000, 768_000],
    [13_000_000, 1_628_000, 1_189_000, 988_000, 875_000, 806_000],
    [13_500_000, 1_684_000, 1_229_000, 1_020_000, 903_000, 831_000],
    [14_000_000, 1_741_000, 1_270_000, 1_054_000, 932_000, 858_000],
    [14_500_000, 1_797_000, 1_310_000, 1_087_000, 961_000, 884_000],
    [15_000_000, 1_859_000, 1_356_000, 1_125_000, 995_000, 916_000],
    [15_500_000, 1_943_000, 1_416_000, 1_174_000, 1_038_000, 955_000],
    [16_000_000, 1_971_000, 1_436_000, 1_191_000, 1_053_000, 968_000],
    [16_500_000, 2_028_000, 1_477_000, 1_224_000, 1_081_000, 994_000],
    [17_000_000, 2_084_000, 1_517_000, 1_257_000, 1_110_000, 1_019_000],
    [17_500_000, 2_168_000, 1_577_000, 1_306_000, 1_153_000, 1_058_000],
    [18_000_000, 2_196_000, 1_598_000, 1_322_000, 1_167_000, 1_071_000],
    [18_500_000, 2_253_000, 1_638_000, 1_355_000, 1_195_000, 1_097_000],
    [19_000_000, 2_309_000, 1_678_000, 1_388_000, 1_224_000, 1_123_000],
    [19_500_000, 2_365_000, 1_719_000, 1_421_000, 1_253_000, 1_149_000],
    [20_000_000, 2_422_000, 1_759_000, 1_453_000, 1_281_000, 1_175_000],
  ],
};

export const TABEL_MOBIL: TabelAngsuran = {
  id: "mobil",
  label: "BPKB Mobil",
  tenor: [11, 23, 35, 47],
  baris: [
    [25_000_000, 2_994_000, 1_720_000, 1_300_000, 1_086_000],
    [30_000_000, 3_504_000, 1_990_000, 1_498_000, 1_245_000],
    [40_000_000, 4_525_000, 2_533_000, 1_890_000, 1_565_000],
    [50_000_000, 5_549_000, 3_075_000, 2_283_000, 1_883_000],
    [60_000_000, 6_568_000, 3_618_000, 2_677_000, 2_202_000],
    [70_000_000, 7_590_000, 4_160_000, 3_070_000, 2_521_000],
    [80_000_000, 8_612_000, 4_706_000, 3_464_000, 2_840_000],
    [90_000_000, 9_633_000, 5_245_000, 3_858_000, 3_160_000],
    [95_000_000, 10_144_000, 5_517_000, 4_054_000, 3_318_000],
    [100_000_000, 10_642_000, 5_753_000, 4_249_000, 3_481_000],
    [110_000_000, 11_664_000, 6_296_000, 4_643_000, 3_800_000],
    // ⚠️ 6.867.000 disalin apa adanya dari sumber — lihat CATATAN_ANOMALI.
    [115_000_000, 12_175_000, 6_867_000, 4_840_000, 3_959_000],
    [120_000_000, 12_725_000, 6_876_000, 5_063_000, 4_150_000],
    [125_000_000, 13_236_000, 7_149_000, 5_260_000, 4_309_000],
    [135_000_000, 14_257_000, 7_690_000, 5_656_000, 4_628_000],
    [145_000_000, 15_279_000, 8_233_000, 6_049_000, 4_948_000],
    [150_000_000, 15_790_000, 8_504_000, 6_244_000, 5_106_000],
    [155_000_000, 16_301_000, 8_777_000, 6_440_000, 5_266_000],
    [160_000_000, 16_823_000, 9_056_000, 6_656_000, 5_437_000],
    [170_000_000, 17_844_000, 9_599_000, 7_049_000, 5_757_000],
    [180_000_000, 18_866_000, 10_141_000, 7_443_000, 6_075_000],
    [190_000_000, 19_888_000, 10_684_000, 7_836_000, 6_394_000],
    [200_000_000, 20_909_000, 11_226_000, 8_230_000, 6_713_000],
  ],
};

/**
 * CATATAN_ANOMALI — perlu konfirmasi ke Adira sebelum dianggap final.
 *
 * Tabel Mobil, kolom tenor 23 bulan:
 *   110 jt -> 6.296.000
 *   115 jt -> 6.867.000   (+571.000)
 *   120 jt -> 6.876.000   (+9.000)   <-- tidak konsisten
 *   125 jt -> 7.149.000   (+273.000)
 *
 * Kenaikan tiap Rp5 juta di kolom ini ~Rp270.000, sehingga nilai 115 jt
 * semestinya sekitar Rp6.5xx.000. Pola "6.867" vs "6.876" mengesankan digit
 * tertukar di tabel sumber.
 *
 * Nilai TIDAK diubah di sini: menebak angka pada situs pinjaman lebih
 * berbahaya daripada menampilkan angka sumber apa adanya. Komponen tabel
 * menandai baris ini agar pengguna diarahkan ke simulasi resmi.
 */
export const ANOMALI_MOBIL = { pinjaman: 115_000_000, tenorIndex: 1 } as const;

/**
 * Format Rupiah tanpa desimal, mis. 1234000 -> "Rp1.234.000".
 *
 * Sengaja TIDAK memakai `Intl.NumberFormat`: keluaran ICU untuk mata uang IDR
 * berbeda antar lingkungan ("Rp1.234.000" vs "Rp 1.234.000", kadang dengan
 * spasi non-breaking). Karena komponen ini dirender di server lalu dihidrasi di
 * browser, selisih satu karakter spasi saja sudah memicu hydration mismatch.
 * Pemisah ribuan titik juga mengikuti penulisan di tabel sumber.
 */
export function rupiah(nilai: number): string {
  const digit = Math.round(Math.abs(nilai)).toString();
  const ribuan = digit.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${nilai < 0 ? "-" : ""}Rp${ribuan}`;
}
