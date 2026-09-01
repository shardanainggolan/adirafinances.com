"use client";

import Image from "next/image";
import Link from "next/link";

import logoAgen from "@/public/images/logo-agen-axi-adira.png";
import IkonKontak from "@/components/ui/IkonKontak";
import IkonSosial from "@/components/ui/IkonSosial";
import { ADIRA, AGEN, DISCLOSURE_AGEN, PERNYATAAN_OJK, SOSIAL_ADIRA, waLink } from "@/lib/site";

const mainLinks = [
  { label: "Layanan", href: "/#layanan" },
  { label: "Jenis Jaminan", href: "/#jenis-jaminan" },
  { label: "Simulasi Angsuran", href: "/simulasi" },
  { label: "Tabel Angsuran", href: "/#tabel-angsuran" },
  { label: "Wilayah Layanan", href: "/#wilayah" },
];

const legalLinks = [
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
];

const resourceLinks = [
  { label: "Tentang Adira Finance", href: "/tentang" },
  { label: "Syarat & Dokumen", href: "/#persyaratan" },
  { label: "Alur Pengajuan", href: "/#alur" },
  { label: "Kenapa Lewat Kami", href: "/#kenapa-kami" },
  { label: "Pertanyaan Umum", href: "/#faq" },
];


export default function Footer() {

  return (
    <footer
      className="bg-secondary pt-14 md:pt-20 lg:pt-23 relative z-1"
      data-grid-reveal
      data-cols="15"
      data-rows="6"
      data-cols-sm="5"
      data-rows-sm="16"
      data-cols-lg="10"
      data-rows-lg="6"
      data-animation="random"
      data-bg-color="#ffffff"
      data-trigger="top 70%"
      data-stagger="0.004"
      data-duration="0.5"
    >
      {/* <img
        className="absolute left-0 bottom-0 lg:bottom-auto lg:top-1/2 transform lg:-translate-y-1/2 -z-1 w-[20%] lg:w-auto"
        src="/img/footer/footer-left.webp"
        alt="footer-left-shape"
        loading="lazy"
      />
      <img
        className="absolute top-0 right-0 -z-1 w-[20%] lg:w-auto"
        src="/img/footer/footer-right.webp"
        alt="footer-left-shape"
        loading="lazy"
      /> */}

      <div className="container">
        <div className="flex items-start md:items-center justify-start md:justify-between gap-6 md:gap-8 pb-10 md:pb-12 lg:pb-15 flex-col md:flex-row">
          <div className="md:max-w-120 lg:max-w-125 w-full">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold text-title_black leading-tight!">
              Butuh dana dengan jaminan BPKB?
            </h2>
            <p className="mt-4 sm:mt-5 text-paragraph_black">
              Kirim foto BPKB dan STNK, kami cek dulu perkiraan plafonnya. Tidak perlu datang ke cabang sebelum
              kelayakannya jelas.
            </p>
          </div>
          <div className="flex items-center justify-start sm:justify-end gap-4 flex-wrap">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="button-primary">
              Hubungi via WhatsApp
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </a>
            <Link href="/#tabel-angsuran" className="button-autline-dark">
              Lihat Tabel Angsuran
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="flex justify-between lg:gap-10 border-y border-title_black/10 flex-col lg:flex-row">
          <div className="py-10 lg:py-12.5 lg:max-w-87.5 w-full flex flex-col sm:flex-row lg:flex-col justify-between gap-6 sm:items-end">
            <div className="sm:max-w-100 lg:mx-none w-full">
              <Image
                src={logoAgen}
                alt="Agen AXI Adira Finance"
                className="h-14 md:h-16"
                style={{ width: "auto" }}
              />
              <p className="mt-4 sm:mt-6 md:mt-8 text-paragraph_black">
                Informasi pinjaman dana dengan jaminan BPKB mobil dan motor, take over dari leasing lain, top up
                pinjaman, serta kredit kendaraan bekas melalui Adira Finance.
              </p>
            </div>

            <a
              className="button-primary"
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp {AGEN.waTampilan}
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </a>
          </div>

          <div className="w-full lg:w-px h-px lg:h-auto bg-border" />

          <div className="py-10 lg:py-12.5 lg:max-w-161.25 w-full grid grid-cols-2 sm:flex items-start justify-between gap-10">
            <div className="">
              <h3 className="mb-6 text-title_black text-xl md:text-2xl font-semibold leading-none!">Layanan</h3>
              <ul className="flex flex-col items-start gap-3 sm:gap-5">
                {mainLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-paragraph_black leading-none duration-300 hover:text-primary block"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <h3 className="mb-6 text-title_black text-xl md:text-2xl font-semibold leading-none!">Informasi</h3>
              <ul className="flex flex-col items-start gap-3 sm:gap-5">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-paragraph_black leading-none duration-300 hover:text-primary block"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:max-w-57.5 w-full">
              <h3 className="mb-6 text-title_black text-xl md:text-2xl font-semibold leading-none!">Kontak</h3>
              <ul className="flex flex-col items-start gap-3 sm:gap-5">
                <li>
                  <a
                    className="text-paragraph_black leading-snug duration-300 hover:text-primary flex items-start gap-2.5"
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IkonKontak nama="telepon" />
                    <span className="flex-1">WhatsApp {AGEN.waTampilan}</span>
                  </a>
                </li>
                <li>
                  <span className="text-paragraph_black leading-snug flex items-start gap-2.5">
                    <IkonKontak nama="alamat" />
                    <span className="flex-1">
                      {ADIRA.gedung}
                      <br />
                      {ADIRA.jalan}
                      <br />
                      {ADIRA.kota}, {ADIRA.provinsi} {ADIRA.kodePos}
                    </span>
                  </span>
                </li>
                <li>
                  <a
                    className="text-paragraph_black leading-none duration-300 hover:text-primary flex items-center gap-2.5"
                    href={`tel:${ADIRA.telepon}`}
                  >
                    <IkonKontak nama="telepon" />
                    <span className="flex-1">{ADIRA.telepon}</span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-paragraph_black leading-none duration-300 hover:text-primary flex items-center gap-2.5"
                    href={`mailto:${ADIRA.email}`}
                  >
                    <IkonKontak nama="email" />
                    <span className="flex-1">{ADIRA.email}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Media sosial resmi Adira Finance — BUKAN akun pengelola situs ini.
            Labelnya harus tegas supaya pengunjung tidak mengira pesan ke akun
            ini sampai ke agen. */}
        <div className="py-5 md:py-8 border-t border-title_black/10">
          <h2 className="text-title_black text-lg font-semibold leading-tight">Media sosial resmi Adira Finance</h2>
          <p className="mt-2 text-paragraph_black">
            Akun berikut dikelola {ADIRA.nama}, bukan oleh kami. Untuk pengajuan dan pertanyaan, hubungi WhatsApp{" "}
            {AGEN.waTampilan}.
          </p>
          <ul className="mt-4 flex items-center gap-4 flex-wrap">
            {SOSIAL_ADIRA.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  className="w-8.5 h-8.5 bg-white rounded-full flex items-center justify-center text-title_black duration-300 hover:bg-primary hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.nama} Adira Finance`}
                  title={`${s.nama} Adira Finance`}
                >
                  <IkonSosial ikon={s.ikon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Blok legal — wajib ada di situs pembiayaan (YMYL). */}
        <div className="py-5 md:py-8 border-t border-title_black/10">
          <p className="text-paragraph_black">{PERNYATAAN_OJK}</p>
          <p className="mt-4 text-paragraph_black">{DISCLOSURE_AGEN}</p>
          <p className="mt-4 text-paragraph_black">
            Agen AXI: <strong className="text-title_black">{AGEN.nama}</strong> · ID AXI:{" "}
            <strong className="text-title_black">{AGEN.id}</strong>
          </p>
        </div>

        <div className="py-5 md:py-8 lg:py-10.5 flex items-center justify-between gap-4 sm:gap-6 flex-col sm:flex-row">
          <p className="text-paragraph_black text-center sm:text-left">
            ©{new Date().getFullYear()} adirafinances.com
          </p>
          {/* Halaman legal sengaja hanya di footer, tidak di menu utama. */}
          <nav aria-label="Tautan legal">
            <ul className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-paragraph_black leading-none duration-300 hover:text-primary block"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
