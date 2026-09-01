"use client";

import { useRef, useState } from "react";

import { rupiah } from "@/lib/tabel-angsuran";
import { waLink } from "@/lib/site";

/* ── Konstanta ──────────────────────────────────────────────────────────── */

const JENIS_JAMINAN = [
  { id: "passanger", typeNum: 1, tipeObjekId: 1, label: "Mobil Penumpang", ket: "Sedan, SUV, MPV, hatchback" },
  { id: "commercial", typeNum: 1, tipeObjekId: 1, label: "Mobil Niaga", ket: "Pick-up, minibus, truk kecil" },
  { id: "motor", typeNum: 2, tipeObjekId: 2, label: "Sepeda Motor", ket: "Matic, bebek, sport" },
] as const;

const AREA = [
  { id: 9, label: "Jabodetabek & sekitarnya" },
  { id: 10, label: "Jawa Barat" },
  { id: 11, label: "Jawa Tengah & DIY" },
  { id: 12, label: "Jawa Timur" },
  { id: 13, label: "Bali & Nusa Tenggara" },
  { id: 14, label: "Sumatra Bagian Utara" },
  { id: 15, label: "Sumatra Bagian Selatan" },
  { id: 16, label: "Kalimantan" },
  { id: 17, label: "Sulawesi, Maluku & Papua" },
];

const TIPE_ANGSURAN = [
  { id: "addb", label: "Dibayar di belakang" },
  { id: "addm", label: "Dibayar di muka" },
];

const TIPE_ASURANSI = [
  { id: "1", label: "TLO (Total Loss Only)" },
  { id: "2", label: "All Risk" },
];

const isMobil = (id: string) => id === "passanger" || id === "commercial";

/* ── Tipe respons layanan ───────────────────────────────────────────────── */

type Opsi = { id: number | string; [k: string]: unknown };
/** Bentuk JSON:API dari layanan simulasi. */
type RespApi = { id: number | string; attributes?: Record<string, string> };
type InfoPencairan = {
  min_pencairan: number;
  maks_pencairan: number;
  min_pencairan_prefix: string;
  maks_pencairan_prefix: string;
  dana_diterima_prefix?: string;
};
type Simulasi = { tenorId: number | string; tenor: number; angsuran_per_bulan_prefix: string };
type Hasil = {
  informasi_jaminan?: Record<string, string>;
  hasil_simulasi?: { info_pencairan?: InfoPencairan; list_simulasi?: Simulasi[] };
};

/* ── Utilitas ───────────────────────────────────────────────────────────── */

