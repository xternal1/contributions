import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import modelPhoto2 from '../../assets/landingpage/home/modelPhoto2.png';
import modelPhoto2Dark from '../../assets/landingpage/home/modelPhoto2-dark.png';

const SkeletonBenefit: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 animate-pulse">
      {/* Skeleton for Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <div className="w-full max-w-[250px] sm:max-w-sm md:max-w-md h-[300px] bg-gray-200 dark:bg-[#2A2942] rounded-lg"></div>
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left">
        <div className="bg-gray-200 dark:bg-[#2A2942] h-6 w-40 rounded-full mb-4 mx-auto md:mx-0"></div>
        <div className="bg-gray-200 dark:bg-[#2A2942] h-10 w-full rounded mb-4"></div>
        <div className="bg-gray-200 dark:bg-[#2A2942] h-10 w-3/4 rounded mb-6 mx-auto md:mx-0"></div>
        <div className="bg-gray-200 dark:bg-[#2A2942] h-20 w-full rounded mb-6"></div>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-200 dark:bg-[#2A2942] rounded-full mr-2"></div>
            <div className="bg-gray-200 dark:bg-[#2A2942] h-5 w-3/4 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-200 dark:bg-[#2A2942] rounded-full mr-2"></div>
            <div className="bg-gray-200 dark:bg-[#2A2942] h-5 w-4/5 rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-200 dark:bg-[#2A2942] rounded-full mr-2"></div>
            <div className="bg-gray-200 dark:bg-[#2A2942] h-5 w-2/3 rounded"></div>
          </div>
        </div>
        <div className="mt-6 flex justify-center md:justify-start">
          <div className="bg-gray-200 dark:bg-[#2A2942] h-10 w-40 rounded-[20px]"></div>
        </div>
      </div>
    </div>
  );
};

const BenefitPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-[#141427] font-sans antialiased transition-colors duration-700">
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

      <section className="py-[10vh] sm:py-[13vh] md:py-[15vh] lg:py-[18vh] xl:py-[20vh] 2xl:py-[20vh] bg-white dark:bg-[#141427] transition-colors duration-700">
        {isLoading ? (
          <SkeletonBenefit />
        ) : (
          <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-2 fade-in-up">
            {/* Picture */}
            <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
              {/* Light Mode */}
              <img
                src={modelPhoto2}
                alt="Model Photo 2"
                className="w-full max-w-[250px] sm:max-w-sm md:max-w-md rounded-lg object-contain dark:hidden"
              />
              {/* Dark Mode */}
              <img
                src={modelPhoto2Dark}
                alt="Model Photo 2 Dark"
                className="w-full max-w-[250px] sm:max-w-sm md:max-w-md rounded-lg object-contain hidden dark:block"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <span className="px-3 py-2 text-[10px] sm:text-xs font-semibold bg-[#F6EEFE] dark:bg-[#2C1E45] text-[#9425FE] dark:text-[#CBB3FF] rounded-full">
                Benefit Yang Didapat
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mt-4 mb-3">
                Tingkatkan <span className="bg-yellow-400 text-white dark:text-[#2C1E45] px-2 py-1 rounded-[5px]">Skillmu</span> Dengan Kursus Terbaik Di Satu Tempat
              </h3>
              <div className="text-justify md:text-justify">
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 px-7 md:px-0">
                  GetSkill memberikan penjaminan belajar terbaik dengan akses ke berbagai kursus berkualitas tinggi yang dirancang untuk membantu Anda mengembangkan keterampilan yang dibutuhkan di dunia kerja.
                </p>
              </div>

              {/* Point-point */}
              <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base text-left px-7 md:px-0">
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Akses Materi Premium & Berkualitas
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Belajar Kapan Saja & Di Mana Saja
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Sertifikat Resmi & Peluang Karier
                </li>
              </ul>

              {/* Button Register */}
              <div className="mt-6" data-aos="fade" data-aos-delay="700">
                <Link to="/register">
                  <button
                    className="group bg-[#9425FE] text-white font-semibold py-2 px-4 
                    rounded-full flex items-center justify-center mx-auto md:mx-0 gap-2
                    transition-all duration-500 ease-in-out
                    shadow-[4px_4px_0_#0A0082] 
                    hover:bg-yellow-400 hover:shadow-none
                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                    focus:outline-none"
                  >
                    <span className="transition-colors duration-500 group-hover:text-[#0A0082]">
                      Daftar Sekarang
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
          </div>
        )}
      </section>
    </div>
  );
};

export default BenefitPage;
