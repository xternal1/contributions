import React, { useEffect } from 'react';
import AboutUsSection from '../../../components/dashboard/AboutUsSection';
import BenefitSection from '../../../components/dashboard/BenefitSection';
import BestSellingCourses from '../../../components/dashboard/BestSellingCourses';
import IndustryClassSection from '../../../components/dashboard/IndustryClassSection';
import KeyFeaturesSection from '../../../components/dashboard/KeyFeaturesSection';
import LatestNewsSection from '../../../components/dashboard/LatestNewsSection';
import PartnersSection from '../../../components/dashboard/PartnersSection';
import PopularCourses from '../../../components/dashboard/PopularCourses';
import FeaturesSection from '../../../components/industrialclass/FeaturesSection';
import HeroSection from '../../../components/industrialclass/HeroSection';


const LandingPage: React.FC = () => {

    useEffect(() => {

        const savedScrollY = localStorage.getItem('scrollPosition');
        if (savedScrollY) {
            window.scrollTo(0, parseInt(savedScrollY));
        }

        const handleBeforeUnload = () => {
            localStorage.setItem('scrollPosition', window.scrollY.toString());
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div className="font-sans antialiased">
            <HeroSection />
            <FeaturesSection />
            <AboutUsSection />
            <PopularCourses />
            <BenefitSection />
            <KeyFeaturesSection />
            <BestSellingCourses />
            <IndustryClassSection />
            <PartnersSection />
            <LatestNewsSection />
        </div>
    );
};

export default LandingPage;