function formatRibuan(mentah: string) {
  const angka = mentah.replace(/\D/g, "");
  if (!angka) return "";
  return angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const keAngka = (teks: string) => parseInt(teks.replace(/\D/g, ""), 10) || 0;

/* ── Bagian kecil ───────────────────────────────────────────────────────── */

const KELAS_SELECT =
  "h-11 w-full cursor-pointer appearance-none rounded-lg border border-border bg-white pl-5 pr-12 text-base text-title_black outline-none";

function Pilihan({
  label,
  value,
  onChange,
  options,
  placeholder,
  loading,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-base font-semibold text-title_black mb-2">{label}</label>
      <div className="relative">
        <select
          className={KELAS_SELECT}
          value={value}
          disabled={disabled || loading}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{loading ? "Memuat data…" : placeholder}</option>
          {options.map((o) => (
            <option value={o.value} key={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          className="w-3 h-2 fill-current text-title_black absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        >
          <use href="#arrow-down" />
        </svg>
      </div>
    </div>
  );
}

function Kartu({ langkah, judul, ket, children }: { langkah: number; judul: string; ket?: string; children: React.ReactNode }) {
  return (
    <div className="p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
      <div className="flex items-start gap-4 mb-6">
        <span className="w-10 h-10 shrink-0 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
          {langkah}
        </span>
        <div className="flex-1">
          <h3 className="text-title_black text-lg font-semibold leading-tight">{judul}</h3>
          {ket ? <p className="mt-1 text-paragraph_black text-sm">{ket}</p> : null}
        </div>
      </div>
      {children}
    </div>
  );
}

function Galat({ pesan }: { pesan: string }) {
  return (
    <div className="p-5 border border-red-500 rounded-2xl bg-white" role="alert">
      <p className="text-red-500">{pesan}</p>
    </div>
  );
}

/* ── Komponen utama ─────────────────────────────────────────────────────── */

export default function KalkulatorSimulasi() {
  const [jaminanId, setJaminanId] = useState("");
  const [areaId, setAreaId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [tahunId, setTahunId] = useState("");
  const [tipeAngsuran, setTipeAngsuran] = useState("addb");
  const [tipeAsuransi, setTipeAsuransi] = useState("1");

  const [brands, setBrands] = useState<Opsi[]>([]);
  const [models, setModels] = useState<Opsi[]>([]);
  const [tahunList, setTahunList] = useState<Opsi[]>([]);
  const [muatBrand, setMuatBrand] = useState(false);
  const [muatModel, setMuatModel] = useState(false);
  const [muatTahun, setMuatTahun] = useState(false);

  const [tahap, setTahap] = useState<"form" | "hasil">("form");
  const [proses, setProses] = useState(false);
  const [prosesUlang, setProsesUlang] = useState(false);
  const [info, setInfo] = useState<InfoPencairan | null>(null);
  const [pencairan, setPencairan] = useState("");
  const [hasil, setHasil] = useState<Hasil | null>(null);
  const [galat, setGalat] = useState<string | null>(null);

  const hasilRef = useRef<HTMLDivElement>(null);
  const konfigJaminan = JENIS_JAMINAN.find((j) => j.id === jaminanId);
  const lengkap = Boolean(jaminanId && areaId && brandId && modelId && tahunId);

  /*
    Pengambilan data dilakukan di event handler, bukan di useEffect.
    Rantai pilihan (jenis -> merek -> model -> tahun) adalah reaksi terhadap
    aksi pengguna; menaruhnya di effect memicu render berantai dan membuat
    state turunan sempat tidak sinkron.
  */
  const ambilBrands = async (jenis: string, typeNum: number) => {
    setMuatBrand(true);
    try {
      const r = await fetch(`/api/simulasi?type=brands&typeNum=${typeNum}&jaminanType=${jenis}`);
      const j = await r.json();
      // Layanan mengembalikan JSON:API — nilainya ada di `attributes`.
      setBrands((j?.data ?? []).map((d: RespApi) => ({ id: d.id, nama: d.attributes?.nama })));
    } catch {
      setBrands([]);
    } finally {
      setMuatBrand(false);
    }
  };

  const ambilModels = async (merek: string, jenis: string) => {
    setMuatModel(true);
    try {
      const r = await fetch(`/api/simulasi?type=models&brandId=${merek}&jaminanType=${jenis}`);
      const j = await r.json();
      setModels(
        (j?.data ?? []).map((d: RespApi) => ({
          id: d.id,
          nama_objek: d.attributes?.nama_objek,
          tipe_kendaraan: d.attributes?.tipe_kendaraan,
        })),
      );
    } catch {
      setModels([]);
    } finally {
      setMuatModel(false);
    }
  };

  const ambilTahun = async (model: string, area: string) => {
    setMuatTahun(true);
    try {
      const r = await fetch(`/api/simulasi?type=years&modelId=${model}&areaId=${area}`);
      const j = await r.json();
      setTahunList((j?.data ?? []).map((d: RespApi) => ({ id: d.id, tahun: d.attributes?.tahun })));
    } catch {
      setTahunList([]);
    } finally {
      setMuatTahun(false);
    }
  };

  const pilihJaminan = (id: string) => {
    const cfg = JENIS_JAMINAN.find((j) => j.id === id);
    setJaminanId(id);
    setBrands([]);
    setBrandId("");
    setModels([]);
    setModelId("");
    setTahunList([]);
    setTahunId("");
    setGalat(null);
    if (cfg) void ambilBrands(id, cfg.typeNum);
  };

  const pilihArea = (id: string) => {
    setAreaId(id);
    setTahunList([]);
    setTahunId("");
    setGalat(null);
    if (modelId && id) void ambilTahun(modelId, id);
  };

  const pilihBrand = (id: string) => {
    setBrandId(id);
    setModels([]);
    setModelId("");
    setTahunList([]);
    setTahunId("");
    if (id) void ambilModels(id, jaminanId);
  };

  const pilihModel = (id: string) => {
    setModelId(id);
    setTahunList([]);
    setTahunId("");
    if (id && areaId) void ambilTahun(id, areaId);
  };

  const susunBody = (nominal: number) => {
    const body: Record<string, unknown> = {
      tipe_objek_id: konfigJaminan?.tipeObjekId,
      objek_model_id: parseInt(modelId, 10),
      tahun_kendaraan: parseInt(tahunId, 10),
      area_id: parseInt(areaId, 10),
      pencairan: nominal,
    };
    if (isMobil(jaminanId)) {
      body.tipe_angsuran_id = tipeAngsuran;
      body.tipe_asuransi_id = parseInt(tipeAsuransi, 10);
    }
    return body;
  };

  const panggil = async (nominal: number): Promise<Hasil> => {
    const res = await fetch("/api/simulasi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(susunBody(nominal)),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message ?? json?.error ?? `HTTP ${res.status}`);
    return json?.data?.attributes ?? {};
  };

  const hitung = async () => {
    if (!lengkap) return;
    setProses(true);
    setGalat(null);
    setHasil(null);
    setInfo(null);

    try {
      // Panggilan pertama memakai nominal kecil, semata untuk memperoleh
      // batas minimum dan maksimum pencairan kendaraan ini.
      const cek = await panggil(3_000_000);
      const ip = cek.hasil_simulasi?.info_pencairan;
      if (!ip?.maks_pencairan) {
        setGalat("Simulasi belum tersedia untuk kendaraan ini. Coba pilihan kendaraan atau area lain.");
        return;
      }
      setInfo(ip);

      const penuh = await panggil(ip.maks_pencairan);
      if (!penuh.hasil_simulasi?.list_simulasi?.length) {
        setGalat("Tidak ada data simulasi untuk kendaraan ini.");
        return;
      }
      setHasil(penuh);
      setPencairan(formatRibuan(String(ip.maks_pencairan)));
      setTahap("hasil");
      setTimeout(() => hasilRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setGalat(`Gagal menghitung: ${e instanceof Error ? e.message : "koneksi bermasalah"}`);
    } finally {
      setProses(false);
    }
  };

  const hitungUlang = async () => {
    if (!info) return;
    const nominal = keAngka(pencairan);
    if (!nominal) return setGalat("Masukkan jumlah pencairan yang diinginkan.");
    if (nominal < info.min_pencairan) return setGalat(`Minimal pencairan ${info.min_pencairan_prefix}.`);
    if (nominal > info.maks_pencairan) return setGalat(`Maksimal pencairan ${info.maks_pencairan_prefix}.`);

    setProsesUlang(true);
    setGalat(null);
    try {
      const penuh = await panggil(nominal);
      if (!penuh.hasil_simulasi?.list_simulasi?.length) {
        setGalat("Tidak ada data simulasi untuk nominal ini.");
        return;
      }
      setHasil(penuh);
    } catch (e) {
      setGalat(`Gagal menghitung: ${e instanceof Error ? e.message : "koneksi bermasalah"}`);
    } finally {
      setProsesUlang(false);
    }
  };

  const ulangDariAwal = () => {
    setTahap("form");
    setHasil(null);
    setInfo(null);
    setPencairan("");
    setGalat(null);
  };

  const daftarTenor = [...(hasil?.hasil_simulasi?.list_simulasi ?? [])].sort((a, b) => a.tenor - b.tenor);
  const langkahAsuransi = 6;

  return (
    <div className="flex flex-col gap-6">
      {tahap === "form" ? (
        <>
          <Kartu langkah={1} judul="Jenis kendaraan" ket="Kendaraan yang BPKB-nya akan dijaminkan">
            <div className="grid gap-4 sm:grid-cols-3">
              {JENIS_JAMINAN.map((j) => {
                const aktif = jaminanId === j.id;
                return (
                  <button
                    key={j.id}
                    type="button"
                    aria-pressed={aktif}
                    onClick={() => pilihJaminan(j.id)}
                    className={`p-5 rounded-2xl border text-left duration-300 ${
                      aktif ? "border-primary bg-primary text-white" : "border-border bg-white text-title_black"
                    }`}
                  >
                    <span className="block font-semibold leading-tight">{j.label}</span>
                    <span className={`block mt-2 text-sm ${aktif ? "text-white" : "text-paragraph_black"}`}>
                      {j.ket}
                    </span>
                  </button>
                );
              })}
            </div>
          </Kartu>

          {jaminanId ? (
            <>
              <Kartu langkah={2} judul="Area domisili" ket="Wilayah tempat kendaraan terdaftar">
                <Pilihan
                  label="Area"
                  value={areaId}
                  onChange={pilihArea}
                  options={AREA.map((a) => ({ value: String(a.id), label: a.label }))}
                  placeholder="— Pilih area —"
                />
              </Kartu>

              <Kartu langkah={3} judul="Merek dan model kendaraan">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Pilihan
                    label="Merek"
                    value={brandId}
                    onChange={pilihBrand}
                    options={brands.map((b) => ({ value: String(b.id), label: String(b.nama ?? "") }))}
                    placeholder="— Pilih merek —"
                    loading={muatBrand}
                  />
                  <Pilihan
                    label="Model"
                    value={modelId}
                    onChange={pilihModel}
                    options={models.map((m) => ({
                      value: String(m.id),
                      label: m.tipe_kendaraan
                        ? `${m.nama_objek} (${m.tipe_kendaraan})`
                        : String(m.nama_objek ?? ""),
                    }))}
                    placeholder="— Pilih model —"
                    loading={muatModel}
                    disabled={!brandId}
                  />
                </div>
              </Kartu>

              {modelId && areaId ? (
                <Kartu langkah={4} judul="Tahun kendaraan">
                  <Pilihan
                    label="Tahun"
                    value={tahunId}
                    onChange={setTahunId}
                    options={tahunList.map((t) => ({ value: String(t.id), label: String(t.tahun ?? "") }))}
                    placeholder="— Pilih tahun —"
                    loading={muatTahun}
                  />
                  {!muatTahun && tahunList.length === 0 ? (
                    <p className="mt-3 text-paragraph_black text-sm">
                      Tahun tidak tersedia untuk model dan area ini. Coba model atau area lain.
                    </p>
                  ) : null}
                </Kartu>
              ) : null}

              {tahunId && isMobil(jaminanId) ? (
                <Kartu langkah={5} judul="Cara angsuran dan asuransi" ket="Khusus kendaraan roda empat">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Pilihan
                      label="Cara penghitungan angsuran"
                      value={tipeAngsuran}
                      onChange={setTipeAngsuran}
                      options={TIPE_ANGSURAN.map((t) => ({ value: t.id, label: t.label }))}
                      placeholder="— Pilih —"
                    />
                    <Pilihan
                      label="Tipe asuransi"
                      value={tipeAsuransi}
                      onChange={setTipeAsuransi}
                      options={TIPE_ASURANSI.map((t) => ({ value: t.id, label: t.label }))}
                      placeholder="— Pilih —"
                    />
                  </div>
                  <p className="mt-4 text-paragraph_black text-sm">
                    {tipeAngsuran === "addb"
                      ? "Angsuran pertama dibayar pada tanggal jatuh tempo pertama."
                      : "Angsuran pertama dibayar pada saat pencairan."}{" "}
                    {tipeAsuransi === "1"
                      ? "TLO menanggung kerusakan berat atau kehilangan."
                      : "All Risk menanggung seluruh kerusakan."}
                  </p>
                </Kartu>
              ) : null}
            </>
          ) : null}

          {galat ? <Galat pesan={galat} /> : null}

          {tahunId ? (
            <button
              type="button"
              className="button-primary"
              onClick={hitung}
              disabled={!lengkap || proses}
            >
              {proses ? "Menghitung simulasi…" : "Hitung Simulasi"}
            </button>
          ) : null}
        </>
      ) : (
        <div className="flex flex-col gap-6" ref={hasilRef}>
          {info ? (
            <div className="p-5 sm:p-6 md:p-8 bg-secondary rounded-2xl">
              <h3 className="text-title_black text-lg font-semibold leading-tight">Plafon kendaraan ini</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="p-5 bg-white rounded-2xl text-center">
                  <p className="text-paragraph_black text-sm">Minimal pencairan</p>
                  <p className="mt-2 text-title_black text-xl font-semibold">{info.min_pencairan_prefix}</p>
                </div>
                <div className="p-5 bg-white rounded-2xl text-center">
                  <p className="text-paragraph_black text-sm">Maksimal pencairan</p>
                  <p className="mt-2 text-title_black text-xl font-semibold">{info.maks_pencairan_prefix}</p>
                </div>
              </div>
            </div>
          ) : null}

          <Kartu
            langkah={isMobil(jaminanId) ? langkahAsuransi : langkahAsuransi - 1}
            judul="Jumlah pencairan"
            ket={info ? `Antara ${info.min_pencairan_prefix} sampai ${info.maks_pencairan_prefix}` : undefined}
          >
            <div className="flex gap-4 flex-col sm:flex-row">
              {/* Prefix "Rp" sebagai saudara dalam flex, bukan absolute —
                  kelas offset kecil (left-3/left-4) tidak ada di CSS
                  terkompilasi, jadi penempatan absolut mudah bertabrakan. */}
              <div className="flex items-center gap-2 flex-1 h-11 rounded-lg border border-border bg-white px-5">
                <span className="text-paragraph_black">Rp</span>
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label="Jumlah pencairan"
                  className="w-full bg-transparent text-base text-title_black outline-none"
                  value={pencairan}
                  onChange={(e) => {
                    setPencairan(formatRibuan(e.target.value));
                    setGalat(null);
                  }}
                />
              </div>
              <button type="button" className="button-primary" onClick={hitungUlang} disabled={prosesUlang}>
                {prosesUlang ? "Menghitung…" : "Hitung Ulang"}
              </button>
            </div>
            {galat ? <div className="mt-4">{<Galat pesan={galat} />}</div> : null}
          </Kartu>

          {hasil?.informasi_jaminan ? (
            <div className="p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
              <h3 className="text-title_black text-lg font-semibold leading-tight">Informasi jaminan</h3>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Jenis jaminan", hasil.informasi_jaminan.jenis_jaminan],
                  ["Merek", hasil.informasi_jaminan.merk_kendaraan],
                  ["Tipe kendaraan", hasil.informasi_jaminan.type_kendaraan],
                  ["Tahun", hasil.informasi_jaminan.tahun_kendaraan],
                  ["Area", hasil.informasi_jaminan.area],
                  ["Dana diterima", hasil.hasil_simulasi?.info_pencairan?.dana_diterima_prefix],
                  ...(isMobil(jaminanId) ? [["Asuransi", hasil.informasi_jaminan.tipe_asuransi]] : []),
                  ...(isMobil(jaminanId) ? [["Tipe angsuran", hasil.informasi_jaminan.tipe_angsuran]] : []),
                ].map(([k, v]) => (
                  <div key={String(k)}>
                    <dt className="text-paragraph_black text-sm">{k}</dt>
                    <dd className="mt-1 text-title_black font-semibold">{v || "—"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {daftarTenor.length ? (
            <div className="p-5 sm:p-6 md:p-8 bg-background border border-border rounded-2xl">
              <h3 className="text-title_black text-lg font-semibold leading-tight">Pilihan tenor dan angsuran</h3>
              <div className="mt-6 overflow-auto rounded-2xl border border-border">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-secondary">
                      <th scope="col" className="px-4 py-3 text-sm font-semibold text-title_black whitespace-nowrap">
                        Tenor
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-sm font-semibold text-title_black text-right whitespace-nowrap"
                      >
                        Angsuran per bulan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {daftarTenor.map((row) => (
                      <tr className="border-t border-border" key={String(row.tenorId)}>
                        <th
                          scope="row"
                          className="px-4 py-2 text-sm font-semibold text-title_black whitespace-nowrap"
                        >
                          {row.tenor} bulan
                        </th>
                        <td className="px-4 py-2 text-sm text-paragraph_black text-right whitespace-nowrap">
                          {row.angsuran_per_bulan_prefix}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-paragraph_black">
                Hasil simulasi bersifat estimasi. Plafon dan angsuran final ditentukan Adira Finance setelah survei
                kendaraan.
              </p>
            </div>
          ) : null}

          <div className="p-5 sm:p-6 md:p-8 bg-secondary rounded-2xl flex items-start lg:items-center justify-between gap-6 flex-col lg:flex-row">
            <div className="flex-1">
              <p className="text-title_black text-lg font-semibold">Lanjut ajukan?</p>
              <p className="mt-2 text-paragraph_black">
                Kirim hasil simulasi ini lewat WhatsApp, kami bantu periksa kelengkapan berkasnya.
              </p>
            </div>
            <a
              className="button-primary"
              href={waLink(
                `Halo, saya sudah menghitung simulasi. Perkiraan pencairan ${rupiah(keAngka(pencairan))}. Mohon dibantu proses pengajuannya.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ajukan via WhatsApp
              <svg className="w-2.5 h-2.5 fill-current">
                <use href="#buttonArrow" />
              </svg>
            </a>
          </div>

          <div>
            <button type="button" className="button-autline-dark" onClick={ulangDariAwal}>
              Hitung kendaraan lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
