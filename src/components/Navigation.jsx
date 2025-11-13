
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollPosition } from '../hooks/useResponsive';

/**
 * Navigation Component
 * 
 * Features:
 * - Sticky navigation bar that changes appearance on scroll
 * - Static navbar on all pages except landing page
 * - Mobile-responsive hamburger menu
 * - Smooth scroll behavior for navigation links
 * - Logo and call-to-action button
 * - Responsive behavior using custom hooks
 */
const Navigation = () => {
  // Get scroll position using custom hook
  const { scrollY } = useScrollPosition();
  const scrollingRef = useRef(false);
  const location = useLocation();
  
  // State to track if the user has scrolled past a certain point
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Check if current page is landing page (home)
  const isLandingPage = location.pathname === '/';
  
  /**
   * Effect to handle scroll position changes using custom hook
   * Updates scrolled state when scroll position changes
   */
  useEffect(() => {
    setScrolled(scrollY > 50);
  }, [scrollY]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /**
   * Smooth scroll to section with enhanced experience
   */
  const scrollToSection = (sectionId, event) => {
    if (event) event.preventDefault();
    if (scrollingRef.current) return; // debounce overlapping scrolls
    const section = document.getElementById(sectionId);
    if (!section) return;
    scrollingRef.current = true;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Release lock after animation window
    setTimeout(() => { scrollingRef.current = false; }, 800);
    if (sectionId === 'contact') {
      setTimeout(() => {
        const firstInput = section.querySelector('input[name="name"]');
        firstInput && firstInput.focus();
      }, 950);
    }
  };

  const toggleMobile = () => setMobileOpen(o => !o);
  const closeMobile = () => setMobileOpen(false);

  const handleNavClick = (id, e) => {
    closeMobile();
    scrollToSection(id, e);
  };

  return (
    <nav className={`navbar ${scrolled || !isLandingPage ? 'scrolled' : ''} ${!isLandingPage ? 'static-nav' : ''}`}>
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-logo">
          <Link to="/">
            <img src="/Images/desktop/new_footer.svg" alt="Songs of the Stone" className="logo-img" />
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/#events" className="nav-link" onClick={(e) => { if (location.pathname === '/') scrollToSection('events', e); }}>Events</Link>
          <Link to="/#contact" className="nav-link" onClick={(e) => { if (location.pathname === '/') scrollToSection('contact', e); }}>Contact</Link>
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

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu-dropdown ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button className="mobile-menu-close" aria-label="Close menu" onClick={closeMobile}>
            &#10005;
          </button>
        </div>
        <div className="mobile-menu-inner">
          <Link to="/" onClick={closeMobile}>Home</Link>
          <Link to="/about" onClick={closeMobile}>About</Link>
          <Link to="/#events" onClick={(e) => { if (location.pathname === '/') handleNavClick('events', e); else closeMobile(); }}>Events</Link>
          <Link to="/#contact" onClick={(e) => { if (location.pathname === '/') handleNavClick('contact', e); else closeMobile(); }}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;