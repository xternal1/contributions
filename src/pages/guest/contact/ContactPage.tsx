// src/pages/guest/contact/ContactPage.tsx
import React, { useEffect, useState } from "react";
import BackgroundShapes from "@components/public/BackgroundShapes";
import { getContact } from "@features/contact/_service/_contact_service";
import type { ContactData } from "@features/contact/_contact";
import ContactInfoSection from "@/components/Contact/ContactInfoSection";
import ContactFormSection from "@/components/Contact/ContactFormSection";

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
            <span className="mx-1">{'>'}</span>
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
        <ContactInfoSection contact={contact} />

        {/* Kanan: Form */}
        <div className="lg:col-span-2">
          <ContactFormSection />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;


