import React, { useState, useEffect } from 'react';
import logoDesktop from '../../assets/img/logo/get-skill/logo.png';
import logoMobile from '../../assets/img/logo/get-skill/landscape.png';
import star from '../../assets/landingpage/home/star.png';
import layer1 from '../../assets/landingpage/home/layer1.png';
import layer2 from '../../assets/landingpage/home/layer2.png';

// --- Skeleton Loader ---
const SkeletonAboutUs: React.FC = () => {
  return (
    <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-20 flex flex-col md:flex-row items-center justify-center animate-pulse">
      {/* Skeleton for Logo */}
      <div className="w-full md:w-5/12 flex justify-center pr-0 md:pr-4 mb-6 md:mb-0">
        <div className="bg-gray-200 h-[100px] w-full max-w-[200px] sm:max-w-[250px] rounded-lg"></div>
      </div>

      {/* Skeleton for Text */}
      <div className="w-full md:w-7/12 text-center md:text-left pl-0 md:pl-4">
        <div className="bg-gray-200 h-6 w-32 rounded-full mb-4 mx-auto md:mx-0"></div>
        <div className="bg-gray-200 h-8 w-64 rounded mb-6 mx-auto md:mx-0"></div>
        <div className="space-y-3">
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-11/12 rounded"></div>
          <div className="bg-gray-200 h-4 w-10/12 rounded"></div>
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const AboutUsSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <section className="relative py-[10vh] sm:py-[13vh] md:py-[15vh] lg:py-[18vh] xl:py-[20vh] 2xl:py-[20vh] bg-white rounded-lg mt-0 overflow-hidden">
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}
      </style>

      <img
        src={star}
        alt="Star"
        className="absolute top-[15%] right-[8%] w-8 sm:w-12 opacity-100 z-0 bounce-star"
      />
      <img
        src={layer1}
        alt="layer1"
        className="absolute top-20 -left-5 w-[200px] sm:w-[300px] md:w-[500px] opacity-100 z-0"
      />
      <img
        src={layer2}
        alt="layer2"
        className="absolute -bottom-10 right-0 w-[180px] sm:w-[250px] md:w-[500px] opacity-100 z-0"
      />

      {/* Conditional Render */}
      {isLoading ? (
        <SkeletonAboutUs />
      ) : (
        <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-20 flex flex-col md:flex-row items-center justify-center fade-in-up">
          {/* Logo */}
          <div className="w-full md:w-5/12 flex justify-center pr-0 md:pr-0">
            <img
              src={logoDesktop}
              alt="Getskill Desktop"
              className="hidden md:block w-full max-w-[200px] lg:max-w-[250px]"
            />
            <img
              src={logoMobile}
              alt="Getskill Mobile"
              className="block md:hidden w-full max-w-[200px] sm:max-w-[250px]"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-7/12 text-center md:text-left pl-0 md:pl-0">
            <span className="px-3 py-2 text-[10px] sm:text-xs font-semibold bg-[#F6EEFE] text-[#9425FE] rounded-full">
              Tentang Kami
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-4 mb-6">
              Apa Itu Getskill?
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed text-justify">
              Getskill adalah platform pembelajaran online yang dirancang untuk membantu pengguna
              dalam mengembangkan keterampilan, memperdalam wawasan, dan meningkatkan kompetensi di
              berbagai bidang. Dengan berbagai pilihan kursus yang diajarkan oleh para ahli, Getskill
              memberikan pengalaman belajar yang interaktif, fleksibel, dan mudah diakses kapan saja
              serta di mana saja. Selain itu, platform ini juga menyediakan event pelatihan eksklusif
              yang memungkinkan peserta untuk mendapatkan ilmu terbaru, berdiskusi dengan instruktur
              berpengalaman, serta memperoleh sertifikat sebagai bukti kompetensi yang dapat
              mendukung perkembangan karier mereka.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUsSection;