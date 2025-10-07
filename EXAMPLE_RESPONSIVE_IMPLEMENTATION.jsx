// Example: HeroSection.jsx with Responsive Images
// This shows how the dual-image approach would work

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        {/* Responsive Image Implementation */}
        <picture>
          {/* Mobile images - loads on screens < 768px */}
          <source 
            media="(max-width: 767px)" 
            srcSet="/hero-mobile.webp" 
            type="image/webp" 
          />
          <source 
            media="(max-width: 767px)" 
            srcSet="/hero-mobile.jpg" 
            type="image/jpeg" 
          />
          
          {/* Desktop images - loads on screens >= 768px */}
          <source 
            srcSet="/hero-desktop.webp" 
            type="image/webp" 
          />
          <source 
            srcSet="/hero-desktop.jpg" 
            type="image/jpeg" 
          />
          
          {/* Fallback for older browsers */}
          <img 
            src="/hero-desktop.jpg" 
            alt="Songs of the Stone - Cultural Heritage Experience" 
            className="hero-img"
            loading="eager" // Hero image should load immediately
          />
        </picture>
        
        <div className="hero-overlay"></div>
      </div>

      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="hero-tagline">Experience Heritage</div>
        <h1 className="hero-title">Songs of the Stone</h1>
        <p className="hero-subtitle">
          Journey through timeless cultural traditions and discover the stories 
          carved in stone, sung in melodies, and woven into the fabric of heritage.
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;

/*
BENEFITS OF THIS APPROACH:

1. PERFORMANCE:
   - Mobile users get smaller, optimized images (300KB vs 800KB)
   - Desktop users get high-quality detailed images
   - Automatic format selection (WebP first, JPEG fallback)

2. USER EXPERIENCE:
   - Mobile gets banner-style landscape composition
   - Desktop gets detailed, immersive composition
   - Perfect fit for each screen orientation

3. CREATIVE CONTROL:
   - Graphics team can create completely different compositions
   - Mobile version can focus on key visual elements
   - Desktop version can include more intricate details

4. TECHNICAL BENEFITS:
   - Browser automatically selects appropriate image
   - Lazy loading support for non-hero images
   - SEO-friendly with proper alt tags
   - Future-proof with modern image formats
*/