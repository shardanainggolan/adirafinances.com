/**
 * Identitas situs — satu sumber kebenaran.
 *
 * Semua nilai di sini dikonfirmasi pemilik pada 2026-08-31. Jangan menambah
 * angka, penghargaan, atau klaim apa pun yang tidak berasal dari sini.
 * Lihat `.claude/skills/seo-adira/SKILL.md`.
 */

/**
 * Host kanonik — HARUS sama dengan tujuan redirect di
 * `deploy/nginx/adirafinances.com.conf`.
 *
 * nginx mengarahkan apex ke www. Kalau konstanta ini menyebut apex sementara
 * nginx mengarahkan ke www, setiap halaman mengirim dua sinyal yang
 * bertentangan: Google mengikuti redirect ke www, lalu membaca tag canonical
 * yang menunjuk balik ke apex. Nilai ini menentukan canonical, sitemap, robots,
 * OG url, dan seluruh `@id` pada JSON-LD sekaligus — jadi keduanya harus
 * berubah bersamaan.
 */
export const SITE_URL = "https://www.adirafinances.com";

/**
 * Google Analytics 4.
 *
 * Hanya dimuat pada build produksi (lihat `app/layout.tsx`) supaya lalu lintas
 * pengembangan dan uji Playwright tidak ikut tercatat sebagai kunjungan nyata.
 *
 * GA menyetel cookie dan mengirim data ke Google. Konsekuensinya sudah ditulis
 * di `app/kebijakan-privasi/page.tsx` — kalau pemuatan GA diubah di sini,
 * halaman itu wajib ikut diperbarui.
 */
export const GA_ID = "G-BXQHX3BE9S";

/** Entitas pembiayaan — berizin & diawasi OJK. */
export const ADIRA = {
  nama: "PT Adira Dinamika Multi Finance, Tbk",
  gedung: "Millenium Centennial Center Lt. 53-61",
  jalan: "Jl. Jend. Sudirman Kav. 25, Karet Setiabudi",
  kota: "Jakarta Selatan",
  provinsi: "DKI Jakarta",
  kodePos: "12920",
  telepon: "1500511",
  email: "customercare@adira.co.id",
  situs: "https://adira.co.id/",
} as const;

/** Pengelola situs — agen AXI terdaftar. */
export const AGEN = {
  nama: "Sharda",
  peran: "Agen AXI Terdaftar",
  id: "012625001169",
  waNomor: "6285122682981",
  waTampilan: "+62 851-2268-2981",
} as const;

export const WA_PESAN = "Halo, saya ingin tanya pinjaman jaminan BPKB";

/** Link WhatsApp dengan pesan pembuka terisi. */
export function waLink(pesan: string = WA_PESAN): string {
  return `https://wa.me/${AGEN.waNomor}?text=${encodeURIComponent(pesan)}`;
}

/** Kalimat legal yang dipakai konsisten di seluruh situs. */
export const PERNYATAAN_OJK = `Pembiayaan disalurkan oleh ${ADIRA.nama}, berizin dan diawasi Otoritas Jasa Keuangan (OJK).`;

export const DISCLOSURE_AGEN =
  "Website ini dimiliki dan dikelola oleh Agen AXI terdaftar di Adira Finance.";

/** Wilayah layanan — sesuai area pada sistem simulasi Adira. */
export const AREA_LAYANAN = [
  "Jabodetabek & sekitarnya",
  "Jawa Barat",
  "Jawa Tengah & DIY",
  "Jawa Timur",
  "Bali & Nusa Tenggara",
  "Sumatra Bagian Utara",
  "Sumatra Bagian Selatan",
  "Kalimantan",
  "Sulawesi, Maluku & Papua",
] as const;

/**
 * Akun media sosial resmi Adira Finance.
 *
 * PENTING: ini akun milik Adira Finance, BUKAN akun pengelola situs ini.
 * Footer harus menyebutkannya secara eksplisit supaya pengunjung tidak mengira
 * pesan ke akun-akun ini sampai ke agen. Kontak ke kami tetap lewat WhatsApp.
 *
 * URL dipakai juga sebagai `sameAs` pada node entitas Adira di JSON-LD —
 * profil resmi adalah rujukan yang memperkuat pengenalan entitas.
 * Diberikan pemilik pada 2026-08-31.
 */
export const SOSIAL_ADIRA = [
  { nama: "Facebook", url: "https://www.facebook.com/adirafinanceid/", ikon: "facebook" },
  { nama: "Instagram", url: "https://www.instagram.com/adirafinanceid/", ikon: "instagram" },
  { nama: "X", url: "https://x.com/AdiraFinanceID", ikon: "twitter" },
  { nama: "YouTube", url: "https://www.youtube.com/@AdiraFinanceID", ikon: "youtube" },
  { nama: "LinkedIn", url: "https://id.linkedin.com/company/adira", ikon: "linkedin" },
  { nama: "TikTok", url: "https://www.tiktok.com/@adirafinanceid", ikon: "tiktok" },
] as const;
