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
  // Get responsive information using custom hook
  const { isMobile } = useWindowSize();
  const { scrollY } = useScrollPosition();
  
  // State to track if the user has scrolled past a certain point
  const [scrolled, setScrolled] = useState(false);
  
  // State to manage mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * Effect to handle scroll position changes using custom hook
   * Updates scrolled state when scroll position changes
   */
  useEffect(() => {
    // Change navbar appearance when scrolled more than 50px
    setScrolled(scrollY > 50);
  }, [scrollY]);

  /**
   * Close mobile menu when screen size changes to desktop
   */
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
      document.body.style.overflow = 'unset';
    }
  }, [isMobile, mobileMenuOpen]);

  /**
   * Toggle mobile menu visibility
   * Also prevents body scroll when menu is open
   */
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'unset';
  };

  /**
   * Close mobile menu when a navigation link is clicked
   * Restores body scroll
   */
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-logo">
          <img src="/logo.png" alt="Song of the Stone" className="logo-img" />
        </div>
        
        {/* Desktop Navigation Menu */}
        <div className={`nav-menu ${mobileMenuOpen ? 'nav-menu-mobile-open' : ''}`}>
          <a href="#home" className="nav-link" onClick={closeMobileMenu}>
            Home
          </a>
          <a href="#about" className="nav-link" onClick={closeMobileMenu}>
            About
          </a>
          <a href="#events" className="nav-link" onClick={closeMobileMenu}>
            Events
          </a>
          <a href="#contact" className="nav-link" onClick={closeMobileMenu}>
            Contact
          </a>
        </div>
        
        {/* Call-to-Action Button */}
        <div className="nav-cta">
          <a href="#contact" className="cta-button" onClick={closeMobileMenu}>
            Explore
          </a>
        </div>

        {/* Mobile Menu Hamburger Button */}
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'mobile-menu-btn-open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;