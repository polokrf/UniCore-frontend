import AboutSection from '@/components/modules/home/AboutSection';
import AcademicPrograms from '@/components/modules/home/AcademicPrograms';
import CampusLife from '@/components/modules/home/CampusLife';
import FacultySection from '@/components/modules/home/FacultySection';
import HeroSection from '@/components/modules/home/HeroSection';
import NewsEvents from '@/components/modules/home/NewsEvents';
import React from 'react';

const Home = () => {
  return (
    <div>
      <main>
        <HeroSection />
        <AboutSection />
        <AcademicPrograms />
        <FacultySection />
        <CampusLife />
        <NewsEvents />
      </main>
    </div>
  );
};

export default Home;