import type { Metadata } from "next";

import HalamanLegal, { type BagianLegal } from "@/components/ui/HalamanLegal";
import { ADIRA, AGEN, SITE_URL, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Bagaimana adirafinances.com memperlakukan data pengunjung: data apa yang dikumpulkan lewat Google Analytics, apa yang tidak kami simpan, dan cara menolaknya. Disusun mengacu pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
  alternates: { canonical: "/kebijakan-privasi" },
  openGraph: {
    type: "article",
    locale: "id_ID",
    url: `${SITE_URL}/kebijakan-privasi`,
    title: "Kebijakan Privasi — adirafinances.com",
    description:
      "Bagaimana adirafinances.com memperlakukan data pengunjung: apa yang dikumpulkan, apa yang tidak, dan cara menolaknya.",
  },
};

/**
 * Isi kebijakan ini mencerminkan perilaku situs yang SEBENARNYA, hasil audit
 * kode pada 2026-08-31:
 *   - tidak ada satu pun <form> yang mengirim data
 *   - tidak ada cookie, localStorage, maupun sessionStorage
 *   - tidak ada Google Analytics, Tag Manager, Meta Pixel, atau perekam sesi
 *   - satu-satunya permintaan pihak ketiga: Google Fonts
 *
 * Kalau salah satu hal di atas berubah (mis. memasang analitik atau formulir
 * pengajuan), halaman ini WAJIB diperbarui lebih dulu. Menyatakan "kami tidak
 * memakai cookie" sementara cookie dipasang adalah pernyataan menyesatkan.
 */
