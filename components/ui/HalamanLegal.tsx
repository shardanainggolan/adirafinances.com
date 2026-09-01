import Link from "next/link";
import type { ReactNode } from "react";

export type BagianLegal = { id: string; judul: string; isi: ReactNode };

type HalamanLegalProps = {
  judul: string;
  ringkasan: string;
  diperbarui: string;
  bagian: BagianLegal[];
};

/**
 * Kerangka halaman legal (kebijakan privasi, syarat & ketentuan).
 *
 * Dirender penuh di server — tanpa akordeon atau tab — supaya seluruh isinya
 * ada di HTML dan dapat dibaca mesin telusur maupun pembaca layar. Halaman
 * legal termasuk sinyal kepercayaan pada situs keuangan, jadi tidak ada
 * bagian yang disembunyikan di balik interaksi.
 */
export default function HalamanLegal({ judul, ringkasan, diperbarui, bagian }: HalamanLegalProps) {
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
              <li aria-current="page">{judul}</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-[40px] sm:text-5xl lg:text-6xl leading-tight! text-title_black font-bold max-w-200">
            {judul}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-paragraph_black max-w-200">{ringkasan}</p>
          <p className="mt-4 text-sm text-paragraph_black">Terakhir diperbarui: {diperbarui}</p>
        </div>
      </section>

      <section className="section-spacing-lg-md">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Daftar isi */}
            <nav aria-label="Daftar isi">
              <div className="p-5 sm:p-6 bg-background border border-border rounded-2xl">
                <h2 className="text-title_black text-lg font-semibold leading-tight">Daftar isi</h2>
                <ol className="mt-4 flex flex-col gap-3">
                  {bagian.map((b, i) => (
                    <li key={b.id}>
                      <a className="text-paragraph_black hover:text-primary" href={`#${b.id}`}>
                        {i + 1}. {b.judul}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="lg:col-span-2">
              {bagian.map((b, i) => (
                <section className="mt-10 first:mt-0" id={b.id} key={b.id}>
                  <h2 className="text-title_black text-xl md:text-2xl font-semibold leading-tight">
                    {i + 1}. {b.judul}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4 text-paragraph_black">{b.isi}</div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
