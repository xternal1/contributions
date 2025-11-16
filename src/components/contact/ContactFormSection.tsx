// src/components/contact/ContactFormSection.tsx
import React from "react";
import ContactFormItem from "./ContactFormItem";

const ContactFormSection: React.FC = () => {
    return (
        <div className="bg-gray-100 dark:bg-[#0D0D1F] border border-gray-300 dark:border-white shadow rounded-xl p-6 sm:p-10 transition-colors duration-500">
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                Tuliskan Pesan
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs mb-8">
                Masukan Anda berharga bagi kami. Bantu kami kursus kami dengan membagikan pemikiran Anda.
            </p>

            <form className="space-y-5">
                {/* Nama */}
                <ContactFormItem
                    type="text"
                    placeholder="Nama"
                    aria-label="Nama"
                />

                {/* Email & Nomor Telepon */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ContactFormItem
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                    />
                    <ContactFormItem
                        type="text"
                        placeholder="Nomor Telepon"
                        aria-label="Nomor Telepon"
                    />
                </div>

                {/* Pesan */}
                <ContactFormItem
                    isTextarea={true}
                    textareaProps={{
                        placeholder: "Isi Pesan",
                        rows: 6,
                        "aria-label": "Isi Pesan"  // Fixed: Changed ariaLabel to aria-label
                    }}
                />

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
    );
};

export default ContactFormSection;


