import AlurPengajuan from "@/components/sections/AlurPengajuan";
import BannerTextSlider from "@/components/sections/BannerTextSlider";
import Faq from "@/components/sections/Faq";
import HeroBanner from "@/components/sections/HeroBanner";
import JenisJaminan from "@/components/sections/JenisJaminan";
import KenapaLewatKami from "@/components/sections/KenapaLewatKami";
import Persyaratan from "@/components/sections/Persyaratan";
import TabelAngsuran from "@/components/sections/TabelAngsuran";
import WilayahLayanan from "@/components/sections/WilayahLayanan";
import YangDilayani from "@/components/sections/YangDilayani";

/**
 * Homepage.
 *
 * Urutan mengikuti urutan pertanyaan calon peminjam: apa layanannya -> jaminan
 * apa yang diterima -> cicilannya berapa -> berkasnya apa -> prosesnya
 * bagaimana -> kenapa lewat agen -> daerah saya dilayani -> sisa keberatan.
 *
 * Lihat `docs/rencana-homepage.md`.
 */
export default function Home() {
  return (
    <>
      <HeroBanner />
      <BannerTextSlider />
      <YangDilayani />
      <JenisJaminan />
      <TabelAngsuran />
      <Persyaratan />
      <AlurPengajuan />
      <KenapaLewatKami />
      <WilayahLayanan />
      <Faq />
    </>
  );
}
