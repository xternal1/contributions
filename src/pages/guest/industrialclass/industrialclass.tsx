// File utama yang menggabungkan semua komponen

import HeroSection from '../../../components/industrialclass/HeroSection';
import FeaturesSection from '../../../components/industrialclass/FeaturesSection';
import IndustrialClassSection from '../../../components/industrialclass/IndustrialClassSection';
import IndustrialClassBenefits from '../../../components/industrialclass/IndustrialClassBenefits';
import TechnologySection from '../../../components/industrialclass/TechnologySection';
import ContactSection from '../../../components/industrialclass/ContactSection';
import IndustrialHero from '../../../components/industrialclass/IndustrialHero';

const industrialclass = () => {
  return (
  <div className="min-h-screen bg-white antialiased overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <IndustrialClassSection />
      <IndustrialClassBenefits />
      <TechnologySection />
      <ContactSection />
      <IndustrialHero />
    </div>
  );
};

export default industrialclass;
