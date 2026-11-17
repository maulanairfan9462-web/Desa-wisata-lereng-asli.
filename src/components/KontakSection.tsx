import { useState, FormEvent } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { INFO_DESA } from '../data/wisataData';

export function KontakSection() {
  const [nama, setNama] = useState('');
  const [kontak, setKontak] = useState('');
  const [topik, setTopik] = useState('Informasi Paket Wisata');
  const [pesan, setPesan] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [terkirim, setTerkirim] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!nama.trim() || !kontak.trim() || !pesan.trim()) {
      setErrorMsg('Mohon lengkapi nama, nomor WhatsApp/email, dan pesan Anda.');
      return;
    }

    if (kontak.trim().length < 6) {
      setErrorMsg('Mohon masukkan nomor WhatsApp atau alamat email yang valid.');
      return;
    }

    setTerkirim(true);
  };

  const whatsappDirectUrl = `https://wa.me/${INFO_DESA.nomorWhatsApp}?text=${encodeURIComponent(
    `Halo Pengelola ${INFO_DESA.nama}, saya ingin menanyakan informasi kunjungan.`
  )}`;

  const whatsappFormUrl = `https://wa.me/${INFO_DESA.nomorWhatsApp}?text=${encodeURIComponent(
    `Halo Pengelola ${INFO_DESA.nama},\nNama: ${nama}\nKontak: ${kontak}\nTopik: ${topik}\nPesan: ${pesan}`
  )}`;

  return (
    <>
      <section id="kontak" className="py-12 sm:py-16 bg-[#fcf9f2]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-semibold text-[#2e7d5a] mb-2">
              04. Lokasi &amp; Layanan Pengunjung
            </p>
            <h2 className="text-[24px] leading-[32px] sm:text-[32px] sm:leading-[40px] font-bold tracking-[-0.015em] text-[#003629]">
              Kontak &amp; Petunjuk Kunjungan
            </h2>
            <p className="text-[15px] sm:text-base text-[#404945] mt-2 leading-relaxed">
              Tim Kelompok Sadar Wisata (Pokdarwis) siap menjawab pertanyaan jadwal,
              akses kendaraan rombongan, hingga kebutuhan khusus keluarga.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Kolom Kiri: Info Sekretariat & Akses */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 lereng-card-shadow flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-[#003629]">
                  Sekretariat {INFO_DESA.nama}
                </h3>

                <div className="space-y-4 text-[14px] sm:text-[15px] text-[#404945]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#1b4d3e] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-[#13241c]">
                        Alamat Lokasi
                      </span>
                      <span>{INFO_DESA.alamatLengkap}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#1b4d3e] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-[#13241c]">
                        Jam Layanan Wisata
                      </span>
                      <span className="tabular-nums">{INFO_DESA.jamOperasional}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#1b4d3e] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-[#13241c]">
                        WhatsApp &amp; Telepon Resmi
                      </span>
                      <span className="tabular-nums">{INFO_DESA.teleponTampil}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#1b4d3e] shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-[#13241c]">
                        Pos-el Pengelola
                      </span>
                      <span>{INFO_DESA.email}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1b4d3e]/10">
                  <h4 className="text-xs font-bold text-[#003629] mb-2.5">
                    Catatan Kesiapan Kunjungan
                  </h4>
                  <ul className="space-y-2 text-[13px] text-[#404945]">
                    {INFO_DESA.ringkasanAkses.map((catatan) => (
                      <li key={catatan} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2e7d5a] shrink-0 mt-0.5" />
                        <span>{catatan}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[50px] px-5 rounded-xl border-[1.5px] border-[#1b4d3e] bg-[#d99b26]/10 hover:bg-[#1b4d3e] text-[#1b4d3e] hover:text-white text-[15px] font-bold inline-flex items-center justify-center gap-2 transition-colors duration-150 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat Langsung via WhatsApp</span>
              </a>
            </div>

            {/* Kolom Kanan: Formulir Pertanyaan Cepat */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 lereng-card-shadow">
              <h3 className="text-xl font-bold text-[#003629] mb-1.5">
                Kirim Pesan ke Pengelola
              </h3>
              <p className="text-sm text-[#404945] mb-6">
                Tanyakan ketersediaan homestay, penyesuaian menu rombongan, atau kondisi
                cuaca terbaru sebelum berangkat.
              </p>

              {terkirim ? (
                <div className="rounded-2xl bg-[#f6f3ec] p-6 border border-[#2e7d5a]/25 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#2e7d5a] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-[#003629]">
                        Pesan Anda Siap Diteruskan
                      </h4>
                      <p className="text-sm text-[#404945] mt-1 leading-relaxed">
                        Terima kasih, <strong className="text-[#13241c]">{nama}</strong>.
                        Ringkasan pesan untuk topik <strong>{topik}</strong> telah dicatat
                        dan dapat langsung dikirimkan melalui WhatsApp pengelola agar
                        segera direspons.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={whatsappFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[50px] px-5 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Lanjutkan ke WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setTerkirim(false);
                        setNama('');
                        setKontak('');
                        setPesan('');
                      }}
                      className="min-h-[48px] px-5 rounded-xl border border-[#1b4d3e]/25 text-[#13241c] text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
                    >
                      Tulis Pesan Baru
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {errorMsg && (
                    <div
                      role="alert"
                      className="rounded-xl bg-[#ffdad6] text-[#93000a] px-4 py-3 text-sm font-semibold"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="kontak-nama"
                        className="block text-xs font-bold text-[#13241c] mb-1.5"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        id="kontak-nama"
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        className="w-full h-[52px] px-4 rounded-xl bg-white border-[1.5px] border-[#1b4d3e]/15 text-[15px] text-[#13241c] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:ring-3 focus:ring-[#2e7d5a]/15"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="kontak-info"
                        className="block text-xs font-bold text-[#13241c] mb-1.5"
                      >
                        Nomor WhatsApp atau Email
                      </label>
                      <input
                        id="kontak-info"
                        type="text"
                        placeholder="0812xxxx atau nama@email.com"
                        value={kontak}
                        onChange={(e) => setKontak(e.target.value)}
                        className="w-full h-[52px] px-4 rounded-xl bg-white border-[1.5px] border-[#1b4d3e]/15 text-[15px] text-[#13241c] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:ring-3 focus:ring-[#2e7d5a]/15"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="kontak-topik"
                      className="block text-xs font-bold text-[#13241c] mb-1.5"
                    >
                      Keperluan Kunjungan
                    </label>
                    <select
                      id="kontak-topik"
                      value={topik}
                      onChange={(e) => setTopik(e.target.value)}
                      className="w-full h-[52px] px-4 rounded-xl bg-white border-[1.5px] border-[#1b4d3e]/15 text-[15px] font-medium text-[#13241c] focus:outline-none focus:border-[#1b4d3e] focus:ring-3 focus:ring-[#2e7d5a]/15"
                    >
                      <option value="Informasi Paket Wisata">
                        Informasi Paket Wisata
                      </option>
                      <option value="Ketersediaan Homestay Kayu">
                        Ketersediaan Homestay Kayu
                      </option>
                      <option value="Kunjungan Rombongan / Sekolah">
                        Kunjungan Rombongan / Sekolah
                      </option>
                      <option value="Akses Jalan & Fasilitas Keluarga">
                        Akses Jalan &amp; Fasilitas Keluarga
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="kontak-pesan"
                      className="block text-xs font-bold text-[#13241c] mb-1.5"
                    >
                      Pesan atau Pertanyaan
                    </label>
                    <textarea
                      id="kontak-pesan"
                      rows={4}
                      placeholder="Tuliskan tanggal rencana kedatangan, perkiraan jumlah orang, atau pertanyaan lainnya..."
                      value={pesan}
                      onChange={(e) => setPesan(e.target.value)}
                      className="w-full p-4 rounded-xl bg-white border-[1.5px] border-[#1b4d3e]/15 text-[15px] text-[#13241c] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:ring-3 focus:ring-[#2e7d5a]/15 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[54px] px-7 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white text-[15px] font-bold inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pertanyaan</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Tenang & Editorial */}
      <footer className="bg-[#003629] text-[#f3f0ea] py-10 pb-24 md:pb-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-lg font-extrabold tracking-tight text-white">
              {INFO_DESA.nama}
            </p>
            <p className="text-xs sm:text-sm text-[#9ed1bd] mt-1">
              {INFO_DESA.tagline} · {INFO_DESA.ketinggian}
            </p>
          </div>

          <nav
            aria-label="Navigasi footer"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-[#f0eee7]"
          >
            <a href="#beranda" className="hover:text-[#fdba45] transition-colors">
              Beranda
            </a>
            <a href="#destinasi" className="hover:text-[#fdba45] transition-colors">
              Destinasi
            </a>
            <a href="#paket" className="hover:text-[#fdba45] transition-colors">
              Paket
            </a>
            <a href="#galeri" className="hover:text-[#fdba45] transition-colors">
              Galeri
            </a>
            <a href="#kontak" className="hover:text-[#fdba45] transition-colors">
              Kontak
            </a>
          </nav>

          <p className="text-xs text-[#8abda9]">
            © {new Date().getFullYear()} Pokdarwis {INFO_DESA.merekSingkat}. Data contoh
            informasi wisata.
          </p>
        </div>
      </footer>
    </>
  );
}
