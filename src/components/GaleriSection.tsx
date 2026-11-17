import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { DAFTAR_GALERI, KategoriGaleri } from '../data/wisataData';
import { SafeImage } from './SafeImage';

const FILTER_GALERI: Array<'Semua' | KategoriGaleri> = [
  'Semua',
  'Lanskap',
  'Aktivitas',
  'Kuliner & Homestay',
];

export function GaleriSection() {
  const [kategoriAktif, setKategoriAktif] = useState<'Semua' | KategoriGaleri>('Semua');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const fotoTersaring =
    kategoriAktif === 'Semua'
      ? DAFTAR_GALERI
      : DAFTAR_GALERI.filter((g) => g.kategori === kategoriAktif);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % fotoTersaring.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + fotoTersaring.length) % fotoTersaring.length
        );
      }
    };

    if (activeIndex !== null) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [activeIndex, fotoTersaring.length]);

  const activeFoto =
    activeIndex !== null && fotoTersaring[activeIndex]
      ? fotoTersaring[activeIndex]
      : null;

  return (
    <section id="galeri" className="py-12 sm:py-16 bg-[#f6f3ec]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#2e7d5a] mb-2">
              03. Dokumentasi Suasana Desa
            </p>
            <h2 className="text-[24px] leading-[32px] sm:text-[32px] sm:leading-[40px] font-bold tracking-[-0.015em] text-[#003629]">
              Galeri Kehidupan &amp; Alam Lereng Asri
            </h2>
            <p className="text-[15px] sm:text-base text-[#404945] mt-2 leading-relaxed">
              Potret suasana kabut pagi, aktivitas warga di kebun teh, dan kehangatan
              sajian rumahan di dusun kami. Ketuk foto untuk memperbesar tampilan.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter galeri foto"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 shrink-0"
          >
            {FILTER_GALERI.map((kat) => {
              const aktif = kategoriAktif === kat;
              return (
                <button
                  key={kat}
                  role="tab"
                  aria-selected={aktif}
                  type="button"
                  onClick={() => {
                    setKategoriAktif(kat);
                    setActiveIndex(null);
                  }}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fotoTersaring.map((foto, index) => (
            <button
              key={foto.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group text-left bg-white rounded-2xl overflow-hidden lereng-card-shadow cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e5e2db]">
                <SafeImage
                  src={foto.gambar}
                  alt={foto.judul}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#002117]/75 via-[#002117]/15 to-transparent opacity-90 sm:opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#fcf9f2]/90 text-[#003629] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Maximize2 className="w-4 h-4" />
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="block text-[11px] font-semibold text-[#ffdeae] mb-0.5">
                    {foto.kategori} · {foto.lokasi}
                  </span>
                  <h3 className="text-base font-bold leading-snug">{foto.judul}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeFoto && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau foto ${activeFoto.judul}`}
          className="fixed inset-0 z-50 bg-[#001a13]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveIndex(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl bg-[#fcf9f2] rounded-2xl overflow-hidden lereng-float-shadow"
          >
            <div className="relative aspect-[16/10] w-full bg-[#002117]">
              <SafeImage
                src={activeFoto.gambar}
                alt={activeFoto.judul}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                aria-label="Tutup galeri"
                onClick={() => setActiveIndex(null)}
                className="absolute top-3 right-3 w-11 h-11 rounded-full bg-[#fcf9f2]/95 text-[#13241c] hover:bg-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {fotoTersaring.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Foto sebelumnya"
                    onClick={() =>
                      setActiveIndex(
                        (activeIndex - 1 + fotoTersaring.length) %
                          fotoTersaring.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#fcf9f2]/95 text-[#13241c] hover:bg-white flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Foto berikutnya"
                    onClick={() =>
                      setActiveIndex((activeIndex + 1) % fotoTersaring.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#fcf9f2]/95 text-[#13241c] hover:bg-white flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[#2e7d5a] mb-1">
                  {activeFoto.kategori} · {activeFoto.lokasi}
                </p>
                <h3 className="text-lg font-bold text-[#003629]">
                  {activeFoto.judul}
                </h3>
                <p className="text-sm text-[#404945] mt-1">
                  {activeFoto.keterangan}
                </p>
              </div>
              <span className="text-xs font-semibold text-[#404945] tabular-nums shrink-0">
                {activeIndex + 1} / {fotoTersaring.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
