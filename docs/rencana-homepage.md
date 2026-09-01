# Rencana Homepage — adirafinances.com

**Bisnis:** informasi jasa pinjaman dana dengan jaminan BPKB Mobil & Motor di
Adira Finance.
**Disusun:** 2026-08-31 · **Acuan:** `.claude/skills/seo-adira/SKILL.md`
**Status:** ✅ **lengkap — semua data terkumpul, siap dieksekusi.**

**Data kunci:** PT Adira Dinamika Multi Finance, Tbk (berizin & diawasi OJK) ·
Agen AXI Sharda, ID 012625001169 · WhatsApp +62 851-2268-2981 ·
plafon/tenor dari `table-referenstatif.webp` · kalkulator dari API Dicicilaja.

---

## 1. Diagnosis homepage saat ini

Homepage yang ada sekarang adalah template "SecureVest" — digital banking &
investment global. **Nyaris tidak ada satu pun section yang cocok** dengan
bisnis gadai BPKB di Indonesia.

| # | Section sekarang | Isi | Putusan |
|---|---|---|---|
| 1 | `HeroBanner` | "Empowering your financial future" + form email | **Ganti total** (gambar hero sudah cocok) |
| 2 | `BannerTextSlider` | Global Markets, Institutional Trading… | **Ganti isi** |
| 3 | `AboutArea` | 3 nilai + video + logo klien | **Ganti isi**, video opsional |
| 4 | `BankingArea` | "One card for all your global journeys" | **Ganti** jadi jenis jaminan |
| 5 | `ServiceOverview` | 6 kartu layanan bank korporat | **Ganti isi** |
| 6 | `BenefitsArea` | slider 4 slide cashback/wealth | **Ganti isi** |
| 7 | `TrustArea` | pie 97% / 98% / 99% tanpa sumber | **Hapus** kecuali ada angka nyata |
| 8 | `EmiCalculator` | 5 tab slider angsuran | **ASET TERBAIK — pertahankan**, ubah ke Rupiah |
| 9 | `RoiCalculator` | form investasi + grafik Chart.js | **Hapus** — tidak relevan |
| 10 | `TestimonialArea` | kutipan lorem ipsum atas nama orang berfoto | **Hapus** (diputuskan 2026-08-31) |
| 11 | `IntegrationArea` | canvas Matter.js "200+ integrations" | **Hapus** — klaim palsu, berat |
| 12 | `BlogArea` | 3 kartu artikel | **Pertahankan** |

**Risiko terbesar bukan teknis, tapi kepercayaan.** Situs keuangan = YMYL,
standar kualitas paling ketat Google. Konten fiktif (alamat Melbourne,
`support@gmail.com`, testimoni lorem ipsum, statistik karangan) di situs
pinjaman bukan sekadar buruk untuk SEO — itu masuk wilayah kebijakan spam
*Scam and Fraud* Google: "displaying false information".

---

## 2. Wajib diputuskan sebelum eksekusi

Tanpa jawaban ini, homepage tidak bisa dibuat benar. Saya **tidak akan mengarang**
penggantinya.

| # | Butuh data | Status | Kenapa krusial |
|---|---|---|---|
| 1 | Entitas & hubungan dengan Adira | ✅ **selesai** — PT Adira Dinamika Multi Finance, Tbk; situs sudah berizin | Menentukan seluruh penyusunan kalimat |
| 2 | Status izin OJK | ✅ **ada** — berizin & diawasi OJK | Sinyal Trust nomor satu di pembiayaan |
| 3 | Alamat + kontak | ✅ **ada** — Kantor Pusat Adira (lihat NAP di bawah) | Ganti data Melbourne palsu |
| 4 | Plafon, tenor, angsuran | ✅ **ada** — `public/images/table-referenstatif.webp` + API Dicicilaja | Isi kalkulator & tabel |
| 5 | Nama + peran penanggung jawab | ✅ **selesai** — Sharda, Agen AXI, ID 012625001169 | "Who" dari kerangka Who/How/Why Google |
| 6 | Testimoni | ✅ **selesai** — tidak ditampilkan, section dihapus | — |
| 7 | Wilayah layanan | 🟡 **sebagian** — API punya 9 area nasional | Menentukan boleh/tidaknya halaman kota |

