import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedSections from '../components/FeaturedSections';
import UpcomingEvent from '../components/UpcomingEvent';
import ChapterShowcase from '../components/ChapterShowcase';
import PartnersSection from '../components/PartnersSection';
import ArtistSection from '../components/ArtistSection';
import PressSection from '../components/PressSection';
import ContactSection from '../components/ContactSection';

const allPartners = [
  { id: 1,  name: 'ARC',          desktop: '/partner/arc.svg',             mobile: '/partner/arc.svg' },
  { id: 2,  name: 'Delhi Tourism', desktop: '/partner/delhi.svg',           mobile: '/partner/delhi.webp' },
  { id: 3,  name: 'Max',           desktop: '/partner/max.svg',             mobile: '/partner/max.webp' },
  { id: 4,  name: 'HSBC',          desktop: '/Chapter2/Partner/HSBC.png',   mobile: '/Chapter2/Partner/HSBC.png' },
  { id: 5,  name: 'Berger',        desktop: '/partner/7.png',               mobile: '/partner/7.png' },
  { id: 6,  name: 'Vedica',        desktop: '/partner/13.png',              mobile: '/partner/13.png' },
  { id: 7,  name: 'Hyder',         desktop: '/partner/hyder.svg',           mobile: '/partner/hyder.svg' },
  { id: 8,  name: 'Jaipur Rugs',   desktop: '/partner/jaipurrugs.svg',      mobile: '/partner/jaipurrugs.webp' },
  { id: 9,  name: 'Aava',          desktop: '/partner/aava.svg',            mobile: '/partner/aava.webp' },
  { id: 10, name: 'Aanyna',        desktop: '/partner/aanyna.svg',          mobile: '/partner/aanyna.webp' },
  { id: 11, name: 'Olaf',          desktop: '/partner/olaf_svg.svg',        mobile: '/partner/olaf_svg.svg' },
  { id: 12, name: 'Alegro',        desktop: '/partner/alegro.svg',          mobile: '/partner/alegro.svg' },
  { id: 13, name: 'Cohoma',        desktop: '/Chapter2/Partner/Cohoma.png', mobile: '/Chapter2/Partner/Cohoma.png' },
  { id: 14, name: 'Iraado',        desktop: '/partner/8.png',               mobile: '/partner/8.png' },
  { id: 15, name: 'Kian Falcon',   desktop: '/partner/9.png',               mobile: '/partner/9.png' },
  { id: 16, name: 'Dialogues by Nirmals', desktop: '/partner/10.png',       mobile: '/partner/10.png' },
  { id: 17, name: 'Handicraft Haveli Jaipur', desktop: '/partner/11.png',   mobile: '/partner/11.png' },
  { id: 18, name: 'Jaipur Rugs',   desktop: '/partner/12.png',              mobile: '/partner/12.png' },
  { id: 19, name: 'Maioya',        desktop: '/partner/14.png',              mobile: '/partner/14.png' },
  { id: 20, name: 'Stanford',      desktop: '/partner/stanford.svg',        mobile: '/partner/stanford.webp' },
];

const Home = () => {
  return (
    <>
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
