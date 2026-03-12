import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedSections from '../components/FeaturedSections';
import PartnersSection from '../components/PartnersSection';
import EventsSection from '../components/EventsSection';
import GalleryVideoSection from '../components/GalleryVideoSection';
import ContactSection from '../components/ContactSection';

const homePartners = [
  { id: 1, name: 'ARC', desktop: '/partner/arc.svg', mobile: '/partner/arc.svg' },
  { id: 2, name: 'Delhi Tourism', desktop: '/partner/delhi.svg', mobile: '/partner/delhi.webp' },
  { id: 3, name: 'Partner 4', desktop: '/Chapter2/Partner/HSBC.png', mobile: '/Chapter2/Partner/HSBC.png' },
  { id: 4, name: 'Partner 5', desktop: '/Chapter2/Partner/Cohoma.png', mobile: '/Chapter2/Partner/Cohoma.png' },
  { id: 5, name: 'Partner 6', desktop: 'partner/7.png', mobile: 'partner/7.png' },
  { id: 6, name: 'Partner 7', desktop: 'partner/8.png', mobile: 'partner/8.png' },
  { id: 7, name: 'Partner 8', desktop: 'partner/9.png', mobile: 'partner/9.png' },
  { id: 8, name: 'Partner 9', desktop: 'partner/10.png', mobile: 'partner/10.png' },
  { id: 9, name: 'Partner 10', desktop: 'partner/11.png', mobile: 'partner/11.png' },
  { id: 10, name: 'Partner 11', desktop: 'partner/12.png', mobile: 'partner/12.png' },
  { id: 11, name: 'Partner 12', desktop: 'partner/13.png', mobile: 'partner/13.png' },
  { id: 12, name: 'Partner 13', desktop: 'partner/14.png', mobile: 'partner/14.png' },
  
];

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedSections />
      <PartnersSection partners={homePartners} centered />
      <EventsSection />
      <GalleryVideoSection />
      <ContactSection />
    </>
  );
};

export default Home;
