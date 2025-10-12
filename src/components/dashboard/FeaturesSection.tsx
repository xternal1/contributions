import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import component1 from "../../assets/landingpage/home/component1.png";
import component2 from "../../assets/landingpage/home/component2.png";
import component3 from "../../assets/landingpage/home/component3.png";
import component4 from "../../assets/landingpage/home/component4.png";

//Interface FeatureCard
interface FeatureCardProps {
  iconSrc: string;
  altText: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  iconSrc,
  altText,
  title,
  description,
}) => {
  return (
    <motion.div
      className="bg-white max-w-xs w-full mx-auto px-6 py-10 rounded-xl shadow-lg border border-gray-200 text-center flex flex-col items-center justify-center"
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: { scale: 1, y: 0, boxShadow: "0px 2px 6px rgba(0,0,0,0.1)" },
        hover: {
          scale: 1.05,
          y: -5,
          boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
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
        <img src={iconSrc} alt={altText} className="w-12 h-12 object-contain" />
      </motion.div>

      {/* Title */}
      <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </motion.div>
  );
};

//Skeleton Loader 
const SkeletonFeatureCard: React.FC = () => {
  return (
    <div className="bg-white max-w-xs w-full mx-auto px-6 py-10 rounded-xl shadow-lg border border-gray-200 animate-pulse text-center flex flex-col items-center">
      <div className="mb-4 bg-gray-200 w-12 h-12 rounded-full"></div>
      <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-200 h-3 w-5/6 rounded"></div>
    </div>
  );
};

//Features Section
const FeaturesSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-[6vh] sm:py-[3vh] md:py-[3vh] lg:py-[4vh] xl:py-[4vh] 2xl:py-[4vh] bg-white">
      <div className="container mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-20 relative z-10">
          {isLoading ? (
            <>
              <SkeletonFeatureCard />
              <SkeletonFeatureCard />
              <SkeletonFeatureCard />
              <SkeletonFeatureCard />
            </>
          ) : (
            <>
              <FeatureCard
                iconSrc={component1}
                altText="Text 1"
                title="Belajar Dari Ahli"
                description="Kami menyediakan kursus online dengan instruktur berpengalaman."
              />
              <FeatureCard
                iconSrc={component2}
                altText="Text 2"
                title="Kursus Profesional"
                description="Tingkatkan keterampilan Anda dengan berbagai kursus berkualitas."
              />
              <FeatureCard
                iconSrc={component3}
                altText="Text 3"
                title="Program Sertifikat"
                description="Dapatkan sertifikat resmi untuk mendukung karier Anda."
              />
              <FeatureCard
                iconSrc={component4}
                altText="Text 4"
                title="Event Pelatihan"
                description="Ikuti berbagai event dan pelatihan eksklusif secara online."
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
