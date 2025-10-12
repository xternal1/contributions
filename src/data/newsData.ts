import berita1 from '../assets/img/courses/course_thumb01.jpg';
import berita2 from '../assets/img/courses/course_thumb02.jpg';
import berita3 from '../assets/img/courses/course_thumb03.jpg';
import berita4 from '../assets/img/courses/course_thumb04.jpg';
import berita5 from '../assets/img/courses/course_thumb05.jpg';

export interface NewsArticle {
  id: string;
  image: string;
  date: string;
  dateISO: string;
  title: string;
  summary: string;
  content: string;
  category: string;
}

const defaultContent = `
Dalam era digital yang terus berkembang pesat, GetSkill.id hadir sebagai solusi inovatif untuk memajukan kualitas pendidikan dan keterampilan masyarakat Indonesia. Platform ini tidak hanya menyediakan berbagai kursus yang relevan dengan kebutuhan pasar kerja, tetapi juga berfokus pada pengembangan kemampuan praktis melalui metode pembelajaran interaktif dan kolaboratif.

Setiap modul dirancang oleh para ahli di bidangnya, dengan materi yang selalu diperbarui agar sesuai dengan tren dan teknologi terbaru. Selain itu, GetSkill.id menyediakan fitur komunitas yang memungkinkan peserta untuk berdiskusi, bertukar pengalaman, dan membangun jejaring profesional yang kuat.

Komitmen GetSkill.id untuk menciptakan ekosistem belajar yang inklusif dan berkelanjutan menjadikan platform ini sebagai pilihan utama bagi para pembelajar yang ingin meningkatkan kompetensi mereka secara efektif dan efisien. Dengan dukungan teknologi terkini dan tim pengajar yang berdedikasi, GetSkill.id terus berupaya membantu pengguna mencapai tujuan karier dan pengembangan pribadi mereka di era globalisasi.
`;

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    image: berita1,
    date: '01 Juli 2025',
    dateISO: '2025-07-01',
    title: 'GetSkill.id Resmi Diluncurkan, Hadirkan Platform Pembelajaran Digital Inovatif',
    summary:
      'Malang, 9 Juli 2025 – Platform pembelajaran digital GetSkill.id resmi diluncurkan dengan tujuan merevolusi cara masyarakat Indonesia mengakses pendidikan dan pelatihan keterampilan...',
    content: defaultContent,
    category: 'Teknologi',
  },
  {
    id: '2',
    image: berita2,
    date: '15 Juni 2025',
    dateISO: '2025-06-15',
    title: 'Workshop Desain UI/UX Gratis Bersama GetSkill.id Sukses Digelar',
    summary:
      'GetSkill.id baru saja sukses menyelenggarakan workshop desain UI/UX gratis yang diikuti oleh ratusan peserta dari berbagai latar belakang...',
    content: defaultContent,
    category: 'Edukasi',
  },
  {
    id: '3',
    image: berita3,
    date: '05 Juni 2025',
    dateISO: '2025-06-05',
    title: 'GetSkill.id Berkolaborasi dengan Universitas Ternama untuk Program Magang',
    summary:
      'Dalam upaya memperkuat ekosistem pendidikan dan industri, GetSkill.id mengumumkan kolaborasi strategis dengan beberapa universitas ternama di Indonesia...',
    content: defaultContent,
    category: 'Edukasi',
  },
  {
    id: '4',
    image: berita4,
    date: '28 Mei 2025',
    dateISO: '2025-05-28',
    title: 'Sukses Menggelar Pelatihan Pemasaran Digital, GetSkill.id Raih Penghargaan',
    summary:
      'GetSkill.id kembali menunjukkan komitmennya dalam meningkatkan literasi digital masyarakat dengan sukses menggelar pelatihan pemasaran digital...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
  {
    id: '5',
    image: berita5,
    date: '10 Mei 2025',
    dateISO: '2025-05-10',
    title: 'Pembaruan Fitur: GetSkill.id Luncurkan Forum Komunitas Pembelajar',
    summary:
      'Untuk menciptakan pengalaman belajar yang lebih interaktif dan kolaboratif, GetSkill.id meluncurkan fitur baru berupa forum komunitas...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
  {
    id: '6',
    image: berita1,
    date: '05 Mei 2025',
    dateISO: '2025-05-05',
    title: 'Fitur Baru GetSkill.id: Sistem Gamifikasi untuk Meningkatkan Motivasi Belajar',
    summary:
      'GetSkill.id memperkenalkan sistem gamifikasi terbaru yang dirancang untuk membuat proses belajar menjadi lebih menyenangkan dan interaktif...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
  {
    id: '7',
    image: berita2,
    date: '28 April 2025',
    dateISO: '2025-04-28',
    title: 'Integrasi GetSkill.id dengan Platform Pembayaran Digital Baru',
    summary:
      'Memudahkan pengguna dalam melakukan pembayaran, GetSkill.id kini terintegrasi dengan beberapa platform pembayaran digital populer...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
  {
    id: '8',
    image: berita3,
    date: '20 April 2025',
    dateISO: '2025-04-20',
    title: 'Update Fitur Chat Langsung di GetSkill.id untuk Kolaborasi Lebih Baik',
    summary:
      'Fitur chat langsung di GetSkill.id telah diperbarui dengan berbagai fungsi baru untuk mempermudah komunikasi antar peserta dan mentor...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
  {
    id: '9',
    image: berita4,
    date: '10 April 2025',
    dateISO: '2025-04-10',
    title: 'GetSkill.id Meluncurkan Mode Belajar Offline untuk Pengguna Premium',
    summary:
      'Kini pengguna premium dapat mengakses kursus secara offline dengan fitur mode belajar offline terbaru di GetSkill.id...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
  {
    id: '10',
    image: berita5,
    date: '01 April 2025',
    dateISO: '2025-04-01',
    title: 'Peningkatan Keamanan Akun dengan Autentikasi Dua Faktor di GetSkill.id',
    summary:
      'GetSkill.id menambahkan fitur autentikasi dua faktor untuk meningkatkan keamanan akun pengguna dan mencegah akses tidak sah...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
  {
    id: '11',
    image: berita1,
    date: '20 Maret 2025',
    dateISO: '2025-03-20',
    title: 'GetSkill.id Luncurkan Dashboard Statistik Belajar Pengguna',
    summary:
      'Dashboard baru ini memungkinkan pengguna melihat perkembangan belajar secara real-time dan analisis kemajuan mereka...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
  {
    id: '12',
    image: berita2,
    date: '10 Maret 2025',
    dateISO: '2025-03-10',
    title: 'Pembaruan Desain UI GetSkill.id untuk Pengalaman Pengguna Lebih Baik',
    summary:
      'Tim desain GetSkill.id menghadirkan pembaruan antarmuka yang lebih modern dan responsif untuk kenyamanan belajar pengguna...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
  {
    id: '13',
    image: berita3,
    date: '01 Maret 2025',
    dateISO: '2025-03-01',
    title: 'GetSkill.id Perkenalkan Sistem Rekomendasi Kursus Berbasis AI',
    summary:
      'Dengan teknologi AI terbaru, GetSkill.id kini merekomendasikan kursus yang paling relevan dan sesuai kebutuhan pengguna secara otomatis...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
  {
    id: '14',
    image: berita4,
    date: '20 Februari 2025',
    dateISO: '2025-02-20',
    title: 'Fitur Kolaborasi Proyek Grup di GetSkill.id Resmi Diluncurkan',
    summary:
      'Fitur kolaborasi proyek ini memungkinkan pengguna untuk bekerja dalam tim dan belajar secara bersama-sama secara online...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
  {
    id: '15',
    image: berita5,
    date: '10 Februari 2025',
    dateISO: '2025-02-10',
    title: 'Tutorial Video Interaktif Kini Tersedia di Semua Kursus GetSkill.id',
    summary:
      'GetSkill.id menambahkan tutorial video interaktif yang dapat membantu pengguna memahami materi lebih efektif...',
    content: defaultContent,
    category: 'Fitur Baru',
  },
];
