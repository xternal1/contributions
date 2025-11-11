import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import komponen1 from "../../assets/kelasindustri/Icon1.png";
import komponen3 from "../../assets/kelasindustri/Icon3.png";
import komponen4 from "../../assets/kelasindustri/Icon4.png";

interface FeatureCardProps {
  icon?: React.ReactNode;
  iconSrc?: string;
  altText: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  iconSrc,
  altText,
  title,
  description,
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-[#0D0D1A] max-w-xs w-full mx-auto px-6 py-10 rounded-xl shadow-lg
                 border border-gray-200 dark:border-white text-center flex flex-col items-center justify-center
                 transition-all duration-500"
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: {
          scale: 1,
          y: 0,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        },
        hover: {
          scale: 1.05,
          y: -5,
          boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
        },
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon */}
      <motion.div
        className="mb-4 w-12 h-12 flex items-center justify-center"
        variants={{
          rest: { rotateY: 0 },
          hover: { rotateY: 180 },
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ perspective: 1000 }}
      >
        {icon ? (
          <div className="w-12 h-12 flex items-center justify-center">{icon}</div>
        ) : (
          <img
            src={iconSrc}
            alt={altText}
            className="w-12 h-12 object-contain transition-transform duration-500"
          />
        )}
      </motion.div>

      {/* Judul & Deskripsi */}
      <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2 transition-colors duration-500">
        {title}
      </h3>
      <p className="text-[11px] text-gray-600 dark:text-gray-300 transition-colors duration-500">
        {description}
      </p>
    </motion.div>
  );
};

// Skeleton Loader
const SkeletonFeatureCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#0D0D1A] max-w-xs w-full mx-auto px-6 py-10 rounded-xl shadow-lg border border-gray-200 dark:border-white/20 animate-pulse text-center flex flex-col items-center transition-all duration-500">
      <div className="mb-4 bg-gray-200 dark:bg-gray-700 w-12 h-12 rounded-full"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-200 dark:bg-gray-700 h-3 w-5/6 rounded"></div>
    </div>
  );
};

// Features Section
const FeaturesSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      iconSrc: komponen1,
      altText: "Sekolah",
      title: "Sekolah",
      description: "Total 18 Sekolah Yang Tergabung Dalam Kelas Industri",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
        >
          <path
            fill="#24aef0"
            d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4l.11-.94L5 5.5L12 2l7 3.5v5h-1V6l-2.11 1.06zm-4 6c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
          />
        </svg>
      ),
      altText: "Alumni",
      title: "Alumni",
      description: "Terdapat 97 Alumni Yang Telah Lulus Dari Kelas Industri",
    },
    {
      iconSrc: komponen3,
      altText: "Kelas",
      title: "Kelas",
      description: "Ada 45 Kelas Yang Terdaftar Pada Kelas Industri.",
    },
    {
      iconSrc: komponen4,
      altText: "Siswa",
      title: "Siswa",
      description: "Total 755 Siswa Yang Telah Bergabung Dalam Kelas Industri",
    },
  ];

  return (
    <section className="py-14 -mt-5 bg-white dark:bg-[#141427] transition-colors duration-500">
      <div className="container mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-25 relative z-10">
          {isLoading
            ? features.map((_, i) => <SkeletonFeatureCard key={i} />)
            : features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
