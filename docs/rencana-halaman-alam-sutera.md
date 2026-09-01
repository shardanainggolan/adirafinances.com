# Rencana Halaman — /adira-finance-alam-sutera

Disusun 2026-09-01. Mengikuti `.claude/skills/seo-adira/SKILL.md`, khususnya §3
(kebijakan spam), §5 (satu halaman per intent), dan §8 (halaman lokal).

---

## 0. Penghalang yang harus diputuskan sebelum menulis satu baris pun

`https://adiracabang.id/cabang/adira-alam-sutera-tangerang` **hidup, status 200**
(diperiksa 2026-09-01).

Menerbitkan halaman cabang yang sama di adirafinances.com berarti dua situs,
operator sama, layanan sama, nomor WhatsApp sama, mengejar kueri yang sama.
Itu bentuk yang disebut contoh kebijakan *scaled content abuse* — "creating
multiple sites with the intent of hiding the scaled nature of the content" —
terlepas dari niatnya.

**Putuskan dulu, satu cabang satu domain:**

| Pilihan | Konsekuensi |
|---|---|
| Hapus / `noindex` di adiracabang.id, terbitkan baru di sini | Paling bersih. Kehilangan sisa ekuitas halaman lama, yang saat ini kemungkinan tersupresi juga |
| 301 dari adiracabang.id ke sini | Konsolidasi, **tapi redirect membawa serta penilaian algoritmik** halaman lama |
| Biarkan keduanya hidup | Pilihan terburuk. Jangan |

Sisa dokumen ini mengasumsikan salah satu dari dua pilihan pertama sudah diambil.

---

## 1. Temuan yang membuat halaman ini layak ada

Alamat cabang dari dataset pemilik:

> Jl. Raya Serpong Kilometer 7 No.38, **Pakulonan** — kec. Serpong Utara,
> Kota Tangerang Selatan, Banten 15325

Alamat **Adira Expo Alam Sutera** menurut penelusuran ke sumber Adira:

> Jl. Raya Serpong KM 7 No. 38, Serpong Utara, Tangerang Selatan

**Sama.** Kantor cabang dan Adira Expo Alam Sutera berada di satu lokasi.

Ini bukan detail kecil — ini yang membedakan halaman ini dari 372 halaman
template di adiracabang.id. Satu lokasi yang menjalankan dua fungsi adalah
bahan tulisan yang tidak bisa dihasilkan cetakan mana pun, dan ia menyatukan
kelima kata kunci menjadi **satu intent tunggal**, bukan lima.

**Temuan kedua, sama pentingnya:** namanya "Alam Sutera - Tangerang", tetapi
kantornya secara administratif berada di **Kota Tangerang Selatan**, bukan Kota
Tangerang. Orang mencari "adira alam sutera tangerang"; alamat resminya
Tangerang Selatan. Menjelaskan kebingungan ini adalah informasi yang benar-benar
menolong pembaca — dan langsung melayani salah satu kata kunci target.

---

## 2. Pemetaan kata kunci → intent

| Kata kunci | Intent sebenarnya | Ditangani di |
|---|---|---|
| adira alam sutera | Navigasional — temukan lokasinya | S2, S3 |
| adira finance alam sutera | Navigasional — sama | S2, S3 |
| adira alam sutera tangerang | Navigasional + kebingungan Tangerang/Tangsel | S2, S9 |
| adira alam sutera otomotif | Pembiayaan kendaraan di lokasi ini | S4 |
| adira expo alam sutera | Apa itu, ada apa di sana | S5 |

Kelimanya adalah **satu orang mencari satu tempat**. Karena itu semuanya masuk
ke satu halaman. Membuat halaman terpisah per varian adalah doorway abuse (§3
skill) — dan kebetulan juga tidak perlu, karena lokasinya memang satu.

---

## 3. Fakta terverifikasi vs yang belum

Ini halaman YMYL. Yang belum terverifikasi **tidak terbit**.

### Terverifikasi — boleh ditulis

