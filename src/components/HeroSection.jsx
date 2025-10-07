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


  /**
   * Animation variants for different text elements
   * These create staggered entrance effects for better visual impact
   */
  const textVariants = {
    // Initial state (hidden)
    hidden: { opacity: 0, y: 50 },
    // Visible state with custom transitions
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: i * 0.3, // Stagger delay based on element index
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="home" className="hero">
      {/* Background Image with Overlay */}
      <div className="hero-background">
        <img 
          src="/hero.png" 
          alt="Song of the Stone Heritage" 
          className="hero-img"
          loading="priority"
        />
        <div className="hero-overlay"></div>
      </div>
      
      {/* Main Hero Content Container */}
      <motion.div 
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={0}
      >
        <div className="hero-text">
          {/* Tagline - appears first */}
          <motion.div 
            className="hero-tagline"
            variants={textVariants}
            custom={0}
          >
            Stories carved in stone
          </motion.div>
          
          {/* Main Title - appears second */}
          <motion.h1 
            className="hero-title"
            variants={textVariants}
            custom={1}
          >
            SONG OF THE STONE
          </motion.h1>
          
          {/* Subtitle - appears last */}
          <motion.div 
            className="hero-subtitle"
            variants={textVariants}
            custom={2}
          >
            WHERE TRADITION BREATHES THROUGH MODERN RHYTHMS
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;