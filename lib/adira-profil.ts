/**
 * Profil korporat PT Adira Dinamika Multi Finance Tbk.
 *
 * SEMUA fakta di berkas ini berasal dari sumber luar dan sudah diverifikasi
 * pada 2026-08-31. Lihat `SUMBER` di bawah.
 *
 * Aturan pemeliharaan:
 * - Jangan menambah angka, penghargaan, atau capaian yang tidak ada sumbernya.
 * - Angka yang cepat basi (jumlah karyawan, jumlah outlet, aset) sengaja TIDAK
 *   dicantumkan sebagai klaim halaman. Angka begitu berubah tiap kuartal dan
 *   menjadi salah tanpa ada yang menyadarinya.
 * - Kalau menambah fakta baru, sertakan sumber dan tanggal verifikasi.
 */

export const SUMBER = [
  { label: "Wikipedia — Adira Dinamika Multi Finance", url: "https://id.wikipedia.org/wiki/Adira_Dinamika_Multi_Finance" },
  { label: "Situs resmi Adira Finance", url: "https://www.adira.co.id/" },
  { label: "Profil emiten ADMF — stockanalysis.com (data S&P Global)", url: "https://stockanalysis.com/quote/idx/ADMF/company/" },
  { label: "KSEI — efek tercatat ADMF", url: "https://web.ksei.co.id/services/registered-securities/shares/lc/ADMF" },
] as const;

/** Fakta identitas yang stabil — dipakai juga untuk JSON-LD. */
export const PROFIL = {
  namaLegal: "PT Adira Dinamika Multi Finance Tbk",
  namaUmum: "Adira Finance",
  didirikan: "13 November 1990",
  tahunDidirikan: "1990",
  mulaiBeroperasi: "1991",
  tercatatBei: "31 Maret 2004",
  kodeSaham: "ADMF",
  bursa: "Bursa Efek Indonesia (BEI)",
  induk: "PT Bank Danamon Indonesia Tbk",
  kepemilikanInduk: "92,07%",
  kepemilikanAwal: "75%",
  grup: "MUFG Group",
  regulator: "Otoritas Jasa Keuangan (OJK)",
} as const;

export type Tonggak = { tahun: string; judul: string; isi: string };

/** Kronologi — tiap butir punya tahun yang bisa ditelusuri ke sumber. */
export const TONGGAK: Tonggak[] = [
  {
    tahun: "1990",
    judul: "Perusahaan didirikan",
    isi: "PT Adira Dinamika Multi Finance didirikan pada 13 November 1990 sebagai perusahaan pembiayaan.",
  },
  {
    tahun: "1991",
    judul: "Mulai beroperasi",
    isi: "Kegiatan usaha pembiayaan resmi dimulai.",
  },
  {
    tahun: "2004",
    judul: "Tercatat di Bursa Efek Indonesia",
    isi: "Saham dicatatkan pada 31 Maret 2004 dengan kode ADMF. Bank Danamon menjadi pemegang saham mayoritas dengan kepemilikan 75%.",
  },
  {
    tahun: "2012",
    judul: "Adira Finance Syariah",
    isi: "Pada 15 Juni 2012 diperkenalkan pembiayaan berprinsip syariah, antara lain dengan akad murabahah dan Bai wal Istijar.",
  },
  {
    tahun: "2015",
    judul: "Perluasan jenis pembiayaan",
    isi: "Pembiayaan perlengkapan rumah tangga dan fasilitas dana multiguna untuk kebutuhan kesehatan, pendidikan, dan perjalanan mulai ditawarkan.",
  },
  {
    tahun: "2017",
    judul: "Masuk ke kanal digital",
    isi: "Peluncuran dicicilaja.com dan momobil.id sebagai kanal pembiayaan dan jual beli kendaraan secara daring.",
  },
  {
    tahun: "2018",
    judul: "momotor.id",
    isi: "Kanal daring untuk sepeda motor melengkapi momobil.id.",
  },
  {
    tahun: "2020",
    judul: "Aplikasi Adiraku",
    isi: "Diluncurkan pada 20 Februari 2020 sebagai kanal layanan digital bagi konsumen.",
  },
];

export type Layanan = { judul: string; isi: string };

/** Lini pembiayaan Adira Finance — lebih luas daripada yang ditangani situs ini. */
export const LINI_PEMBIAYAAN: Layanan[] = [
  {
    judul: "Pembiayaan mobil dan sepeda motor",
    isi: "Kendaraan baru maupun bekas, untuk kebutuhan pribadi maupun usaha.",
  },
  {
    judul: "Dana multiguna dengan jaminan BPKB",
    isi: "Pencairan dana dengan BPKB kendaraan sebagai jaminan, sementara kendaraan tetap dipakai pemiliknya. Inilah lini yang ditangani situs ini.",
  },
  {
    judul: "Pembiayaan syariah",
    isi: "Pembiayaan kendaraan dan kebutuhan lain berdasarkan prinsip syariah, termasuk paket umrah dan haji.",
  },
  {
    judul: "Pembiayaan barang durables",
    isi: "Perlengkapan rumah tangga dan barang elektronik.",
  },
];
