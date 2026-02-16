import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedSections from '../components/FeaturedSections';
import PartnersSection from '../components/PartnersSection';
import EventsSection from '../components/EventsSection';
import ContactSection from '../components/ContactSection';

const homePartners = [
  { id: 1, name: 'ARC', desktop: '/partner/arc.svg', mobile: '/partner/arc.svg' },
  { id: 2, name: 'Delhi Tourism', desktop: '/partner/delhi.svg', mobile: '/partner/delhi.webp' },
  { id: 3, name: 'Partner 4', desktop: '/Chapter2/Partner/HSBC.png', mobile: '/Chapter2/Partner/HSBC.png' },
  { id: 4, name: 'Partner 5', desktop: '/Chapter2/Partner/Cohoma.png', mobile: '/Chapter2/Partner/Cohoma.png' },
];

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedSections />
      <PartnersSection partners={homePartners} centered />
      <EventsSection />
      <ContactSection />
    </>
  );
};

export default Home;