| Fakta | Sumber |
|---|---|
| Jl. Raya Serpong KM 7 No. 38, Pakulonan, 15325 | dataset cabang milik pemilik |
| Kec. Serpong Utara · Kota Tangerang Selatan · Banten | `sub_districts.csv` / `districts.csv` (kode BPS 3674070 / 3674) |
| Telepon 021-53124550, 021-53124573 · Fax 021-53124559 | dataset cabang |
| Koordinat −6.2511544, 106.6482111 | dataset cabang |
| Cabang terdekat: Ciledug 7,5 km · Pasar Baru Tangerang 9,5 km · Ciputat 12,9 km | dihitung dari koordinat dataset |
| Kecamatan di Tangsel: Setu, Serpong, Pamulang, Ciputat, Ciputat Timur, Pondok Aren, Serpong Utara | `sub_districts.csv` |
| Adira Expo adalah program resmi Adira Finance | adira.co.id memuat beberapa halaman program Adira Expo |
| Adira Expo Alam Sutera nyata | adira.co.id menerbitkan artikel dengan slug `…di-adira-expo-alam-sutera` |

### Belum terverifikasi — WAJIB dicek pemilik sebelum terbit

Semua ini muncul di ringkasan penelusuran dan sumber sekunder. Saya **tidak
berhasil membaca badan artikel di adira.co.id** (halamannya dirender JavaScript),
jadi tidak ada satu pun yang boleh ditulis sebagai fakta sekarang:

- [ ] Ada **SPKLU** (stasiun pengisian kendaraan listrik) di lokasi
- [ ] Adira Expo Alam Sutera bersifat **tetap/permanen**, bukan berkala
- [ ] Mobil & motor **bekas** dipajang di sana saat ini
- [ ] Jam operasional cabang dan jam operasional expo
- [ ] Kedua nomor telepon masih aktif
- [ ] Apakah promo/undian yang sedang berjalan masih berlaku

Aturannya tegas: kalau tidak terverifikasi, tulis apa yang diketahui dan
arahkan ke kanal resmi Adira. **Jangan mengarang tanggal, jam, atau fasilitas.**

### Konteks kompetitif (jangan ditiru)

`adiraalamsutera.id` menempatkan diri sebagai *"Website RESMI ADIRA"*. Jangan
pakai klaim semacam itu. Situs ini situs agen AXI, dan menyebut diri "resmi"
adalah persis yang dijerat kebijakan *Scam and Fraud* — "impersonating an
official business or service".

---

## 4. Kerangka section

Prinsipnya satu: **boilerplate nasional keluar dari halaman ini.** Syarat penuh,
tabel angsuran, daftar produk, alur pengajuan — semuanya sudah punya halaman
kanonik. Di sini cukup ringkasan satu-dua kalimat plus tautan. Halaman 250 kata
yang 90% khas jauh lebih kuat daripada 700 kata yang 3% khas — itu pelajaran
yang sudah dibayar mahal di adiracabang.id.

### S1 — Hero

- H1: `Adira Finance Alam Sutera — Serpong Utara, Tangerang Selatan`
- Satu paragraf pembuka yang menyebut fungsi ganda lokasi: kantor cabang **dan**
  Adira Expo Alam Sutera, di Jl. Raya Serpong KM 7.
- Breadcrumb: Beranda › Cabang › Alam Sutera
- CTA WhatsApp dengan pesan terisi konteks lokasi:
  `waLink("Halo, saya ingin tanya pembiayaan di Adira Alam Sutera")`
- **Jangan** taruh nomor WhatsApp agen di `<title>`. Itu kesalahan yang membuat
  372 judul di adiracabang.id terlihat sebagai satu corong.

### S2 — Lokasi & kontak

- Alamat lengkap, kode pos, kecamatan/kota/provinsi
- Telepon cabang **asli** (021-53124550 / 021-53124573) — beri label jelas
  "telepon cabang", terpisah dari WhatsApp agen
- Peta (koordinat sudah ada di dataset)
- Satu kalimat yang meluruskan Tangerang vs Tangerang Selatan

### S3 — Cara ke sana

- Patokan jalan dari arah Serpong dan dari arah Alam Sutera
- Akses transportasi umum bila relevan
- **Ini bagian yang harus ditulis dari pengalaman**, bukan dari peta. Kalimat
  seperti "kawasan pasar biasanya jadi patokan warga sekitar" adalah pengisi
  generik — persis pola yang membuat halaman adiracabang.id gagal.

