"use client";

import { useState } from "react";

/**
 * Peta cabang dengan pemuatan atas permintaan.
 *
 * Sematan Google Maps itu mahal: ratusan kilobita skrip dan ubin dari beberapa
 * host pihak ketiga, dan ia menghubungi Google — dengan cookie serta alamat IP
 * pengunjung — begitu halaman dibuka, sebelum pengunjung memintanya. Di halaman
 * yang isinya teks dan beberapa ikon inline, itu akan menjadi satu-satunya hal
 * yang menentukan LCP.
 *
 * Jadi yang dirender awal hanya panel ringan. Iframe baru dipasang setelah
 * tombol ditekan. Pengunjung ponsel umumnya tidak menekannya sama sekali —
 * mereka langsung memakai tautan "buka di Google Maps" yang membuka aplikasi
 * peta bawaan beserta rutenya, yang memang lebih berguna daripada peta kecil
 * yang ikut menangkap gulir halaman.
 *
 * Catatan: peta sematan TIDAK memberi keuntungan peringkat. Isi iframe bukan
 * bagian dari halaman di mata Google. Ini murni soal kejelasan bagi pembaca.
 */
export default function PetaCabang({
  embedUrl,
  judul,
  tautanPeta,
}: {
  embedUrl: string;
  judul: string;
  tautanPeta: string;
}) {
  const [tampil, setTampil] = useState(false);

  if (tampil) {
    return (
      <iframe
        src={embedUrl}
        title={`Peta lokasi ${judul}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="w-full rounded-xl border border-border"
        style={{ height: 320 }}
      />
    );
  }

  return (
    <div className="p-5 sm:p-6 bg-background border border-border rounded-xl">
      <p className="text-paragraph_black">
        Peta dimuat dari Google dan baru diambil setelah Anda menekan tombol di bawah.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <button className="button-primary" onClick={() => setTampil(true)} type="button">
          Tampilkan Peta
          <svg className="w-2.5 h-2.5 fill-current">
            <use href="#buttonArrow" />
          </svg>
        </button>
        <a className="text-primary font-semibold underline" href={tautanPeta} target="_blank" rel="noopener noreferrer">
          Atau buka langsung di aplikasi Google Maps
        </a>
      </div>
    </div>
  );
}
