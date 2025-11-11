import React from 'react';
import MitraCarousel from "../public/CardMitra/MitraCarousel";

const PartnersSection: React.FC = () => {
  return (
    <div className="py-[1vh] sm:py-[2vh] md:py-[3vh] lg:py-[4vh] xl:py-[5vh] 2xl:py-[6vh] bg-white dark:bg-[#141427] font-sans antialiased p-8">
      <section className="py-16 bg-white dark:bg-[#141427] rounded-lg">
        <div className="container mx-auto px-0 md:px-10 lg:px-30 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">MITRA KAMI</h1>
          <p className="text-md text-gray-600 dark:text-gray-300 mb-5 lg:mb-15">Kolaborasi menuju kesuksesan</p>

          <div className="w-full mx-auto">
            <MitraCarousel />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnersSection;