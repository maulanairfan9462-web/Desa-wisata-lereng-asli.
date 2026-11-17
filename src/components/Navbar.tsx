import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { INFO_DESA } from '../data/wisataData';

interface NavbarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  onOpenQuickBooking: () => void;
}

const NAV_ITEMS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'destinasi', label: 'Destinasi' },
  { id: 'paket', label: 'Paket' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'kontak', label: 'Kontak' },
];

export function Navbar({
  activeSection,
  onSelectSection,
  onOpenQuickBooking,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onSelectSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcf9f2]/92 backdrop-blur-md border-b border-[#1b4d3e]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-8">
        {/* Zona 1: Brand Wordmark satu baris */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('beranda');
          }}
          className="text-lg sm:text-xl font-extrabold tracking-tight text-[#003629] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b4d3e] rounded-sm"
        >
          {INFO_DESA.merekSingkat}
        </a>

        {/* Zona 2: 5 tautan navigasi satu baris (Desktop) */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-[15px] font-semibold text-[#404945]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b4d3e] rounded-sm ${
                  isActive
                    ? 'text-[#003629]'
                    : 'text-[#404945] hover:text-[#1b4d3e]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-[#1b4d3e] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zona 3: 1 tombol aksi utama + toggle menu mobile */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenQuickBooking}
            className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-5 py-2 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white text-sm font-bold whitespace-nowrap shrink-0 transition-all duration-150 active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b4d3e]"
          >
            Pesan Paket
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl text-[#13241c] hover:bg-[#f0eee7] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1b4d3e]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1b4d3e]/10 bg-[#fcf9f2] px-4 py-3 lereng-float-shadow">
          <nav aria-label="Navigasi seluler" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`min-h-[44px] px-3 rounded-xl flex items-center justify-between text-[15px] font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#1b4d3e] text-white'
                      : 'text-[#13241c] hover:bg-[#f0eee7]'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
