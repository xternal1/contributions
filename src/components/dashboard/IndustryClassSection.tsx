import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import component8 from '../../assets/landingpage/home/component8.png';
import component9 from '../../assets/landingpage/home/component9.png';

const SkeletonIndustryClass: React.FC = () => {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-center gap-10 z-10 relative animate-pulse">
      <div className="md:w-1/2 text-center md:text-left">
        <div className="bg-gray-200 h-8 w-2/3 mb-4 rounded-full mx-auto md:mx-0"></div>
        <div className="bg-gray-200 h-6 w-full mb-2 rounded"></div>
        <div className="bg-gray-200 h-6 w-5/6 mb-6 rounded mx-auto md:mx-0"></div>
        <div className="bg-gray-200 h-10 w-32 rounded-[20px] mx-auto md:mx-0"></div>
      </div>

      <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow-lg flex flex-col items-center justify-center">
            <div className="bg-gray-200 h-10 w-1/2 mb-2 rounded"></div>
            <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IndustryClassSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="py-[3vh] sm:py-[4vh] md:py-[5vh] lg:py-[8vh] xl:py-[10vh] 2xl:py-[12vh] bg-gray-50 font-sans antialiased">
      <section className="py-16 sm:py-20 md:py-28 lg:py-32 bg-gray-50 rounded-lg relative overflow-hidden">
        <img
          src={component8}
          alt="Component 8"
          className="absolute z-0 opacity-100 animate-rotate
                     hidden sm:block
                     top-4 sm:top-6 md:top-10
                     right-6 sm:right-16 md:right-[120px]
                     w-8 sm:w-10 md:w-14 h-auto"
        />
        <img
          src={component9}
          alt="Component 9"
          className="absolute z-0 opacity-100 animate-jump
                     hidden sm:block
                     bottom-8 sm:bottom-12 md:bottom-[45px]
                     left-6 sm:left-16 md:left-[420px]
                     w-8 sm:w-10 md:w-14 h-auto"
        />

        {isLoading ? (
          <SkeletonIndustryClass />
        ) : (
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-center gap-10 z-10 relative">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Jelajahi Kelas{' '}
                <span className="bg-yellow-400 px-3 sm:px-4 py-1 font-bold text-white rounded-[5px] inline-block">
                  Industri
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 text-justify md:text-left max-w-md mx-auto md:mx-0">
                Tingkatkan keterampilan dengan program kelas industri yang dirancang
                untuk menjembatani dunia akademik dan profesional. Dapatkan pengalaman
                langsung dari para ahli dan siapkan diri untuk karier yang kompetitif.
              </p>

              {/* Button Login */}
              <div className="mt-6" data-aos="fade" data-aos-delay="700">
                <Link to="/login">
                  <button
                    className="group bg-[#9425FE] text-white font-semibold py-2 px-5 sm:py-3 sm:px-6 
                    rounded-full flex items-center justify-center mx-auto md:mx-0 gap-2
                    transition-all duration-500 ease-in-out
                    shadow-[4px_4px_0_#0A0082] 
                    hover:bg-yellow-400 hover:shadow-none
                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                    focus:outline-none"
                  >
                    <span className="transition-colors duration-500 group-hover:text-[#0A0082]">
                      Gabung Sekarang
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 transition-colors duration-500 text-white group-hover:text-[#0A0082]"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="md:w-1/2 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-5 text-center">
              <div className="bg-white p-4 sm:p-6 md:p-2 lg:p-6 aspect-[4/3] md:aspect-square rounded-xl shadow-lg flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9900FF]">
                  755+
                </span>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base mt-2">
                  Siswa Kelas Industri
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 md:p-2 lg:p-6 aspect-[4/3] md:aspect-square rounded-xl shadow-lg flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9900FF]">
                  97+
                </span>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base mt-2">
                  Alumni Kelas Industri
                </p>
              </div>

              <div className="bg-white p-4 sm:p-6 md:p-2 lg:p-6 aspect-[4/3] md:aspect-square rounded-xl shadow-lg flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9900FF]">
                  18+
                </span>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base mt-2">
                  Sekolah Bergabung
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default IndustryClassSection;
