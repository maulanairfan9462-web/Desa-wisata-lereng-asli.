/**
 * BERKAS DATA TERPUSAT — DESA WISATA LERENG ASRI
 * -------------------------------------------------------------------------
 * Seluruh data contoh destinasi, paket wisata, galeri, dan kontak pengelola
 * disimpan dalam satu berkas ini agar mudah diubah, ditambah, atau disesuaikan
 * tanpa perlu mengedit komponen antarmuka.
 *
 * Catatan: Website ini bersifat informasi & simulasi pemesanan via WhatsApp
 * tanpa sistem login maupun pembayaran daring.
 */

export type KategoriDestinasi = 'Alam' | 'Budaya' | 'Kuliner' | 'Edukasi';

export interface DestinasiItem {
  id: string;
  nama: string;
  kategori: KategoriDestinasi;
  ringkasan: string;
  deskripsiLengkap: string;
  gambar: string;
  altGambar: string;
  suhu: string;
  jamBuka: string;
  tiketMasuk: number;
  jarakDariBalai: string;
  ramahKeluarga: boolean;
  kulinerHalal?: boolean;
  sorotan: string[];
  paketTerkaitId: string;
}

export type KategoriPaket = 'Wisata Harian' | 'Menginap & Homestay' | 'Rombongan';

export interface PaketWisataItem {
  id: string;
  nama: string;
  kategori: KategoriPaket;
  unggulan?: boolean;
  durasi: string;
  hargaPerOrang: number;
  minimalPeserta: number;
  maksimalPeserta: number;
  gambar: string;
  altGambar: string;
  ringkasan: string;
  ramahKeluarga: boolean;
  makanHalal: boolean;
  fasilitas: string[];
  catatanSuhu: string;
}

export type KategoriGaleri = 'Lanskap' | 'Aktivitas' | 'Kuliner & Homestay';

export interface GaleriItem {
  id: string;
  judul: string;
  kategori: KategoriGaleri;
  keterangan: string;
  gambar: string;
  lokasi: string;
}

export const INFO_DESA = {
  nama: 'Desa Wisata Lereng Asri',
  merekSingkat: 'Lereng Asri',
  tagline: 'Kesejukan Lereng Pegunungan & Kehangatan Tradisi Lokal',
  lokasiRingkas: 'Kec. Sumbersejuk, Kab. Malang — 1.150 mdpl',
  alamatLengkap:
    'Jl. Raya Perkebunan Teh No. 18, Dusun Sumbersejuk, Desa Lereng Asri, Kabupaten Malang, Jawa Timur 65152',
  ketinggian: '1.150 mdpl',
  suhuRataRata: '18°C – 22°C',
  jarakTempuh: '± 45 menit dari pusat kota',
  jamOperasional: 'Setiap hari, 06.00 – 18.00 WIB',
  nomorWhatsApp: '6281234567890',
  teleponTampil: '+62 812-3456-7890',
  email: 'halo@lerengasri.id',
  heroGambar: '/src/assets/images/hero_lereng_asri_1794889541457.jpg',
  heroAlt:
    'Panorama pagi Desa Wisata Lereng Asri dengan anjungan bambu menghadap kebun teh berkabut dan sinar matahari terbit',
  ringkasanAkses: [
    'Jalan beraspal mulus hingga area parkir utama pendopo desa (muat bus medium & mobil keluarga).',
    'Tersedia musala bersih, toilet ramah lansia, dan pos kesehatan di sekitar balai wisata.',
    'Seluruh sajian kuliner warga dan warung desa terjamin bahan halal serta dimasak segar setiap pagi.',
  ],
};

