
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
  const [mobileExpOpen, setMobileExpOpen] = useState(false);
  
  // Check if current page should have transparent navbar (home or first-chapter or second-chapter)
  const isTransparentPage = location.pathname === '/' || location.pathname === '/first-chapter' || location.pathname === '/second-chapter';
  
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
    <nav className={`navbar ${scrolled || !isTransparentPage ? 'scrolled' : ''} ${!isTransparentPage ? 'static-nav' : ''}`}>
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
          
          {/* Experiences Dropdown - visible but not clickable */}
          <div className="nav-dropdown">
            <span className="nav-link nav-dropdown-trigger">
              Experiences 
              <svg className="dropdown-arrow-svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <ul className="nav-dropdown-menu">
              <li>
                {/* Second Chapter - Coming Soon */}
                <span className="dropdown-item">Second Chapter </span>
              </li>
              <li>
                {/* First Chapter - Coming Soon */}
                <span className="dropdown-item">First Chapter </span>
              </li>
            </ul>
          </div>
          
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
          
          {/* Mobile Experiences Dropdown */}
          <div className="mobile-dropdown">
            <button 
              className={`mobile-dropdown-trigger ${mobileExpOpen ? 'open' : ''}`} 
              onClick={() => setMobileExpOpen(o => !o)}
            >
              Experiences
              <svg className="mobile-dropdown-arrow" width="12" height="7" viewBox="0 0 12 7" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`mobile-dropdown-items ${mobileExpOpen ? 'open' : ''}`}>
              {/* Second Chapter - Coming Soon */}
              <span className="mobile-submenu-item disabled">
                Second Chapter 
              </span>
              {/* First Chapter - Coming Soon */}
              <span className="mobile-submenu-item disabled">
                First Chapter 
              </span>
            </div>
          </div>

          <Link to="/#contact" onClick={(e) => { if (location.pathname === '/') handleNavClick('contact', e); else closeMobile(); }}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;