### NAP resmi (tulis persis sama di semua tempat)

```
PT Adira Dinamika Multi Finance, Tbk
Millenium Centennial Center Lt. 53-61
Jl. Jend. Sudirman Kav. 25, Karet Setiabudi
Jakarta Selatan, DKI Jakarta 12920
Telepon : 1500511
Email   : customercare@adira.co.id
```

Bentuk `PostalAddress` untuk JSON-LD:

```jsonc
"address": {
  "@type": "PostalAddress",
  "streetAddress": "Millenium Centennial Center Lt. 53-61, Jl. Jend. Sudirman Kav. 25, Karet Setiabudi",
  "addressLocality": "Jakarta Selatan",
  "addressRegion": "DKI Jakarta",
  "postalCode": "12920",
  "addressCountry": "ID"
},
"telephone": "1500511",
"email": "customercare@adira.co.id"
```

### ⚠️ Dua konsekuensi yang mengubah rencana

Kontak di atas adalah **kontak korporat Adira**, bukan kontak kantor Anda
sendiri. Ada dua akibat yang perlu diputuskan, bukan diabaikan:

**a. SEO lokal / Google Business Profile praktis gugur.**
GBP untuk alamat Sudirman itu milik Adira dan sudah ada. Situs ini tidak bisa
mengklaimnya. Artinya: **hapus ambisi masuk map pack** dari rencana, kecuali
Anda punya kantor sendiri yang bisa diverifikasi. NAP yang mengarah ke
`adira.co.id` juga memperkuat entitas Adira — bukan entitas situs ini.
→ §S8 "Wilayah layanan" diturunkan jadi daftar cakupan layanan (9 area dari
API), **bukan** halaman lokal berbasis GBP.

**b. CTA kehilangan jalur lead — ✅ SUDAH DIPUTUSKAN.**
`1500511` adalah call center nasional Adira; kalau CTA utama mengarah ke sana,
lead lepas ke Adira pusat. Karena itu dipakai pemisahan peran:

| Peran | Kontak |
|---|---|
| **CTA utama** (hero, kalkulator, penutup, tombol melayang) | **WhatsApp 6285122682981** |
| **Blok legal** (footer) | NAP resmi Adira + 1500511 + customercare@adira.co.id |

Format penulisan yang dipakai konsisten:

```
Tampilan  : +62 851-2268-2981
Link      : https://wa.me/6285122682981
tel:      : +6285122682981
JSON-LD   : "telephone": "+6285122682981"  (pada node Person/agen)
```

Sertakan pesan pembuka terisi supaya konteksnya jelas dan lead mudah
ditindaklanjuti, mis.
`https://wa.me/6285122682981?text=Halo%2C%20saya%20ingin%20tanya%20pinjaman%20jaminan%20BPKB`

### Entitas & klaim OJK — sudah diputuskan

Pemilik menegaskan (2026-08-31) bahwa **adirafinances.com sudah mendapatkan
izin** dan entitas yang dipakai di seluruh situs adalah:

> **PT Adira Dinamika Multi Finance, Tbk** — berizin dan diawasi
> Otoritas Jasa Keuangan (OJK)

Kalimat baku yang dipakai konsisten di hero, footer, dan halaman Tentang Kami:

> Pembiayaan disalurkan oleh **PT Adira Dinamika Multi Finance, Tbk**, berizin
> dan diawasi Otoritas Jasa Keuangan (OJK).

Dua catatan pelaksanaan:

1. **Simpan bukti penunjukan/keagenan** di arsip. Tidak perlu ditampilkan di
   situs, tapi itulah pegangan kalau penggunaan merek dipertanyakan.
2. **Nama entitas ditulis persis dan konsisten** — "PT Adira Dinamika Multi
   Finance, Tbk" — di footer, JSON-LD, dan Google Business Profile. Penulisan
   yang berbeda-beda memecah sinyal entitas.

### Identitas pengelola situs ("Who")

| | |
|---|---|
| Nama Agen AXI | **Sharda** |
| ID AXI | **012625001169** |
| Peran | Agen AXI terdaftar di Adira Finance |
| WhatsApp | **+62 851-2268-2981** (`6285122682981`) |

**Kalimat disclosure wajib di footer** (verbatim):