### S4 — Pembiayaan yang dilayani di lokasi ini

Melayani kata kunci **adira alam sutera otomotif**.

- Gadai BPKB mobil & motor, take over, top up, kredit kendaraan bekas
- Masing-masing satu kalimat + tautan ke halaman kanonik
- Kalau ada yang khas di lokasi ini (misal jenis kendaraan yang lazim diajukan
  di kawasan Serpong/BSD), tulis. Kalau tidak ada, jangan dipaksakan.

### S5 — Adira Expo Alam Sutera

Melayani kata kunci **adira expo alam sutera**. Bagian dengan nilai tertinggi
sekaligus risiko tertinggi.

- Jelaskan apa itu Adira Expo sebagai program Adira Finance
- Nyatakan bahwa lokasinya sama dengan kantor cabang ini
- **Hanya tulis detail yang sudah dicentang di §3.** Untuk jadwal dan promo yang
  berubah-ubah, arahkan ke kanal resmi Adira, jangan bekukan tanggal di halaman
  statis yang akan basi
- Jangan menyiratkan Anda penyelenggaranya

### S6 — Area yang dilayani

- Sebutkan tujuh kecamatan Tangerang Selatan (daftar di §3) apa adanya
- Gunakan frasa **"cabang terdekat"** — fakta geografis yang bisa dihitung.
  Jangan **"cabang yang melayani wilayah Anda"**; pembagian teritori operasional
  Adira tidak ada di data mana pun yang kita punya

### S7 — Syarat, ringkas saja

- Maksimal 5 poin, lalu tautkan ke halaman syarat kanonik
- **Jangan** salin blok syarat lengkap ke sini. Blok itu sudah bersaing dengan
  dirinya sendiri di 372 URL adiracabang.id; jangan tambah satu lagi

### S8 — Cabang lain terdekat

- Ciledug 7,5 km · Pasar Baru Tangerang 9,5 km · Ciputat 12,9 km
- Berguna untuk pembaca, dan membentuk tautan internal yang wajar

### S9 — Pertanyaan seputar lokasi ini

Hanya pertanyaan yang **khas lokasi ini**, bukan FAQ produk nasional:

- Adira Alam Sutera itu di Tangerang atau Tangerang Selatan?
- Apakah kantor cabang dan Adira Expo di alamat yang sama?
- Cabang mana yang paling dekat kalau saya dari Ciputat / Pondok Aren?

Catatan: FAQ rich results sudah dihapus Google sejak 7 Mei 2026 (§7 skill).
Buat FAQ ini untuk pembaca, bukan untuk fitur SERP.

### S10 — Disclosure & CTA

- Kalimat OJK: `PERNYATAAN_OJK` dari `lib/site.ts`
- Disclosure agen: `DISCLOSURE_AGEN` — **wajib**, dan di halaman ini lebih
  penting dari halaman mana pun, karena pembaca bisa mengira ini halaman resmi
  cabang atau expo
- CTA WhatsApp

---

## 5. Metadata

```
URL       : /adira-finance-alam-sutera
title     : Adira Finance Alam Sutera, Serpong Utara — Lokasi & Pengajuan
meta desc : Alamat, kontak, dan layanan pembiayaan Adira Finance Alam Sutera
            di Jl. Raya Serpong KM 7, Serpong Utara, Tangerang Selatan.
canonical : https://adirafinances.com/adira-finance-alam-sutera
```

- **Tanpa nomor telepon di judul.**
- Judul tidak boleh berbunyi seperti klaim sebagai halaman resmi cabang.
- Kata kunci di path URL efeknya dapat diabaikan (§1 skill) — slug ini dipilih
  agar deskriptif, bukan demi peringkat.

---

## 6. Structured data

Ikuti §0 skill — jangan memancarkan `Organization` yang mengklaim **menjadi**
PT Adira Dinamika Multi Finance Tbk dari domain ini; itu bertabrakan dengan
entitas adira.co.id di Knowledge Graph.

- `BreadcrumbList` — aman
- `Service` / `FinancialProduct` dengan
  `provider: { "@type": "FinancialService", "name": "PT Adira Dinamika Multi Finance, Tbk" }`
