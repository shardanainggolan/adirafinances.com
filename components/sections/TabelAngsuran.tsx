"use client";

import { useState } from "react";

import SectionTitle from "@/components/ui/SectionTitle";
import { ANOMALI_MOBIL, TABEL_MOBIL, TABEL_MOTOR, rupiah, type TabelAngsuran } from "@/lib/tabel-angsuran";
import { PERNYATAAN_OJK, waLink } from "@/lib/site";

const TABEL: TabelAngsuran[] = [TABEL_MOTOR, TABEL_MOBIL];

/**
 * Tabel angsuran referensi — versi teks dari `table-referenstatif.webp`.
 *
 * Dirender sebagai <table> HTML asli (bukan gambar) supaya nominalnya dapat
 * dibaca Google dan dikutip di AI Overviews. Semua kelas di sini sudah
 * dipastikan ada di `public/css/style.css` yang sudah terkompilasi.
 */
export default function TabelAngsuran() {
  const [aktif, setAktif] = useState(TABEL[0].id);

  return (
    <section className="section-spacing-lg" id="tabel-angsuran">
      <div className="container">
        <SectionTitle
          eyebrow="TABEL ANGSURAN"
          title="Simulasi Angsuran Pinjaman Jaminan BPKB"
          excerpt="Perkiraan angsuran per bulan berdasarkan jumlah pinjaman dan tenor. Angka bersifat referensi — plafon dan angsuran final ditentukan Adira Finance setelah survei."
        />

        {/* Pemilih jenis jaminan — memakai gaya tab yang sudah ada di template */}
        <div className="calculator-tab-nav-wrap overflow-auto">
          <div className="flex items-center gap-2.5 flex-nowrap">
            {TABEL.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`calculator-tab-btn${aktif === t.id ? " active" : ""}`}
                onClick={() => setAktif(t.id)}
                aria-pressed={aktif === t.id}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/*
          KEDUA tabel selalu dirender ke HTML; yang tidak aktif hanya
          disembunyikan (display:none) — bukan di-unmount.

          Ini disengaja: kalau tabel yang tidak aktif tidak ikut dirender,
          nominalnya tidak ada di HTML dan tidak akan pernah terindeks Google.
          Padahal justru itu tujuan utama tabel teks ini.

          Memakai `hidden`/`block`, bukan `.calculator-tab-panel` milik
          EmiCalculator — kelas itu dipakai query global di komponen lain, jadi
          meminjamnya membuat dua section saling tabrakan.
        */}
        {TABEL.map((t) => (
          <div key={t.id} className={aktif === t.id ? "block" : "hidden"}>
            <p className="mt-6 text-paragraph_black">
              Pinjaman jaminan <strong>{t.label}</strong> tersedia mulai{" "}
              <strong>{rupiah(t.baris[0][0])}</strong> sampai{" "}
              <strong>{rupiah(t.baris[t.baris.length - 1][0])}</strong> dengan tenor{" "}
              <strong>{t.tenor.join(", ")} bulan</strong>.
            </p>

            <div className="mt-6 overflow-auto rounded-2xl border border-border">
              <table className="w-full border-collapse text-left">
                <caption className="px-4 py-3 text-left text-sm text-paragraph_black">
                  Tabel angsuran referensi {t.label} — jumlah pinjaman dan angsuran per bulan menurut tenor.
                </caption>
                <thead>
                  <tr className="bg-secondary">
                    <th scope="col" className="px-4 py-3 text-sm font-semibold text-title_black whitespace-nowrap">
                      Jumlah Pinjaman
                    </th>
                    {t.tenor.map((bulan) => (
                      <th
                        key={bulan}
                        scope="col"
                        className="px-4 py-3 text-sm font-semibold text-title_black text-right whitespace-nowrap"
                      >
                        {bulan} bulan
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.baris.map((baris) => {
                    const [pinjaman, ...angsuran] = baris;
                    return (
                      <tr key={pinjaman} className="border-t border-border">
                        <th
                          scope="row"
                          className="px-4 py-2 text-sm font-semibold text-title_black whitespace-nowrap"
                        >
                          {rupiah(pinjaman)}
                        </th>
                        {angsuran.map((nilai, i) => {
                          const perluDicek =
                            t.id === "mobil" &&
                            pinjaman === ANOMALI_MOBIL.pinjaman &&
                            i === ANOMALI_MOBIL.tenorIndex;
                          return (
                            <td
                              key={`${pinjaman}-${t.tenor[i]}`}
                              className="px-4 py-2 text-sm text-paragraph_black text-right whitespace-nowrap"
                            >
                              {rupiah(nilai)}
                              {perluDicek ? <span aria-hidden="true">&nbsp;*</span> : null}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {t.id === "mobil" ? (
              <p className="mt-4 text-xs text-paragraph_black">
                * Angka pada baris {rupiah(ANOMALI_MOBIL.pinjaman)} tenor 23 bulan sedang dikonfirmasi ulang.
                Mohon gunakan simulasi resmi atau hubungi kami untuk angka pasti.
              </p>
            ) : null}
          </div>
        ))}

        <p className="mt-6 text-paragraph_black">
          Angka di atas adalah <strong>estimasi referensi</strong>, bukan penawaran. Besar pinjaman yang disetujui
          bergantung pada jenis, tahun, dan kondisi kendaraan serta hasil survei. {PERNYATAAN_OJK}
        </p>

        <div className="mt-8">
          <a className="button-primary" href={waLink("Halo, saya ingin tanya angsuran pinjaman jaminan BPKB")} target="_blank" rel="noopener noreferrer">
            Tanya Angsuran via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
