import React, { useState, useEffect } from "react";
import lampImg from "../../assets/img/icons/lampid.png";
import searchImg from "../../assets/img/icons/searchid.png";
import loveImg from "../../assets/img/icons/loveid.png";
import boardImg from "../../assets/img/icons/blackboardid.png";
import fotofotoImg from "../../assets/img/others/fotofotoid.png";

const SkeletonBenefits: React.FC = () => {
  return (
    <section className="benefits-section py-10 sm:py-14 lg:py-12 xl:py-16 2xl:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 animate-pulse">

          {/* Left Content (Skeleton Teks) */}
          <div className="w-full md:w-full lg:w-8/12 xl:w-6/12 text-left px-4 sm:px-6 md:px-8 lg:px-0 xl:pl-10 2xl:pl-16 mx-auto space-y-5">
            <div className="bg-gray-300 h-6 w-32 rounded-full mb-3"></div>
            <div className="bg-gray-300 h-8 xl:h-9 w-3/4 rounded"></div>
            <div className="bg-gray-200 h-6 w-2/3 rounded"></div>

            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="bg-gray-300 rounded-full w-12 h-12 flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="bg-gray-300 h-4 w-40 xl:w-48 rounded"></div>
                  <div className="bg-gray-200 h-3 w-52 xl:w-64 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Image Skeleton */}
          <div className="w-full lg:w-7/12 xl:w-6/12 flex justify-center">
            <div className="bg-gray-300 w-full max-w-md md:max-w-lg lg:max-w-none lg:w-[116%] xl:w-[100%] xl:max-w-[500px] 2xl:max-w-[550px] h-[240px] md:h-[300px] lg:h-[360px] xl:h-[420px] 2xl:h-[480px] rounded-xl"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

const IndustrialClassBenefits: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonBenefits />;
  }

  return (
    <section className="benefits-section py-10 sm:py-14 lg:py-12 xl:py-16 2xl:py-1">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16 2xl:gap-20">

          {/* Left Content (Teks) */}
          <div className="w-full md:w-full lg:w-8/12 xl:w-6/12 2xl:w-7/12 text-left px-4 sm:px-6 md:px-8 lg:px-0 xl:pl-25 2xl:pl-20 mx-auto relative z-10">
            <span className="inline-block text-[11px] lg:text-xs xl:text-xs 2xl:text-sm font-semibold text-indigo-500 bg-blue-50 px-3 py-1.5 rounded-full mb-3">
              Manfaat Sekolah
            </span>

            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-semibold mb-6 leading-snug">
              Manfaat yang akan didapatkan sekolah ketika mengikuti kelas industri.
            </h2>

            <div className="space-y-5">
              {[
                {
                  id: 1,
                  img: lampImg,
                  title: "Mitra Industri",
                  desc: "Memiliki kerjasama dengan CV. Hummatech Technology dan menjadikan mitra industri.",
                  color: "bg-purple-100",
                  badge: "bg-purple-700",
                },
                {
                  id: 2,
                  img: searchImg,
                  title: "Business Center",
                  desc: "Mengaktifkan Business Center Sekolah dibidang pengembangan perangkat lunak.",
                  color: "bg-teal-50",
                  badge: "bg-teal-600",
                },
                {
                  id: 3,
                  img: loveImg,
                  title: "Akreditasi",
                  desc: "Menambah poin akreditasi sekolah.",
                  color: "bg-yellow-50",
                  badge: "bg-yellow-500",
                },
                {
                  id: 4,
                  img: boardImg,
                  title: "Kerja",
                  desc: "Peningkatan keterserapan lulusan sesuai kebutuhan industri.",
                  color: "bg-green-50",
                  badge: "bg-green-600",
                },
              ].map((item) => (
                <div key={item.id} className="flex items-start">
                  <div
                    className={`relative flex-shrink-0 w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}
                  >
                    <img src={item.img} alt={item.title} className="w-6 h-6" />
                    <div
                      className={`absolute -bottom-1 -left-1 w-5 h-5 rounded-full ${item.badge} text-white text-[10px] flex items-center justify-center`}
                    >
                      {item.id}
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="font-semibold text-sm sm:text-base lg:text-base xl:text-base 2xl:text-base">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-[11px] xl:text-xs 2xl:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-7/12 xl:w-6/12 2xl:w-6/12 flex justify-center lg:justify-end xl:-ml-12 2xl:-ml-10">
            <img
              src={fotofotoImg}
              alt="Belajar Online"
              className="w-full max-w-md md:max-w-lg lg:max-w-none lg:w-[116%] xl:w-[100%] xl:max-w-[500px] 2xl:max-w-[550px] h-auto object-contain xl:-translate-x-12 2xl:-translate-x-10"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default IndustrialClassBenefits;
