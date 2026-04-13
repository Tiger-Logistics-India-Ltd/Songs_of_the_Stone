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
  const desktopNavRef = useRef(null);
  const location = useLocation();
  
  // State to track if the user has scrolled past a certain point
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpOpen, setMobileExpOpen] = useState(false);
  const [desktopExpOpen, setDesktopExpOpen] = useState(false);
  const [mobilePressOpen, setMobilePressOpen] = useState(false);
  const [desktopPressOpen, setDesktopPressOpen] = useState(false);

  const pressDropdownItems = [
    {
      id: 'conde-nast',
      title: "How Delhi's heritage sites are serving modern culture",
      publication: 'Condé Nast Traveller',
      image: '/press/1.png',
      url: 'https://www.cntraveller.in/story/how-delhis-heritage-sites-are-serving-modern-culture/'
    },
    {
      id: 'the-patriot',
      title: 'Songs of the Stone: A musical evening',
      publication: 'The Patriot',
      image: '/press/2.png',
      url: 'https://thepatriot.in/listicle/songs-of-the-stone-a-musical-evening-82507'
    },
    {
      id: 'pti',
      title: "Flautist Rakesh Chaurasia to perform at 2nd 'Songs of the Stone' at Qutub Minar",
      publication: 'PTI',
      image: '/press/5.png',
      url: 'https://www.ptinews.com/story/national/flautist-rakesh-chaurasia-to-perform-at-2nd-songs-of-the-stone-at-qutub-minar/3431546'
    }
  ];

  const chapterDropdownItems = [
    {
      id: 'first-chapter',
      title: 'First Chapter',
      path: '/first-chapter',
      image: '/navbar_photos/SotS-278.jpg',
      date: '13 Dec 2025',
      description: "A musical evening rooted in art, heritage, and shared memory at Qutub Minar."
    },
    {
      id: 'second-chapter',
      title: 'Second Chapter',
      path: '/second-chapter',
      image: '/navbar_photos/SOTS-329.jpg',
      date: '8 Mar 2026',
      description: 'Live the legacy through a curated journey of performance, rhythm, and cultural expression.'
    }
  ];
  
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target)) {
        setDesktopExpOpen(false);
        setDesktopPressOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setDesktopExpOpen(false);
        setDesktopPressOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

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
    <nav
      ref={desktopNavRef}
      className={`navbar ${scrolled || !isTransparentPage ? 'scrolled' : ''} ${!isTransparentPage ? 'static-nav' : ''} ${desktopExpOpen ? 'nav-expanded' : ''}`}
    >
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-logo">
          <Link to="/">
            <img src="/Images/desktop/new_footer.svg" alt="Songs of the Stone" className="logo-img" />
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="nav-menu">
          <Link to="/" className="nav-link"><span>Home</span></Link>
          <Link to="/about" className="nav-link"><span>About</span></Link>
          
          {/* Experiences Dropdown Wrapper - unified hover region */}
          <div
            className="nav-experiences-wrapper"
            onMouseEnter={() => setDesktopExpOpen(true)}
            onMouseLeave={() => setDesktopExpOpen(false)}
          >
            <div className={`nav-dropdown ${desktopExpOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="nav-link nav-dropdown-trigger nav-dropdown-trigger-button"
                aria-expanded={desktopExpOpen}
                aria-haspopup="true"
                onClick={() => setDesktopExpOpen((open) => !open)}
              >
                Experiences
              </button>
            </div>
            
            {/* Expanded Panel - inside wrapper for unified hover */}
            <div
              className={`nav-expanded-panel ${desktopExpOpen ? 'open' : ''}`}
              role="menu"
            >
              <div className="nav-expanded-inner">
                {chapterDropdownItems.map((chapter) => (
                  <Link
                    key={chapter.id}
                    to={chapter.path}
                    className="chapter-dropdown-card"
                    role="menuitem"
                    onClick={() => setDesktopExpOpen(false)}
                  >
                    <div className="chapter-dropdown-image-wrap">
                      <img src={chapter.image} alt={chapter.title} className="chapter-dropdown-image" />
                    </div>
                    <div className="chapter-dropdown-content">
                      <h4 className="chapter-dropdown-title">{chapter.title}</h4>
                      <p className="chapter-dropdown-date">{chapter.date}</p>
                      <p className="chapter-dropdown-description">{chapter.description}</p>
                      <span className="chapter-dropdown-readmore">Read More</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Press Dropdown Wrapper */}
          <div
            className="nav-experiences-wrapper"
            onMouseEnter={() => setDesktopPressOpen(true)}
            onMouseLeave={() => setDesktopPressOpen(false)}
          >
            <div className={`nav-dropdown ${desktopPressOpen ? 'open' : ''}`}>
              <Link
                to="/press"
                className="nav-link nav-dropdown-trigger"
                onClick={() => setDesktopPressOpen(false)}
              >
                Press
              </Link>
            </div>

            <div
              className={`nav-expanded-panel nav-press-panel ${desktopPressOpen ? 'open' : ''}`}
              role="menu"
            >
              <div className="nav-expanded-inner nav-press-inner">
                {pressDropdownItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chapter-dropdown-card"
                    role="menuitem"
                    onClick={() => setDesktopPressOpen(false)}
                  >
                    <div className="chapter-dropdown-image-wrap">
                      <img src={item.image} alt={item.title} className="chapter-dropdown-image" />
                    </div>
                    <div className="chapter-dropdown-content">
                      <h4 className="chapter-dropdown-title">{item.title}</h4>
                      <p className="chapter-dropdown-date">{item.publication}</p>
                      <span className="chapter-dropdown-readmore">Read Article</span>
                    </div>
                  </a>
                ))}
              </div>
              <div className="nav-press-footer">
                <Link to="/press" className="nav-press-view-all" onClick={() => setDesktopPressOpen(false)}>
                  <span>View All Press</span> <span className="nav-press-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>

          <Link to="/#contact" className="nav-link" onClick={(e) => { if (location.pathname === '/') scrollToSection('contact', e); }}><span>Contact</span></Link>
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
              <Link to="/second-chapter" className="mobile-submenu-item" onClick={closeMobile}>
                Second Chapter
              </Link>
              <Link to="/first-chapter" className="mobile-submenu-item" onClick={closeMobile}>
                First Chapter
              </Link>
            </div>
          </div>

          {/* Mobile Press Dropdown */}
          <div className="mobile-dropdown">
            <button
              className={`mobile-dropdown-trigger ${mobilePressOpen ? 'open' : ''}`}
              onClick={() => setMobilePressOpen(o => !o)}
            >
              Press
              <svg className="mobile-dropdown-arrow" width="12" height="7" viewBox="0 0 12 7" fill="none">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`mobile-dropdown-items ${mobilePressOpen ? 'open' : ''}`}>
              {pressDropdownItems.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-submenu-item"
                  onClick={closeMobile}
                >
                  {item.publication}
                </a>
              ))}
              <Link to="/press" className="mobile-submenu-item mobile-submenu-viewall" onClick={closeMobile}>
                View All Press
              </Link>
            </div>
          </div>

          <Link to="/#contact" onClick={(e) => { if (location.pathname === '/') handleNavClick('contact', e); else closeMobile(); }}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;