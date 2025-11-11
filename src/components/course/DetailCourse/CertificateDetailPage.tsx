import { Users, Star } from "lucide-react";
import githubImage from "/public/images/github.png";
import getSkillBanner from "/src/assets/img/logo/get-skill/landscape.png";
import { useState } from "react";

const CertificateDetailPage = () => {
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handleDownloadCertificate = () => {
    const link = document.createElement("a");
    link.href = "/images/1.jpg";
    link.download = "sertifikat.jpg";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0D0D1A] pb-20 transition-colors duration-500">
      {/* ==================== HEADER SERTIFIKAT - FULL WIDTH ==================== */}
      <section className="bg-gray-200 dark:bg-gray-900 border-b dark:border-gray-800 py-8 transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 lg:pl-27">
          <div className="flex flex-col items-center">
            <div
              className="relative group bg-purple-300 dark:bg-purple-900 border border-purple-300 dark:border-purple-800 rounded-2xl p-4 shadow-sm w-full max-w-md text-center overflow-hidden cursor-pointer transition-colors duration-500"
              onClick={() => setShowFullscreen(true)}
            >
              <img
                src="/images/2.png"
                alt="Sertifikat"
                className="w-full h-auto max-h-[280px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay saat hover */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium">Klik untuk melihat layar penuh</span>
              </div>

            </div>

            {/* Tombol Unduh Sertifikat */}
            <button
              onClick={handleDownloadCertificate}
              className="w-fit relative group overflow-hidden font-sans font-semibold text-sm py-2.5 px-4 mt-4 rounded-full flex items-center justify-center gap-2 border transition-all duration-500 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 bg-white dark:bg-gray-800 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-700 transition-colors duration-500"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              <span className="relative z-10">Unduh Sertifikat</span>
            </button>

          </div>
        </div>

        {showFullscreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setShowFullscreen(false)}
          >
            <img
              src="/images/2.png"
              alt="Sertifikat Fullscreen"
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg object-contain transition-transform duration-300"
            />
          </div>
        )}
      </section>

      {/* ==================== KONTEN UTAMA & STATISTIK PROFIL ==================== */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 lg:pl-27">
        <div className="grid grid-cols-1 lg:grid-cols-[1.9fr_1fr] gap-8">
          {/* ==================== BAGIAN KONTEN UTAMA ==================== */}
          <div>
            <section className="mb-8">
              <div className="w-full mb-6 flex justify-center">
                <img
                  src={githubImage}
                  alt="Certificate Hero"
                  className="max-w-[700px] w-full rounded-2xl shadow-md object-cover"
                />
              </div>

              <h1 className="text-[15px] md:text-[17px] font-bold text-gray-800 dark:text-white leading-snug mb-4 text-left transition-colors duration-500">
                Resolving Conflicts Between Designers And Engineers
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-[13px] text-left transition-colors duration-500">
                Doctor is your advisor at smart, connectivity engineering unit...
              </p>

              <div className="flex items-center gap-4 mb-4">
                <button className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 bg-gray-300 dark:bg-gray-700 rounded-lg px-2 py-0.5 transition-colors duration-500">
                  Development
                </button>

                <div className="flex items-center gap-1 dark:text-white">
                  <span className="text-[11px] font-medium">4.5</span>
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[11px]">Review</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-600 dark:text-gray-400 transition-colors duration-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-500">
                    <span className="text-[11px] font-medium dark:text-white">DM</span>
                  </div>
                  <span className="dark:text-white">David Miller</span>
                </div>
                <div className="flex items-center gap-2 dark:text-white">
                  <Users size={16} />
                  <span>2,500 Students</span>
                </div>

                {/* Tombol Lihat Kursus */}
                <button
                  className="w-fit relative group overflow-hidden font-sans font-semibold text-[11px] py-1.5 px-3 rounded-full flex items-center justify-center gap-2 border transition-all duration-500 ease-in-out shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 bg-white dark:bg-gray-800 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-700 transition-colors duration-500 ml-auto"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                  <span className="relative z-10">Lihat Kursus</span>
                </button>

              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-900 py-10 rounded-2xl transition-colors duration-500">
                <img src={getSkillBanner} alt="GetSkill Banner" className="w-56" />
              </div>
            </section>

            <section className="text-gray-700 dark:text-gray-300 leading-relaxed text-left transition-colors duration-500">
              <p className="mb-6 text-[13px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>

              <h2 className="text-[15px] font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-500">
                Materi yang Dipelajari
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Belajar Dasar Pemrograman Web", desc: "Panduan Langkah Membuat Akun GitHub" },
                  { title: "Instalasi Git dan Konfigurasi", desc: "Menyiapkan Git untuk Pertama Kali" },
                  { title: "Membuat Repository di GitHub", desc: "Langkah Membuat Repository Baru" },
                  { title: "Cloning, Push, dan Pull Repository", desc: "Menambahkan Perubahan dan Push" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 text-white text-[11px] font-semibold flex items-center justify-center mt-1">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-800 dark:text-white transition-colors duration-500">{item.title}</p>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 transition-colors duration-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ==================== SIDEBAR STATISTIK PROFIL ==================== */}
          <aside>
            <div className="w-[260px] sticky top-25 bottom-20 h-fit p-2 mx-auto lg:mx-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border dark:border-gray-700 transition-colors duration-500">
                <h2 className="text-[13px] font-semibold mb-4 text-start text-gray-800 dark:text-white transition-colors duration-500">
                  Statistik Profil
                </h2>

                <div className="flex flex-col items-center text-center mb-4">
                  <img
                    src="https://i.pravatar.cc/150?img=8"
                    alt="Profil"
                    className="w-16 h-16 rounded-full object-cover mb-3"
                  />
                  <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">
                    Alfian Fahrul Ban Dalam
                  </h3>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-500">alfian22@gmail.com</p>
                </div>

                <div className="text-[12px] text-gray-600 dark:text-gray-400 space-y-3 transition-colors duration-500">
                  <div className="grid grid-cols-[90px_10px_1fr] gap-x-2 items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-start transition-colors duration-500">Diberikan</span>
                    <span>:</span>
                    <span className="text-gray-800 dark:text-gray-200 text-end font-medium transition-colors duration-500">12 Sep 2024</span>
                  </div>

                  <div className="grid grid-cols-[90px_10px_1fr] gap-x-2 items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-start transition-colors duration-500">Berlaku</span>
                    <span>:</span>
                    <span className="text-gray-800 dark:text-gray-200 text-end font-medium transition-colors duration-500">10 Okt 2028</span>
                  </div>
                </div>

                {/* Tombol Lihat Profil Lengkap */}
                <button className="mt-5 w-full relative group overflow-hidden font-sans font-semibold text-sm py-2 px-3 rounded-full flex items-center justify-center gap-2 border transition-all duration-500 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 bg-white dark:bg-gray-800 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-700 transition-colors duration-500">
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                  <span className="relative z-10">Lihat Profil Lengkap</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetailPage;