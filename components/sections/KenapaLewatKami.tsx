import SectionTitle from "@/components/ui/SectionTitle";
import { AGEN } from "@/lib/site";

/**
 * Menjawab pertanyaan yang pasti terlintas: "kenapa tidak langsung ke Adira?"
 *
 * Jawabannya harus jujur — pembiayaan tetap di Adira, yang kami tambahkan
 * adalah pendampingan. Mengklaim bunga lebih murah atau proses lebih cepat
 * lewat agen tidak benar dan mudah dibantah calon nasabah.
 */
const alasan = [
  {
    judul: "Dicek dulu sebelum diajukan",
    isi: "Kendaraan dan berkas ditinjau di awal. Kalau kemungkinannya kecil, kami bilang dari awal daripada Anda menunggu lalu ditolak.",
  },
  {
    judul: "Berkas dibantu sampai benar",
    isi: "Banyak pengajuan tertahan karena dokumen kurang satu. Kami periksa daftarnya sebelum Anda ke cabang.",
  },
  {
    judul: "Satu orang yang Anda hubungi",
    isi: "Pertanyaan dari awal sampai dana cair masuk ke nomor yang sama, bukan berpindah-pindah petugas.",
  },
];

export default function KenapaLewatKami() {
  return (
    <section className="section-spacing-lg-md" id="kenapa-kami">
      <div className="container">
        <SectionTitle
          eyebrow="LEWAT AGEN ATAU LANGSUNG"
          title="Kenapa Mengajukan Lewat Kami"
          excerpt="Pembiayaan, penilaian, dan keputusan tetap di Adira Finance. Bunga dan plafon sama saja. Yang berbeda hanya pendampingannya."
        />

        <div className="grid gap-6 lg:grid-cols-3" data-sttr-wrapper>
          {alasan.map((a) => (
            <div data-sttr-card key={a.judul}>
              <div className="h-full p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
                <svg className="w-10 h-10 fill-current text-primary">
                  <use href="#primaryRoundedCheck" />
                </svg>
                <h3 className="mt-6 text-title_black text-xl font-semibold leading-tight">{a.judul}</h3>
                <p className="mt-3 text-paragraph_black">{a.isi}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-paragraph_black">
          Situs ini dikelola {AGEN.nama}, Agen AXI terdaftar dengan ID {AGEN.id}. Nomor ID tersebut bisa Anda
          cocokkan ke Adira Finance.
        </p>
      </div>
    </section>
  );
}
