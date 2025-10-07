import React from 'react';
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
            Reimagining India's <em className="italic-text">Cultural Soul</em><br />
            Art, Architecture, and Performance in <em className="italic-text">dialogue with time</em>
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