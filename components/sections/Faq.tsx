"use client";

import { useState } from "react";

import SectionTitle from "@/components/ui/SectionTitle";
import { ADIRA, AGEN } from "@/lib/site";

/**
 * FAQ.
 *
 * Setiap jawaban di sini bersumber dari data yang sudah dikonfirmasi (plafon,
 * tenor, daftar dokumen, alur, status keagenan). Pertanyaan yang jawabannya
 * belum diketahui — misalnya batas tahun kendaraan, besar bunga, atau lama
 * proses — sengaja TIDAK dibuatkan jawaban karangan.
 *
 * Catatan: Google menghentikan FAQ rich results pada 7 Mei 2026, jadi bagian
 * ini dibuat untuk pembaca dan kutipan AI, bukan untuk cuplikan kaya di SERP.
 */
const faq = [
  {
    tanya: "Kendaraan ikut ditahan atau tetap bisa dipakai?",
    jawab:
      "Yang ditahan hanya BPKB-nya. Kendaraan tetap Anda pakai seperti biasa selama masa angsuran berjalan.",
  },
  {
    tanya: "Berapa dana yang bisa cair?",
    jawab:
      "Untuk jaminan BPKB motor mulai Rp3.000.000 sampai Rp20.000.000. Untuk BPKB mobil mulai Rp25.000.000 sampai Rp200.000.000. Angka pastinya mengikuti taksiran kendaraan dan hasil survei.",
  },
  {
    tanya: "Pilihan tenornya berapa lama?",
    jawab:
      "BPKB motor tersedia 11, 17, 23, 29, dan 35 bulan. BPKB mobil tersedia 11, 23, 35, dan 47 bulan.",
  },
  {
    tanya: "Dokumen apa saja yang harus disiapkan?",
    jawab:
      "eKTP pemohon dan pasangan (atau orang tua/penjamin), Kartu Keluarga, bukti penghasilan, serta bukti kepemilikan rumah seperti PBB atau rekening listrik. NPWP diminta khusus untuk jaminan BPKB mobil.",
  },
  {
    tanya: "Pinjaman saya sedang berjalan di leasing lain, bisa dipindah?",
    jawab:
      "Bisa, lewat take over. Sisa utang di leasing lama dilunasi, lalu tenor dan angsuran dihitung ulang di Adira Finance.",
  },
  {
    tanya: "Sudah punya pinjaman di Adira, bisa menambah dana?",
    jawab:
      "Bisa, lewat top up. Plafon dinaikkan tanpa perlu mengajukan dari awal, selama riwayat angsuran memenuhi.",
  },
  {
    tanya: "Angka di tabel angsuran itu sudah final?",
    jawab:
      "Belum. Tabel tersebut referensi untuk memperkirakan cicilan. Angka final ditentukan Adira Finance setelah taksiran kendaraan dan survei.",
  },
  {
    tanya: "Situs ini Adira Finance resmi?",
    jawab: `Bukan situs korporat Adira Finance. Situs ini dikelola ${AGEN.nama}, Agen AXI terdaftar dengan ID ${AGEN.id}. Pembiayaannya sendiri disalurkan ${ADIRA.nama}, yang berizin dan diawasi Otoritas Jasa Keuangan (OJK).`,
  },
];

export default function Faq() {
  const [terbuka, setTerbuka] = useState<number | null>(0);

  return (
    <section className="section-spacing-lg-md" id="faq">
      <div className="container">
        <SectionTitle
          eyebrow="PERTANYAAN UMUM"
          title="Yang Paling Sering Ditanyakan"
          excerpt="Kalau pertanyaan Anda tidak ada di sini, kirim saja lewat WhatsApp. Lebih baik ditanyakan sebelum berkas diurus."
        />

        <div className="flex flex-col gap-4" data-sttr-wrapper>
          {faq.map((item, i) => {
            const aktif = terbuka === i;
            return (
              <div
                key={item.tanya}
                className={`single-faq duration-300 p-4 sm:p-5 border border-border overflow-hidden rounded-xl sm:rounded-2xl${
                  aktif ? " active" : ""
                }`}
                data-sttr-card
              >
                {/* Seluruh baris kepala adalah tombolnya — di template hanya
                    teksnya yang bisa diklik, sehingga menekan area kartu di
                    sekitar panah tidak melakukan apa pun. */}
                <button
                  type="button"
                  className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-2 w-full"
                  aria-expanded={aktif}
                  aria-controls={`faq-jawab-${i}`}
                  onClick={() => setTerbuka(aktif ? null : i)}
                >
                  <span className="font-semibold text-base sm:text-lg text-left text-title_black flex items-center gap-3">
                    <span className="w-10 h-10 shrink-0 rounded-full bg-primary flex items-center justify-center text-white">
                      {i + 1}
                    </span>
                    <span className="flex-1">{item.tanya}</span>
                  </span>
                  <svg className="fill-current duration-300 ease-in-out h-4.5 w-4 shrink-0 faq-icon">
                    <use href="#arrow-down" />
                  </svg>
                </button>
                <div className="faq-body" id={`faq-jawab-${i}`} hidden={!aktif}>
                  <div className="mt-3.5">
                    <p className="text-paragraph_black">{item.jawab}</p>
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
