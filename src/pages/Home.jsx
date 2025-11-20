import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedSections from '../components/FeaturedSections';
import PartnersSection from '../components/PartnersSection';
import EventsSection from '../components/EventsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedSections />
      <PartnersSection />
      <EventsSection />
      <ContactSection />
    </>
  );
};

export default Home;
