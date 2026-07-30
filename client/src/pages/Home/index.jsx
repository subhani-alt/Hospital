import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import QuickAccessBar from '../../components/home/QuickAccessBar';
import StatsSection from '../../components/home/StatsSection';
import DepartmentsSection from '../../components/home/DepartmentsSection';
import ChairmanSection from '../../components/home/ChairmanSection';
import WhyChooseUsSection from '../../components/home/WhyChooseUsSection';
import PatientJourneySection from '../../components/home/PatientJourneySection';
import TechnologySection from '../../components/home/TechnologySection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import AwardsInsuranceSection from '../../components/home/AwardsInsuranceSection';
import HospitalGallerySection from '../../components/home/HospitalGallerySection';
import ArticlesAppPromoSection from '../../components/home/ArticlesAppPromoSection';

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Luxury Hero Section */}
      <HeroSection />

      {/* 2. Quick Access Bar */}
      <QuickAccessBar />

      {/* 3. Hospital Statistics */}
      <StatsSection />

      {/* 4. Featured Departments */}
      <DepartmentsSection />

      {/* 5. Chairman's Message & Vision */}
      <ChairmanSection />

      {/* 6. Why Choose Us (Pillars) */}
      <WhyChooseUsSection />

      {/* 8. Patient Journey Timeline */}
      <PatientJourneySection />

      {/* 9. Technology & Robotic Surgery */}
      <TechnologySection />

      {/* 10. Testimonials & Success Stories */}
      <TestimonialsSection />

      {/* 12. Insurance Partners & Accreditations */}
      <AwardsInsuranceSection />

      {/* 13. Hospital Infrastructure Gallery */}
      <HospitalGallerySection />

      {/* 14. Latest Articles & Mobile App Promo */}
      <ArticlesAppPromoSection />
    </div>
  );
}
