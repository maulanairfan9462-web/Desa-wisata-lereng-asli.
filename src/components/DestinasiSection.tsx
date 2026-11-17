import { useState, useEffect } from 'react';
import {
  Clock,
  MapPin,
  Thermometer,
  CheckCircle2,
  X,
  ArrowRight,
  Users,
  ShieldCheck,
} from 'lucide-react';
import {
  DAFTAR_DESTINASI,
  DestinasiItem,
  KategoriDestinasi,
  formatRupiah,
} from '../data/wisataData';
import { SafeImage } from './SafeImage';

interface DestinasiSectionProps {
  onSelectPaketFromDestinasi: (paketId: string) => void;
}

const KATEGORI_FILTER: Array<'Semua' | KategoriDestinasi> = [
  'Semua',
  'Alam',
  'Edukasi',
  'Budaya',
  'Kuliner',
];

export function DestinasiSection({
  onSelectPaketFromDestinasi,
}: DestinasiSectionProps) {
  const [kategoriAktif, setKategoriAktif] = useState<'Semua' | KategoriDestinasi>('Semua');
  const [selectedDestinasi, setSelectedDestinasi] = useState<DestinasiItem | null>(null);

  const daftarTersaring =
    kategoriAktif === 'Semua'
      ? DAFTAR_DESTINASI
      : DAFTAR_DESTINASI.filter((d) => d.kategori === kategoriAktif);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDestinasi(null);
      }
    };
    if (selectedDestinasi) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedDestinasi]);

  return (
    <section id="destinasi" className="py-12 sm:py-16 bg-[#f6f3ec]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Seksi + Filter Kontrol */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#2e7d5a] mb-2">
              01. Objek Wisata Unggulan
            </p>
            <h2 className="text-[24px] leading-[32px] sm:text-[32px] sm:leading-[40px] font-bold tracking-[-0.015em] text-[#003629]">
              Destinasi Alam, Budaya &amp; Kuliner Desa
            </h2>
            <p className="text-[15px] sm:text-base text-[#404945] mt-2 leading-relaxed">
              Pilih titik kunjungan sesuai minat rombongan Anda, lengkap dengan informasi
              suhu kawasan, jam buka, dan tingkat kenyamanan jalur untuk keluarga.
            </p>
          </div>

          {/* Filter Buttons (Interactive Controls) */}
          <div
            role="tablist"
            aria-label="Filter kategori destinasi"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 shrink-0"
          >
            {KATEGORI_FILTER.map((kategori) => {
              const aktif = kategoriAktif === kategori;
              return (
                <button
                  key={kategori}
                  role="tab"
                  aria-selected={aktif}
                  type="button"
                  onClick={() => setKategoriAktif(kategori)}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap shrink-0 transition-all duration-150 active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e] ${
                    aktif
                      ? 'bg-[#1b4d3e] text-white lereng-card-shadow'
                      : 'bg-white text-[#13241c] border border-[#1b4d3e]/12 hover:border-[#1b4d3e]/35'
                  }`}
                >
                  {kategori}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Kartu Destinasi */}
        {daftarTersaring.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center lereng-card-shadow">
            <p className="text-base font-semibold text-[#13241c]">
              Belum ada destinasi pada kategori ini.
            </p>
            <button
              type="button"
              onClick={() => setKategoriAktif('Semua')}
              className="mt-4 min-h-[44px] px-5 py-2 rounded-xl bg-[#1b4d3e] text-white text-sm font-semibold cursor-pointer"
            >
              Tampilkan Semua Destinasi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {daftarTersaring.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden lereng-card-shadow flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#e5e2db]">
                    <SafeImage
                      src={item.gambar}
                      alt={item.altGambar}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-5 pb-4">
                    {/* Metadata tanpa pill enclosure */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[#2e7d5a] mb-2">
                      <span>{item.kategori}</span>
                      <span aria-hidden="true" className="text-[#c0c9c3]">
                        ·
                      </span>
                      <span className="tabular-nums text-[#404945]">{item.suhu}</span>
                      {item.ramahKeluarga && (
                        <>
                          <span aria-hidden="true" className="text-[#c0c9c3]">
                            ·
                          </span>
                          <span className="text-[#7f5700]">Ramah Anak &amp; Lansia</span>
                        </>
                      )}
                      {item.kulinerHalal && (
                        <>
                          <span aria-hidden="true" className="text-[#c0c9c3]">
                            ·
                          </span>
                          <span className="text-[#1b4d3e]">Kuliner Halal</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-[20px] font-bold leading-snug text-[#003629] mb-2">
                      {item.nama}
                    </h3>

                    <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#404945]">
                      {item.ringkasan}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-[#1b4d3e]/8 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-[11px] font-semibold text-[#404945]">
                      Tiket Masuk
                    </span>
                    <span className="text-[15px] font-bold text-[#13241c] tabular-nums">
                      {formatRupiah(item.tiketMasuk)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDestinasi(item)}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-[#f6f3ec] hover:bg-[#1b4d3e] text-[#1b4d3e] hover:text-white text-sm font-bold inline-flex items-center gap-1.5 transition-colors duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#1b4d3e]"
                  >
                    <span>Detail Lokasi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal / Bottom Sheet Detail Destinasi */}
      {selectedDestinasi && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-destinasi-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#002117]/55 backdrop-blur-sm p-0 sm:p-6"
          onClick={() => setSelectedDestinasi(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-2xl bg-[#fcf9f2] rounded-t-3xl sm:rounded-2xl overflow-hidden lereng-float-shadow max-h-[90vh] flex flex-col"
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden pt-3 pb-1 flex justify-center bg-white">
              <span className="w-10 h-1.5 rounded-full bg-[#c0c9c3]" />
            </div>

            <div className="relative h-52 sm:h-64 w-full shrink-0 bg-[#003629]">
              <SafeImage
                src={selectedDestinasi.gambar}
                alt={selectedDestinasi.altGambar}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                aria-label="Tutup detail destinasi"
                onClick={() => setSelectedDestinasi(null)}
                className="absolute top-3 right-3 w-11 h-11 rounded-full bg-[#fcf9f2]/95 text-[#13241c] hover:bg-white flex items-center justify-center lereng-card-shadow cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1b4d3e]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#2e7d5a] mb-1.5">
                  <span>{selectedDestinasi.kategori}</span>
                  <span aria-hidden="true">·</span>
                  <span>Tiket: {formatRupiah(selectedDestinasi.tiketMasuk)}</span>
                </div>
                <h3
                  id="detail-destinasi-title"
                  className="text-2xl font-bold text-[#003629]"
                >
                  {selectedDestinasi.nama}
                </h3>
              </div>

              <p className="text-[15px] leading-[24px] text-[#1c1c18]">
                {selectedDestinasi.deskripsiLengkap}
              </p>

              {/* Ringkasan Kondisi Kunjungan */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-[#1b4d3e]/10">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#1b4d3e] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-semibold text-[#404945]">
                      Jam Kunjungan
                    </span>
                    <span className="text-xs font-bold text-[#13241c] tabular-nums">
                      {selectedDestinasi.jamBuka}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Thermometer className="w-4 h-4 text-[#1b4d3e] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-semibold text-[#404945]">
                      Suhu Kawasan
                    </span>
                    <span className="text-xs font-bold text-[#13241c] tabular-nums">
                      {selectedDestinasi.suhu}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#1b4d3e] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-semibold text-[#404945]">
                      Akses Dari Balai
                    </span>
                    <span className="text-xs font-bold text-[#13241c]">
                      {selectedDestinasi.jarakDariBalai}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sorotan & Informasi Ramah Keluarga/Halal */}
              <div>
                <h4 className="text-sm font-bold text-[#003629] mb-2.5">
                  Daya Tarik &amp; Fasilitas Tersedia
                </h4>
                <ul className="space-y-2">
                  {selectedDestinasi.sorotan.map((poin) => (
                    <li
                      key={poin}
                      className="flex items-start gap-2.5 text-sm text-[#404945]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2e7d5a] shrink-0 mt-0.5" />
                      <span>{poin}</span>
                    </li>
                  ))}
                  {selectedDestinasi.ramahKeluarga && (
                    <li className="flex items-start gap-2.5 text-sm text-[#7f5700] font-medium">
                      <Users className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Jalur landai dan aman untuk anak-anak maupun lansia.</span>
                    </li>
                  )}
                  {selectedDestinasi.kulinerHalal && (
                    <li className="flex items-start gap-2.5 text-sm text-[#1b4d3e] font-medium">
                      <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Menyediakan hidangan lokal halal dan segar setiap hari.</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="p-4 sm:px-7 sm:py-5 bg-white border-t border-[#1b4d3e]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const paketId = selectedDestinasi.paketTerkaitId;
                  setSelectedDestinasi(null);
                  onSelectPaketFromDestinasi(paketId);
                }}
                className="min-h-[50px] px-6 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white text-[15px] font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-[0.98]"
              >
                <span>Lihat Paket Yang Mencakup Lokasi Ini</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setSelectedDestinasi(null)}
                className="min-h-[48px] px-5 rounded-xl border border-[#1b4d3e]/25 text-[#13241c] text-sm font-semibold hover:bg-[#f6f3ec] transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
