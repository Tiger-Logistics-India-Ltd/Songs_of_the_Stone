import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PartnersSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const partners = [
    { id: 1, name: 'ARC', logo: '/partner/arc.svg' },
    { id: 2, name: 'Delhi Tourism', logo: '/partner/delhi.svg' },
    { id: 3, name: 'Max', logo: '/partner/max.svg' },
    { id: 4, name: 'Stanford', logo: '/partner/stanford.svg' }
  ];

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
            className="partners-grid"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                className="partner-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="partner-logo"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default PartnersSection;