export const DAFTAR_DESTINASI: DestinasiItem[] = [
  {
    id: 'curug-embun-pagi',
    nama: 'Curug Embun Pagi',
    kategori: 'Alam',
    ringkasan:
      'Air terjun bertingkat berair jernih dengan dek pandang kayu aman di tengah rimbun pakis pegunungan.',
    deskripsiLengkap:
      'Curug Embun Pagi menawarkan suara gemericik air pegunungan yang jernih dan udara sejuk penuh uap embun alami. Jalur masuk sepanjang 450 meter sudah dilengkapi pijakan batu alam dan pagar pegangan kayu sehingga nyaman dilalui bersama keluarga maupun orang tua.',
    gambar: '/src/assets/images/destinasi_air_terjun_1794889540995.jpg',
    altGambar: 'Air terjun bertingkat Curug Embun Pagi dikelilingi tebing berlumut dan hutan pakis hijau',
    suhu: '17°C – 20°C',
    jamBuka: '07.00 – 16.30 WIB',
    tiketMasuk: 15000,
    jarakDariBalai: '1,2 km (10 menit jalan santai)',
    ramahKeluarga: true,
    sorotan: [
      'Dek foto kayu menghadap air terjun utama',
      'Kolam dangkal jernih untuk bermain air di tepian',
      'Gazebo istirahat dan warung wedang jahe hangat',
    ],
    paketTerkaitId: 'jelajah-sehari',
  },
  {
    id: 'terasering-kebun-teh',
    nama: 'Terasering Kebun Teh Asri',
    kategori: 'Edukasi',
    ringkasan:
      'Hamparan kebun teh berundak dengan jalur setapak batu serta sesi petik dan seduh teh daun segar.',
    deskripsiLengkap:
      'Berjalan menyusuri pematang batu dan bambu di antara barisan perdu teh hijau yang rapi sejak fajar. Pengunjung dapat mengikuti pemandu lokal untuk mengenal teknik petik pucuk tiga daun muda sekaligus mencoba proses pelayuan teh tradisional.',
    gambar: '/src/assets/images/destinasi_kebun_teh_1794889540136.jpg',
    altGambar: 'Perkebunan teh hijau berteras dengan jalur batu dan pemetik teh berjalan di pagi berkabut',
    suhu: '17°C – 21°C',
    jamBuka: '06.00 – 17.00 WIB',
    tiketMasuk: 20000,
    jarakDariBalai: '400 meter dari pendopo',
    ramahKeluarga: true,
    sorotan: [
      'Jalur jalan kaki landai berpagar bambu',
      'Pengalaman petik pucuk teh bersama petani',
      'Gratis 1 cangkir teh hijau seduh hangat',
    ],
    paketTerkaitId: 'jelajah-sehari',
  },
  {
    id: 'puncak-pandang-pinus',
    nama: 'Puncak Pandang Kabut Pinus',
    kategori: 'Alam',
    ringkasan:
      'Anjungan kayu di punggungan hutan pinus untuk menyaksikan lautan awan dan matahari terbit keemasan.',
    deskripsiLengkap:
      'Terletak di titik tertinggi desa pada ketinggian 1.320 mdpl, Puncak Pandang Kabut Pinus menjadi lokasi terbaik menikmati hamparan kabut lembah di pagi hari. Pengelola menyediakan penerangan jalur sejak pukul 04.45 WIB dan bangku kayu hangat di gardu pandang.',
    gambar: '/src/assets/images/destinasi_puncak_pinus_1794889540123.jpg',
    altGambar: 'Anjungan kayu di puncak hutan pinus menghadap lautan awan dan matahari terbit',
    suhu: '15°C – 19°C',
    jamBuka: '05.00 – 17.30 WIB',
    tiketMasuk: 18000,
    jarakDariBalai: '2,4 km (tersedia ojek wisata desa)',
    ramahKeluarga: false,
    sorotan: [
      'Pemandangan lautan awan pukul 05.15 – 07.00 WIB',
      'Area perkemahan pinus berkapasitas 30 tenda',
      'Spot foto gardu pandang kayu menghadap lembah',
    ],
    paketTerkaitId: 'homestay-kayu-2h1m',
  },
  {
    id: 'kampung-homestay-budaya',
    nama: 'Kampung Homestay & Pendopo Bambu',
    kategori: 'Budaya',
    ringkasan:
      'Kawasan rumah kayu tradisional tempat belajar membatik ecoprint daun lereng dan seni karawitan sore.',
    deskripsiLengkap:
      'Kawasan hunian warga yang ditata asri dengan arsitektur kayu jati dan anyaman bambu. Wisatawan tidak hanya menginap, melainkan diajak berinteraksi langsung melalui lokakarya ecoprint berbahan dedaunan sekitar serta jamuan teh sore di beranda desa.',
    gambar: '/src/assets/images/paket_homestay_kayu_1794889540267.jpg',
    altGambar: 'Rumah kayu dan bambu tradisional di lereng bukit hijau dengan beranda santai',
    suhu: '19°C – 22°C',
    jamBuka: '08.00 – 21.00 WIB',
    tiketMasuk: 0,
    jarakDariBalai: '250 meter (pusat kampung)',
    ramahKeluarga: true,
    sorotan: [
      'Gratis kunjungan halaman & pendopo kriya warga',
      'Kelas membatik ecoprint kain katun ramah anak',
      'Pertunjukan gamelan karawitan setiap akhir pekan',
    ],
    paketTerkaitId: 'homestay-kayu-2h1m',
  },
  {
    id: 'dapur-kopi-lereng',
    nama: 'Dapur Lereng & Seduh Kopi Arabika',
    kategori: 'Kuliner',
    ringkasan:
      'Saung makan terbuka berlatar kebun teh yang menyajikan hidangan desa halal dan kopi panen lokal.',
    deskripsiLengkap:
      'Menghadirkan cita rasa rumahan khas pegunungan seperti nasi kuning tumpeng bambu, ayam goreng lengkuas, urap sayur segar, tempe kemul hangat, serta kopi arabika lereng yang disangrai tradisional oleh kelompok tani kopi setempat.',
    gambar: '/src/assets/images/galeri_kuliner_kopi_1794889540947.jpg',
    altGambar: 'Hidangan nasi kuning tradisional dalam besek bambu dan kopi panas di meja kayu berlatar kebun teh',
    suhu: '18°C – 22°C',
    jamBuka: '07.00 – 19.00 WIB',
    tiketMasuk: 0,
    jarakDariBalai: '150 meter',
    ramahKeluarga: true,
    kulinerHalal: true,
    sorotan: [
      '100% bahan segar desa & dapur bersertifikat halal',
      'Sesi seduh manual kopi arabika bersama petani',
      'Meja makan luas menghadap lembah berkabut',
    ],
    paketTerkaitId: 'keluarga-ceria',
  },
  {
    id: 'kebun-organik-sumbersejuk',
    nama: 'Kebun Petik Sayur Organik',
    kategori: 'Edukasi',
    ringkasan:
      'Lahan pertanian terpadu bebas pestisida tempat anak dan keluarga memanen langsung sayuran dataran tinggi.',
    deskripsiLengkap:
      'Dirancang sebagai ruang belajar alam terbuka untuk keluarga dan pelajar. Pengunjung dibekali keranjang anyaman bambu untuk memetik selada, wortel manis, dan stroberi lereng serta belajar cara membuat kompos alami dari limbah daun teh.',
    gambar: '/src/assets/images/hero_lereng_asri_1794889541457.jpg',
    altGambar: 'Lanskap terasering hijau pegunungan dan kawasan kampung pertanian Desa Lereng Asri',
    suhu: '18°C – 22°C',
    jamBuka: '07.30 – 16.00 WIB',
    tiketMasuk: 15000,
    jarakDariBalai: '600 meter',
    ramahKeluarga: true,
    sorotan: [
      'Aktivitas panen sayur segar untuk dibawa pulang',
      'Taman kelinci dan edukasi pengomposan organik',
      'Jalur datar dan aman untuk kereta dorong maupun lansia',
    ],
    paketTerkaitId: 'keluarga-ceria',
  },
];

