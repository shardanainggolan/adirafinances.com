"use client";

import Image from "next/image";

import heroImage from "@/public/images/bg/hero-1.webp";
import { DISCLOSURE_AGEN, waLink } from "@/lib/site";
import { rupiah, TABEL_MOBIL, TABEL_MOTOR } from "@/lib/tabel-angsuran";

const MOTOR_MIN = TABEL_MOTOR.baris[0][0];
const MOTOR_MAKS = TABEL_MOTOR.baris[TABEL_MOTOR.baris.length - 1][0];
const MOBIL_MIN = TABEL_MOBIL.baris[0][0];
const MOBIL_MAKS = TABEL_MOBIL.baris[TABEL_MOBIL.baris.length - 1][0];

/**
 * Banner Area.
 *
 * `data-hero-banner` / `data-title` / `data-excerpt` / `data-button` /
 * `data-thumb` dibaca oleh timeline hero di `lib/animations.ts`.
 */
export default function HeroBanner() {
  return (
    <>
      <section className="py-14 md:py-20 lg:py-24 xl:py-28.5 bg-secondary relative z-1" data-hero-banner>
        {/* <img
          className="absolute -z-1 w-full h-full top-0 left-0"
          src="/img/home-v1/banner-shape.webp"
          alt=""
        /> */}

        <div className="container">
          <div className="flex items-center justify-between gap-10 flex-col md:flex-row">
            <div className="md:max-w-137.5 w-full">
              <h1
                className="text-[40px] sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[80px] leading-tight! text-title_black font-bold max-md:max-w-120"
                data-title
              >
                Pinjaman Dana Jaminan BPKB Mobil &amp; Motor
              </h1>
              <p className="text-base sm:text-lg text-paragraph_black mt-4" data-excerpt>
                BPKB jadi jaminan, kendaraan tetap Anda pakai. Plafon {rupiah(MOTOR_MIN)}–{rupiah(MOTOR_MAKS)} untuk
                motor dan {rupiah(MOBIL_MIN)}–{rupiah(MOBIL_MAKS)} untuk mobil. Melayani juga take over dari
                leasing lain, top up pinjaman, serta kredit kendaraan bekas.
              </p>

              <div className="mt-8 md:mt-12 flex items-center gap-4 flex-wrap" data-button>
                <a
                  className="button-primary"
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tanya via WhatsApp
                  <svg className="w-2.5 h-2.5 fill-current">
                    <use href="#buttonArrow" />
                  </svg>
                </a>
                <a className="button-autline-dark" href="#tabel-angsuran">
                  Lihat Tabel Angsuran
                  <svg className="w-2.5 h-2.5 fill-current">
                    <use href="#buttonArrow" />
                  </svg>
                </a>
              </div>

              <p className="mt-6 text-sm text-paragraph_black">{DISCLOSURE_AGEN}</p>
            </div>

            {/*
              Gambar LCP.
              - static import  -> intrinsik 860x704 ikut terbawa, jadi tanpa geser layout
                                  dan placeholder blur dibuat saat build
              - priority       -> tidak pernah lazy, dan memancarkan
                                  <link rel="preload" as="image" imagesrcset> di <head>
              - sizes          -> mengikuti lebar kolomnya
            */}
            <div className="md:max-w-129.25 w-full" data-thumb>
              <Image
                src={heroImage}
                alt="Keluarga di samping mobil, ilustrasi pembiayaan dengan jaminan BPKB"
                className="w-full h-auto"
                sizes="(min-width: 1280px) 517px, (min-width: 768px) 45vw, 100vw"
                placeholder="blur"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ada di template asli: menjaga "section title pertama" yang dilihat
          timeline above-the-fold tetap kosong, supaya judul section berikutnya
          muncul saat di-scroll, bukan langsung. */}
      <span className="hidden" data-section-title />
    </>
  );
}
