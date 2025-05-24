import React from 'react';
import { motion } from 'framer-motion';
// import HeroSection from '../components/home/HeroSection';
// Update the path below to the correct location of HeroSection, for example:
// import HeroSection from '../components/HeroSection';
// Or, if the file is named differently, update the import accordingly.
// import MissionSection from '../components/home/MissionSection';
// TODO: Update the import path below to the correct location of MissionSection, for example:
// import MissionSection from '../components/MissionSection';
// import CtaSection from '../components/home/CtaSection';
// TODO: Update the import path below to the correct location of CtaSection, for example:
// import CtaSection from '../components/CtaSection';
// import StatsSection from '../components/home/StatsSection';
// TODO: Update the import path below to the correct location of StatsSection, for example:
// import StatsSection from '../components/StatsSection';
import HeroSection from '../components/home/HeroSection';
import MissionSection from '../components/home/MissionSection';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaSection from '../components/home/CtaSection';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <MissionSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
    </motion.div>
  );
};

export default Home;
