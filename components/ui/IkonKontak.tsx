/**
 * Ikon kontak untuk footer.
 *
 * Menggantikan `<img src="/icons/phone.svg">` dkk. yang menghasilkan 404 di
 * setiap halaman — berkasnya tidak ada di `public/`. Digambar inline supaya
 * tidak ada permintaan jaringan sama sekali, mewarisi `currentColor`, dan tidak
 * bisa rusak lagi karena berkas yang hilang.
 *
 * Ukuran mengikuti `w-4` yang dipakai markup sebelumnya.
 */
type Nama = "telepon" | "alamat" | "email";

export default function IkonKontak({ nama }: { nama: Nama }) {
  const umum = {
    className: "w-4 h-4 shrink-0 fill-current",
    viewBox: "0 0 16 16",
    "aria-hidden": true as const,
    focusable: "false" as const,
  };

  if (nama === "alamat") {
    return (
      <svg {...umum}>
        <path d="M8 0a5.5 5.5 0 0 0-5.5 5.5C2.5 9.8 8 16 8 16s5.5-6.2 5.5-10.5A5.5 5.5 0 0 0 8 0Zm0 7.6a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Z" />
      </svg>
    );
  }

  if (nama === "email") {
    return (
      <svg {...umum}>
        <path d="M1.5 2.5h13c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1h-13c-.6 0-1-.4-1-1v-9c0-.6.4-1 1-1Zm12.2 1.6L8 8.3 2.3 4.1v-.2h11.4v.2Zm-11.4 8V5.6L8 9.9l5.7-4.3v6.5H2.3Z" />
      </svg>
    );
  }

  return (
    <svg {...umum}>
      <path d="M5.2.9 6.6 4a1 1 0 0 1-.3 1.2l-1.1.9a8.9 8.9 0 0 0 3.9 3.9l.9-1.1A1 1 0 0 1 11.2 8l3.1 1.4c.4.2.6.6.5 1l-.5 2.3a1 1 0 0 1-1.1.8C6.3 12.9 1.6 8.2.9 1.3A1 1 0 0 1 1.7.2L4 .4c.4 0 .8.2 1 .5Z" />
    </svg>
  );
}
