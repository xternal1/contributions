import React, { useState, useEffect } from "react";

const SkeletonBanner: React.FC = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 2xl:w-48 2xl:h-48 bg-gray-200 rounded-full opacity-20 -translate-x-10 -translate-y-10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 2xl:w-48 2xl:h-48 bg-gray-200 rounded-full opacity-20 translate-x-10 translate-y-10" />
      <div className="relative z-10 px-6 py-20 2xl:px-16 2xl:py-32">
        <div className="text-center mx-auto max-w-3xl space-y-4 2xl:max-w-5xl">
          <div className="mx-auto bg-gray-300/60 h-5 w-64 2xl:h-6 2xl:w-80 animate-pulse rounded"></div>
          <div className="mx-auto bg-gray-300/60 h-7 w-3/4 2xl:h-9 animate-pulse rounded"></div>
          <div className="mx-auto bg-gray-200/60 h-6 w-5/6 2xl:h-8 animate-pulse rounded"></div>
          <div className="mx-auto bg-gray-200/60 h-6 w-2/3 2xl:h-8 animate-pulse rounded"></div>
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
    <section className="relative bg-white overflow-hidden">
      {/* Dot pattern kiri */}
      <div className="absolute top-0 left-0 w-32 h-32 2xl:w-48 2xl:h-48 bg-purple-200 rounded-full opacity-20 -translate-x-10 -translate-y-10" />

      {/* Dot pattern kanan */}
      <div className="absolute bottom-0 right-0 w-32 h-32 2xl:w-48 2xl:h-48 bg-purple-200 rounded-full opacity-20 translate-x-10 translate-y-10" />

      <div className="relative z-10 px-6 py-20 2xl:px-16 2xl:py-32">
        <div className="text-center mx-auto max-w-3xl 2xl:max-w-6xl">
          <h3 className="text-[#9425FE] text-sm md:text-sm 2xl:text-base font-semibold tracking-wide uppercase">
            KELAS INDUSTRI HUMMATECH
          </h3>

          <h2 className="mt-4 text-2xl md:text-2xl 2xl:text-4xl font-semibold text-gray-900 leading-snug 2xl:leading-snug">
            Upgrade Materi dan Skill Di Industri untuk meningkatkan Persentase
            kerja anak didik anda. Sejatinya Teknologi IT Terus Berkembang.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default IndustrialHero;
