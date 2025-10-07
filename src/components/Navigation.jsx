import React, { useState, useEffect } from 'react';
import { useWindowSize, useScrollPosition } from '../hooks/useResponsive';

/**
 * Navigation Component
 * 
 * Features:
 * - Sticky navigation bar that changes appearance on scroll
 * - Mobile-responsive hamburger menu
 * - Smooth scroll behavior for navigation links
 * - Logo and call-to-action button
 * - Responsive behavior using custom hooks
 */
const Navigation = () => {
  // Get scroll position using custom hook
  const { scrollY } = useScrollPosition();
  
  // State to track if the user has scrolled past a certain point
  const [scrolled, setScrolled] = useState(false);
  
  /**
   * Effect to handle scroll position changes using custom hook
   * Updates scrolled state when scroll position changes
   */
  useEffect(() => {
    // Change navbar appearance when scrolled more than 50px
    setScrolled(scrollY > 50);
  }, [scrollY]);

  /**
   * Smooth scroll to section with enhanced experience
   */
  const scrollToSection = (sectionId, event) => {
    event.preventDefault();
    
    const section = document.getElementById(sectionId);
    if (section) {
      // Add a slight delay for better UX
      setTimeout(() => {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Special handling for contact section - focus first input
        if (sectionId === 'contact') {
          setTimeout(() => {
            const firstInput = section.querySelector('input[name="name"]');
            if (firstInput) {
              firstInput.focus();
            }
          }, 800);
        }
      }, 100);
    }
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(o => !o);
  const closeMobile = () => setMobileOpen(false);

  const handleNavClick = (id, e) => {
    closeMobile();
    scrollToSection(id, e);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-logo">
          <img src="/songofthestonelogo.svg" alt="Songs of the Stone" className="logo-img" />
        </div>

        {/* Desktop Navigation Menu */}
        <div className="nav-menu">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
            <a href="#events" className="nav-link">Events</a>
          <a href="#contact" className="nav-link" onClick={(e) => scrollToSection('contact', e)}>Contact</a>
        </div>

        {/* Desktop CTA */}
        <div className="nav-cta desktop-only">
          <a href="#events" className="cta-button" onClick={(e) => scrollToSection('events', e)}>Explore</a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${mobileOpen ? 'is-active' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={toggleMobile}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Mobile Slide Panel */}
      <div className={`mobile-menu-panel ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <a href="#home" onClick={(e) => handleNavClick('home', e)}>Home</a>
          <a href="#about" onClick={(e) => handleNavClick('about', e)}>About</a>
          <a href="#events" onClick={(e) => handleNavClick('events', e)}>Events</a>
          <a href="#contact" onClick={(e) => handleNavClick('contact', e)}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;