const bagian: BagianLegal[] = [
  {
    id: "pengelola",
    judul: "Siapa yang mengelola situs ini",
    isi: (
      <>
        <p>
          Situs adirafinances.com dimiliki dan dikelola oleh <strong>{AGEN.nama}</strong>, Agen AXI terdaftar di
          Adira Finance dengan ID AXI <strong>{AGEN.id}</strong>. Situs ini bukan situs korporat Adira Finance.
        </p>
        <p>
          Pembiayaan yang diinformasikan di situs ini disalurkan oleh <strong>{ADIRA.nama}</strong>, yang berizin
          dan diawasi Otoritas Jasa Keuangan (OJK). Data yang Anda serahkan langsung kepada Adira Finance pada saat
          pengajuan tunduk pada kebijakan privasi Adira Finance, bukan kebijakan ini.
        </p>
      </>
    ),
  },
  {
    id: "yang-tidak-dikumpulkan",
    judul: "Data yang tidak kami kumpulkan",
    isi: (
      <>
        <p>Per tanggal pembaruan halaman ini, situs adirafinances.com:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li>tidak memuat formulir apa pun yang mengirimkan data Anda ke server kami;</li>
          <li>tidak memasang piksel iklan maupun perekam sesi;</li>
          <li>tidak meminta Anda membuat akun atau memasukkan data pribadi untuk membaca isinya;</li>
          <li>tidak menyimpan nama, nomor telepon, atau alamat Anda kecuali Anda sendiri yang mengirimkannya.</li>
        </ul>
        <p>
          Kami <strong>menggunakan Google Analytics</strong> untuk melihat halaman mana yang dibaca dan dari kota
          mana pengunjung datang. Laporannya bersifat kumpulan, bukan per orang &mdash; kami tidak dapat melihat siapa
          Anda dari sana. Rinciannya ada di bagian layanan pihak ketiga di bawah.
        </p>
      </>
    ),
  },
  {
    id: "whatsapp",
    judul: "Data saat Anda menghubungi kami",
    isi: (
      <>
        <p>
          Seluruh tombol kontak di situs ini mengarah ke WhatsApp pada nomor{" "}
          <strong>{AGEN.waTampilan}</strong>. Saat Anda mengirim pesan, kami menerima nomor WhatsApp Anda, nama
          profil Anda, serta isi pesan dan lampiran yang Anda kirim — misalnya foto BPKB atau STNK.
        </p>
        <p>
          Data tersebut kami gunakan hanya untuk menjawab pertanyaan Anda, memeriksa perkiraan kelayakan pengajuan,
          dan mendampingi proses ke Adira Finance. Kami tidak memperjualbelikan data Anda dan tidak
          mengirimkannya ke pihak lain di luar keperluan pengajuan Anda sendiri.
        </p>
        <p>
          Perlu Anda ketahui, percakapan WhatsApp berjalan di layanan milik WhatsApp/Meta dan tunduk pada kebijakan
          privasi mereka. Kami tidak mengendalikan bagaimana WhatsApp memproses data di sisinya.
        </p>
      </>
    ),
  },
  {
    id: "pihak-ketiga",
    judul: "Layanan pihak ketiga",
    isi: (
      <>
        <p>Ada empat hal teknis yang perlu kami sampaikan secara terbuka:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li>
            <strong>Google Analytics (GA4).</strong> Kami memakainya untuk mengetahui halaman mana yang dibaca,
            berapa lama, dan dari daerah mana. Untuk itu Google menyetel cookie di peramban Anda dan menerima alamat
            IP serta informasi dasar perangkat Anda. Kami hanya melihat laporan gabungan, tidak bisa mengenali Anda
            sebagai individu, dan tidak mengaitkannya dengan percakapan WhatsApp Anda. Anda dapat menolaknya dengan
            memasang{" "}
            <a
              className="text-primary font-semibold underline"
              href="https://tools.google.com/dlpage/gaoptout"
              rel="noopener noreferrer"
              target="_blank"
            >
              pengaya penolakan Google Analytics
            </a>
            , mengaktifkan &ldquo;Do Not Track&rdquo;, atau memblokir cookie pihak ketiga di peramban Anda.
          </li>
          <li>
            <strong>Google Fonts.</strong> Huruf pada situs ini dimuat dari server Google. Karena itu, alamat IP dan
            informasi dasar peramban Anda terkirim ke Google saat halaman dibuka. Ini berlaku bahkan bila Anda tidak
            melakukan apa pun di situs.
          </li>
          <li>
            <strong>Peta Google pada halaman cabang.</strong> Peta sengaja <em>tidak</em> dimuat saat halaman dibuka.
            Ia baru diambil dari Google setelah Anda menekan tombol &ldquo;Tampilkan Peta&rdquo;, dan sejak saat itu
            Google dapat menerima alamat IP serta menyetel cookie di peramban Anda. Selama tombol itu tidak ditekan,
            tidak ada data yang terkirim ke layanan peta.
          </li>
          <li>
            <strong>Penyedia hosting.</strong> Seperti situs pada umumnya, server tempat situs ini berjalan mencatat
            log akses standar seperti alamat IP, waktu akses, dan jenis peramban, untuk keperluan operasional dan
            keamanan.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "hak-anda",
    judul: "Hak Anda atas data pribadi",
    isi: (
      <>
        <p>
          Indonesia mengatur pelindungan data pribadi melalui <strong>Undang-Undang Nomor 27 Tahun 2022 tentang
          Pelindungan Data Pribadi</strong>, yang disahkan pada 17 Oktober 2022.
        </p>
        <p>
          Untuk data yang ada pada kami — yaitu percakapan WhatsApp yang Anda mulai — Anda berhak meminta salinan,
          meminta perbaikan bila ada yang keliru, dan meminta penghapusan. Permintaan dapat Anda sampaikan lewat
          nomor WhatsApp yang sama.
        </p>
        <p>
          Untuk data yang sudah Anda serahkan kepada Adira Finance dalam proses pengajuan, permintaan tersebut
          diajukan langsung ke Adira Finance melalui layanan pelanggan {ADIRA.telepon} atau {ADIRA.email}.
        </p>
      </>
    ),
  },
  {
    id: "penyimpanan",
    judul: "Penyimpanan dan penghapusan",
    isi: (
      <p>
        Percakapan WhatsApp beserta dokumen yang Anda kirim disimpan pada perangkat dan akun WhatsApp kami selama
        proses pengajuan berlangsung dan untuk keperluan tindak lanjut. Bila Anda ingin percakapan dan dokumen
        tersebut dihapus, sampaikan permintaannya lewat WhatsApp dan akan kami hapus.
      </p>
    ),
  },
  {
    id: "anak",
    judul: "Bukan untuk anak-anak",
    isi: (
      <p>
        Layanan pembiayaan hanya dapat diajukan oleh perorangan yang cakap hukum. Situs ini tidak ditujukan bagi
        anak-anak, dan kami tidak dengan sengaja mengumpulkan data pribadi anak.
      </p>
    ),
  },
  {
    id: "perubahan",
    judul: "Perubahan kebijakan",
    isi: (
      <p>
        Bila kelak kami memasang formulir pengajuan, layanan analitik, atau fitur lain yang mengubah cara data
        diperlakukan, halaman ini diperbarui lebih dahulu beserta tanggal pembaruannya. Kami tidak akan
        mempertahankan pernyataan di halaman ini bila kenyataannya sudah berbeda.
      </p>
    ),
  },
  {
    id: "kontak-privasi",
    judul: "Menghubungi kami",
    isi: (
      <p>
        Pertanyaan mengenai kebijakan ini dapat disampaikan ke{" "}
        <a
          className="text-primary font-semibold underline"
          href={waLink("Halo, saya ingin bertanya soal kebijakan privasi")}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp {AGEN.waTampilan}
        </a>
        .
      </p>
    ),
  },
];

export default function KebijakanPrivasiPage() {
  return (
    <HalamanLegal
      judul="Kebijakan Privasi"
      ringkasan="Halaman ini menjelaskan data apa yang kami terima, apa yang tidak kami kumpulkan, dan apa yang bisa Anda minta atas data tersebut."
      diperbarui="31 Agustus 2026"
      bagian={bagian}
    />
  );
}