> Website ini dimiliki dan dikelola oleh Agen AXI terdaftar di Adira Finance.

Kalimat ini menutup pertanyaan entitas dengan rapi: pembiayaan oleh Adira
(berizin OJK), situs dikelola oleh agen terdaftar. Pembaca dan Google
mendapat gambaran yang jujur dan lengkap — persis "Who" yang diminta Google.

Menampilkan **ID AXI** menambah nilai: ia bisa diverifikasi ke Adira, dan
sinyal yang bisa dicek adalah sinyal Trust terkuat di YMYL.

### Pemodelan entitas di JSON-LD (teknis, bukan legal)

`adira.co.id` adalah properti merek kanonik di Knowledge Graph Google. Kalau
situs ini memancarkan `Organization` yang mengklaim **sebagai** PT Adira
Dinamika Multi Finance Tbk dari domain berbeda, dua entitas jadi bersaing dan
Google bisa tidak memercayai keduanya.

Modelkan sebagai **relasi**, bukan klaim identitas. Dengan disclosure agen di
atas, strukturnya jadi jelas dan aman:

```jsonc
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://adirafinances.com/#website",
      "url": "https://adirafinances.com/",
      "inLanguage": "id-ID",
      "publisher": { "@id": "https://adirafinances.com/#agen" }
    },
    {
      // Pengelola situs — bukan Adira, tapi agen terdaftarnya
      "@type": "Person",
      "@id": "https://adirafinances.com/#agen",
      "name": "Sharda",
      "jobTitle": "Agen AXI Terdaftar",
      "identifier": "012625001169",
      "telephone": "+6285122682981",
      "affiliation": { "@id": "https://adirafinances.com/#adira" }
    },
    {
      // Entitas berizin — sameAs menunjuk ke properti kanonik, bukan menyaingi
      "@type": "FinancialService",
      "@id": "https://adirafinances.com/#adira",
      "name": "PT Adira Dinamika Multi Finance, Tbk",
      "address": { /* PostalAddress dari §2 */ },
      "telephone": "1500511",
      "email": "customercare@adira.co.id",
      "sameAs": "https://adira.co.id/"
    },
    {
      "@type": "Service",
      "name": "Pinjaman Dana Jaminan BPKB Mobil & Motor",
      "provider": { "@id": "https://adirafinances.com/#adira" },
      "areaServed": [ /* 9 area dari API */ ]
    }
  ]
}
```

Kuncinya ada di `sameAs: https://adira.co.id/` — itu **menunjuk** ke entitas
merek kanonik alih-alih bersaing dengannya. Situs punya identitas sendiri
(agen), entitas berizin disebut akurat, tidak ada tabrakan Knowledge Graph.

---

## 3. Target kata kunci homepage

Homepage menyasar **head term + merek**, bukan semua kata kunci.

- **Utama:** gadai BPKB mobil, pinjaman jaminan BPKB, dana tunai jaminan BPKB
- **Turunan:** gadai BPKB motor, pinjaman BPKB Adira Finance, dana cepat jaminan BPKB
- **Intent:** transaksional + investigasi komersial. Pengguna ingin tahu
  **berapa cair, syaratnya apa, berapa lama, aman tidak, hubungi siapa**.

Kata kunci ekor panjang ("syarat gadai BPKB mobil atas nama orang lain", dll.)
**bukan** tugas homepage — itu tugas halaman pendukung di §6.

---

## 4. Susunan section homepage

Urutan mengikuti urutan pertanyaan di kepala calon peminjam, bukan urutan
template.

### S1 — Hero
**Menjawab:** "Situs ini bisa apa untuk saya, dan berapa yang bisa cair?"

- `<h1>`: memuat layanan + jaminan secara harfiah, mis. *"Pinjaman Dana Jaminan
  BPKB Mobil & Motor di Adira Finance"*
- Subjudul: plafon, tenor, estimasi waktu proses — **angka nyata saja**
- **Disclosure keagenan langsung di hero atau tepat di bawahnya.** Satu baris,
  jujur. Ini melindungi dari masalah impersonasi sekaligus menaikkan Trust
- CTA ganda: **WhatsApp +62 851-2268-2981** (aksi utama) + "Hitung simulasi"
  (anchor ke S5)
