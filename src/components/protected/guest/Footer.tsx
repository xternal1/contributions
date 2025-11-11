import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import logoLandscape from "../../../assets/img/logo/get-skill/landscape white.png";

import { getContact } from "../../../features/contact/_service/_contact_service";
import type { ContactData } from "../../../features/contact/_contact";

const Footer: React.FC = () => {
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await getContact();
        setContact(res.data);
      } catch (error) {
        console.error("Gagal memuat data contact:", error);
      }
    };
    fetchContact();
  }, []);

  return (
    <footer className="w-full text-[#a0a0ae] text-left bg-[#f8f8ff] dark:bg-[#0D0D1A] transition-colors duration-500">
      {/* Section atas */}
      <div className="w-full bg-[#100936] dark:bg-[#0D0D1A] transition-colors duration-500">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-35 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* Logo & Kontak */}
          <div className="flex flex-col items-start text-left -ml-1 sm:-ml-4 md:-ml-1 lg:-ml-6">
            <div className="font-bold text-white text-xl flex items-center gap-3 mb-4">
              <img src={logoLandscape} alt="GetSkill Logo" className="w-auto h-11 object-contain" />
            </div>

            <p className="text-[12px] leading-5 max-w-[260px] mb-6 text-gray-300 dark:text-gray-300">
              {contact?.description ||
                "Getskill adalah Platform Pembelajaran yang digunakan untuk Upgrade ilmu dan wawasan secara lengkap."}
            </p>

            <div className="flex flex-col gap-2">
              {/* Nomor Telepon */}
              {Array.isArray(contact?.phone_number)
                ? contact.phone_number.map((num: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-white dark:text-gray-200">
                    <FaPhoneAlt className="text-yellow-400 dark:text-purple-400 text-sm md:text-base" />
                    <a
                      href={`tel:${String(num).replace(/\s+/g, "")}`}
                      className="relative inline-block text-base font-bold text-gray-300 dark:text-gray-200
                      not-odd:hover:text-yellow-400 dark:hover:text-purple-400 transition-colors duration-300
                       after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px]
                     after:bg-yellow-400 dark:after:bg-purple-400 hover:after:w-full
                        after:transition-all after:duration-500"
                    >
                      {num}
                    </a>
                  </div>
                ))
                : typeof contact?.phone_number === "string" && (
                  <div className="flex items-center gap-3 text-white dark:text-gray-200">
                    <FaPhoneAlt className="text-purple-500 dark:text-purple-400 text-sm md:text-base" />
                    <a
                      href={`tel:${String(contact.phone_number).replace(/\s+/g, "")}`}
                      className="relative inline-block text-base font-semibold text-gray-300 dark:text-gray-200
                  hover:text-yellow-400 dark:hover:text-purple-400 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-[3px] after:w-0 after:h-[1px]
                  after:bg-yellow-400 dark:after:bg-purple-400 hover:after:w-full
                  after:transition-all after:duration-500"
                    >
                      {contact.phone_number}
                    </a>
                  </div>
                )}

              {/* Email */}
              {Array.isArray(contact?.email)
                ? contact.email.map((mail: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300 dark:text-gray-200">
                    <FaEnvelope className="text-yellow-400 dark:text-purple-400 text-sm md:text-base" />
                    <a
                      href={`mailto:${mail}`}
                      className="relative inline-block text-xs text-gray-300 dark:text-gray-200
                  hover:text-yellow-400 dark:hover:text-purple-400 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:w-0 after:h-[1px]
                  after:bg-yellow-400 dark:after:bg-purple-400 hover:after:w-full
                  after:transition-all after:duration-500"
                    >
                      {mail}
                    </a>
                  </div>
                ))
                : contact?.email && (
                  <div className="flex items-center gap-3 text-gray-300 dark:text-gray-200">
                    <FaEnvelope className="text-purple-500 dark:text-purple-400 text-sm md:text-base" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="relative inline-block text-xs text-gray-300 dark:text-gray-200
                  hover:text-yellow-400 dark:hover:text-purple-400 transition-colors duration-300
                  after:content-[''] after:absolute after:left-0 after:bottom-[2px] after:w-0 after:h-[1px]
                  after:bg-yellow-400 dark:after:bg-purple-400 hover:after:w-full
                  after:transition-all after:duration-500"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
            </div>
          </div>

          {/* Link Cepat */}
          <nav className="flex flex-col text-left">
            <h3 className="text-white font-bold text-base mb-3 relative pb-1">
              Link Cepat
              <span className="absolute left-0 top-8 h-1 w-6 bg-purple-500 dark:bg-purple-500 rounded"></span>
            </h3>
            <ul className="list-none p-0 mt-3">
              {["kursus", "event", "berita", "mentor", "penukaran-hadiah"].map((path, i) => (
                <li key={i} className="mb-3 text-[12px]">
                  <NavLink
                    to={`/${path}`}
                    className="relative inline-block text-gray-300 dark:text-gray-200
                hover:text-yellow-400 dark:hover:text-purple-400 transition-colors duration-300
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px]
                after:bg-yellow-400 dark:after:bg-purple-400 hover:after:w-full
                after:transition-all after:duration-500"
                  >
                    {path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ")}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Website Kami */}
          <nav className="flex flex-col text-left">
            <h3 className="text-white font-bold text-base mb-3 relative pb-1">
              Website Kami
              <span className="absolute left-0 top-8 h-1 w-6 bg-purple-500 dark:bg-purple-500 rounded"></span>
            </h3>
            <ul className="list-none p-0 mt-3">
              {[{ to: "/contact", label: "Hubungi Kami" }, { to: "/faq", label: "FAQ" }, { to: "/reward", label: "Penukaran Hadiah" }].map((link, i) => (
                <li key={i} className="mb-3 text-[12px]">
                  <Link
                    to={link.to}
                    className="relative inline-block text-gray-300 dark:text-gray-200
                hover:text-yellow-400 dark:hover:text-purple-400 transition-colors duration-300
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px]
                after:bg-yellow-400 dark:after:bg-purple-400 hover:after:w-full
                after:transition-all after:duration-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sosial Media */}
          <section className="flex flex-col text-left">
            <h3 className="text-white font-bold text-base mb-5 relative pb-2">
              Sosial Media
              <span className="absolute left-0 top-8 h-1 w-6 bg-purple-500 dark:bg-purple-500 rounded"></span>
            </h3>
            <p className="text-[12px] text-gray-400 dark:text-gray-400 mb-3">Kunjungi sosial media kami</p>
            <div className="flex gap-4 text-white text-lg">
              {contact?.facebook && (
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 dark:hover:text-purple-400 transition-colors duration-300">
                  <FaFacebookF />
                </a>
              )}
              {contact?.twitter && (
                <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 dark:hover:text-purple-400 transition-colors duration-300">
                  <FaTwitter />
                </a>
              )}
              {contact?.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 dark:hover:text-purple-400 transition-colors duration-300"
                >
                  <FaWhatsapp />
                </a>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-[#2a2454] dark:bg-[#141429] transition-colors duration-500">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[#3a3366] dark:border-[#2C2C44] text-[11px] text-gray-400 dark:text-gray-400">
          <div>© 2025 GetSkill. All rights reserved.</div>
          <nav className="flex items-center gap-2 font-semibold">
            <Link
              to="/terms"
              className="text-gray-400 hover:text-yellow-400 dark:hover:text-purple-400 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
          after:bg-yellow-400 dark:after:bg-purple-400 hover:after:w-full after:transition-all after:duration-500"
            >
              Terms of Use
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-yellow-400 dark:hover:text-purple-400 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
          after:bg-yellow-400 dark:after:bg-purple-400 hover:after:w-full after:transition-all after:duration-500"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
