import Link from "next/link";
import type { Metadata } from "next";

import HalamanLegal, { type BagianLegal } from "@/components/ui/HalamanLegal";
import { ADIRA, AGEN, SITE_URL, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Ketentuan penggunaan adirafinances.com: sifat informasi yang disajikan, status situs sebagai agen AXI terdaftar, batasan angka simulasi, dan kewaspadaan terhadap penipuan.",
  alternates: { canonical: "/syarat-ketentuan" },
  openGraph: {
    type: "article",
    locale: "id_ID",
    url: `${SITE_URL}/syarat-ketentuan`,
    title: "Syarat & Ketentuan — adirafinances.com",
    description:
      "Ketentuan penggunaan adirafinances.com: sifat informasi, status keagenan, batasan angka simulasi, dan kewaspadaan penipuan.",
  },
};

/**
 * Ketentuan ini sengaja menahan diri dari klaim yang belum dikonfirmasi
 * pemilik — misalnya struktur biaya jasa keagenan. Yang ditulis hanya hal yang
 * dapat dipertanggungjawabkan dari perilaku situs dan posisi keagenan.
 */
const bagian: BagianLegal[] = [
  {
    id: "tentang-ketentuan",
    judul: "Tentang ketentuan ini",
    isi: (
      <p>
        Dengan menggunakan situs adirafinances.com, Anda dianggap membaca dan menyetujui ketentuan di halaman ini.
        Bila ada bagian yang tidak Anda setujui, mohon tidak menggunakan situs ini.
      </p>
    ),
  },
  {
    id: "status-situs",
    judul: "Status situs dan siapa yang membiayai",
    isi: (
      <>
        <p>
          Situs ini dimiliki dan dikelola oleh <strong>{AGEN.nama}</strong>, Agen AXI terdaftar di Adira Finance
          dengan ID AXI <strong>{AGEN.id}</strong>. <strong>Situs ini bukan situs korporat Adira Finance.</strong>
        </p>
        <p>
          Pembiayaan disalurkan oleh <strong>{ADIRA.nama}</strong>, yang berizin dan diawasi Otoritas Jasa Keuangan
          (OJK). Penilaian kendaraan, penentuan plafon, penetapan bunga, keputusan disetujui atau ditolak, serta
          pencairan dana sepenuhnya merupakan kewenangan Adira Finance dan diproses melalui kantor cabang.
        </p>
        <p>
          Peran kami adalah mendampingi: membantu memeriksa kelengkapan berkas dan mengarahkan proses pengajuan.
          Kami tidak dapat menjanjikan persetujuan, besaran plafon, maupun waktu pencairan.
        </p>
      </>
    ),
  },
  {
    id: "sifat-informasi",
    judul: "Sifat informasi di situs ini",
    isi: (
      <>
        <p>
          Seluruh isi situs ini bersifat informasi umum dan <strong>bukan merupakan penawaran yang mengikat</strong>.
          Ketentuan yang berlaku adalah ketentuan pada perjanjian pembiayaan yang Anda tandatangani dengan Adira
          Finance.
        </p>
        <p>
          Kami berusaha menjaga isi situs tetap akurat, namun ketentuan produk pembiayaan dapat berubah sewaktu-waktu
          tanpa pemberitahuan dari pihak kami.
        </p>
      </>
    ),
  },
  {
    id: "simulasi",
    judul: "Batasan angka simulasi",
    isi: (
      <>
        <p>
          Angka pada <Link className="text-primary font-semibold underline" href="/#tabel-angsuran">tabel
          angsuran</Link> bersifat <strong>referensi</strong>. Angka tersebut dipakai untuk memberi gambaran kasar
          besaran cicilan, bukan penawaran.
        </p>
        <p>
          Plafon dan angsuran final ditentukan Adira Finance setelah penilaian kendaraan dan survei, dan sangat
          bergantung pada jenis, tahun, kondisi kendaraan, serta hasil penilaian kelayakan. Hasil akhirnya dapat
          berbeda dari tabel.
        </p>
      </>
    ),
  },
  {
    id: "kewajiban-pengguna",
    judul: "Kewajiban Anda sebagai pengguna",
    isi: (
      <ul className="list-disc pl-5 flex flex-col gap-2">
        <li>Memberikan data dan dokumen yang benar serta milik Anda sendiri atau yang Anda berhak mengurusnya.</li>
        <li>Tidak menggunakan situs ini untuk tujuan melawan hukum, termasuk pemalsuan dokumen.</li>
        <li>
          Memahami bahwa pembiayaan menimbulkan kewajiban angsuran, dan menilai sendiri kemampuan bayar sebelum
          mengajukan.
        </li>
      </ul>
    ),
  },
  {
    id: "kewaspadaan-penipuan",
    judul: "Kewaspadaan terhadap penipuan",
    isi: (
      <>
        <p>Untuk melindungi Anda, mohon perhatikan hal berikut:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li>
            Komunikasi resmi dari kami hanya melalui nomor WhatsApp <strong>{AGEN.waTampilan}</strong> yang tercantum
            di situs ini.
          </li>
          <li>
            <strong>Kami tidak pernah meminta OTP, PIN, kata sandi, maupun kode verifikasi</strong> apa pun. Jangan
            berikan kepada siapa pun yang mengaku dari kami.
          </li>
          <li>
            Bila ada pihak yang mengatasnamakan kami atau Adira Finance dan meminta transfer ke rekening pribadi,
            hentikan komunikasi dan konfirmasikan ke layanan pelanggan Adira Finance di {ADIRA.telepon}.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "merek",
    judul: "Merek dan hak kekayaan intelektual",
    isi: (
      <p>
        Nama, logo, dan merek Adira Finance beserta seluruh variasinya adalah milik {ADIRA.nama}. Penggunaan di situs
        ini dilakukan dalam kapasitas sebagai agen terdaftar. Isi tulisan dan tata letak situs ini tidak untuk
        diperbanyak tanpa izin.
      </p>
    ),
  },
  {
    id: "tautan-luar",
    judul: "Tautan ke situs lain",
    isi: (
      <p>
        Situs ini memuat tautan ke situs pihak lain, antara lain{" "}
        <a className="text-primary font-semibold underline" href={ADIRA.situs} target="_blank" rel="noopener noreferrer">
          adira.co.id
        </a>{" "}
        dan WhatsApp. Kami tidak mengendalikan isi maupun kebijakan situs tersebut, sehingga tidak bertanggung jawab
        atasnya.
      </p>
    ),
  },
  {
    id: "batasan-tanggung-jawab",
    judul: "Batasan tanggung jawab",
    isi: (
      <p>
        Sepanjang diperbolehkan hukum, kami tidak bertanggung jawab atas kerugian yang timbul dari keputusan yang
        Anda ambil semata-mata berdasarkan informasi di situs ini, termasuk selisih antara angka simulasi dan angka
        final dari Adira Finance. Keputusan pembiayaan sepenuhnya berada pada Adira Finance.
      </p>
    ),
  },
  {
    id: "hukum",
    judul: "Hukum yang berlaku",
    isi: (
      <p>
        Ketentuan ini tunduk pada hukum Republik Indonesia. Perselisihan diupayakan diselesaikan secara musyawarah
        terlebih dahulu.
      </p>
    ),
  },
  {
    id: "perubahan-ketentuan",
    judul: "Perubahan ketentuan",
    isi: (
      <p>
        Ketentuan ini dapat diperbarui sewaktu-waktu. Tanggal pembaruan terakhir dicantumkan di bagian atas halaman.
        Pertanyaan mengenai ketentuan ini dapat disampaikan ke{" "}
        <a
          className="text-primary font-semibold underline"
          href={waLink("Halo, saya ingin bertanya soal syarat dan ketentuan")}
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

export default function SyaratKetentuanPage() {
  return (
    <HalamanLegal
      judul="Syarat & Ketentuan"
      ringkasan="Ketentuan penggunaan situs ini, batasan informasi yang disajikan, dan pembagian peran antara kami sebagai agen dengan Adira Finance sebagai pemberi pembiayaan."
      diperbarui="31 Agustus 2026"
      bagian={bagian}
    />
  );
}
