import { useState, useEffect } from 'react';

/**
 * Custom Hook: useWindowSize
 * 
 * Purpose:
 * - Tracks window dimensions and provides responsive breakpoint information
 * - Useful for conditional rendering based on screen size
 * - Provides mobile, tablet, and desktop detection
 * 
 * Returns:
 * - windowSize: Object with width and height
 * - isMobile: Boolean indicating if screen is mobile-sized (≤768px)
 * - isTablet: Boolean indicating if screen is tablet-sized (769px-1024px)
 * - isDesktop: Boolean indicating if screen is desktop-sized (≥1025px)
 */
export const useWindowSize = () => {
  // State to store window dimensions
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    /**
     * Handler to call on window resize
     * Updates the windowSize state with current dimensions
     */
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures effect is only run on mount

  // Calculate responsive breakpoints
  const isMobile = windowSize.width <= 768;
  const isTablet = windowSize.width > 768 && windowSize.width <= 1024;
  const isDesktop = windowSize.width > 1024;

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop
  };
};

/**
 * Custom Hook: useScrollPosition
 * 
 * Purpose:
 * - Tracks the current scroll position of the window
 * - Useful for creating scroll-based effects and navigation changes
 * - Debounced for better performance
 * 
 * Returns:
 * - scrollY: Current vertical scroll position
 * - scrollDirection: 'up' or 'down' based on scroll direction
 */
export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');

  useEffect(() => {
    let previousScrollY = scrollY;
    let ticking = false;

    /**
     * Update scroll position and direction
     * Uses requestAnimationFrame for smooth performance
     */
    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      
      setScrollY(currentScrollY);
      
      // Determine scroll direction
      if (currentScrollY > previousScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < previousScrollY) {
        setScrollDirection('up');
      }
      
      previousScrollY = currentScrollY;
      ticking = false;
    };

    /**
     * Throttled scroll handler using requestAnimationFrame
     * Improves performance by limiting how often we update state
     */
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return { scrollY, scrollDirection };
};

/**
 * Custom Hook: useMediaQuery
 * 
 * Purpose:
 * - Provides a React hook for CSS media queries
 * - Useful for responsive behavior in JavaScript
 * 
 * Parameters:
 * - query: CSS media query string (e.g., '(max-width: 768px)')
 * 
 * Returns:
 * - Boolean indicating if the media query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    // Set the initial state
    setMatches(mediaQueryList.matches);

    // Listen for changes
    mediaQueryList.addEventListener('change', documentChangeHandler);

    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query]);

  return matches;
};

/**
 * Custom Hook: useTouch
 * 
 * Purpose:
 * - Detects if the device supports touch interactions
 * - Useful for providing touch-specific UI elements
 * 
 * Returns:
 * - isTouch: Boolean indicating if device supports touch
 */
export const useTouch = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkTouch();
    
    // Re-check on window focus (for hybrid devices)
    window.addEventListener('focus', checkTouch);
    
    return () => window.removeEventListener('focus', checkTouch);
  }, []);

  return { isTouch };
};