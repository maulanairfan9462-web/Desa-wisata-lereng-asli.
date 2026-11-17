import { useEffect, useState } from 'react';
import {
  Calendar,
  Check,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  Users,
  X,
} from 'lucide-react';
import {
  DAFTAR_PAKET,
  INFO_DESA,
  PaketWisataItem,
  formatRupiah,
} from '../data/wisataData';

interface ReservationDrawerProps {
  paket: PaketWisataItem | null;
  onClose: () => void;
  onChangePaket: (paket: PaketWisataItem) => void;
}

export function ReservationDrawer({
  paket,
  onClose,
  onChangePaket,
}: ReservationDrawerProps) {
  const todayStr = new Date().toISOString().split('T')[0];

  const [namaPemesan, setNamaPemesan] = useState('');
  const [tanggalKunjungan, setTanggalKunjungan] = useState(todayStr);
  const [jumlahPeserta, setJumlahPeserta] = useState(2);
  const [catatan, setCatatan] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (paket) {
      setJumlahPeserta((prev) =>
        Math.max(paket.minimalPeserta, Math.min(paket.maksimalPeserta, prev))
      );
      setCopied(false);
    }
  }, [paket]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (paket) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [paket, onClose]);

  if (!paket) return null;

  const totalBiaya = paket.hargaPerOrang * jumlahPeserta;

  const pesanRingkas = [
    `Halo Pengelola ${INFO_DESA.nama},`,
    `Saya ingin menanyakan ketersediaan & reservasi paket berikut:`,
    `- Paket: ${paket.nama}`,
    `- Tanggal rencana: ${tanggalKunjungan || 'Belum ditentukan'}`,
    `- Jumlah peserta: ${jumlahPeserta} orang`,
    `- Estimasi biaya: ${formatRupiah(totalBiaya)}`,
    namaPemesan.trim() ? `- Atas nama: ${namaPemesan.trim()}` : null,
    catatan.trim() ? `- Catatan: ${catatan.trim()}` : null,
    `Mohon konfirmasi ketersediaan jadwalnya. Terima kasih.`,
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappHref = `https://wa.me/${INFO_DESA.nomorWhatsApp}?text=${encodeURIComponent(
    pesanRingkas
  )}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pesanRingkas);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-reservasi-judul"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#002117]/55 backdrop-blur-sm p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-xl bg-[#fcf9f2] rounded-t-3xl sm:rounded-2xl overflow-hidden lereng-float-shadow max-h-[92vh] flex flex-col"
      >
        {/* Drag handle mobile */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center bg-white">
          <span className="w-10 h-1.5 rounded-full bg-[#c0c9c3]" />
        </div>

        {/* Header drawer */}
        <div className="px-5 sm:px-6 py-4 bg-white border-b border-[#1b4d3e]/10 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#2e7d5a] mb-0.5">
              Simulasi &amp; Konfirmasi Tanpa Login
            </p>
            <h3
              id="drawer-reservasi-judul"
              className="text-lg sm:text-xl font-bold text-[#003629]"
            >
              Hitung Estimasi &amp; Hubungi Pengelola
            </h3>
          </div>
          <button
            type="button"
            aria-label="Tutup panel reservasi"
            onClick={onClose}
            className="w-11 h-11 rounded-full hover:bg-[#f0eee7] text-[#13241c] flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1b4d3e]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body formulir */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div>
            <label
              htmlFor="pilih-paket"
              className="block text-xs font-bold text-[#13241c] mb-1.5"
            >
              Pilih Paket Wisata
            </label>
            <select
              id="pilih-paket"
              value={paket.id}
              onChange={(e) => {
                const found = DAFTAR_PAKET.find((p) => p.id === e.target.value);
                if (found) onChangePaket(found);
              }}
              className="w-full h-[52px] px-4 rounded-xl bg-white border-[1.5px] border-[#1b4d3e]/20 text-[15px] font-semibold text-[#13241c] focus:outline-none focus:border-[#1b4d3e] focus:ring-3 focus:ring-[#2e7d5a]/15"
            >
              {DAFTAR_PAKET.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama} ({formatRupiah(item.hargaPerOrang)}/org)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="tanggal-kunjungan"
                className="block text-xs font-bold text-[#13241c] mb-1.5"
              >
                Rencana Tanggal Datang
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#1b4d3e] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="tanggal-kunjungan"
                  type="date"
                  min={todayStr}
                  value={tanggalKunjungan}
                  onChange={(e) => setTanggalKunjungan(e.target.value)}
                  className="w-full h-[52px] pl-10 pr-3 rounded-xl bg-white border-[1.5px] border-[#1b4d3e]/20 text-[15px] font-medium text-[#13241c] tabular-nums focus:outline-none focus:border-[#1b4d3e] focus:ring-3 focus:ring-[#2e7d5a]/15"
                />
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold text-[#13241c] mb-1.5">
                Jumlah Peserta (Min. {paket.minimalPeserta} org)
              </span>
              <div className="h-[52px] px-2 rounded-xl bg-white border-[1.5px] border-[#1b4d3e]/20 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Kurangi jumlah peserta"
                  disabled={jumlahPeserta <= paket.minimalPeserta}
                  onClick={() =>
                    setJumlahPeserta((n) => Math.max(paket.minimalPeserta, n - 1))
                  }
                  className="w-10 h-10 rounded-lg hover:bg-[#f6f3ec] disabled:opacity-35 flex items-center justify-center text-[#13241c] cursor-pointer disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#003629] tabular-nums">
                  <Users className="w-4 h-4 text-[#2e7d5a]" />
                  {jumlahPeserta} orang
                </span>

                <button
                  type="button"
                  aria-label="Tambah jumlah peserta"
                  disabled={jumlahPeserta >= paket.maksimalPeserta}
                  onClick={() =>
                    setJumlahPeserta((n) => Math.min(paket.maksimalPeserta, n + 1))
                  }
                  className="w-10 h-10 rounded-lg hover:bg-[#f6f3ec] disabled:opacity-35 flex items-center justify-center text-[#13241c] cursor-pointer disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="nama-pemesan"
              className="block text-xs font-bold text-[#13241c] mb-1.5"
            >
              Nama Perwakilan / Rombongan (Opsional)
            </label>
            <input
              id="nama-pemesan"
              type="text"
              placeholder="Contoh: Ibu Ratna / Keluarga Besar Bandung"
              value={namaPemesan}
              onChange={(e) => setNamaPemesan(e.target.value)}
              className="w-full h-[52px] px-4 rounded-xl bg-white border-[1.5px] border-[#1b4d3e]/20 text-[15px] text-[#13241c] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:ring-3 focus:ring-[#2e7d5a]/15"
            />
          </div>

          <div>
            <label
              htmlFor="catatan-khusus"
              className="block text-xs font-bold text-[#13241c] mb-1.5"
            >
              Catatan Tambahan (Opsional)
            </label>
            <textarea
              id="catatan-khusus"
              rows={2}
              placeholder="Contoh: Ada balita dan lansia, mohon siapkan menu tidak pedas."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-white border-[1.5px] border-[#1b4d3e]/20 text-[14px] text-[#13241c] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:ring-3 focus:ring-[#2e7d5a]/15 resize-none"
            />
          </div>

          {/* Ringkasan Biaya */}
          <div className="bg-white rounded-2xl p-4 border border-[#1b4d3e]/12 flex items-center justify-between gap-4">
            <div>
              <span className="block text-xs font-semibold text-[#404945]">
                Perkiraan Total Biaya
              </span>
              <span className="text-xs text-[#404945] tabular-nums">
                {formatRupiah(paket.hargaPerOrang)} × {jumlahPeserta} orang
              </span>
            </div>
            <span className="text-2xl font-extrabold text-[#003629] tabular-nums">
              {formatRupiah(totalBiaya)}
            </span>
          </div>

          <p className="text-xs text-[#404945] leading-relaxed">
            Tidak ada pembayaran langsung di website. Pembayaran dilakukan setelah jadwal
            dikonfirmasi langsung bersama sekretariat {INFO_DESA.nama}.
          </p>
        </div>

        {/* Footer Tombol Aksi */}
        <div className="p-4 sm:px-6 sm:py-5 bg-white border-t border-[#1b4d3e]/10 flex flex-col sm:flex-row gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[54px] px-5 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white text-[15px] font-bold inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Kirim ke WhatsApp Pengelola</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[50px] sm:min-h-[54px] px-4 rounded-xl border-[1.5px] border-[#1b4d3e] bg-[#fcf9f2] hover:bg-[#f0eee7] text-[#1b4d3e] text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#2e7d5a]" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Pesan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
