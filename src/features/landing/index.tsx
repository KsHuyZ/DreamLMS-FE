import React from 'react';

import { getTopCategories, getTrendingCourses } from '@/api';
import BecomeSection from '@/features/landing/components/become-section';
import CategorySection from '@/features/landing/components/category-section';
import CompanySection from '@/features/landing/components/company-section';
import FeatureSection from '@/features/landing/components/feature-section';
import HeroSection from '@/features/landing/components/hero-section';
import IntroduceSection from '@/features/landing/components/introduce-section';
import MentorSection from '@/features/landing/components/mentor-section';
import TrendingSection from '@/features/landing/components/trending-section';

const LandingPage = async () => {
  const categories = await getTopCategories();
  const trendingCourses = await getTrendingCourses();

  return (
    <div className='flex flex-col space-y-14 min-h-[calc(100vh-80px)]'>
      <HeroSection />
      <CategorySection categories={categories} />
      <FeatureSection courses={trendingCourses} />
      <IntroduceSection />
      <TrendingSection courses={trendingCourses} />
      <CompanySection />
      <MentorSection />
      <BecomeSection />
      {/* <BlogSection /> */}
    </div>
  );
};

export default LandingPage;
