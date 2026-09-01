import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy simulasi pembiayaan Adira.
 *
 * Dijalankan di server, bukan langsung dari peramban, karena dua alasan:
 * 1. menghindari CORS,
 * 2. alamat layanan tidak terekspos di kode klien.
 *
 * GET  ?type=brands&typeNum=&jaminanType=   -> daftar merek
 * GET  ?type=models&brandId=&jaminanType=   -> daftar model
 * GET  ?type=years&modelId=&areaId=         -> daftar tahun
 * POST body simulasi                        -> angsuran untuk semua tenor
 */
const BASE = "https://prod.dicicilaja.com/v3/simulation/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  let url: string;

  if (type === "brands") {
    const typeNum = searchParams.get("typeNum");
    const jaminanType = searchParams.get("jaminanType");
    if (!typeNum || !jaminanType) {
      return NextResponse.json({ error: "Parameter kurang" }, { status: 400 });
    }
    url = `${BASE}/tipeobjek/${encodeURIComponent(typeNum)}/${encodeURIComponent(jaminanType)}`;
  } else if (type === "models") {
    const brandId = searchParams.get("brandId");
    const jaminanType = searchParams.get("jaminanType");
    if (!brandId || !jaminanType) {
      return NextResponse.json({ error: "Parameter kurang" }, { status: 400 });
    }
    url = `${BASE}/objekbrand/${encodeURIComponent(brandId)}/${encodeURIComponent(jaminanType)}`;
  } else if (type === "years") {
    const modelId = searchParams.get("modelId");
    const areaId = searchParams.get("areaId");
    if (!modelId || !areaId) {
      return NextResponse.json({ error: "Parameter kurang" }, { status: 400 });
    }
    url = `${BASE}/tahunkendaraan/${encodeURIComponent(modelId)}/${encodeURIComponent(areaId)}`;
  } else {
    return NextResponse.json({ error: "Jenis permintaan tidak dikenal" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.ok ? 200 : res.status });
  } catch {
    return NextResponse.json({ error: "Gagal menghubungi layanan simulasi" }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const res = await fetch(`${BASE}/simulasi/hitung-semua-tenor`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.ok ? 200 : res.status });
  } catch {
    return NextResponse.json({ error: "Gagal menghitung simulasi" }, { status: 502 });
  }
}
