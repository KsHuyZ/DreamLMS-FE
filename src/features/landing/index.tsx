import React from 'react';

import BecomeSection from '@/features/landing/components/become-section';
import BlogSection from '@/features/landing/components/blog-section';
import CategorySection from '@/features/landing/components/category-section';
import CompanySection from '@/features/landing/components/company-section';
import FeatureSection from '@/features/landing/components/feature-section';
import HeroSection from '@/features/landing/components/hero-section';
import IntroduceSection from '@/features/landing/components/introduce-section';
import MentorSection from '@/features/landing/components/mentor-section';
import TrendingSection from '@/features/landing/components/trending-section';

const LandingPage = () => {
  return (
    <div className='flex flex-col space-y-14 min-h-[calc(100vh-80px)]'>
      <HeroSection />
      <CategorySection />
      <FeatureSection />
      <IntroduceSection />
      <TrendingSection />
      <CompanySection />
      <MentorSection />
      <BecomeSection />
      <BlogSection />
    </div>
  );
};

export default LandingPage;