- Gambar hero yang sudah ada (keluarga + mobil) **sudah tepat** — pertahankan,
  sudah `next/image` + `priority`
- ❌ Ganti form email dengan kontak langsung. Orang butuh dana cepat tidak mau
  menunggu balasan email

### S2 — Ringkasan kepercayaan (pengganti ticker)
**Menjawab:** "Ini legal dan aman?"

Empat butir pendek, semuanya faktual: status keagenan · pembiayaan oleh PT
Adira Dinamika Multi Finance (berizin & diawasi OJK) · BPKB disimpan aman ·
tanpa biaya di muka (kalau memang begitu).

> Ini yang menggantikan `TrustArea` pie 97%/98%/99% yang dikarang.

### S3 — Jenis jaminan: Mobil vs Motor
**Menjawab:** "Kendaraan saya memenuhi syarat?"

Dua kartu berdampingan. Per kartu: rentang plafon · tenor · syarat tahun
kendaraan · atas nama siapa · link ke halaman detail.
Pakai ulang tata letak `BankingArea`.

### S4 — Syarat & dokumen
**Menjawab:** "Apa yang harus saya siapkan?"

Checklist konkret (KTP, KK, BPKB, STNK aktif, bukti penghasilan…). Dipisah:
karyawan / wiraswasta. Ini blok yang paling sering di-screenshot pengguna dan
sangat mungkin dikutip AI Overviews.

### S5 — Simulasi angsuran ⭐ (dua lapis)
**Menjawab:** "Cicilannya berapa per bulan?"

**Aset terkuat situs ini** — dan harus dibuat **dua lapis**, karena keduanya
melayani tujuan berbeda.

#### Lapis A — Tabel angsuran sebagai HTML (untuk Google)

> 🔴 **Temuan paling penting di dokumen ini.**
> `table-referenstatif.webp` adalah **gambar**. Google tidak bisa membaca angka
> di dalamnya. Semua nominal di situ — yang justru paling dicari orang —
> tidak akan pernah terindeks selama masih berupa `.webp`.

Render ulang isinya sebagai **`<table>` HTML asli**:

| Produk | Plafon | Tenor tersedia |
|---|---|---|
| BPKB **Motor** | Rp3.000.000 – Rp20.000.000 | 11 / 17 / 23 / 29 / 35 bulan |
| BPKB **Mobil** | Rp25.000.000 – Rp200.000.000 | 11 / 23 / 35 / 47 bulan |

Contoh baris nyata dari tabel: motor Rp5.000.000 → Rp675.000 (11 bln) ·
Rp491.000 (17) · Rp407.000 (23) · Rp359.000 (29) · Rp330.000 (35).
Mobil Rp50.000.000 → Rp5.549.000 (11) · Rp3.075.000 (23) · Rp2.283.000 (35) ·
Rp1.883.000 (47).

Kenapa ini berharga: menjawab kueri ekor panjang bervolume nyata seperti
*"angsuran gadai BPKB motor 5 juta"* atau *"cicilan gadai BPKB mobil 50 juta"*
— dan berupa teks, jadi bisa dikutip AI Overviews. Gambarnya tetap boleh
dipajang sebagai pelengkap visual, tapi **angkanya wajib ada sebagai teks**.

⚠️ Tabel ini bersifat **representatif**. Wajib diberi label demikian, plus
tanggal berlaku, dan diarahkan ke Lapis B untuk angka sesuai kendaraan.

#### Lapis B — Kalkulator interaktif (untuk konversi)

Ambil dari `d:/nextjs_projects/adiracabang.id`:

- `app/api/simulasi/route.ts` — proxy ke `https://prod.dicicilaja.com/v3/simulation/api`
- `app/components/KalkulatorSimulasiAdira.js` — UI 752 baris, sudah jadi

Alurnya: pilih jenis jaminan (Mobil Penumpang / Mobil Niaga / Motor) → area
(9 wilayah) → merek → model → tahun → API mengembalikan **min & maks
pencairan**, lalu `POST /simulasi/hitung-semua-tenor` mengembalikan angsuran
untuk semua tenor. Khusus mobil ada pilihan tipe angsuran (di muka/belakang)
dan asuransi (TLO/All Risk).

