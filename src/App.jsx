import React, { useEffect } from 'react';
import './App.css';

// Import modular components
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

/**
 * Main App Component
 * 
 * This is the root component that orchestrates all the page sections.
 * 
 * Features:
 * - Modular component architecture for better maintainability
 * - Clean separation of concerns
 * - Mobile-responsive design throughout
 * - Smooth scrolling and animations
 * 
 * Structure:
 * - Navigation: Sticky header with mobile menu
 * - HeroSection: Full-screen landing area with animated text
 * - AboutSection: Information about the cultural experience
 * - EventsSection: Featured events and booking
 * - ContactSection: Contact form and information
 * - Footer: Site footer with copyright
 */
function App() {
  // Force re-render of sections after DOM changes to prevent rendering issues
  useEffect(() => {
    const handleResize = () => {
      // Trigger a reflow to fix any layout issues
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      window.addEventListener('resize', handleResize);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;