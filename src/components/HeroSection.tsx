import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { INFO_DESA } from '../data/wisataData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onExplorePaket: () => void;
  onExploreDestinasi: () => void;
}

const SOROTAN_DESA = [
  {
    label: 'Ketinggian Kawasan',
    nilai: '1.150 mdpl',
    keterangan: 'Lereng pegunungan asri bebas polusi',
  },
  {
    label: 'Suhu Harian Sejuk',
    nilai: '18°C – 22°C',
    keterangan: 'Kabut pagi & angin lembut sepanjang hari',
  },
  {
    label: 'Jarak Dari Kota',
    nilai: '± 45 Menit',
    keterangan: 'Jalan beraspal aman untuk mobil keluarga',
  },
  {
    label: 'Jaminan Sajian Desa',
    nilai: '100% Halal',
    keterangan: 'Diolah segar oleh kelompok ibu rumah tangga',
  },
];

export function HeroSection({
  onExplorePaket,
  onExploreDestinasi,
}: HeroSectionProps) {
  const whatsappUrl = `https://wa.me/${INFO_DESA.nomorWhatsApp}?text=${encodeURIComponent(
    'Halo pengelola Desa Wisata Lereng Asri, saya ingin bertanya informasi kunjungan dan paket wisata.'
  )}`;

  return (
    <section id="beranda" className="pt-4 sm:pt-6 pb-10 sm:pb-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Visual Carrier 16:9 / Responsive */}
        <div className="relative rounded-2xl overflow-hidden lereng-card-shadow bg-[#003629] min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-end">
          <div className="absolute inset-0">
            <SafeImage
              src={INFO_DESA.heroGambar}
              alt={INFO_DESA.heroAlt}
              loading="eager"
              className="w-full h-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#002117]/90 via-[#002117]/45 to-[#002117]/15"
            />
          </div>

          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 max-w-3xl text-[#fcf9f2]">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#ffdeae] mb-3">
              {INFO_DESA.lokasiRingkas} · Wisata Alam, Budaya &amp; Kuliner Halal
            </p>

            <h1 className="text-[30px] leading-[38px] sm:text-[42px] sm:leading-[50px] lg:text-[48px] lg:leading-[56px] font-extrabold tracking-[-0.02em] text-white mb-4">
              Temukan Ketenangan Pagi di Desa Wisata Lereng Asri
            </h1>

            <p className="text-[15px] sm:text-base leading-[24px] sm:leading-[26px] text-[#f0eee7] max-w-2xl mb-7">
              Jelajahi terasering kebun teh berkabut, curug pegunungan yang jernih,
              dan kehangatan homestay kayu warga lokal—tanpa kerumitan login atau
              pembayaran daring.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onExplorePaket}
                className="min-h-[54px] px-7 rounded-xl bg-[#fdba45] hover:bg-[#eab308] text-[#281900] text-[15px] font-bold inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fdba45]"
              >
                <span>Lihat Paket Wisata</span>
                <ArrowDownRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={onExploreDestinasi}
                className="min-h-[54px] px-6 rounded-xl bg-[#fcf9f2]/15 hover:bg-[#fcf9f2]/25 border border-[#fcf9f2]/40 text-white text-[15px] font-semibold inline-flex items-center justify-center transition-all duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Jelajahi Destinasi
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[50px] px-4 rounded-xl text-[#ffdeae] hover:text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi Pengelola</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4-Column Highland Context Strip */}
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SOROTAN_DESA.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-4 sm:p-5 lereng-card-shadow flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-[#404945]">
                {item.label}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#003629] tabular-nums mt-1.5 mb-1">
                {item.nilai}
              </span>
              <span className="text-xs sm:text-[13px] text-[#404945] leading-snug">
                {item.keterangan}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
