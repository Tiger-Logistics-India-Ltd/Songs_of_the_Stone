import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedSections from '../components/FeaturedSections';
import UpcomingEvent from '../components/UpcomingEvent';
import ChapterShowcase from '../components/ChapterShowcase';
import PartnersSection from '../components/PartnersSection';
import ArtistSection from '../components/ArtistSection';
import PressSection from '../components/PressSection';
import ContactSection from '../components/ContactSection';
import RescheduleNoticeModal from '../components/RescheduleNoticeModal';

const allPartners = [
  { id: 1,  name: 'ARC',          desktop: '/partner/arc.svg',             mobile: '/partner/arc.svg' },
  { id: 2,  name: 'Delhi Tourism', desktop: '/partner/delhi.svg',           mobile: '/partner/delhi.webp' },
  { id: 3,  name: 'Max',           desktop: '/partner/max.svg',             mobile: '/partner/max.webp' },
  { id: 4,  name: 'Stanford',      desktop: '/partner/stanford.svg',        mobile: '/partner/stanford.webp' },
  { id: 5,  name: 'Hyder',         desktop: '/partner/hyder.svg',           mobile: '/partner/hyder.svg' },
  { id: 6,  name: 'Jaipur Rugs',   desktop: '/partner/jaipurrugs.svg',      mobile: '/partner/jaipurrugs.webp' },
  { id: 7,  name: 'Aava',          desktop: '/partner/aava.svg',            mobile: '/partner/aava.webp' },
  { id: 8,  name: 'Aanyna',        desktop: '/partner/aanyna.svg',          mobile: '/partner/aanyna.webp' },
  { id: 9,  name: 'Olaf',          desktop: '/partner/olaf_svg.svg',        mobile: '/partner/olaf_svg.svg' },
  { id: 10, name: 'Alegro',        desktop: '/partner/alegro.svg',          mobile: '/partner/alegro.svg' },
  { id: 11, name: 'HSBC',          desktop: '/Chapter2/Partner/HSBC.png',   mobile: '/Chapter2/Partner/HSBC.png' },
  { id: 12, name: 'Cohoma',        desktop: '/Chapter2/Partner/Cohoma.png', mobile: '/Chapter2/Partner/Cohoma.png' },
  { id: 13, name: 'Partner',       desktop: '/partner/7.png',               mobile: '/partner/7.png' },
  { id: 14, name: 'Partner',       desktop: '/partner/8.png',               mobile: '/partner/8.png' },
  { id: 15, name: 'Partner',       desktop: '/partner/9.png',               mobile: '/partner/9.png' },
  { id: 16, name: 'Partner',       desktop: '/partner/10.png',              mobile: '/partner/10.png' },
  { id: 17, name: 'Partner',       desktop: '/partner/11.png',              mobile: '/partner/11.png' },
  { id: 18, name: 'Partner',       desktop: '/partner/12.png',              mobile: '/partner/12.png' },
  { id: 19, name: 'Partner',       desktop: '/partner/13.png',              mobile: '/partner/13.png' },
  { id: 20, name: 'Partner',       desktop: '/partner/14.png',              mobile: '/partner/14.png' },
];

const Home = () => {
  return (
    <>
      <RescheduleNoticeModal />
      <HeroSection />
      <FeaturedSections />
      <UpcomingEvent />
      <ChapterShowcase />
      <PressSection />
      <ArtistSection />
      <PartnersSection partners={allPartners} centered />
      <ContactSection />
    </>
  );
};

export default Home;
