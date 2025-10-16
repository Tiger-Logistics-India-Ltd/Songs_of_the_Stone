import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FeaturedSections = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ 
    threshold: 0.1, 
    triggerOnce: true 
  });

  const categories = [
    {
      id: 'architecture',
      title: 'Architecture',
      image: '/new_feature1.jpeg',
      link: '/about'
    },
    {
      id: 'music',
      title: 'Cultural Heritage',
      image: '/new_feature2.jpeg',
      link: '#events'
    },
    {
      id: 'performance',
      title: 'Classical Music',
      image: '/Images/Mobile/Songs_of_the_stone_600x400 px.svg',
      link: '#events'
    },
    {
      id: 'heritage',
      title: 'Cultural Heritage',
      image: '/Feature_4.png',
      link: '/about'
    }
  ];

  const handleClick = (link) => {
    if (link.startsWith('#')) {
      const section = document.querySelector(link);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(link);
    }
  };

  return (
    <section className="obeetee-category-section" ref={ref}>
      {/* Heading Section */}
      <motion.div 
        className="obeetee-heading"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h3 className="obeetee-subtitle">EXPLORE OUR WORLD</h3>
        <h2 className="obeetee-title">Reimagining India's Cultural Soul </h2>
        <p className="obeetee-description">Art, Architecture, and Performance in dialogue with time</p>
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
              onClick={() => handleClick(category.link)}
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
