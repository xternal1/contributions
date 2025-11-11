import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import manfaatImg from "../../assets/img/others/manfaatid.png";
import manfaatImgDark from "../../assets/kelasindustri/FIx 1.png";
import type { Division } from "../../features/IndustrialClass/industrialclass";
import { fetchDivisions } from "../../features/IndustrialClass/services/industrialclass_services";

const SkeletonIndustrialClass: React.FC = () => {
  return (
    <section className="industrial-section py-16 xl:py-20 2xl:py-24 bg-white dark:bg-[#0D0D1A] transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6 xl:px-12 2xl:px-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 xl:gap-20 2xl:gap-24">
          {/* Image skeleton */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-start">
            <div className="relative bg-gray-200/40 dark:bg-gray-800/40 p-4 w-[80%] lg:w-auto h-[320px] overflow-hidden">
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-gray-600/30 to-transparent animate-[shimmer_2s_infinite]" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="w-full lg:w-7/12 space-y-4">
            <div className="bg-gray-300/50 dark:bg-gray-700/50 h-6 w-40 animate-pulse" />
            <div className="bg-gray-300/50 dark:bg-gray-700/50 h-8 w-3/4 animate-pulse" />
            <div className="bg-gray-200/50 dark:bg-gray-700/50 h-6 w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

const IndustrialClassSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [divisions, setDivisions] = useState<Division[]>([]);

  useEffect(() => {
    const loadDivisions = async () => {
      const data = await fetchDivisions();
      setDivisions(data);
      setTimeout(() => setIsLoading(false), 1500);
    };
    loadDivisions();
  }, []);

  if (isLoading) return <SkeletonIndustrialClass />;

  return (
    <section className="industrial-section py-16 xl:py-20 2xl:py-24 bg-white dark:bg-[#141427] transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6 xl:px-12 2xl:px-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 xl:gap-20 2xl:gap-24">

          {/* Left Side - Image */}
          <div className="w-full lg:w-5/12 xl:w-4/12 2xl:w-3/12 flex justify-center lg:justify-start relative md:px-6 xl:ml-10 2xl:ml-12">
            <div className="relative p-4 rounded-xl transition-all duration-500">
              {/* Light Mode Image */}
              <img
                src={manfaatImg}
                alt="Manfaat Kelas Industri"
                className="w-[85%] sm:w-[70%] md:w-[85%] lg:w-auto lg:max-w-[345px] xl:max-w-[355px] 2xl:max-w-[400px] h-auto object-contain relative z-10 dark:hidden transition-opacity duration-500"
              />
              {/* Dark Mode Image */}
              <img
                src={manfaatImgDark}
                alt="Manfaat Kelas Industri Dark"
                className="hidden dark:block w-[85%] sm:w-[70%] md:w-[85%] lg:w-auto
  l             g:max-w-[345px] xl:max-w-[340px] 2xl:max-w-[375px]
                h-auto object-contain relative z-10 transition-opacity duration-500
                rounded-[50%] mt-21 ml-1"
              />


            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-7/12 xl:w-6/12 2xl:w-9/12 text-left md:pl-4 md:pr-2 lg:pl-12 xl:pl-10">
            <div className="content transition-all duration-500">
              <span className="inline-block text-[11px] lg:text-xs xl:text-xs 2xl:text-sm font-semibold text-indigo-500 dark:text-white bg-blue-50 dark:bg-[#2C004F] px-3 py-1.5 rounded-full mb-3 transition-colors duration-500">
                Manfaat Kelas Industri?
              </span>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold mb-4 leading-snug text-gray-900 dark:text-white transition-colors duration-500">
                Program Kelas industri didesain untuk meningkatkan kemampuan{" "}
                <span className="bg-yellow-400 px-2 py-1 rounded text-white dark:text-black transition-colors duration-500">
                  Siswa
                </span>
              </h1>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-sm lg:text-xs xl:text-xs 2xl:text-sm mb-6 leading-relaxed max-w-2xl transition-colors duration-500">
                Materi Kelas industri akan dipelajari selama 3 tahun, dimulai dari kelas X, XI dan XII.
                Dengan metode ini, materi akan lebih maksimal diterima. Adapun Kelas Industri yang telah tersedia saat ini adalah:
              </p>

              <ul className="space-y-3">
                {divisions.map((division) => (
                  <li key={division.id} className="flex items-center">
                    <span className="bg-yellow-400 rounded-full p-1.5 mr-3 flex-shrink-0">
                      <ArrowRight size={14} className="text-white dark:text-black transition-colors duration-500" />
                    </span>
                    <button
                      type="button"
                      className="relative font-semibold text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-base lg:font-bold text-left cursor-pointer group text-gray-900 dark:text-white transition-colors duration-500"
                    >
                      {division.name}
                      <span className="absolute left-0 bottom-[1px] h-[2px] w-0 bg-black dark:bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full"></span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndustrialClassSection;
