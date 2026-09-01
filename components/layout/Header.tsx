"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import logoAgen from "@/public/images/logo-agen-axi-adira.png";
import { AGEN, waLink } from "@/lib/site";
import { startLenis, stopLenis } from "@/lib/vendor";

/**
 * Menu utama.
 *
 * Semua tautan mengarah ke section di homepage. Megamenu 24 tautan bawaan
 * template dibuang: halamannya belum ada, dan tautan mati merugikan pengunjung
 * sekaligus memboroskan crawl budget. Tambahkan kembali per halaman ketika
 * halaman pendukung (§6 docs/rencana-homepage.md) benar-benar dibuat.
 */
const menu = [
  { label: "Tentang", href: "/tentang" },
  { label: "Layanan", href: "/#layanan" },
  { label: "Jenis Jaminan", href: "/#jenis-jaminan" },
  { label: "Simulasi", href: "/simulasi" },
  { label: "Tabel Angsuran", href: "/#tabel-angsuran" },
  { label: "Syarat", href: "/#persyaratan" },
  { label: "Alur", href: "/#alur" },
  { label: "FAQ", href: "/#faq" },
];

function lockScroll() {
  stopLenis();
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

function unlockScroll() {
  startLenis();
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-overlay");
      lockScroll();
    } else {
      document.body.classList.remove("menu-overlay");
      unlockScroll();
    }
  }, [menuOpen]);

  useEffect(
    () => () => {
      document.body.classList.remove("menu-overlay");
      unlockScroll();
    },
    [],
  );

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (navRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  return (
    <header className="header-area lg:py-1.5 bg-secondary fixed w-full top-0 left-0 right-0 z-999999 border-b border-title_black/10">
      <div className="container">
        <div className="header-wrapper flex items-center justify-between gap-5 py-3 sm:py-4 lg:py-0">
          {/* Logo dibatasi TINGGI-nya, bukan lebar: rasionya 248x203 (hampir
              persegi), jadi kalau dipatok lebar seperti wordmark bawaan
              template, header ikut memanjang. `width: auto` lewat style inline
              karena kelas `w-auto` tidak ada di CSS terkompilasi. */}
          <Link className="logo shrink-0" href="/">
            <Image
              src={logoAgen}
              alt="Agen AXI Adira Finance — adirafinances.com"
              className="h-12 md:h-16"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          <nav className={`main-menu${menuOpen ? " menu-active" : ""}`} data-lenis-prevent ref={navRef}>
            <ul>
              {menu.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="block sm:hidden">
                <div className="">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary sm:block! text-center justify-center! w-full"
                  >
                    WhatsApp {AGEN.waTampilan}
                  </a>
                </div>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary hidden! sm:inline-flex!"
            >
              Hubungi via WhatsApp
            </a>
            {/* Hamburger */}
            <button
              type="button"
              className={`menuToggle${menuOpen ? " is-active" : ""}`}
              aria-label="Buka menu navigasi"
              aria-expanded={menuOpen}
              ref={toggleRef}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg className="stroke-current text-title_black" width="40" viewBox="0 0 100 100">
                <path
                  className="line line1"
                  d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                />
                <path className="line line2" d="M 20,50 H 80" />
                <path
                  className="line line3"
                  d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
