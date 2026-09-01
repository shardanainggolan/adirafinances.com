import SectionTitle from "@/components/ui/SectionTitle";
import { rupiah, TABEL_MOBIL, TABEL_MOTOR } from "@/lib/tabel-angsuran";

const jaminan = [
  {
    kunci: "motor",
    judul: "BPKB Motor",
    tabel: TABEL_MOTOR,
    catatan: ["Motor matic, bebek, maupun sport", "NPWP tidak diminta"],
  },
  {
    kunci: "mobil",
    judul: "BPKB Mobil",
    tabel: TABEL_MOBIL,
    catatan: ["Mobil penumpang maupun niaga", "NPWP diminta untuk jaminan BPKB mobil"],
  },
];

/** Jenis Jaminan — perbandingan plafon dan tenor motor vs mobil. */
export default function JenisJaminan() {
  return (
    <section className="section-spacing-lg-md" id="jenis-jaminan">
      <div className="container">
        <SectionTitle
          eyebrow="JENIS JAMINAN"
          title="BPKB Motor atau BPKB Mobil"
          excerpt="Plafon dan pilihan tenor berbeda untuk tiap jenis kendaraan. Nilai yang disetujui ditentukan setelah taksiran dan survei."
        />

        <div className="grid gap-6 md:grid-cols-2" data-sttr-wrapper>
          {jaminan.map((item) => {
            const min = item.tabel.baris[0][0];
            const maks = item.tabel.baris[item.tabel.baris.length - 1][0];

            return (
              <div data-sttr-card key={item.kunci}>
                <div className="h-full p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
                  <h3 className="text-title_black text-xl md:text-2xl font-semibold leading-tight">{item.judul}</h3>

                  <dl className="mt-6 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                      <dt className="text-paragraph_black">Plafon pinjaman</dt>
                      <dd className="text-title_black font-semibold text-right">
                        {rupiah(min)} – {rupiah(maks)}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <dt className="text-paragraph_black">Pilihan tenor</dt>
                      <dd className="text-title_black font-semibold text-right">
                        {item.tabel.tenor.join(", ")} bulan
                      </dd>
                    </div>
                  </dl>

                  <ul className="mt-6 flex flex-col gap-3">
                    {item.catatan.map((c) => (
                      <li className="flex items-start gap-3 text-paragraph_black" key={c}>
                        <svg className="w-5.25 h-5.25 shrink-0">
                          <use href="#roundedCheck" />
                        </svg>
                        <span className="flex-1">{c}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <a className="button-autline-dark" href="#tabel-angsuran">
                      Lihat tabel angsuran {item.judul}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
