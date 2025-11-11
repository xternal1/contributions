import React, { useState, useEffect } from "react";

const SkeletonBanner: React.FC = () => {
  return (
    <section className="relative bg-white dark:bg-[#0B0B18] overflow-hidden transition-colors duration-500">
      {/* Dot pattern kiri */}
      <div className="absolute top-0 left-0 w-32 h-32 2xl:w-48 2xl:h-48 bg-gray-200 dark:bg-gray-700 rounded-full opacity-20 -translate-x-10 -translate-y-10" />
      {/* Dot pattern kanan */}
      <div className="absolute bottom-0 right-0 w-32 h-32 2xl:w-48 2xl:h-48 bg-gray-200 dark:bg-gray-700 rounded-full opacity-20 translate-x-10 translate-y-10" />
      <div className="relative z-10 px-6 py-20 2xl:px-16 2xl:py-32">
        <div className="text-center mx-auto max-w-3xl space-y-4 2xl:max-w-5xl">
          <div className="mx-auto bg-gray-300/60 dark:bg-gray-600/60 h-5 w-64 2xl:h-6 2xl:w-80 animate-pulse rounded"></div>
          <div className="mx-auto bg-gray-300/60 dark:bg-gray-600/60 h-7 w-3/4 2xl:h-9 animate-pulse rounded"></div>
          <div className="mx-auto bg-gray-200/60 dark:bg-gray-500/60 h-6 w-5/6 2xl:h-8 animate-pulse rounded"></div>
          <div className="mx-auto bg-gray-200/60 dark:bg-gray-500/60 h-6 w-2/3 2xl:h-8 animate-pulse rounded"></div>
        </div>
      </div>
    </section>
  );
};

const IndustrialHero: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonBanner />;
  }

  return (
    <section className="relative bg-white dark:bg-[#141427] overflow-hidden transition-colors duration-500">
      {/* Gradasi kecil tambahan kiri */}
      <div className="absolute top-[25%] left-[10%] w-32 h-32 bg-[#9425FE]/30 blur-[60px] rounded-full opacity-70" />

      {/* Gradasi kecil tambahan kanan */}
      <div className="absolute top-[60%] right-[10%] w-32 h-32 bg-[#8052FF]/30 blur-[60px] rounded-full opacity-70" />

      <div className="relative z-10 px-6 py-35 2xl:px-16 2xl:py-32">
        <div className="text-center mx-auto max-w-3xl 2xl:max-w-6xl">
          <h3 className="text-[#9425FE] text-sm md:text-sm 2xl:text-base font-semibold tracking-wide uppercase transition-colors duration-500">
            KELAS INDUSTRI HUMMATECH
          </h3>

          <h2 className="mt-4 text-2xl md:text-2xl 2xl:text-4xl font-semibold text-gray-900 dark:text-white leading-snug 2xl:leading-snug transition-colors duration-500">
            Upgrade Materi dan Skill Di Industri untuk meningkatkan Persentase
            kerja anak didik anda. Sejatinya Teknologi IT Terus Berkembang.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default IndustrialHero;