Ini **data hidup dari sistem Adira sendiri** (Dicicilaja adalah platform digital
Adira) — akurasinya jauh di atas rumus tebakan, dan itu sinyal Trust yang nyata.

Catatan teknis saat memindahkan:
- Butuh route handler sendiri di project ini (server-side, hindari CORS)
- Sumber pakai `react-select` + `react-icons`; project ini belum punya keduanya
  → pasang, atau tulis ulang dengan komponen yang ada
- **Jangan** ubah `EmiCalculator` lama jadi ini. Lebih baik `EmiCalculator`
  dihapus dan diganti komponen ini
- `lib/format.ts` masih **USD** → ganti ke `id-ID` / IDR
- Kalkulator client-side **tidak terindeks** — itulah sebabnya Lapis A wajib ada

Disclaimer wajib di kedua lapis: hasil simulasi bersifat estimasi; plafon dan
angsuran final ditentukan Adira Finance setelah survei.

### S6 — Alur pengajuan
**Menjawab:** "Prosesnya bagaimana dan berapa lama?"

4 langkah bernomor dengan estimasi waktu tiap langkah. Jujur soal durasi;
janji "cair 1 jam" yang tidak bisa ditepati merusak Trust dan memancing
keluhan.

### S7 — Kenapa lewat kami
**Menjawab:** "Kenapa tidak langsung ke Adira saja?"

Pertanyaan ini pasti muncul dan **harus dijawab**: pendampingan pengisian
berkas, bantu cek kelayakan sebelum diajukan, satu narahubung. Pakai ulang
`ServiceOverview` (kartu), isinya diganti.

### S8 — Wilayah layanan
**Menjawab:** "Melayani daerah saya?"

Daftar kota/wilayah nyata + alamat kantor + peta. Ini pondasi SEO lokal dan
menyambung ke Google Business Profile.
❌ **Jangan** bikin satu halaman per kota sekarang — itu *doorway abuse* selama
isinya belum benar-benar berbeda per kota.

### S9 — FAQ
**Menjawab:** sisa keberatan (BPKB atas nama orang lain? STNK mati? kredit
berjalan? BI Checking?)

8–12 pertanyaan yang benar-benar ditanyakan, jawaban langsung di paragraf
pertama.

> **Catatan penting:** Google menghentikan FAQ rich results pada **7 Mei 2026**.
> Jadi FAQ ini dibuat **untuk pengguna dan kutipan AI**, bukan untuk cuplikan
> kaya. Schema `FAQPage` masih valid dan tidak berbahaya, tapi jangan
> dijadikan alasan — tidak ada lagi keuntungan tampilan SERP-nya.

### ~~S10 — Testimoni~~ — DIHAPUS
Diputuskan 2026-08-31: testimoni **tidak ditampilkan**. Komponen
`TestimonialArea` dihapus dari homepage beserta datanya.

> Ini keputusan yang benar. Section testimoni kosong atau diisi kutipan
> generik justru menurunkan Trust di halaman pinjaman. Lebih baik tidak ada
> daripada terlihat dikarang. Bisa dihidupkan lagi nanti kalau sudah ada
> testimoni asli berizin.

### S10 — Artikel terbaru
3 artikel dari blog. Ini yang menyalurkan otoritas ke halaman pendukung §6 dan
membuktikan situs dirawat. Pakai ulang `BlogArea`.

### S11 — CTA penutup + Footer
CTA: kontak yang benar-benar dijawab (lihat keputusan CTA di §2b) + jam
operasional.

Footer wajib memuat, berurutan:

1. **NAP resmi** dari §2
2. **Pernyataan OJK:** "Pembiayaan disalurkan oleh PT Adira Dinamika Multi
   Finance, Tbk, berizin dan diawasi Otoritas Jasa Keuangan (OJK)."
3. **Disclosure agen (verbatim):** "Website ini dimiliki dan dikelola oleh
   Agen AXI terdaftar di Adira Finance."
4. Nama & ID Agen AXI — Sharda · 012625001169
5. Kebijakan privasi + link halaman pendukung
❌ Buang "©2026 SecureVest", alamat Melbourne, `support@gmail.com`,
`+0001234455`.

---

## 5. Metadata & data terstruktur