export const DAFTAR_PAKET: PaketWisataItem[] = [
  {
    id: 'jelajah-sehari',
    nama: 'Jelajah Sehari Kebun Teh & Curug',
    kategori: 'Wisata Harian',
    unggulan: true,
    durasi: '1 Hari (07.30 – 15.30 WIB)',
    hargaPerOrang: 125000,
    minimalPeserta: 2,
    maksimalPeserta: 25,
    gambar: '/src/assets/images/destinasi_kebun_teh_1794889540136.jpg',
    altGambar: 'Paket wisata jalan kaki pagi menyusuri terasering kebun teh dan air terjun',
    ringkasan:
      'Pilihan paling diminati untuk menikmati udara segar pagi, berjalan santai di kebun teh, dan bersantai di Curug Embun Pagi.',
    ramahKeluarga: true,
    makanHalal: true,
    catatanSuhu: 'Sejuk 17°C – 21°C (disarankan bawa jaket tipis)',
    fasilitas: [
      'Pemandu wisata ramah lokal dari warga desa',
      'Tiket masuk Terasering Kebun Teh & Curug Embun Pagi',
      'Sesi petik & seduh teh hangat pagi plus kudapan rebusan',
      '1x makan siang menu desa halal di Dapur Lereng',
    ],
  },
  {
    id: 'homestay-kayu-2h1m',
    nama: 'Menginap Tenang di Homestay Kayu (2H1M)',
    kategori: 'Menginap & Homestay',
    unggulan: true,
    durasi: '2 Hari 1 Malam',
    hargaPerOrang: 385000,
    minimalPeserta: 2,
    maksimalPeserta: 12,
    gambar: '/src/assets/images/paket_homestay_kayu_1794889540267.jpg',
    altGambar: 'Homestay kayu jati dan anyaman bambu dengan beranda menghadap bukit hijau',
    ringkasan:
      'Menginap nyaman di rumah kayu beranda pemandangan lembah, lengkap dengan tur matahari terbit dan lokakarya ecoprint.',
    ramahKeluarga: true,
    makanHalal: true,
    catatanSuhu: 'Dingin malam 15°C – 18°C (tersedia selimut tebal & air hangat)',
    fasilitas: [
      '1 malam di Homestay Kayu & Bambu (air hangat & teh 24 jam)',
      '3x makan hidangan rumahan halal & seduh kopi lereng',
      'Antar-jemput ojek wisata ke Puncak Pandang Kabut Pinus saat subuh',
      'Lokakarya batik ecoprint (hasil kain dibawa pulang)',
    ],
  },
  {
    id: 'keluarga-ceria',
    nama: 'Paket Keluarga Ceria & Edukasi Kebun',
    kategori: 'Wisata Harian',
    durasi: '1 Hari (08.00 – 15.00 WIB)',
    hargaPerOrang: 165000,
    minimalPeserta: 4,
    maksimalPeserta: 20,
    gambar: '/src/assets/images/galeri_kuliner_kopi_1794889540947.jpg',
    altGambar: 'Sajian sarapan dan makan siang keluarga dalam besek bambu berlatar pegunungan',
    ringkasan:
      'Dirancang khusus untuk keluarga multi-generasi dengan jalur datar, petik sayur organik, dan jamuan makan siang bersama.',
    ramahKeluarga: true,
    makanHalal: true,
    catatanSuhu: 'Nyaman 18°C – 22°C dengan akses kursi istirahat memadai',
    fasilitas: [
      'Akses jalur landai ramah anak balita dan lansia',
      'Aktivitas petik sayur organik (bawa pulang 1 kg hasil panen)',
      'Sesi interaksi taman kelinci & mewarnai caping bambu untuk anak',
      'Makan siang prasmanan keluarga halal & minuman hangat',
    ],
  },
  {
    id: 'retreat-komunitas',
    nama: 'Kemah Pinus & Retreat Komunitas (2H1M)',
    kategori: 'Rombongan',
    durasi: '2 Hari 1 Malam',
    hargaPerOrang: 295000,
    minimalPeserta: 10,
    maksimalPeserta: 60,
    gambar: '/src/assets/images/destinasi_puncak_pinus_1794889540123.jpg',
    altGambar: 'Area punggungan hutan pinus untuk kegiatan rombongan dan berkemah menghadap lembah kabut',
    ringkasan:
      'Cocok untuk komunitas, sekolah, atau kantor yang ingin beristirahat dari rutinitas dengan api unggun dan kegiatan luar ruang.',
    ramahKeluarga: false,
    makanHalal: true,
    catatanSuhu: 'Dingin malam 15°C – 17°C (tenda dome & matras hangat disiapkan)',
    fasilitas: [
      'Tenda dome kapasitas 3–4 orang, sleeping bag, dan matras',
      'Penggunaan Pendopo Bambu & sound system portabel untuk sesi diskusi',
      'Api unggun malam dengan jagung bakar & wedang ronde hangat',
      '3x makan prasmanan desa halal + 2x rehat kopi & jajanan pasar',
    ],
  },
];

