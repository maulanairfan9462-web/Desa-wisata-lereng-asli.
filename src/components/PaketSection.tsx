import { useState } from 'react';
import { Check, Clock, Users, ShieldCheck, Thermometer } from 'lucide-react';
import {
  DAFTAR_PAKET,
  KategoriPaket,
  PaketWisataItem,
  formatRupiah,
} from '../data/wisataData';
import { SafeImage } from './SafeImage';

interface PaketSectionProps {
  highlightedPaketId: string | null;
  onBookPaket: (paket: PaketWisataItem) => void;
}

const FILTER_PAKET: Array<'Semua' | KategoriPaket> = [
  'Semua',
  'Wisata Harian',
  'Menginap & Homestay',
  'Rombongan',
];

export function PaketSection({
  highlightedPaketId,
  onBookPaket,
}: PaketSectionProps) {
  const [kategoriAktif, setKategoriAktif] = useState<'Semua' | KategoriPaket>('Semua');

  const paketTersaring =
    kategoriAktif === 'Semua'
      ? DAFTAR_PAKET
      : DAFTAR_PAKET.filter((p) => p.kategori === kategoriAktif);

  return (
    <section id="paket" className="py-12 sm:py-16 bg-[#fcf9f2]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#2e7d5a] mb-2">
              02. Pilihan Paket &amp; Homestay
            </p>
            <h2 className="text-[24px] leading-[32px] sm:text-[32px] sm:leading-[40px] font-bold tracking-[-0.015em] text-[#003629]">
              Paket Wisata &amp; Penginapan Transparan
            </h2>
            <p className="text-[15px] sm:text-base text-[#404945] mt-2 leading-relaxed">
              Seluruh biaya sudah termasuk tiket objek wisata, pemandu warga desa, dan
              sajian halal. Hitung estimasi rombongan dan konfirmasi langsung lewat WhatsApp.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter jenis paket wisata"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 shrink-0"
          >
            {FILTER_PAKET.map((kat) => {
              const aktif = kategoriAktif === kat;
              return (
                <button
                  key={kat}
                  role="tab"
                  aria-selected={aktif}
                  type="button"
                  onClick={() => setKategoriAktif(kat)}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap shrink-0 transition-all duration-150 active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e] ${
                    aktif
                      ? 'bg-[#1b4d3e] text-white lereng-card-shadow'
                      : 'bg-white text-[#13241c] border border-[#1b4d3e]/12 hover:border-[#1b4d3e]/35'
                  }`}
                >
                  {kat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paketTersaring.map((paket) => {
            const isHighlighted = highlightedPaketId === paket.id;
            return (
              <article
                key={paket.id}
                id={`paket-card-${paket.id}`}
                className={`bg-white rounded-2xl overflow-hidden lereng-card-shadow flex flex-col justify-between transition-all duration-200 ${
                  isHighlighted ? 'ring-2 ring-[#d99b26]' : ''
                }`}
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-[#e5e2db]">
                    <SafeImage
                      src={paket.gambar}
                      alt={paket.altGambar}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    {/* Metadata terstruktur tanpa pill clutter */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[#2e7d5a] mb-2">
                      <span>{paket.kategori}</span>
                      {paket.unggulan && (
                        <>
                          <span aria-hidden="true" className="text-[#c0c9c3]">
                            ·
                          </span>
                          <span className="text-[#7f5700]">Paling Diminati</span>
                        </>
                      )}
                      {paket.ramahKeluarga && (
                        <>
                          <span aria-hidden="true" className="text-[#c0c9c3]">
                            ·
                          </span>
                          <span className="text-[#7f5700]">Ramah Anak &amp; Lansia</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-[22px] font-bold text-[#003629] leading-snug mb-2">
                      {paket.nama}
                    </h3>

                    <p className="text-[14px] sm:text-[15px] text-[#404945] leading-relaxed mb-4">
                      {paket.ringkasan}
                    </p>

                    {/* Info Durasi, Min Peserta & Suhu */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 py-3 border-y border-[#1b4d3e]/10 text-xs sm:text-[13px] font-medium text-[#13241c] mb-4">
                      <span className="inline-flex items-center gap-1.5 tabular-nums">
                        <Clock className="w-4 h-4 text-[#1b4d3e]" />
                        {paket.durasi}
                      </span>
                      <span className="inline-flex items-center gap-1.5 tabular-nums">
                        <Users className="w-4 h-4 text-[#1b4d3e]" />
                        Min. {paket.minimalPeserta} orang
                      </span>
                      {paket.makanHalal && (
                        <span className="inline-flex items-center gap-1.5 text-[#1b4d3e] font-semibold">
                          <ShieldCheck className="w-4 h-4" />
                          Konsumsi Halal
                        </span>
                      )}
                    </div>

                    {/* Fasilitas Termasuk */}
                    <ul className="space-y-2 mb-4">
                      {paket.fasilitas.map((fasilitas) => (
                        <li
                          key={fasilitas}
                          className="flex items-start gap-2.5 text-sm text-[#404945]"
                        >
                          <Check className="w-4 h-4 text-[#2e7d5a] shrink-0 mt-0.5" />
                          <span>{fasilitas}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-xs text-[#404945] inline-flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-[#2e7d5a] shrink-0" />
                      <span>{paket.catatanSuhu}</span>
                    </p>
                  </div>
                </div>

                {/* Footer Kartu: Harga & Tombol Pesan */}
                <div className="px-5 sm:px-6 py-4 bg-[#f6f3ec]/60 border-t border-[#1b4d3e]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="block text-xs font-semibold text-[#404945]">
                      Biaya Paket
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#003629] tabular-nums">
                        {formatRupiah(paket.hargaPerOrang)}
                      </span>
                      <span className="text-xs font-medium text-[#404945]">
                        / orang
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBookPaket(paket)}
                    className="min-h-[54px] px-6 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white text-[15px] font-bold inline-flex items-center justify-center transition-all duration-150 active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e]"
                  >
                    Hitung &amp; Pesan Paket
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
