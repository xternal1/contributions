import React, { useEffect, useState } from "react";
import BackgroundShapes from "../../../components/public/BackgroundShapes";
import MapIcon from "../../../assets/img/icons/map.svg";
import PhoneIcon from "../../../assets/img/icons/contact_phone.svg";
import EmailIcon from "../../../assets/img/icons/emial.svg";
import { getContact } from "../../../features/contact/_service/_contact_service";
import type { ContactData } from "../../../features/contact/_contact";

const ContactPage: React.FC = () => {
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await getContact();
        const data = res.data;
        setContact({
          ...data,
          phone_number: Array.isArray(data.phone_number)
            ? data.phone_number
            : [data.phone_number].filter(Boolean),
          email: Array.isArray(data.email)
            ? data.email
            : [data.email].filter(Boolean),
        });
      } catch (error) {
        console.error("Gagal memuat data kontak:", error);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className="transition-colors duration-500 bg-white text-gray-800 dark:bg-[#141427] dark:text-white">
      {/* Header */}
      <div className="relative px-6 py-11 dark:bg-[#0D0D1A] dark:bg-none bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 overflow-hidden">
        <BackgroundShapes />
        <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
            Hubungi Kami
          </h1>
          <p className="mt-2 text-xs sm:text-xs text-gray-800 dark:text-white">
            <a href="/" className="hover:underline">
              Beranda
            </a>
            <span className="mx-1">&gt;</span>
            <span className="text-purple-600">Hubungi Kami</span>
          </p>
        </div>
      </div>

      {/* Section Kontak */}
      <div
        className="max-w-6xl mx-auto
                px-6 sm:px-10 lg:px-16 xl:px-15 2xl:px-24
                py-14 sm:py-20
                grid grid-cols-1 lg:grid-cols-3 gap-8 text-left"
      >
        {/* Kiri: Info Kontak */}
        <div className="space-y-6">
          {/* Address */}
          <div className="flex items-start space-x-5 p-6 bg-gray-100 dark:bg-[#2C004F] border border-gray-200 dark:border-transparent shadow rounded-xl hover:shadow-md transition-colors duration-500">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-purple-600">
              <img
                src={MapIcon}
                alt="Alamat"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain filter invert-0"
              />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800 dark:text-white text-base sm:text-base">
                Address
              </h3>
              <p className="text-gray-600 dark:text-gray-200 text-xs leading-relaxed">
                Perum Permata Regency 1 Blok 10/28, Perun Gpa, Ngijo,
                Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152.
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-5 p-6 bg-gray-100 dark:bg-[#2C004F] border border-gray-200 dark:border-transparent shadow rounded-xl hover:shadow-md transition-colors duration-500">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600">
              <img src={PhoneIcon} alt="Phone" className="w-6 h-6 object-contain filter invert-0" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white text-base">Phone</h3>
              {contact?.phone_number?.length ? (
                <ul className="text-gray-600 dark:text-gray-200 text-xs space-y-1">
                  {contact.phone_number.map((num, idx) => (
                    <li key={idx}>
                      <a
                        href={`tel:${num.replace(/\s+/g, "")}`}
                        className="relative inline-block text-gray-600 dark:text-gray-200 text-xs transition-colors duration-500
                                                hover:text-purple-400 dark:hover:text-purple-400
                                                after:content-[''] after:absolute after:left-0 after:bottom-0
                                                after:w-0 after:h-[1px] after:bg-purple-400
                                                after:transition-all after:duration-500
                                                hover:after:w-full dark:hover:after:bg-purple-400"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {num}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-200 text-xs">-</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-5 p-6 bg-gray-100 dark:bg-[#2C004F] border border-gray-200 dark:border-transparent shadow rounded-xl hover:shadow-md transition-colors duration-500">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600">
              <img src={EmailIcon} alt="Email" className="w-6 h-6 object-contain filter invert-0" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white text-base">E-mail Address</h3>
              {contact?.email?.length ? (
                <ul className="text-gray-600 dark:text-gray-200 text-xs space-y-1">
                  {contact.email.map((email, idx) => (
                    <li key={idx}>
                      <a
                        href={`mailto:${email}`}
                        className="relative inline-block text-gray-600 dark:text-gray-200 text-xs transition-colors duration-500
                                                hover:text-purple-400 dark:hover:text-purple-400
                                                after:content-[''] after:absolute after:left-0 after:bottom-0
                                                after:w-0 after:h-[1px] after:bg-purple-400
                                                after:transition-all after:duration-500
                                                hover:after:w-full dark:hover:after:bg-purple-400"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-200 text-xs">-</p>
              )}
            </div>
          </div>
        </div>

        {/* Kanan: Form */}
        <div className="lg:col-span-2 bg-gray-100 dark:bg-[#0D0D1F] border border-gray-300 dark:border-white shadow rounded-xl p-6 sm:p-10 transition-colors duration-500">
          <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-white mb-3">
            Tuliskan Pesan
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs mb-8">
            Masukan Anda berharga bagi kami. Bantu kami kursus kami dengan membagikan pemikiran Anda.
          </p>

          <form className="space-y-5">
            {/* Nama */}
            <input
              type="text"
              placeholder="Nama"
              className="border border-gray-300 dark:border-[#2C2C44] rounded-lg px-4 py-3 w-full text-xs
                                bg-white dark:bg-[#141429] text-gray-800 dark:text-gray-200
                                hover:text-[#9425FE] hover:border-[#9425FE]
                                dark:hover:text-[#9425FE] dark:hover:border-[#9425FE]
                                focus:outline-none focus:ring-1 focus:ring-[#9425FE]
                                transition-colors duration-500"
            />

            {/* Email & Nomor Telepon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 dark:border-[#2C2C44] rounded-lg px-4 py-3 w-full text-xs
                                bg-white dark:bg-[#141429] text-gray-800 dark:text-gray-200
                                hover:text-[#9425FE] hover:border-[#9425FE]
                                dark:hover:text-[#9425FE] dark:hover:border-[#9425FE]
                                focus:outline-none focus:ring-1 focus:ring-[#9425FE]
                                transition-colors duration-500"
              />
              <input
                type="text"
                placeholder="Nomor Telepon"
                className="border border-gray-300 dark:border-[#2C2C44] rounded-lg px-4 py-3 w-full text-xs
                                bg-white dark:bg-[#141429] text-gray-800 dark:text-gray-200
                                hover:text-[#9425FE] hover:border-[#9425FE]
                                dark:hover:text-[#9425FE] dark:hover:border-[#9425FE]
                                focus:outline-none focus:ring-1 focus:ring-[#9425FE]
                                transition-colors duration-500"
              />
            </div>

            {/* Pesan */}
            <textarea
              placeholder="Isi Pesan"
              rows={6}
              className="border border-gray-300 dark:border-[#2C2C44] rounded-lg px-4 py-3 w-full text-xs
                            bg-white dark:bg-[#141429] text-gray-800 dark:text-gray-200
                            hover:text-[#9425FE] hover:border-[#9425FE]
                            dark:hover:text-[#9425FE] dark:hover:border-[#9425FE]
                            focus:outline-none focus:ring-1 focus:ring-[#9425FE]
                            transition-colors duration-500"
            ></textarea>

            {/* Tombol */}
            <button
              type="submit"
              className="group relative
                            bg-yellow-400 text-black font-semibold py-3 px-8
                            rounded-full flex items-center justify-center gap-2
                            border border-black transition-all duration-500 ease-in-out
                            shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]
                            hover:bg-[#9425FE] hover:text-white
                            hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)]
                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                            focus:outline-none text-sm

                            /* 🌙 DARK MODE */
                            dark:bg-[#9425FE] dark:text-white dark:border-[#9425FE]
                            dark:hover:bg-yellow-400 dark:hover:text-black"
            >
              <span className="transition-colors duration-500 group-hover:text-inherit">
                Kirim
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 transition-colors duration-500 text-black dark:text-white group-hover:text-inherit"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3"
                />
              </svg>
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
