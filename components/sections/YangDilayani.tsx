import SectionTitle from "@/components/ui/SectionTitle";

const layanan = [
  {
    ikon: "credit-card-icon",
    judul: "Gadai BPKB Mobil & Motor",
    isi: "BPKB ditahan sebagai jaminan, kendaraan tetap Anda pakai sehari-hari. Besar pinjaman mengikuti taksiran nilai kendaraan.",
  },
  {
    ikon: "refresh-icon",
    judul: "Take Over dari Leasing Lain",
    isi: "Pinjaman yang sedang berjalan di leasing lain dipindahkan ke Adira Finance. Sisa utang di tempat lama dilunasi, tenor dan angsuran dihitung ulang.",
  },
  {
    ikon: "chart-line-icon",
    judul: "Top Up Pinjaman",
    isi: "Untuk yang sudah punya pinjaman berjalan di Adira dan butuh tambahan dana. Plafon dinaikkan tanpa mulai pengajuan dari nol.",
  },
  {
    ikon: "globe-icon",
    judul: "Kredit Mobil & Motor Bekas",
    isi: "Pembiayaan pembelian kendaraan bekas, baik dari dealer maupun perorangan.",
  },
];

/** Yang Dilayani — empat jenis pengajuan yang bisa diproses. */
export default function YangDilayani() {
  return (
    <section className="section-spacing-lg-md" id="layanan">
      <div className="container">
        <SectionTitle
          eyebrow="YANG DILAYANI"
          title="Empat Jenis Pengajuan yang Bisa Diproses"
          excerpt="Selain gadai BPKB, Adira Finance juga memproses pemindahan pinjaman dari leasing lain, penambahan plafon, dan pembiayaan kendaraan bekas."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-sttr-wrapper>
          {layanan.map((item, i) => (
            <div data-sttr-card key={item.judul}>
              <div className="relative h-full px-5 sm:px-6 xl:px-9 py-7 md:py-9 duration-600! transition-all ease-in-out overflow-hidden group border border-border bg-background rounded-xl service-card">
                <div className="w-10 h-10 shrink-0 text-primary transition-all group-hover:text-secondary duration-300!">
                  <svg className="w-10 h-10 fill-current">
                    <use href={`#${item.ikon}`} />
                  </svg>
                </div>
                <div className="flex flex-col items-start gap-3 md:gap-4 pt-7 sm:pt-9 md:pt-12">
                  <h3 className="w-full text-title_black group-hover:text-white text-xl md:text-2xl font-semibold leading-[1.3] transition-all duration-300">
                    {item.judul}
                  </h3>
                  <p className="w-full text-paragraph_black group-hover:text-paragraph_white translate-all duration-300 font-normal leading-normal">
                    {item.isi}
                  </p>
                </div>
                <div className="absolute -top-5 xl:-top-6.5 -right-3 xl:-right-5 text-[100px] md:text-[120px] xl:text-[150px] leading-[100%] font-bold text-transparent opacity-15 [-webkit-text-stroke:2px_#FFDD00] transition-all duration-300 ease-in-out group-hover:[-webkit-text-stroke:2px_#22C55E] z-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
