/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import {
  DAFTAR_PAKET,
  PaketWisataItem,
  formatRupiah,
} from './data/wisataData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DestinasiSection } from './components/DestinasiSection';
import { PaketSection } from './components/PaketSection';
import { GaleriSection } from './components/GaleriSection';
import { KontakSection } from './components/KontakSection';
import { ReservationDrawer } from './components/ReservationDrawer';

const SECTION_IDS = ['beranda', 'destinasi', 'paket', 'galeri', 'kontak'];

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [highlightedPaketId, setHighlightedPaketId] = useState<string | null>(null);
  const [bookingPaket, setBookingPaket] = useState<PaketWisataItem | null>(null);

  const cheapestPrice = Math.min(...DAFTAR_PAKET.map((p) => p.hargaPerOrang));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: 0.05,
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPaketFromDestinasi = (paketId: string) => {
    setHighlightedPaketId(paketId);
    scrollToSection('paket');
    setTimeout(() => {
      const cardEl = document.getElementById(`paket-card-${paketId}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 350);
    setTimeout(() => {
      setHighlightedPaketId(null);
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-[#13241c] flex flex-col">
      <Navbar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenQuickBooking={() => setBookingPaket(DAFTAR_PAKET[0])}
      />

      <main className="flex-1">
        <HeroSection
          onExplorePaket={() => scrollToSection('paket')}
          onExploreDestinasi={() => scrollToSection('destinasi')}
        />

        <DestinasiSection
          onSelectPaketFromDestinasi={handleSelectPaketFromDestinasi}
        />

        <PaketSection
          highlightedPaketId={highlightedPaketId}
          onBookPaket={(paket) => setBookingPaket(paket)}
        />

        <GaleriSection />

        <KontakSection />
      </main>

      {/* Bilah Reservasi Cepat Mobile (<= 15% tinggi layar gabungan dgn header) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#fcf9f2]/92 backdrop-blur-md border-t border-[#1b4d3e]/12 px-4 py-2.5 lereng-float-shadow">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="block text-[11px] font-semibold text-[#404945] leading-tight">
              Paket wisata mulai
            </span>
            <span className="text-base font-extrabold text-[#003629] tabular-nums">
              {formatRupiah(cheapestPrice)}
              <span className="text-xs font-medium text-[#404945]"> / org</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setBookingPaket(DAFTAR_PAKET[0])}
            className="min-h-[44px] px-5 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white text-sm font-bold whitespace-nowrap shrink-0 active:scale-[0.98] transition-transform cursor-pointer"
          >
            Pesan Paket
          </button>
        </div>
      </div>

      <ReservationDrawer
        paket={bookingPaket}
        onClose={() => setBookingPaket(null)}
        onChangePaket={(paketBaru) => setBookingPaket(paketBaru)}
      />
    </div>
  );
}
