import Link from "next/link";

import SectionTitle from "@/components/ui/SectionTitle";
import { ADIRA, AREA_LAYANAN, waLink } from "@/lib/site";

/**
 * Wilayah layanan.
 *
 * Daftar area mengikuti pembagian wilayah pada sistem simulasi Adira.
 * Sengaja TIDAK dipecah jadi satu halaman per kota — halaman kota yang isinya
 * sama persis kecuali nama kota termasuk doorway abuse.
 */
export default function WilayahLayanan() {
  return (
    <section className="section-spacing-lg-md" id="wilayah">
      <div className="container">
        <SectionTitle
          eyebrow="WILAYAH LAYANAN"
          title="Area yang Dapat Diproses"
          excerpt="Pengajuan diproses melalui jaringan cabang Adira Finance. Cek dulu ketersediaan untuk kota Anda sebelum menyiapkan berkas."
        />

        <div className="grid gap-6 lg:grid-cols-3" data-sttr-wrapper>
          <div className="lg:col-span-2" data-sttr-card>
            <ul className="grid gap-4 sm:grid-cols-2">
              {AREA_LAYANAN.map((area) => (
                <li
                  className="flex items-start gap-3 p-4 bg-background border border-border rounded-xl text-title_black"
                  key={area}
                >
                  <svg className="w-5.25 h-5.25 shrink-0">
                    <use href="#roundedCheck" />
                  </svg>
                  <span className="flex-1">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-sttr-card>
            <div className="h-full p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
              <h3 className="text-title_black text-xl font-semibold leading-tight">Kantor pusat pembiayaan</h3>
              <address className="mt-4 text-paragraph_black">
                <strong className="block text-title_black">{ADIRA.nama}</strong>
                <span className="block mt-2">{ADIRA.gedung}</span>
                <span className="block">{ADIRA.jalan}</span>
                <span className="block">
                  {ADIRA.kota}, {ADIRA.provinsi} {ADIRA.kodePos}
                </span>
              </address>
              <p className="mt-4 text-paragraph_black">
                Layanan pelanggan Adira Finance:{" "}
                <a className="text-primary font-semibold" href={`tel:${ADIRA.telepon}`}>
                  {ADIRA.telepon}
                </a>
              </p>

              {/* Tautan masuk satu-satunya ke halaman cabang. Tanpa ini
                  halaman itu yatim: terdaftar di sitemap tapi tidak tertaut
                  dari mana pun, dan tautanlah cara utama halaman ditemukan. */}
              <p className="mt-4 text-paragraph_black">
                Sudah ada halaman untuk{" "}
                <Link className="text-primary font-semibold underline" href="/adira-finance-alam-sutera">
                  cabang Alam Sutera, Serpong Utara
                </Link>{" "}
                dan{" "}
                <Link className="text-primary font-semibold underline" href="/adira-finance-sawangan">
                  cabang Sawangan, Depok
                </Link>{" "}
                &mdash; masing-masing berisi alamat, telepon cabang, dan cabang terdekat lainnya.
              </p>

              <div className="mt-8">
                <a
                  className="button-primary"
                  href={waLink("Halo, saya mau tanya apakah wilayah saya dilayani")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tanya Wilayah Anda
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
