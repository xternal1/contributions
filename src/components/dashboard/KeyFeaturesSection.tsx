import React, { useState, useEffect } from 'react';
import Component5 from '../../assets/landingpage/home/component5.png';
import Component6 from '../../assets/landingpage/home/component6.png';
import Component7 from '../../assets/landingpage/home/component7.png';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  darkBgColor: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, bgColor, darkBgColor }) => {
  return (
    <div
      className={`w-full p-5 rounded-xl shadow-md border border-gray-200 transition-all duration-200 ease-in-out flex flex-col items-start ${bgColor} ${darkBgColor}  dark:border-[#141427]
      hover:scale-[1.01] hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-300`}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm text-left">{description}</p>
    </div>
  );
};

// --- Skeleton Loader ---
const SkeletonFeatures: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="w-full max-w-sm p-5 rounded-xl shadow-lg text-center flex flex-col items-center mx-auto animate-pulse bg-gray-200 dark:bg-[#2C2C40]"
        >
          <div className="w-12 h-12 rounded-full mb-3 bg-gray-300 dark:bg-[#3A395A]"></div>
          <div className="h-6 w-3/4 mb-2 rounded bg-gray-300 dark:bg-[#3A395A]"></div>
          <div className="h-10 w-full rounded bg-gray-300 dark:bg-[#3A395A]"></div>
        </div>
      ))}
    </div>
  );
};

const KeyFeaturesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="bg-white dark:bg-[#141427] font-sans antialiased">
      <section className="py-[10vh] sm:py-[10vh] md:py-[10vh] lg:py-[20vh] xl:py-[20vh] 2xl:py-[20vh] bg-white dark:bg-[#141427] rounded-lg -mt-5 transition-colors duration-700">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 text-center">
          <span className="px-3 py-2 text-[10px] sm:text-xs font-semibold bg-[#F6EEFE] dark:bg-[#2C1E45] text-[#9425FE] dark:text-[#CBB3FF] rounded-full">
            Fitur Unggulan
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mt-6 mb-4">
            Upgrade Kemampuan Anda Bersama Getskill.id
          </h1>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Belajar dari instruktur terbaik di kelas langsung terlibat, berinteraksi, dan menyelesaikan keraguan
          </p>

          {/* Grid */}
          {isLoading ? (
            <SkeletonFeatures />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <FeatureItem
                icon={<img src={Component5} alt="Mentor Terpercaya" className="w-12 h-12" />}
                title="Mentor Terpercaya"
                description="Mentor Kami ramah dan ahli dalam domain untuk membuat Anda belajar dengan mudah"
                bgColor="bg-purple-100"
                darkBgColor="dark:bg-[#2C004F]"
              />
              <FeatureItem
                icon={<img src={Component6} alt="Kursus Terbaik" className="w-12 h-12" />}
                title="Kursus Terbaik"
                description="Semua kursus kami dibuat dan untuk membuat Anda menikmati mempelajari hal-hal baru"
                bgColor="bg-blue-100"
                darkBgColor="dark:bg-[#0003A1]"
              />
              <FeatureItem
                icon={<img src={Component7} alt="Tugas Kompetensi" className="w-12 h-12" />}
                title="Tugas Kompetensi"
                description="Bergabunglah dengan kelas kami dengan alat interaktif dan dukungan keraguan"
                bgColor="bg-orange-100"
                darkBgColor="dark:bg-[#543700]"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default KeyFeaturesPage;
