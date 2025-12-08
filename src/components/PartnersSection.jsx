import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PartnersSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  // Desktop: all SVG | Mobile: mixed SVG/WebP for better quality
  const partners = [
    { id: 1, name: 'ARC', desktop: '/partner/arc.svg', mobile: '/partner/arc.svg' },
    { id: 2, name: 'Delhi Tourism', desktop: '/partner/delhi.svg', mobile: '/partner/delhi.webp' },
    { id: 3, name: 'Max', desktop: '/partner/max.svg', mobile: '/partner/max.webp' },
    { id: 4, name: 'Stanford', desktop: '/partner/stanford.svg', mobile: '/partner/stanford.webp' },
    { id: 5, name: 'Hyder', desktop: '/partner/hyder.svg', mobile: '/partner/hyder.svg' },
    { id: 6, name: 'Jaipur Rugs', desktop: '/partner/jaipurrugs.svg', mobile: '/partner/jaipurrugs.webp' },
    { id: 7, name: 'Aava', desktop: '/partner/aava.svg', mobile: '/partner/aava.svg' },
    { id: 8, name: 'Aanyna', desktop: '/partner/aanyna.svg', mobile: '/partner/aanyna.svg' }
  ];

  // Triple partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="partners-section" ref={ref}>
      <motion.div 
        className="partners-container"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h3 className="partners-heading">In Partnership With</h3>
        
        <div className="partners-scroll-wrapper">
          <motion.div 
            className="partners-grid partners-grid-auto-scroll"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={`${partner.id}-${index}`}
                className="partner-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + (index % partners.length) * 0.1 }}
              >
                <picture>
                  <source media="(max-width: 768px)" srcSet={partner.mobile} />
                  <source media="(min-width: 769px)" srcSet={partner.desktop} />
                  <img
                    src={partner.desktop}
                    alt={partner.name}
                    className="partner-logo"
                    loading="lazy"
                  />
                </picture>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default PartnersSection;