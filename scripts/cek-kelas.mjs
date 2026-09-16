/**
 * Pemeriksa kelas Tailwind terhadap CSS terkompilasi.
 *
 *   node scripts/cek-kelas.mjs app/adira-finance-tajur/page.tsx [berkas lain...]
 *
 * `public/css/style.css` adalah build Tailwind yang sudah jadi — utilitas yang
 * tidak pernah dipakai template TIDAK ADA di dalamnya, dan kelas yang tidak ada
 * gagal diam-diam (tanpa error, tanpa gaya). Jalankan ini sebelum menganggap
 * sebuah kelas bekerja.
 *
 * Kenapa ditulis tanpa satu pun backslash literal: pada Windows/Git Bash,
 * skrip yang dibuat lewat heredoc bisa kehilangan separuh `\\`-nya, sehingga
 * selektor ber-escape seperti `.md\:grid` yang dicari jadi salah dan hasilnya
 * positif palsu (2026-09-16: `md:grid` dilaporkan ada padahal tidak). Di sini
 * backslash dibangun dengan `String.fromCharCode(92)`, dan sebuah kelas baru
 * dianggap ADA bila selektornya diikuti batas rule — bukan sekadar substring
 * dari kelas lain (`.md\:grid` ≠ `.md\:grid-cols-3`).
 *
 * Bukti yang tidak bisa berbohong tetap render di 390 dan 1200 px lalu ukur.
 */
import { readFileSync } from "fs";
import { resolve } from "path";

const BS = String.fromCharCode(92);
const ROOT = process.cwd();
const css = readFileSync(resolve(ROOT, "public/css/style.css"), "utf8");

const PERLU_ESCAPE = new Set([".", "/", ":", "!", "[", "]", "(", ")", "#", "%", ","]);
const selektor = (c) => "." + [...c].map((ch) => (PERLU_ESCAPE.has(ch) ? BS + ch : ch)).join("");

const ada = (c) => {
  const s = selektor(c);
  let i = -1;
  while ((i = css.indexOf(s, i + 1)) >= 0) {
    const next = css[i + s.length] ?? "";
    if (!/[A-Za-z0-9_\-]/.test(next)) return true;
  }
  return false;
};

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Pakai: node scripts/cek-kelas.mjs <berkas.tsx> [...]");
  process.exit(2);
}

let gagal = 0;
for (const f of files) {
  const src = readFileSync(resolve(ROOT, f), "utf8");
  const kelas = new Set();
  for (const m of src.matchAll(/className="([^"]+)"/g)) m[1].split(/\s+/).filter(Boolean).forEach((c) => kelas.add(c));
  const hilang = [...kelas].filter((c) => !ada(c));
  console.log(`${f}: ${kelas.size} kelas, ${hilang.length} TIDAK ADA${hilang.length ? " -> " + hilang.join(" ") : ""}`);
  gagal += hilang.length;
}
process.exit(gagal ? 1 : 0);
