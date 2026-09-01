import { ADIRA, AGEN, AREA_LAYANAN, SITE_URL, SOSIAL_ADIRA } from "@/lib/site";

/**
 * JSON-LD situs.
 *
 * Dimodelkan sebagai RELASI, bukan klaim identitas: situs dikelola agen AXI,
 * pembiayaan disediakan Adira. `sameAs` pada node Adira menunjuk ke properti
 * merek kanonik (adira.co.id) supaya tidak bersaing dengannya di Knowledge
 * Graph.
 */
export default function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "adirafinances.com",
        inLanguage: "id-ID",
        publisher: { "@id": `${SITE_URL}/#agen` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#agen`,
        name: AGEN.nama,
        jobTitle: AGEN.peran,
        identifier: AGEN.id,
        telephone: `+${AGEN.waNomor}`,
        affiliation: { "@id": `${SITE_URL}/#adira` },
      },
      {
        "@type": "FinancialService",
        "@id": `${SITE_URL}/#adira`,
        name: ADIRA.nama,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${ADIRA.gedung}, ${ADIRA.jalan}`,
          addressLocality: ADIRA.kota,
          addressRegion: ADIRA.provinsi,
          postalCode: ADIRA.kodePos,
          addressCountry: "ID",
        },
        telephone: ADIRA.telepon,
        email: ADIRA.email,
        sameAs: [ADIRA.situs, ...SOSIAL_ADIRA.map((s) => s.url)],
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#layanan`,
        name: "Pinjaman Dana Jaminan BPKB Mobil & Motor",
        serviceType: "Pembiayaan multiguna dengan jaminan BPKB",
        provider: { "@id": `${SITE_URL}/#adira` },
        areaServed: AREA_LAYANAN.map((nama) => ({ "@type": "AdministrativeArea", name: nama })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
