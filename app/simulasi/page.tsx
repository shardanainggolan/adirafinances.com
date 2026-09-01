import type { Metadata } from "next";
import Link from "next/link";

import KalkulatorSimulasi from "@/components/sections/KalkulatorSimulasi";
import SectionTitle from "@/components/ui/SectionTitle";
import { PERNYATAAN_OJK, SITE_URL } from "@/lib/site";
import { TABEL_MOBIL, TABEL_MOTOR, rupiah } from "@/lib/tabel-angsuran";

export const metadata: Metadata = {
  title: "Simulasi Angsuran Pinjaman Jaminan BPKB",
  description:
    "Hitung perkiraan plafon dan angsuran pinjaman jaminan BPKB mobil dan motor berdasarkan merek, model, tahun, dan area kendaraan Anda.",
  alternates: { canonical: "/simulasi" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: `${SITE_URL}/simulasi`,
    title: "Simulasi Angsuran Pinjaman Jaminan BPKB",
    description:
      "Hitung perkiraan plafon dan angsuran pinjaman jaminan BPKB berdasarkan merek, model, tahun, dan area kendaraan.",
  },
};

const MOTOR_MIN = TABEL_MOTOR.baris[0][0];
const MOTOR_MAKS = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const MOBIL_MIN = TABEL_MOBIL.baris[0][0];
const MOBIL_MAKS = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

export default function SimulasiPage() {
  return (
    <>
      <section className="py-14 md:py-20 lg:py-24 bg-secondary relative z-1">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-paragraph_black">
              <li>
                <Link className="hover:text-primary" href="/">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Simulasi</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-[40px] sm:text-5xl lg:text-6xl leading-tight! text-title_black font-bold max-w-200">
            Simulasi Angsuran Jaminan BPKB
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-200">
            Pilih kendaraan Anda untuk melihat perkiraan plafon dan angsuran per tenor. Perhitungannya memakai data
            kendaraan yang sama seperti yang dipakai Adira Finance, jadi lebih dekat ke angka sebenarnya daripada
            rumus umum.
          </p>
        </div>
      </section>

      <section className="section-spacing-lg-md" id="kalkulator">
        <div className="container">
          <SectionTitle
            eyebrow="KALKULATOR"
            title="Hitung Perkiraan Pencairan dan Angsuran"
            excerpt="Isi lima langkah berikut. Angka yang muncul adalah estimasi — plafon dan angsuran final ditentukan Adira Finance setelah survei kendaraan."
          />

          <KalkulatorSimulasi />
        </div>
      </section>

      <section className="section-spacing-lg-md" id="catatan">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
              <h2 className="text-title_black text-xl font-semibold leading-tight">Cara membaca hasilnya</h2>
              <ul className="mt-4 list-disc pl-5 flex flex-col gap-2 text-paragraph_black">
                <li>
                  <strong>Minimal dan maksimal pencairan</strong> adalah rentang dana yang mungkin cair untuk
                  kendaraan tersebut.
                </li>
                <li>
                  <strong>Angsuran per bulan</strong> ditampilkan untuk setiap pilihan tenor yang tersedia.
                </li>
                <li>
                  Tenor lebih panjang membuat angsuran lebih ringan, tetapi total yang dibayar menjadi lebih besar.
                </li>
              </ul>
            </div>

            <div className="p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
              <h2 className="text-title_black text-xl font-semibold leading-tight">Kalau kendaraan tidak ditemukan</h2>
              <p className="mt-4 text-paragraph_black">
                Tidak semua merek, model, dan tahun tersedia di setiap area. Bila pilihan Anda tidak muncul, coba
                area lain atau gunakan{" "}
                <Link className="text-primary font-semibold underline" href="/#tabel-angsuran">
                  tabel angsuran referensi
                </Link>{" "}
                sebagai gambaran kasar: motor {rupiah(MOTOR_MIN)}–{rupiah(MOTOR_MAKS)}, mobil {rupiah(MOBIL_MIN)}–
                {rupiah(MOBIL_MAKS)}.
              </p>
              <p className="mt-4 text-paragraph_black">{PERNYATAAN_OJK}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
