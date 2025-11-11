import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Illustration from "../../assets/img/others/concept12.png.png";

// Skeleton Loader
const SkeletonContact: React.FC = () => {
  return (
    <section className="contact-section py-16 xl:py-20 2xl:py-24 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6 xl:px-12 2xl:px-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 xl:gap-20 2xl:gap-24">
          {/* Left side - Image Skeleton */}
          <div className="w-full lg:w-5/12 xl:w-4/12 2xl:w-3/12 flex justify-center lg:justify-start relative lg:-ml-6 md:px-6 xl:ml-10 2xl:ml-12">
            <div className="relative bg-gray-200/40 dark:bg-gray-700/40 p-4 w-[85%] sm:w-[70%] md:w-[60%] lg:w-auto
              lg:max-w-[345px] xl:max-w-[355px] 2xl:max-w-[400px]
              h-[240px] md:h-[300px] lg:h-[340px] xl:h-[380px] 2xl:h-[420px] overflow-hidden">
              <div className="w-full h-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-gray-500/20 to-transparent animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>

          {/* Right side - Content Skeleton */}
          <div className="w-full lg:w-7/12 xl:w-8/12 2xl:w-9/12 text-left
            md:pl-4 md:pr-2 lg:pl-12 xl:pl-16 2xl:pl-20 space-y-4">
            <div className="bg-gray-300/50 dark:bg-gray-700/50 h-4 w-40 animate-pulse"></div>
            <div className="bg-gray-300/50 dark:bg-gray-700/50 h-8 w-3/4 animate-pulse"></div>
            <div className="bg-gray-200/50 dark:bg-gray-600/50 h-6 w-2/3 animate-pulse"></div>

            <div className="space-y-2 mt-4">
              <div className="bg-gray-200/50 dark:bg-gray-600/50 h-4 w-full animate-pulse"></div>
              <div className="bg-gray-200/50 dark:bg-gray-600/50 h-4 w-5/6 animate-pulse"></div>
              <div className="bg-gray-200/50 dark:bg-gray-600/50 h-4 w-3/4 animate-pulse"></div>
            </div>

            <div className="bg-gray-300/50 dark:bg-gray-700/50 h-10 w-40 rounded-full mt-6 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Component
const ContactSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <SkeletonContact />;

  const handleRedirect = () => {
    navigate("/contact");
  };

  return (
    <section className="contact-section py-16 xl:py-20 2xl:py-24 bg-white dark:bg-[#0D0D1A] transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6 xl:px-12 2xl:px-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 xl:gap-20 2xl:gap-24">
          {/* Left side - Image */}
          <div className="w-full lg:w-5/12 xl:w-4/12 2xl:w-3/12 flex justify-center lg:justify-start relative lg:-ml-6 md:px-6 xl:ml-10 2xl:ml-12">
            <div
              className="absolute bg-orange-50 dark:bg-[#2C004F] hidden sm:block transition-colors duration-500
             sm:w-[40vw] sm:h-[25vw]
             md:w-[67vw] md:h-[45vw] md:top-[30px] md:left-[50px]
             lg:w-[37vw] lg:h-[24vw] lg:top-[10px] lg:left-[-35px]"
              style={{
                borderRadius: "50%",
                transform: "rotate(-3deg)",
              }}
            ></div>

            <img
              src={Illustration}
              alt="Belajar Online"
              className="w-[85%] sm:w-[70%] md:w-[60%] lg:w-auto
              lg:max-w-[345px] xl:max-w-[355px] 2xl:max-w-[450px]
              h-auto object-contain relative z-10"
            />
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-7/12 xl:w-6/12 2xl:w-7/12 text-left
            md:pl-4 md:pr-2 lg:pl-15 xl:pl-10 2xl:pl-50">
            <div className="content">
              <span className="inline-block text-[11px] lg:text-xs xl:text-xs 2xl:text-sm
                font-medium text-gray-600 dark:text-gray-400 mb-3">
                Ingin tahu lebih banyak?
              </span>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-2xl 2xl:text-3xl
                font-semibold mb-4 leading-snug text-gray-900 dark:text-white">
                Butuh informasi lebih banyak dan proposal lengkap dari kelas industri?
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-sm lg:text-xs xl:text-xs
                2xl:text-sm mb-6 leading-relaxed max-w-2xl">
                Silahkan hubungi kami pada nomor yang tertera dan undang kami ke sekolah anda
                untuk menjelaskan program kelas industri kami di sekolah anda, akan kami
                jelaskan secara detail.
              </p>

              {/* Button */}
              <div className="mt-6" data-aos="" data-aos-delay="700">
                <button
                  onClick={handleRedirect}
                  className="group bg-[#9425FE] text-white font-semibold py-2 px-4
                  rounded-full flex items-center justify-center mx-auto md:mx-0 gap-2
                  transition-all duration-500 ease-in-out
                  shadow-[4px_4px_0_#0A0082]
                  hover:bg-yellow-400 hover:text-black hover:shadow-none
                  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                  focus:outline-none dark:shadow-[4px_4px_0_#6D28D9]"
                >
                  <span className="transition-colors duration-500 group-hover:text-black">
                    Hubungi Sekarang
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 transition-colors duration-500 text-white group-hover:text-black"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
