import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * About Section Component
 * 
 * Features:
 * - Grid layout with text and image
 * - Scroll-triggered animations using Intersection Observer
 * - Mobile-responsive design with stacked layout
 * - Rich typography and visual hierarchy
 */
const AboutSection = () => {
  /**
   * Intersection Observer hook to trigger animations when section comes into view
   * - threshold: 0.1 means animate when 10% of element is visible
   * - triggerOnce: true means animation only happens once (performance optimization)
   */
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  /**
   * Animation variants for the about content
   * Creates a smooth fade-in and slide-up effect
   */
  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1, 
        delay: 0.2,
        ease: "easeOut" 
      }
    }
  };

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div 
          className="about-content"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <div className="about-grid">
            {/* Text Content Section */}
            <div className="about-text">
              <div className="about-tagline">Heritage Reimagined</div>
              
              <h2 className="about-title">
                Culture blooms where tradition meets innovation
              </h2>
              
              <p className="about-description">
                We curate immersive experiences that honor the past while speaking to contemporary hearts. 
                Every stone tells a story, every shadow holds wisdom, and every moment becomes a bridge 
                between ancient heritage and modern expression.
              </p>
              
              
            </div>
            
            {/* Image Section */}
            <div className="about-image">
              <img 
                src="/image.png" 
                alt="Heritage and Culture" 
                className="about-img"
                loading="lazy" // Lazy load for performance
              />
              
              {/* Decorative overlay for enhanced visual appeal */}
              <div className="about-image-overlay" aria-hidden="true">
                <div className="overlay-accent"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;