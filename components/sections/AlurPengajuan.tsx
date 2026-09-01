import SectionTitle from "@/components/ui/SectionTitle";

/**
 * Alur pengajuan.
 *
 * Urutan mengikuti alur pada tabel referensi Adira:
 * Hitung Maksimal Pencairan -> Survei & Persyaratan -> Datang ke Cabang ->
 * Penyerahan BPKB -> Cair.
 *
 * Sengaja tidak mencantumkan janji durasi ("cair 1 jam", "proses 1 hari").
 * Lama proses bergantung pada survei dan kelengkapan berkas, dan janji yang
 * meleset merugikan kepercayaan lebih besar daripada manfaatnya.
 */
const langkah = [
  {
    judul: "Hitung maksimal pencairan",
    isi: "Cek perkiraan plafon lewat tabel angsuran, atau kirim data kendaraan ke kami untuk dihitungkan.",
  },
  {
    judul: "Survei dan lengkapi persyaratan",
    isi: "Kendaraan ditaksir dan berkas diperiksa. Di tahap ini kelengkapan dokumen menentukan cepat-lambatnya proses.",
  },
  {
    judul: "Datang ke cabang Adira Finance",
    isi: "Penandatanganan dilakukan di kantor cabang. Pemohon dan pasangan atau penjamin hadir sesuai berkas.",
  },
  {
    judul: "Serah terima BPKB, dana cair",
    isi: "BPKB diserahkan sebagai jaminan, dana ditransfer. Kendaraan tetap Anda bawa pulang.",
  },
];

export default function AlurPengajuan() {
  return (
    <section className="section-spacing-lg relative z-1 bg-secondary" id="alur">
      <div className="container">
        <SectionTitle
          eyebrow="ALUR PENGAJUAN"
          title="Empat Langkah dari Pengajuan sampai Cair"
          excerpt="Prosesnya tetap melalui cabang Adira Finance. Tugas kami memastikan berkas Anda sudah benar sebelum sampai ke sana."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-sttr-wrapper>
          {langkah.map((l, i) => (
            <div data-sttr-card key={l.judul}>
              <div className="h-full p-5 sm:p-6 md:p-8 bg-white border border-title_black/10 rounded-2xl">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-title_black text-xl font-semibold leading-tight">{l.judul}</h3>
                <p className="mt-3 text-paragraph_black">{l.isi}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-paragraph_black">
          Lama proses bergantung pada hasil survei dan kelengkapan berkas, jadi kami tidak mematok janji waktu di
          awal.
        </p>
      </div>
    </section>
  );
}