export const DAFTAR_GALERI: GaleriItem[] = [
  {
    id: 'galeri-1',
    judul: 'Kabut Pagi dari Anjungan Bambu',
    kategori: 'Lanskap',
    keterangan: 'Pemandangan matahari terbit menyinari atap rumah kampung di antara terasering kebun teh.',
    gambar: '/src/assets/images/hero_lereng_asri_1794889541457.jpg',
    lokasi: 'Anjungan Utama Desa Lereng Asri',
  },
  {
    id: 'galeri-2',
    judul: 'Segarnya Aliran Curug Embun Pagi',
    kategori: 'Lanskap',
    keterangan: 'Cahaya pagi menembus kanopi pakis hutan hujan di atas air terjun bertingkat.',
    gambar: '/src/assets/images/destinasi_air_terjun_1794889540995.jpg',
    lokasi: 'Curug Embun Pagi',
  },
  {
    id: 'galeri-3',
    judul: 'Langkah Pagi Pemetik Daun Teh',
    kategori: 'Aktivitas',
    keterangan: 'Warga setempat berjalan menyusuri jalur batu di sela-sela pucuk teh hijau.',
    gambar: '/src/assets/images/destinasi_kebun_teh_1794889540136.jpg',
    lokasi: 'Terasering Kebun Teh Asri',
  },
  {
    id: 'galeri-4',
    judul: 'Lautan Awan Puncak Pinus',
    kategori: 'Lanskap',
    keterangan: 'Pengunjung menikmati suasana tenang fajar dari gardu kayu di atas awan lembah.',
    gambar: '/src/assets/images/destinasi_puncak_pinus_1794889540123.jpg',
    lokasi: 'Puncak Pandang Kabut Pinus',
  },
  {
    id: 'galeri-5',
    judul: 'Beranda Hangat Homestay Kayu',
    kategori: 'Kuliner & Homestay',
    keterangan: 'Waktu santai minum teh pagi di teras rumah kayu tradisional dikelilingi taman hijau.',
    gambar: '/src/assets/images/paket_homestay_kayu_1794889540267.jpg',
    lokasi: 'Kampung Homestay Lereng Asri',
  },
  {
    id: 'galeri-6',
    judul: 'Nasi Kuning Besek & Kopi Lereng',
    kategori: 'Kuliner & Homestay',
    keterangan: 'Sajian sarapan khas desa berbahan lokal dengan seduhan arabika hangat di beranda terbuka.',
    gambar: '/src/assets/images/galeri_kuliner_kopi_1794889540947.jpg',
    lokasi: 'Dapur Lereng',
  },
];

export function formatRupiah(nominal: number): string {
  if (nominal === 0) return 'Gratis Masuk';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(nominal);
}
