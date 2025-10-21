import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FeaturedSections = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const categories = [
    {
      id: 'architecture',
      title: 'Monumental Heritage',
      image: '/1.png'
    },
    {
      id: 'music',
      title: 'Cross-Over Classical',
      image: '/2.png'
    },
    {
      id: 'performance',
      title: 'Intimate Audience',
      image: '/3.png'
    },
    {
      id: 'heritage',
      title: 'After Dark Experience',
      image: '/4.png'
    }
  ];

  return (
    <section className="obeetee-category-section" ref={ref}>
      {/* Heading Section */}
      <motion.div 
        className="obeetee-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h3 className="obeetee-subtitle">IN DIALOGUE WITH TIME</h3>
        <h2 className="obeetee-title">Art. Architecture. Performance. </h2>
        <p className="obeetee-description">A Musical Evening at the Qutub Minar</p>
      </motion.div>

      {/* Category Grid */}
      <div className="obeetee-category-scroll-container">
        <motion.div 
          className="obeetee-category-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="obeetee-category-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="obeetee-card-image-wrapper">
                <img
                  src={category.image}
                  alt={category.title}
                  className="obeetee-card-image"
                  loading="lazy"
                />
              </div>
              <h4 className="obeetee-card-title">{category.title}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSections;
