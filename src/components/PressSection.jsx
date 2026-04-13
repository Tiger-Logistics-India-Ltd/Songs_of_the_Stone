import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const featuredPress = [
  {
    id: 1,
    image: '/press/1.png',
    publication: 'Condé Nast Traveller',
    title: 'How Delhi\'s heritage sites are serving modern culture',
    url: 'https://www.cntraveller.in/story/how-delhis-heritage-sites-are-serving-modern-culture/'
  },
  {
    id: 5,
    image: '/press/5.png',
    publication: 'PTI',
    title: "Flautist Rakesh Chaurasia to perform at 2nd 'Songs of the Stone' at Qutub Minar",
    url: 'https://www.ptinews.com/story/national/flautist-rakesh-chaurasia-to-perform-at-2nd-songs-of-the-stone-at-qutub-minar/3431546'
  },
  {
    id: 6,
    image: '/press/6.png',
    publication: 'The Wire',
    title: 'A Saga of Sound, Space and Story Brings the Qutub Minar into a New Cultural Conversation',
    url: 'https://thewire.in/ptiprnews/songs-of-the-stone-a-saga-of-sound-space-and-story-brings-the-qutub-minar-into-a-new-cultural-conversation'
  }
];

const PressSection = () => {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section className="press-section" id="press" ref={ref}>
      <div className="press-section-header">
        <motion.span
          className="press-label"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          In the News
        </motion.span>
        <motion.h2
          className="press-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Press
        </motion.h2>
      </div>

      <div className="press-grid">
        {featuredPress.map((item, i) => (
          <motion.a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="press-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 + i * 0.1 }}
          >
            <div className="press-card-image-wrap">
              <img src={item.image} alt={item.title} className="press-card-image" loading="lazy" />
            </div>
            <div className="press-card-content">
              <span className="press-card-publication">{item.publication}</span>
              <h3 className="press-card-title">{item.title}</h3>
              <span className="press-card-readmore">
                Read Article <span className="press-readmore-arrow">→</span>
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        className="press-view-all-wrap"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link to="/press" className="press-view-all-btn">
          <span>View All Press →</span>
        </Link>
      </motion.div>
    </section>
  );
};

export default PressSection;