```
Title       : Pinjaman Jaminan BPKB Mobil & Motor Adira Finance | <Nama Usaha>
              (≤ ~60 karakter, kata kunci di depan)
Description : 1–2 kalimat: layanan, plafon, wilayah, ajakan hubungi
lang        : "id"  ← sekarang masih "en" di app/layout.tsx
canonical   : https://adirafinances.com/
```

Wajib ditambahkan (belum ada sama sekali):

- `app/sitemap.ts` dan `app/robots.ts` (konvensi file Next.js)
- `metadataBase` + Open Graph
- JSON-LD: **`FinancialService`** atau `LocalBusiness` (nama, alamat, telepon,
  jam buka, areaServed) + `BreadcrumbList`
- Tandai **hanya** yang benar-benar tampil di halaman

---

## 6. Halaman pendukung (cakupan topik, bukan doorway)

Homepage tidak boleh menanggung semuanya. Bangun bertahap, **satu halaman per
maksud pencarian**, saling terhubung dengan anchor deskriptif:

1. `/gadai-bpkb-mobil` — detail lengkap
2. `/gadai-bpkb-motor` — detail lengkap
3. `/simulasi-angsuran` — versi mandiri dari kalkulator
4. `/syarat-dan-dokumen`
5. `/cara-pengajuan`
6. `/tentang-kami` — badan usaha, orang, hubungan dengan Adira ("Who")
7. `/kontak`
8. `/blog/*` — pertanyaan ekor panjang

**Aturan:** gabungkan halaman yang tumpang tindih, jangan menambah. Satu
halaman per variasi kata kunci = *doorway abuse*, dan justru itu yang disasar
spam update Juni & Agustus 2026.

---

## 7. Yang sengaja TIDAK dilakukan

- ❌ Statistik, penghargaan, jumlah ulasan, atau testimoni karangan
- ❌ Halaman kota massal sebelum kontennya benar-benar berbeda
- ❌ `llms.txt` atau schema "khusus AI" — dokumentasi Google menyatakan tidak
  ada persyaratan tambahan untuk AI Overviews / AI Mode
- ❌ Mengejar kepadatan kata kunci atau jumlah kata minimum — bukan faktor
  peringkat
- ❌ Menulis "tingkatkan skor E-E-A-T" — skor itu tidak ada
- ❌ Menjanjikan peringkat atau tenggat pemulihan; Google sendiri tidak
  menjamin perubahan berdampak

---

## 8. Urutan eksekusi

**Tahap 0 — pembersihan (blokir rilis)**
1. Kumpulkan data §2
2. Hapus semua konten fiktif (Footer, TrustArea, TestimonialArea, metadata)
3. Lengkapi `public/img/**` — sekarang ~60 gambar 404
4. `lang="id"`, metadata asli, `sitemap.ts`, `robots.ts`

**Tahap 1 — homepage**
5. S1 Hero + disclosure keagenan (pakai kalimat OJK yang benar di §2)
6. **S5 Lapis A** — tabel angsuran jadi HTML. Dampak SEO tertinggi, usaha
   paling kecil: angkanya sudah ada, tinggal dipindah dari gambar ke teks
7. **S5 Lapis B** — pindahkan kalkulator Dicicilaja dari `adiracabang.id`
8. S3, S4, S6 — jaminan, syarat, alur (S6 bisa mengikuti alur di gambar tabel:
   Hitung Maksimal Pencairan → Survei → Datang ke Cabang → Penyerahan BPKB → Cair)
9. S2, S7, S8, S9 — trust, alasan, wilayah, FAQ
10. S10, S11 + JSON-LD (`Service` + `provider` Adira, `PostalAddress` dari §2)

**Tahap 2 — setelah homepage jujur & lengkap**
10. Halaman pendukung §6, satu per satu
11. Google Search Console + Google Business Profile
12. Blog untuk pertanyaan ekor panjang

**Cara tahu ini gagal:** kalau setelah 2–3 bulan halaman terindeks tapi tidak
dapat impresi untuk "gadai BPKB", berarti masalahnya kecocokan maksud
pencarian/kepercayaan — bukan teknis. Pantau di Search Console: impresi &
posisi rata-rata untuk kueri BPKB, bukan sekadar jumlah halaman terindeks.
