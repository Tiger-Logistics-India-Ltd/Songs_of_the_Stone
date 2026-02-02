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
      image: '/SotS-518 (1).jpg.jpeg'
    },
    {
      id: 'performance',
      title: 'Intimate Audience',
      image: '/feature2.jpeg'
    },
    {
      id: 'heritage',
      title: 'After Dark Experience',
      image: '/feature_4.jpeg'
    }
  ];

  return (
    <section className="featured-category-section" ref={ref}>
      {/* Heading Section */}
      <motion.div 
        className="featured-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h3 className="featured-subtitle">IN DIALOGUE WITH TIME</h3>
        <h2 className="featured-title">Art. Architecture. Performance. </h2>
        <p className="featured-description">A Musical Evening at the Qutub Minar</p>
      </motion.div>

      {/* Category Grid */}
      <div className="featured-category-scroll-container">
        <motion.div 
          className="featured-category-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="featured-category-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="featured-card-image-wrapper">
                <img
                  src={category.image}
                  alt={category.title}
                  className="featured-card-image"
                  loading="lazy"
                />
              </div>
              <h4 className="featured-card-title">{category.title}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSections;
