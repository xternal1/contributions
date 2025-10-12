import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../style/App.css';
import { Link } from "react-router-dom";

import modelPhoto1 from '../../assets/landingpage/home/modelPhoto1.png';
import avatar from '../../assets/landingpage/home/avatar.png';
import avatar2 from '../../assets/landingpage/home/avatar2.png';
import arrow from "../../assets/landingpage/home/arrow.png";
import arrowPattern from '../../assets/landingpage/home/arrow-purple.png';
import dotsPattern from '../../assets/landingpage/home/dots.png';
import curvedLine from '../../assets/landingpage/home/curved-line.png';
import bannerShape02 from '../../assets/img/banner/banner_shape02.png';

const HeroSection: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-white via-[#faf9fb] to-[#ebe9f0] overflow-hidden min-h-[50vh] md:min-h-[40vh] lg:min-h-[90vh] xl:min-h-[80vh] 2xl:min-h-[85vh] m-0 pt-0">
      {/* Top-left curved line */}
      <img
        src={curvedLine}
        alt="curvedLine "
        className="absolute top-0 left-0 w-[120px] md:w-[120px] lg:w-[160px] xl:w-[170px] 2xl:w-[190px] z-0"
        data-aos="fade-right"
      />

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-20 lg:px-10 xl:px-22 2xl:px-34 pt-10 md:pt-16 relative z-10">

        {/* Left section */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-20 mt-10 md:-mt-4 lg:-mt-18 xl:-mt-14 2xl:-mt-8 relative">
          <h1
            className="text-[20px] md:text-[24px] lg:text-[35px]  xl:text-[40px] 2xl:text-[45px] font-normal text-gray-900 leading-tight md:leading-snug mb-3 relative"
            data-aos="fade-right"
          >
            Selamat
            <span className="relative inline-block z-10 px-0 ml-5 md:ml-6 lg:ml-6 xl:ml-6 2xl:ml-7">
              {/* Yellow background */}
              <svg className="absolute -top-[1px] md:-top-[2px] lg:-top-[2px] xl:-top-[3px] 2xl:-top-[2px] -left-[15px] md:-left-[15px] lg:-left-[22px] xl:-left-[22px] 2xl:-left-[22px] w-[95px] md:w-[110px] lg:w-[160px] xl:w-[180px] 2xl:w-[200px] h-[125%] -z-10" viewBox="0 0 209 59" fill="none">
                <path d="M4.74438 7.70565C69.7006 -1.18799 136.097 -2.38304 203.934 4.1205C207.178 4.48495 209.422 7.14626 208.933 10.0534C206.793 23.6481 205.415 36.5704 204.801 48.8204C204.756 51.3291 202.246 53.5582 199.213 53.7955C136.093 59.7623 74.1922 60.5985 13.5091 56.3043C10.5653 56.0924 7.84371 53.7277 7.42158 51.0325C5.20725 38.2627 2.76333 25.6511 0.0898448 13.1978C-0.465589 10.5873 1.61173 8.1379 4.73327 7.70565" fill="#FFC107" />
              </svg>
              {/* Black line */}
              <svg className="absolute top-[-40px] left-[107%] w-[35px] md:w-[40px] lg:w-[50px] xl:w-[55px] 2xl:w-[62px] h-[60px] -z-10" viewBox="0 0 61 68" fill="none">
                <path d="M10.9456 42.4604C12.35 35.8453 15.0985 20.3798 14.8574 11.4385" stroke="#031333" strokeWidth="3.07158" strokeLinejoin="round" />
                <path d="M27.4487 52.5191C33.5478 49.598 47.4807 42.3448 54.4199 36.7009" stroke="#031333" strokeWidth="3.07158" strokeLinejoin="round" />
                <path d="M20.1039 44.2553C23.1559 40.986 29.8591 33.2239 32.2559 28.3291" stroke="#031333" strokeWidth="3.07158" strokeLinejoin="round" />
              </svg>
              <span className="font-bold text-white relative z-20">Datang</span>
            </span>
          </h1>

          <h2
            className="text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px] text-gray-900 font-medium mb-1 md:mb-2 lg:mb-4 xl:mb-4"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div className="max-w-[400px] whitespace-normal">
              Update kemampuan anda bersama <span className="font-semibold">Getskill.id</span>
            </div>
          </h2>

          <p
            className="text-gray-600 text-xs md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
            data-aos="fade-right"
            data-aos-delay="500"
          >
            Belajar seru bersama GetSkill
          </p>

          {/* Register button */}
          <div className="mt-3 md:mt-3 lg:mt-4 xl:mt-6" data-aos="fade-right" data-aos-delay="700">
            <Link to="/register">
              <button
                className="group bg-[#9425FE] text-white text-[10px] md:text-[10px] lg:text-sm xl:text-sm 2xl:text-md font-semibold py-2 px-1 md:py-2 lg:py-3 xl:py-3 md:px-1 lg:px-6 xl:px-6 2xl:py-4 2xl:px-8
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
                  className="w-4 h-4 md:w-4 lg:w-4 xl:w-5 2xl:w-6 md:h-5 lg:h-5 xl:h-5 2xl:h-6 transition-colors duration-500 text-white group-hover:text-[#0A0082]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Right section */}
        <div className="w-1/2 md:w-1/2 lg:w-3/4 relative flex justify-center items-center">
          {/* Desktop banner */}
          <img src={bannerShape02} alt="Banner Shape" className="absolute top-[430px] md:top-[260px] lg:top-[395px] xl:top-[435px] 2xl:top-[510px] right-[380px] md:right-[200px] lg:right-[360px] xl:right-[410px] 2xl:right-[490px] w-[120px] md:w-[80px] lg:w-[90px] xl:w-[110px] 2xl:w-[130px] z-0" data-aos="fade-up" />

          {/* Dots Pattern */}
          <img
            src={dotsPattern}
            alt="Dots"
            className="absolute -top-[10px] md:-top-[15px] lg:top-[20px] xl:top-[25px] -right-[15px] md:-right-[18px] lg:right-[70px] xl:right-[100px] 2xl:right-[125px] w-[480px] z-0 md:w-[360px] lg:w-[370px] xl:w-[400px] 2xl:w-[490px] spin-reverse"
            data-aos="fade-up"
          />

          {/* Arrow Purple */}
          <img src={arrowPattern} alt="Arrow Purple" className="absolute -right-[10px] md:-right-[30px] lg:right-[6px] xl:right-[35px] 2xl:right-[50px] top-[60px] md:top-[150px] lg:top-[220px] xl:top-[250px] 2xl:top-[300px] w-[330px] md:w-[320px] lg:w-[460px] xl:w-[490px] 2xl:w-[570px] z-0 " data-aos="fade-up" />

          {/* Model Photo */}
          <img src={modelPhoto1} alt="Someone with a Laptop" className="relative z-100 w-[800px] md:w-[520px] lg:w-[480px] xl:w-[520px] 2xl:w-[610px]" data-aos="fade-up" />

          {/* Arrow */}
          <img src={arrow} alt="Arrow" className="absolute right-[500px] md:right-[140px] lg:right-[350px] xl:right-[415px] 2xl:right-[520px] top-[15px] md:-top-[16px] lg:top-[50px] xl:top-[60px] 2xl:top-[60px] w-[70px] md:w-[60px] lg:w-[70px] xl:w-[80px] 2xl:w-[90px]  md:rotate-50 lg:rotate-1 xl:rotate-1 hidden md:block" data-aos="fade-left" />

          {/* Bubble desktop */}
          <div className="absolute -top-[20px] md:-top-[30px] lg:top-[40px] xl:top-[50px] 2xl:top-[50px] left-auto md:left-auto lg:left-auto xl:left- 2xl:left-auto right-[80px] md:right-[185px] lg:right-[410px] xl:right-[480px] 2xl:right-[600px] z-20" data-aos="fade-right">
            <div className="bg-white p-2 rounded-[5px] shadow-[7px_7px_0px_rgba(176,184,196,0.6)] space-y-2">
              <div className="flex items-center space-x-2">
                <img src={avatar} alt="Kenza" className="w-4 md:w-5 lg:w-5 xl:w-6 2xl:w-8 h-4 md:h-5 lg:h-5 xl:h-6 2xl:h-8 rounded-full" />
                <p className="text-[10px] lg:text-xs 2xl:text-sm  font-medium">Kenza Aurelia</p>
              </div>
              <div className="flex items-center space-x-2">
                <img src={avatar2} alt="Michel" className="w-4 md:w-5 lg:w-5 xl:w-6 2xl:w-8 h-4 md:h-5 lg:h-5 xl:h-6 2xl:h-8 rounded-full" />
                <p className="text-[10px] lg:text-xs 2xl:text-sm font-medium">Michel Jones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
