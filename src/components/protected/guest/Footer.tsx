import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import logoLandscape from "../../../assets/img/logo/get-skill/landscape white.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-[#a0a0ae] text-left">
      {/* Section atas */}
      <div className="w-full bg-[#100936]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-35 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* Logo & Kontak */}
          <div className="flex flex-col items-start text-left">
            <div className="font-bold text-white text-xl flex items-center gap-3 mb-6">
              <img src={logoLandscape} alt="GetSkill Logo" className="w-auto h-11 object-contain" />
            </div>
            <p className="text-[12px] leading-5 max-w-[260px] mb-6">
              Getskill adalah Platform Pembelajaran yang digunakan untuk Upgrade ilmu dan wawasan secara lengkap.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#ffffff]">
                <FaPhoneAlt className="text-white text-sm md:text-base" />
                <span className="text-sm md:text-base font-semibold">082132560566</span>
              </div>
              <div className="flex items-center gap-2 text-[#c1c1d1]">
                <FaEnvelope className="text-white text-sm md:text-base" />
                <span className="text-sm md:text-xs font-medium">getskill.id@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-col text-left">
            <h3 className="text-white font-bold text-base mb-3 relative pb-1">
              Link Cepat
              <span className="absolute left-0 top-8 h-1 w-6 bg-[#8a4fff] rounded"></span>
            </h3>
            <ul className="list-none p-0 mt-3">
              <li className="mb-3 text-[12px]">
                <NavLink
                  to="/kursus"
                  className="relative inline-block text-[#B2BBCC] hover:text-yellow-400 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-yellow-500
                  hover:after:w-full after:transition-all after:duration-500"
                >
                  Kursus
                </NavLink>
              </li>
              <li className="mb-3 text-[12px]">
                <NavLink to="/event" className="relative inline-block text-[#B2BBCC] hover:text-yellow-400 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-yellow-500
                  hover:after:w-full after:transition-all after:duration-500"
                >
                  Event
                </NavLink>
              </li>
              <li className="mb-3 text-[12px]">
                <NavLink to="/Berita" className="relative inline-block text-[#B2BBCC] hover:text-yellow-400 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-yellow-500
                  hover:after:w-full after:transition-all after:duration-500"
                >
                  Berita
                </NavLink>
              </li>
              <li className="mb-3 text-[12px]">
                <NavLink to="/Mentor" className="relative inline-block text-[#B2BBCC] hover:text-yellow-400 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-yellow-500
                  hover:after:w-full after:transition-all after:duration-500"
                >
                  Mentor
                </NavLink>
              </li>
              <li className="mb-3 text-[12px]">
                <NavLink to="/Penukaran Hadiah" className="relative inline-block text-[#B2BBCC] hover:text-yellow-400 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-yellow-500
                  hover:after:w-full after:transition-all after:duration-500"
                >
                  Penukaran Hadiah
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Website Kami */}
          <nav className="flex flex-col text-left">
            <h3 className="text-white font-bold text-base mb-3 relative pb-1">
              Website Kami
              <span className="absolute left-0 top-8 h-1 w-6 bg-[#8a4fff] rounded"></span>
            </h3>
            <ul className="list-none p-0 mt-3">
              <li className="mb-3 text-[12px]">
                <Link to="/contact" className="relative inline-block text-[#B2BBCC] hover:text-yellow-400 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-yellow-500
                  hover:after:w-full after:transition-all after:duration-500"
                >
                  Hubungi Kami
                </Link>
              </li>
              <li className="mb-3 text-[12px]">
                <Link to="/faq" className="relative inline-block text-[#B2BBCC] hover:text-yellow-400 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-yellow-500
                  hover:after:w-full after:transition-all after:duration-500"
                >
                  FAQ
                </Link>
              </li>
              <li className="mb-3 text-[12px]">
                <Link to="/penukaran-hadiah" className="relative inline-block text-[#B2BBCC] hover:text-yellow-400 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-yellow-500
                  hover:after:w-full after:transition-all after:duration-500"
                >
                  Penukaran Hadiah
                </Link>
              </li>
            </ul>
          </nav>

          {/* Sosial Media */}
          <section className="flex flex-col text-left">
            <h3 className="text-white font-bold text-base mb-5 relative pb-2">
              Sosial Media
              <span className="absolute left-0 top-8 h-1 w-6 bg-[#8a4fff] rounded"></span>
            </h3>
            <p className="text-[12px] text-[#8a8a9d] mb-3">Kunjungi sosial media kami</p>
            <div className="flex gap-4 text-white text-lg">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#8a4fff]"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#8a4fff]"><FaTwitter /></a>
              <a href="https://wa.me/6282132560566" target="_blank" rel="noopener noreferrer" className="hover:text-[#8a4fff]"><FaWhatsapp /></a>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-[#2a2454]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#3a3366] text-[11px] text-[#7a7a94] text-left">
          <div>© 2025 GetSkill. All rights reserved.</div>
          <nav className="flex items-center gap-2 font-semibold">
            <Link to="/terms" className="text-[#7a7a94] hover:text-[#8a4fff] relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#8a4fff] hover:after:w-full after:transition-all after:duration-500">
              Terms & Conditions
            </Link>
            <span className="text-[#555]">|</span>
            <Link to="/privacy" className="text-[#7a7a94] hover:text-[#8a4fff] relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#8a4fff] hover:after:w-full after:transition-all after:duration-500">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
