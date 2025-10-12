import React, { useEffect } from 'react';
import HeroSection from '../../../components/dashboard/HeroSection';
import FeaturesSection from '../../../components/dashboard/FeaturesSection';
import AboutUsSection from '../../../components/dashboard/AboutUsSection';
import PopularCourses from '../../../components/dashboard/PopularCourses';
import BenefitSection from '../../../components/dashboard/BenefitSection';
import KeyFeaturesSection from '../../../components/dashboard/KeyFeaturesSection';
import BestSellingCourses from '../../../components/dashboard/BestSellingCourses';
import IndustryClassSection from '../../../components/dashboard/IndustryClassSection';
import PartnersSection from '../../../components/dashboard/PartnersSection';
import LatestNewsSection from '../../../components/dashboard/LatestNewsSection';

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