import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Hero Section Component
 * 
 * Features:
 * - Full-screen hero section with background image
 * - Animated text elements with staggered entrance effects
 * - Mobile-responsive typography and layout
 * - Overlay for better text readability
 */
const HeroSection = () => {
  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: i * 0.25, ease: 'easeOut' }
    })
  };

  // Refs for dynamic scaling to prevent cropping on ultra-small widths
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const heroScalerRef = useRef(null);

  useEffect(() => {
    function fitHeroLines() {
      if (!line1Ref.current || !line2Ref.current || !heroScalerRef.current) return;
      // Reset scale before measuring
      heroScalerRef.current.style.transform = 'scale(1)';
      heroScalerRef.current.style.transformOrigin = 'left bottom';
      const lines = [line1Ref.current, line2Ref.current];
      const ratios = lines.map(l => {
        const cw = l.clientWidth || 1;
        const sw = l.scrollWidth || 1;
        return sw / cw;
      });
      const maxRatio = Math.max(...ratios);
      if (maxRatio > 1.0001) {
        heroScalerRef.current.style.transform = `scale(${1 / maxRatio})`;
      }
    }
    fitHeroLines();
    window.addEventListener('resize', fitHeroLines);
    return () => window.removeEventListener('resize', fitHeroLines);
  }, []);

  return (
    <section id="home" className="hero hero-split">

      <div className="hero-inner">
        {/* Text Column */}
        <motion.div
          className="hero-text-col"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={0}
        >
          <motion.div
            className="hero-main-text hero-main-text-left"
            variants={textVariants}
            custom={0}
          >
              <div className="hero-text-scaler" ref={el => (heroScalerRef.current = el)}>
                <span ref={el => (line1Ref.current = el)} className="hero-line hero-line-1">Reimagining India's <em className="italic-text">Cultural Soul</em></span>
                <span ref={el => (line2Ref.current = el)} className="hero-line hero-line-2">Art, Architecture, and Performance in <em className="italic-text">dialogue with time</em></span>
              </div>
          </motion.div>
        </motion.div>

        {/* Image Column */}
        <div className="hero-image-col">
          <picture>
            <source media="(max-width: 767px)" srcSet="/Images/Mobile/hero.svg" type="image/svg+xml" />
            <source media="(min-width: 768px)" srcSet="/Images/desktop/Hero_1920x1800px.svg" type="image/svg+xml" />
            <img
              src="/Images/Mobile/hero.svg"
              alt="Song of the Stone – Architectural Heritage"
              className="hero-img-split"
              loading="priority"
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          </picture>
          <div className="hero-image-overlay" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;