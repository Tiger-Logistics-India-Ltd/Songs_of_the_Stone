import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedSections from '../components/FeaturedSections';
import EventsSection from '../components/EventsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedSections />
      <EventsSection />
      <ContactSection />
    </>
  );
};

export default Home;
