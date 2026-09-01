import SectionTitle from "@/components/ui/SectionTitle";
import { waLink } from "@/lib/site";

/**
 * Persyaratan dokumen.
 *
 * Daftar ini persis seperti yang diberikan pemilik. Jangan menambah atau
 * mengurangi butir tanpa konfirmasi — dokumen yang keliru disebut membuat
 * pemohon datang ke cabang tanpa berkas lengkap.
 */
const dokumen = [
  {
    nama: "eKTP pemohon dan eKTP pasangan",
    detail: "Kalau belum menikah, bisa diganti eKTP orang tua atau penjamin.",
  },
  {
    nama: "Kartu Keluarga",
    detail: null,
  },
  {
    nama: "Bukti penghasilan",
    detail: "Slip gaji, mutasi rekening, atau bukti lain yang menunjukkan pemasukan rutin.",
  },
  {
    nama: "NPWP",
    detail: "Diminta untuk jaminan BPKB mobil.",
  },
  {
    nama: "Bukti kepemilikan rumah",
    detail: "PBB, rekening listrik, atau struk token listrik.",
  },
];

export default function Persyaratan() {
  return (
    <section className="section-spacing-lg-md" id="persyaratan">
      <div className="container">
        <SectionTitle
          eyebrow="PERSYARATAN"
          title="Dokumen yang Perlu Disiapkan"
          excerpt="Siapkan berkas ini sebelum survei. Berkas yang lengkap sejak awal memangkas bolak-balik ke cabang."
        />

        <div className="grid gap-6 lg:grid-cols-3" data-sttr-wrapper>
          <div className="lg:col-span-2" data-sttr-card>
            <ul className="flex flex-col gap-4">
              {dokumen.map((d, i) => (
                <li
                  className="flex items-start gap-4 p-5 bg-background border border-border rounded-2xl"
                  key={d.nama}
                >
                  <span className="w-10 h-10 shrink-0 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                    {i + 1}
                  </span>
                  <span className="flex-1">
                    <span className="block text-title_black text-lg font-semibold leading-tight">{d.nama}</span>
                    {d.detail ? <span className="block mt-2 text-paragraph_black">{d.detail}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div data-sttr-card>
            <div className="h-full p-5 sm:p-6 md:p-8 bg-secondary rounded-2xl">
              <h3 className="text-title_black text-xl md:text-2xl font-semibold leading-tight">
                Belum yakin berkas Anda memenuhi?
              </h3>
              <p className="mt-4 text-paragraph_black">
                Kirim foto BPKB dan STNK lewat WhatsApp. Kami cek dulu kelayakannya sebelum Anda repot mengurus
                berkas lain.
              </p>
              <div className="mt-8">
                <a
                  className="button-primary"
                  href={waLink("Halo, saya mau cek kelayakan pengajuan gadai BPKB")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cek Lewat WhatsApp
                  <svg className="w-2.5 h-2.5 fill-current">
                    <use href="#buttonArrow" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