- **Hati-hati dengan `LocalBusiness`.** Menandai halaman ini sebagai
  `LocalBusiness` menyiratkan situs ini yang mengoperasikan tempat itu. Kantor
  itu milik Adira, bukan milik pengelola situs. Aman: sebut lokasinya sebagai
  `Place` di dalam konten, dan biarkan `Organization` situs tetap milik operator
  agen
- Hanya tandai apa yang benar-benar tampil di halaman

---

## 7. Tautan internal

Masuk: dari `/` (bila nanti ada blok wilayah) dan dari halaman cabang lain
di sekitar Tangerang.
Keluar: `/simulasi`, halaman syarat, halaman produk, `/tentang`.

Tautan keluar ke halaman kanonik bukan kebocoran — justru itu yang memungkinkan
boilerplate dikeluarkan dari halaman ini.

---

## 8. Pagar pengaman — uji sebelum terbit

1. **Uji penghapusan.** Hapus "Alam Sutera", "Serpong", "Tangerang Selatan" dari
   draf. Kalau yang tersisa masih halaman yang berguna dan tidak ada di tempat
   lain, halaman ini layak. Kalau yang tersisa adalah boilerplate nasional,
   ulangi.
2. **Ukur duplikasinya dengan benar.** Normalkan dulu nama tempat, baru
   bandingkan — tanpa itu angkanya menyanjung diri sendiri (33% vs 63% di kasus
   adiracabang.id). Bandingkan juga terhadap adiracabang.id, bukan hanya
   terhadap halaman di domain ini.
3. Patokan kerja saya, **bukan ambang dari Google** — Google tidak menerbitkan
   angka apa pun soal ini: mayoritas isi halaman harus tidak muncul di halaman
   lain mana pun di kedua domain. Halaman Kendari di adiracabang.id lolos 3,2%
   dengan ukuran ini.
4. Nol fakta yang belum dicentang di §3.
5. Nomor WhatsApp agen tidak boleh tampil sebagai nomor cabang, di mana pun.

---

## 9. Yang hanya bisa ditulis pemilik

Bagian inilah yang membuat halaman ini bertahan, dan tidak ada template yang
bisa menghasilkannya. Tulis dari pengalaman langsung sebagai agen AXI:

- Dokumen apa yang biasanya diminta di cabang ini
- Bagaimana survei dijadwalkan untuk kawasan Serpong/BSD/Alam Sutera
- Berapa lama proses biasanya dari pengajuan sampai cair di sini
- Jenis/tahun kendaraan yang cenderung diterima
- Patokan jalan yang benar-benar dipakai orang untuk sampai ke sana
- Apa yang berbeda kalau datang saat Adira Expo sedang berlangsung

Kalau bagian ini kosong, halaman ini sebaiknya tidak terbit — karena tanpa itu,
yang tersisa hanyalah alamat plus boilerplate, dan itu persis halaman yang baru
saja kehilangan peringkatnya.

---

## 10. Daftar periksa sebelum terbit

- [ ] Keputusan satu-cabang-satu-domain diambil dan dijalankan (§0)
- [ ] Enam butir verifikasi di §3 selesai dicentang
- [ ] Tulisan tangan pertama di §9 tersedia
- [ ] Uji penghapusan lolos (§8.1)
- [ ] Duplikasi ternormalisasi diukur terhadap kedua domain (§8.2)
- [ ] Tidak ada nomor agen di judul; disclosure agen tampil (§4 S10)
- [ ] Structured data tidak mengklaim menjadi Adira (§6)
- [ ] Kontras WCAG AA & regresi Playwright lolos, seperti halaman lain

---

## Sumber

- [Google — Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google — SEO Starter Guide (ID)](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=id)
- [Adira Finance — artikel Adira Expo Alam Sutera](https://www.adira.co.id/detail_berita/metalink/keseruan-mengikuti-pengundian-umrah-untuk-sahabat-bersama-adira-finance-di-adira-expo-alam-sutera)
- [Adira Finance — Adira Expo](https://www.adira.co.id/informasi_internal/metalink/adira-expo)
- [Adira Finance — Lokasi Cabang](https://www.adira.co.id/map)
- Dataset cabang milik pemilik: `public/analisis/adira-branches-full.csv`,
  `provinces.csv`, `districts.csv`, `sub_districts.csv`
