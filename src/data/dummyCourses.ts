import type { Course } from '../types/Course'

const dummyCourses: Course[] = [
  // Kursus Scratch
  {
    id: 'scratch',
    authorImage: 'Asset 4.png',
    image: 'scratch.png',
    category: 'Scratch',
    title: 'Belajar Coding Untuk Anak Menggunakan Scratch',
    author: 'Get Skill',
    price: '250.000.000',
    rating: 4.5,
    date: '25 Jul 2025',
    description: `Kursus ini mengajak anak-anak untuk mengenal dunia coding sejak dini melalui cara yang seru dan mudah dipahami. Dengan menggunakan Scratch—platform pemrograman visual yang dirancang khusus untuk anak-anak, peserta akan belajar menyusun logika, mengenali pola, dan membuat proyek digital seperti animasi dan game sederhana.
    
    Melalui pendekatan berbasis bermain sambil belajar, anak-anak akan mengembangkan keterampilan berpikir logis, kreativitas, dan pemecahan masalah. Kursus ini cocok untuk pemula yang belum memiliki pengalaman, dan dirancang agar setiap anak bisa belajar dengan menyenangkan, mandiri, dan penuh rasa ingin tahu.`,
    students: 100,
    syllabus: [
      {
        title: 'Pengenalan',
        description: 'Pengenalan Coding untuk Anak',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Apa itu Coding?',
          'Mengapa Belajar Coding Sejak Dini?',
          'Alat yang digunakan',
        ],
        quiz_questions: 3,
      },
      {
        title: 'Computational Thinking',
        description: 'Berpikir Logis untuk Menyelesaikan Masalah',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Apa Itu Computational Thinking?',
          'Decomposition',
          'Pattern Recognition',
          'Abstraction',
          'Algoritma',
          'Proyek Mini',
        ],
        quiz_questions: 3,
      },
      {
        title: 'Mengenal Dasar-dasar Coding',
        description: 'Dasar-dasar coding',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Apa Itu Perintah (Instruksi)?',
          'Mengenal Aplikasi Scratch',
          'Mengenal Antarmuka Scratch (Stage, Sprite, Block)',
          'Menyusun Blok Kode Pertamaku',
          'Tantangan Mini: Membuat Sprite Bergerak',
        ],
        quiz_questions: 3,
      },
      {
        title: 'Alur Logika dan Urutan Langkah',
        description: 'Susun Logika Seperti Merangkai Puzzle',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Apa Itu Urutan Langkah (Sequencing)?',
          'Membuat Gerakan Berurutan',
          'Tantangan Mini: Tari Gerakan Sprite',
          'Bermain dengan Suara dan Gerak',
        ],
        quiz_questions: 3,
      },
      {
        title: 'Pengambilan Keputusan (If-Then)',
        description: 'Pengambilan keputusan',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Memahami Konsep "Jika Maka"',
          'Mengenal Blok If dan If-Else di Scratch',
          'Membuat Interaksi Sederhana (Misal: Jika tombol ditekan, sprite meloncat)',
          'Tantangan Mini: Buat Karakter Menyapa Jika Dipencet',
        ],
        quiz_questions: 3,
      },
      {
        title: 'Pengulangan (Looping)',
        description: 'Melakukan Hal yang Sama Berulang Kali',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Apa Itu Looping?',
          'Loop "Ulangi X Kali" vs "Ulangi Selamanya"',
          'Tantangan Mini: Membuat Bola Bergerak Bolak-Balik',
          'Proyek Kecil: Animasi Bintang Menari',
        ],
        quiz_questions: 3,
      },
      {
        title: 'Proyek Mini Game Sederhana',
        description: 'Gabungkan Semua yang Sudah Dipelajari',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Ide Dasar Game: Tangkap Buah Apel',
          'Membuat Stage',
          'Menggerakkan Bowl',
          'Mengatur Dasar Sprite',
          'Menjatuhkan Apel Secara Acak',
          'Menambahkan Skor',
        ],
        quiz_questions: 3,
      },
    ]
  },
  
  // Kursus PHP
  {
    id: 'php-native',
    authorImage: 'Asset 4.png',
    image: 'php.jpeg',
    category: 'Pemrograman Website',
    title: 'Pemrograman Web dengan PHP Native: Dasar hingga CRUD (Create, Read, Update Delete)',
    author: 'Get Skill',
    price: '150.000',
    rating: 0.0,
    date: '28 Juni 2025',
    students: 3,
    description: `Modul ini dirancang untuk memberikan pemahaman dan keterampilan dasar dalam pemrograman web menggunakan PHP native (tanpa framework). Peserta akan mempelajari dasar-dasar sintaks PHP, struktur kontrol, pemrosesan form, hingga implementasi database menggunakan MySQL. Modul ini juga membimbing peserta secara bertahap dalam membuat aplikasi web sederhana dengan fitur CRUD (Create, Read, Update, Delete) sebagai fondasi dalam pengembangan aplikasi dinamis berbasis web.

Tujuan Pembelajaran:
Setelah menyelesaikan Modul ini, peserta diharapkan mampu:
• Memahami konsep dasar bahasa pemrograman PHP.
• Menggunakan PHP untuk membuat halaman web dinamis.
• Menghubungkan PHP dengan database MySQL.
• Menerapkan operasi CRUD dalam pengelolaan data berbasis web.
• Membangun aplikasi web sederhana menggunakan PHP native.

Metode Pembelajaran:
• Penjelasan teori dan demonstrasi
• Praktik langsung dengan studi kasus
• Tugas mandiri dan proyek akhir mini CRUD App

Cocok untuk:
Siswa SMK, mahasiswa, atau pemula yang ingin mempelajari pemrograman web menggunakan PHP tanpa framework.`,
    syllabus: [
      {
        title: 'Pendahuluan',
        description: 'PHP',
        quizzes: 1,
        tasks: 0,
        subtopics: [
          'Pengenalan PHP',
          'Pengenalan Text Editor',
          'Pengenalan Web Server',
          'Instalasi XAMPP'
        ],
        quiz_questions: 5,
      },
      {
        title: 'Struktur Dasar PHP',
        description: 'PHP',
        quizzes: 1,
        tasks: 5,
        subtopics: [
          'Pendahuluan Struktur Dasar PHP',
          'Sintaks',
          'Comments'
        ],
      },
      {
        title: 'Penggunaan PHP FORM',
        description: 'PHP',
        quizzes: 1,
        tasks: 4,
        subtopics: [
          'Pendahuluan Penggunaan PHP FORM',
          'Form Handling PHP',
          'Validasi Form PHP'
        ],
        quiz_questions: 5,
      },
      {
        title: 'PHP Lanjutan',
        description: 'PHP',
        quizzes: 1,
        tasks: 5,
        subtopics: [
          'Pendahuluan PHP Lanjutan',
          'Waktu dan Tanggal',
          'String',
          'Include dan require',
          'Include_once dan require_once',
          'Cookies',
          'Sessions'
        ],
        quiz_questions: 5,
      },
      {
        title: 'PHP-MySQli & CRUD BOOTSTRAP',
        description: 'PHP',
        quizzes: 1,
        tasks: 5,
        subtopics: [
          'Pendahuluan PHP-MySQli & CRUD BOOTSTRAP',
          'MySQli : Koneksi Database',
          'CRUD Bootstrap & MySQli : Input data ke Database',
          'CRUD Bootstrap & MySQli : Tampil data ke Database',
          'CRUD Bootstrap & MySQli : Update data dan Action Update ke Database',
          'CRUD Bootstrap & MySQli : Hapus data ke Database'
        ],
      },
      {
        title: 'ADMIN LTE',
        description: 'PHP',
        quizzes: 0,
        tasks: 5,
        subtopics: [
          'Pendahuluan ADMIN LTE',
          'Bedah Template AdminLTE',
          'Mengubah Header & Sidebar',
          'Merancang Database Sekolah pada AdminLTE',
          'Admin LTE CRUD: Input data ke Database',
          'Admin LTE CRUD: Tampil data ke Database',
          'Admin LTE CRUD: Update data dan Action Update ke Database',
          'Admin LTE CRUD: Hapus data ke Database'
        ],
        quiz_questions: 5,
      },
    ]
  },
  
  // Kursus Front End Web dengan Bootstrap
  {
    id: 'frontend-bootstrap',
    authorImage: 'Asset 4.png',
    image: 'frontend.jpeg',
    category: 'Pemrograman Website',
    title: 'Pemrograman Front End Web dengan Bootstrap',
    author: 'Get Skill',
    price: '300.000',
    rating: 0.0,
    date: '31 Januari 2025',
    students: 9,
    description: `Kursus ini dirancang untuk membekali peserta dengan pengetahuan dan keterampilan dasar dalam membangun tampilan antarmuka (user interface) web menggunakan teknologi HTML dan framework Bootstrap. Pembelajaran dimulai dari pengenalan struktur dasar HTML hingga penggunaan komponen Bootstrap untuk menciptakan tampilan web yang responsif dan profesional.

Peserta akan mempelajari tag, atribut, elemen, dan menerapkan praktik terbaik menggunakan semantic HTML. Selanjutnya, peserta akan dikenalkan dengan framework Bootstrap sebagai alat bantu untuk mempercepat proses styling dan layouting halaman web, termasuk penggunaan grid system, komponen UI, dan utility class.

Tujuan Akhir Pembelajaran:
Setelah mengikuti pembelajaran ini, peserta diharapkan mampu membuat halaman web statis yang rapi, terstruktur, semantik, dan responsif menggunakan HTML dan Bootstrap.`,
    syllabus: [
      {
        title: 'HTML',
        description: 'Bahasa markup dasar untuk menyusun struktur konten di halaman web seperti teks, gambar, dan tautan',
        quizzes: 1,
        tasks: 8,
        subtopics: [
          'Pengenalan HTML',
          'Atribut HTML & Block Elements',
          'HTML Images & Formatted Text',
          'Inline Elements',
          'Semantic HTML dan Generic Elements',
          'HTML Table',
          'HTML List',
          'HTML Forms'
        ],
        quiz_questions: 5
      },
      {
        title: 'CSS',
        description: 'Digunakan untuk mengatur tampilan dan gaya visual halaman web, termasuk warna, ukuran, dan tata letak',
        quizzes: 0,
        tasks: 5,
        subtopics: [
          'Pengertian CSS',
          'CSS Float, Position, Background, Text, Font, Alignment, Margin, Padding',
          'CSS Selector, Cascade, Spacing, Inheritance, Color, Pseudo Class, String Unit',
          'CSS Border, Shadow, Focus, Z-index, Function',
          'CSS Animations, Filters, Blend Modes, Lists, Transitions, Overflow',
          'Teknik Layouting dengan CSS Grid (Flexbox vs CSS Grid, Grid Container dan Grid Item)'
        ]
      },
      {
        title: 'Javascript',
        description: 'Bahasa pemrograman yang membuat halaman web menjadi interaktif dan responsif terhadap tindakan pengguna',
        quizzes: 0,
        tasks: 7,
        subtopics: [
          'Pengertian Javascript',
          'BOM (Browser Object Model)',
          'DOM (Document Object Model)',
          'Web Interaktif',
          'LocalStorage',
          'Framework JavaScript'
        ]
      },
      {
        title: 'Bootstrap',
        description: 'Framework CSS siap pakai untuk membuat antarmuka web yang responsif dan konsisten dengan cepat',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Instalasi Bootstrap dan menerapkan pada project Web',
          'Bootstrap Layout: Container dan Grid System',
          'Bootstrap Content: Typography, Tables, Images, Navbar',
          'Bootstrap Forms',
          'Bootstrap Components'
        ],
        quiz_questions: 2
      },
    ]
  },
  
  // Kursus Java Fundamental Programming
  {
    id: 'java-fundamental',
    authorImage: 'Asset 4.png',
    image: 'java.jpeg',
    category: 'Pemrograman Desktop',
    title: 'Java Fundamental Programming',
    author: 'Get Skill',
    price: '300.000',
    rating: 0.0,
    date: '25 April 2025',
    students: 3,
    description: `Java Fundamental Programming adalah fondasi utama yang wajib dipahami oleh siapa pun yang ingin menekuni dunia pemrograman, khususnya dalam bahasa Java. Kursus ini dirancang untuk memberikan pemahaman yang menyeluruh, dimulai dari konsep algoritma dasar, hingga membangun program yang kompleks menggunakan prinsip OOP (Object-Oriented Programming).

Di awal pembelajaran, peserta akan dikenalkan pada:
- Konsep dasar algoritma
- Instalasi Java Development Kit (JDK) dan Visual Studio Code
- Membuat project, compile, dan run program Java
- Struktur dasar penulisan program di Java
- Gaya penulisan (case style) dan penulisan komentar
- Variabel dan tipe data
- Input dan output di Java
- Operator pemrograman
- Percabangan dan perulangan
- Array dan ArrayList
- Operasi string
- Konsep OOP (Object-Oriented Programming)`,
    syllabus: [
      {
        title: 'Pengenalan, Persiapan, dan Memulai Program Java',
        description: 'Menjelaskan cara kerja Java, instalasi tools, dan membuat program pertama',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Pengenalan JDK (Java Development Kit)',
          'Pengenalan Visual Studio Code',
          'Instalasi JDK',
          'Instalasi Visual Studio Code',
          'Persiapan Visual Studio Code Untuk Pemrograman Java',
          'Membuat Project, Compile, Run di Visual Studio Code',
          'Struktur Dasar Penulisan Program di Java',
          'Gaya Penulisan Case (Case Style)',
          'Penulisan Komentar di Java'
        ],
        quiz_questions: 5
      },
      {
        title: 'Konsep Algoritma Pemrograman',
        description: 'Membahas logika dasar dan langkah-langkah terstruktur dalam menyelesaikan masalah menggunakan program',
        quizzes: 1,
        tasks: 4,
        subtopics: [
          'Pengertian Algoritma',
          'Notasi Algoritma'
        ],
        quiz_questions: 2
      },
      {
        title: 'Variabel dan Tipe Data',
        description: 'Mengenal cara menyimpan data dengan tipe tertentu seperti angka, teks, dan logika',
        quizzes: 1,
        tasks: 5,
        subtopics: [
          'Pengertian Variabel',
          'Aturan Penamaan Variabel',
          'Tipe Data',
          'Jenis-Jenis Tipe Data di Java',
          'Tipe Data Primitif',
          'Tipe Data Non-Primitif',
          'Pembuatan Variabel dan Tipe Data',
          'Variabel dan Konstanta'
        ],
        quiz_questions: 5
      },
      {
        title: 'Operator Pemrograman',
        description: 'Menggunakan simbol untuk melakukan operasi matematika, logika, atau perbandingan',
        quizzes: 1,
        tasks: 16,
        subtopics: [
          'Pengertian Operator Pemrograman',
          'Operator Aritmatika',
          'Operator Assignment (Penugasan)',
          'Operator Increment dan Decrement',
          'Operator Perbandingan / Relasional',
          'Operator Logika',
          'Operator Bitwise',
          'Operator Ternary'
        ],
        quiz_questions: 5
      },
      {
        title: 'Percabangan',
        description: 'Menjalankan kode berbeda berdasarkan kondisi tertentu dalam program',
        quizzes: 1,
        tasks: 9,
        subtopics: [
          'Pengertian Percabangan',
          'Percabangan if-else',
          'Percabangan switch-case',
          'Pada Kondisi Apa Menggunakan if-else dan switch-case?'
        ],
        quiz_questions: 5
      },
      {
        title: 'Perulangan',
        description: 'Menjalankan kode berulang kali selama kondisi masih terpenuhi',
        quizzes: 1,
        tasks: 13,
        subtopics: [
          'Pengertian Perulangan',
          'Jenis Perulangan',
          'Perulangan for',
          'Perulangan while',
          'Perulangan do-while'
        ],
        quiz_questions: 5
      },
      {
        title: 'Perulangan Lanjutan',
        description: 'Menggunakan nested loop, kontrol break dan continue, serta efisiensi logika perulangan',
        quizzes: 1,
        tasks: 14,
        subtopics: [
          'Break',
          'Continue',
          'Perulangan Bersarang (Nested Loop)'
        ],
        quiz_questions: 5
      },
      {
        title: 'Array dan ArrayList',
        description: 'Menyimpan banyak data dalam satu variabel menggunakan struktur data sekuensial',
        quizzes: 1,
        tasks: 18,
        subtopics: [
          'Pengertian Array',
          'Array Satu Dimensi',
          'Array Dua Dimensi',
          'ArrayList'
        ],
        quiz_questions: 5
      },
      {
        title: 'Operasi String',
        description: 'Memanipulasi teks seperti penggabungan, pemotongan, pencarian, dan penggantian',
        quizzes: 1,
        tasks: 17,
        subtopics: [
          'Pengertian Operasi String',
          'String Length',
          'String IsEmpty()',
          'String Trim()',
          'String concat()',
          'String replace()',
          'String toLowerCase()',
          'String toUpperCase()',
          'String Split()'
        ],
        quiz_questions: 5
      },
      {
        title: 'Input dan Output di Java',
        description: 'Cara menerima masukan dari pengguna dan menampilkan hasil ke layar',
        quizzes: 1,
        tasks: 4,
        subtopics: [
          'Output di Java',
          'Input di Java'
        ],
        quiz_questions: 5
      },
      {
        title: 'Konsep OOP (Object Oriented Programming)',
        description: 'Pengenalan ke pemrograman berbasis objek dengan konsep class, object, inheritance, dan encapsulation',
        quizzes: 1,
        tasks: 15,
        subtopics: [
          'Pengertian Konsep OOP',
          'Konsep Class dan Object',
          'Inheritance',
          'Polymorphism',
          'Abstract Class',
          'Interface'
        ],
        quiz_questions: 5
      },
      {
        title: 'Algoritma',
        description: 'Penerapan logika terstruktur untuk menyelesaikan masalah nyata dengan langkah efisien',
        quizzes: 1,
        tasks: 16,
        subtopics: [
          'Pengantar Algoritma',
          'Rekursif',
          'Sorting',
          'Searching',
          'Binary Search'
        ],
        quiz_questions: 5
      }
    ]
  },

  // kursus GitHub
  {
    id: 'github-dasar',
    authorImage: 'Asset 4.png',
    image: 'github.png',
    category: 'Github',
    title: 'Tutorial Dasar Menggunakan GitHub',
    author: 'Get Skill',
    price: '0',
    rating: 4.0,
    isFree: true,
    date: '21 Januari 2025',
    students: 125,
    description: `Pelajari dasar-dasar GitHub, platform kontrol versi dan kolaborasi kode yang paling banyak digunakan oleh pengembang di seluruh dunia. Kursus ini dirancang untuk pemula yang ingin memahami cara kerja GitHub dari awal hingga dapat mengelola repositori mereka sendiri.

    Dalam kursus ini, Anda akan mempelajari:
    1. Register Akun GitHub
    2. Installasi Git
    3. Create Repository
    4. Clone, Push and Pull Repository

    Dengan mengikuti kursus ini, Anda akan memiliki keterampilan yang diperlukan untuk:
    - Mulai berkontribusi pada proyek open source
    - Mengelola kode sumber Anda sendiri
    - Berkolaborasi dengan pengembang lain secara profesional`,
    syllabus: [
      {
        title: 'Pengenalan & Registrasi Akun GitHub',
        description: 'Panduan Langkah Demi Langkah Membuat Akun GitHub',
        quizzes: 1,
        tasks: 0,
        subtopics: [
          'Pengenalan GitHub',
          'Registrasi Akun GitHub'
        ],
        quiz_questions: 1
      },
      {
        title: 'Installasi Git dan Konfigurasi Git',
        description: 'Menyiapkan Git untuk pertama Kali',
        quizzes: 0,
        tasks: 0,
        subtopics: [
          'Installasi Git dan Konfigurasi Git'
        ]
      },
      {
        title: 'Membuat Repository pada GitHub',
        description: 'Langkah-Langkah Membuat Repository Baru di GitHub',
        quizzes: 0,
        tasks: 0,
        subtopics: [
          'Membuat Repository pada GitHub'
        ]
      },
      {
        title: 'Cloning, Push, dan Pull Repository di GitHub',
        description: 'Menambahkan Perubahan dan Melakukan Push ke GitHub',
        quizzes: 0,
        tasks: 0,
        subtopics: [
          'Tutorial melakukan cloning, push dan pull pada GitHub'
        ]
      }
    ]
  },
  {
    id: 'laravel-fundamental',
    authorImage: 'Asset 4.png',
    image: 'laravel.png',
    category: 'Pemrograman Website',
    title: 'Pemrograman Web menggunakan Framework LARAVEL',
    author: 'Get Skill',
    price: '300.000',
    rating: 0.0,
    date: '6 Januari 2025',
    students: 5,
    description: `Laravel Fundamental Programming adalah kursus dasar untuk memahami salah satu framework PHP paling populer di dunia. Kursus ini dirancang untuk memberikan pemahaman menyeluruh mengenai bagaimana Laravel bekerja dan mengapa framework ini menjadi pilihan utama dalam pengembangan aplikasi web modern.

Materi dimulai dari pengenalan Laravel, yang mencakup:
- Roadmap belajar Laravel
- Keuntungan menggunakan Laravel
- Konsep arsitektur MVC (Model-View-Controller)
- Instalasi Laravel menggunakan Composer

Setelah memahami dasar framework, Anda akan mempelajari:
- Routing dan pengelolaan berbagai jenis request
- Pembuatan dan pengelolaan Controller
- Perancangan database dengan Migration dan Model Eloquent
- Pembuatan View menggunakan Blade Template Engine
- Implementasi fitur CRUD (Create, Read, Update, Delete)

Dengan menyelesaikan kursus ini, Anda akan memiliki fondasi kuat dalam mengembangkan aplikasi web menggunakan Laravel, serta siap untuk melangkah ke tahap lanjut seperti validasi data, autentikasi, RESTful API, dan testing.`,
    syllabus: [
      {
        title: 'Framework Laravel',
        description: 'Pengenalan dasar Laravel dan konsep MVC',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Pengertian Laravel',
          'Roadmap Belajar Laravel',
          'Keuntungan Framework Laravel',
          'Konsep MVC (Model-View-Controller)',
          'Instalasi Composer dan Laravel'
        ],
        quiz_questions: 5
      },
      {
        title: 'Route',
        description: 'Pengelolaan routing di Laravel',
        quizzes: 1,
        tasks: 2,
        subtopics: [
          'Pengertian Route',
          'Jenis File Route',
          'Macam-macam Route',
          'List Route'
        ],
        quiz_questions: 5
      },
      {
        title: 'Controller',
        description: 'Penggunaan controller di Laravel',
        quizzes: 1,
        tasks: 2,
        subtopics: [
          'Pengertian Controller',
          'Penggunaan Controller',
          'Menghubungkan antara route dan controller',
          'Parameter dari route',
          'Penggunaan Resource Controller'
        ],
        quiz_questions: 5
      },
      {
        title: 'Perancangan Database',
        description: 'Konsep perancangan database untuk Laravel',
        quizzes: 1,
        tasks: 2,
        subtopics: [
          'Entity Relationship Diagram (ERD)',
          'Relasi 1:1, 1:m, m:m',
          'Index',
          'View'
        ],
        quiz_questions: 5
      },
      {
        title: 'Model dan Migration',
        description: 'Pengelolaan database dengan model dan migration',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Pengenalan Model',
          'Pengenalan Migration',
          'Implementasi model dan migration',
          'Menjalankan Migration'
        ],
        quiz_questions: 5
      },
      {
        title: 'Eloquent ORM',
        description: 'Penggunaan Eloquent untuk operasi database',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Pengertian Eloquent ORM',
          'Cara Menginput Data Menggunakan Eloquent ORM',
          'Mass Assignment',
          'Mengupdate Data dalam Eloquent ORM',
          'Mass Update',
          'Proses Menghapus Data dengan Eloquent',
          'Mass Delete',
          'Method All()',
          'Cara Mengirim Data ke View',
          'Method where()',
          'Method first()',
          'Method find()',
          'Method latest()',
          'Method limit()',
          'Method skip() dan take()',
          'Method Soft Delete',
          'Restore Soft Delete',
          'Menghapus Data Permanent',
          'Relasi one-to-one',
          'Relasi one-to-many',
          'Relasi many-to-many'
        ],
        quiz_questions: 5
      },
      {
        title: 'View',
        description: 'Pembuatan tampilan dengan Blade Template Engine',
        quizzes: 1,
        tasks: 2,
        subtopics: [
          'Pengenalan view dan blade (@if, @foreach)',
          'Cara membuat view',
          'Blade Template Engine',
          'Menghubungkan view dengan controller',
          'Passing data dari controller',
          'Load Assets'
        ],
        quiz_questions: 5
      },
      {
        title: 'CRUD',
        description: 'Implementasi operasi CRUD di Laravel',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Pengenalan CRUD',
          'Langkah-langkah buat tabel CRUD Laravel',
          'Membuat Tampil Data',
          'Membuat Fungsi CREATE',
          'Membuat Fungsi UPDATE',
          'Membuat Fungsi DELETE'
        ],
        quiz_questions: 5
      },
      {
        title: 'Middleware',
        description: 'Penggunaan middleware dan session di Laravel',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Pengertian Middleware',
          'Penggunaan Session'
        ],
        quiz_questions: 5
      }
    ]
  },

  // Kursus Pemrograman Dasar Python Baru
  {
    id: 'python-dasar',
    authorImage: 'Asset 4.png',
    image: 'python.jpeg',
    category: 'Pemrograman Desktop',
    title: 'Pemrograman Dasar Python untuk Pemula',
    author: 'Get Skill',
    price: '250.000',
    rating: 4.2,
    date: '15 Agustus 2025',
    students: 45,
    description: `Kursus ini dirancang untuk mengajarkan dasar-dasar pemrograman menggunakan Python, bahasa pemrograman yang populer dan mudah dipahami. Python banyak digunakan dalam pengembangan web, analisis data, kecerdasan buatan, dan berbagai bidang teknologi lainnya.

Apa yang akan Anda pelajari:
- Dasar-dasar sintaks Python
- Struktur kontrol program
- Tipe data dan struktur data Python
- Fungsi dan modul
- Penanganan file
- Pengenalan Object-Oriented Programming (OOP)

Keunggulan kursus ini:
✓ Cocok untuk pemula tanpa pengalaman coding
✓ Materi disusun secara bertahap dari dasar
✓ Contoh kasus nyata dan praktik langsung
✓ Persiapan karir di bidang teknologi`,
    syllabus: [
      {
        title: 'Pengenalan Python',
        description: 'Memulai perjalanan belajar Python',
        quizzes: 1,
        tasks: 1,
        subtopics: [
          'Apa itu Python?',
          'Keunggulan Python',
          'Instalasi Python dan IDE',
          'Menjalankan program Python pertama',
          'Syntax dasar Python'
        ],
        quiz_questions: 5
      },
      {
        title: 'Variabel dan Tipe Data',
        description: 'Mengenal penyimpanan data dalam program',
        quizzes: 1,
        tasks: 3,
        subtopics: [
          'Pengertian variabel',
          'Aturan penamaan variabel',
          'Tipe data dasar (integer, float, string, boolean)',
          'Konversi tipe data',
          'Input/output dasar'
        ],
        quiz_questions: 5
      },
      {
        title: 'Operator',
        description: 'Operasi dasar dalam pemrograman',
        quizzes: 1,
        tasks: 2,
        subtopics: [
          'Operator aritmatika',
          'Operator perbandingan',
          'Operator logika',
          'Operator assignment',
          'Operator identitas dan keanggotaan'
        ],
        quiz_questions: 5
      },
      {
        title: 'Struktur Kontrol',
        description: 'Mengatur alur program',
        quizzes: 1,
        tasks: 4,
        subtopics: [
          'Percabangan if-elif-else',
          'Perulangan for',
          'Perulangan while',
          'Break dan continue',
          'Pass statement'
        ],
        quiz_questions: 5
      },
      {
        title: 'Struktur Data',
        description: 'Mengelola kumpulan data',
        quizzes: 1,
        tasks: 3,
        subtopics: [
          'List dan operasinya',
          'Tuple',
          'Dictionary',
          'Set',
          'List comprehension'
        ],
        quiz_questions: 5
      },
      {
        title: 'Fungsi',
        description: 'Membuat kode modular',
        quizzes: 1,
        tasks: 2,
        subtopics: [
          'Definisi fungsi',
          'Parameter dan argumen',
          'Return value',
          'Lambda function',
          'Scope variabel'
        ],
        quiz_questions: 5
      },
      {
        title: 'Penanganan File',
        description: 'Bekerja dengan file eksternal',
        quizzes: 1,
        tasks: 2,
        subtopics: [
          'Membuka dan menutup file',
          'Membaca file',
          'Menulis ke file',
          'Berbagai mode file',
          'Exception handling'
        ],
        quiz_questions: 5
      },
      {
        title: 'Pengenalan OOP',
        description: 'Konsep dasar Pemrograman Berorientasi Objek',
        quizzes: 1,
        tasks: 2,
        subtopics: [
          'Konsep class dan object',
          'Attribute dan method',
          'Inheritance',
          'Encapsulation',
          'Contoh implementasi sederhana'
        ],
        quiz_questions: 5
      },
      {
        title: 'Proyek Akhir',
        description: 'Mengaplikasikan semua yang dipelajari',
        quizzes: 0,
        tasks: 1,
        subtopics: [
          'Membuat program manajemen kontak sederhana',
          'Implementasi CRUD dasar',
          'Penyimpanan data ke file'
        ]
      }
    ]
  }

];


export default dummyCourses;