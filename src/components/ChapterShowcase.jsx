import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const chapters = [
  {
    id: 1,
    label: 'The First Chapter',
    image: '/press/9.png',
    video: '/Homepage/Chapter_1_&_2/chapter_1_video.mp4',
    title: 'The Mehtab Ali Niazi Experience',
    subtitle: 'A Classical Rhapsody',
    date: '13 December 2025 · Qutub Minar',
    link: '/first-chapter',
    cta: 'Explore Chapter One',
  },
  {
    id: 2,
    label: 'The Second Chapter',
    image: '/chapter_one/finalhero.jpg',
    video: '/Homepage/Chapter_1_&_2/chapter_2_video.mp4',
    title: 'Live the Legacy',
    subtitle: 'Rakesh Chaurasia & RAF — The Legend Ensemble',
    date: '8 March 2026 · Qutub Minar',
    link: '/second-chapter',
    cta: 'Explore Chapter Two',
  },
];

const ChapterShowcase = () => {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  return (
    <section className="chapter-showcase" id="chapters" ref={ref}>
      <div className="chapter-showcase-header">
        <motion.span
          className="chapter-showcase-label"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
        EXPERIENCES
        </motion.span>
        <motion.h2
          className="chapter-showcase-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Previous Chapters
        </motion.h2>
      </div>

      <div className="chapter-showcase-grid">
        {chapters.map((chapter, i) => (
          <motion.div
            key={chapter.id}
            className="chapter-showcase-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 + i * 0.15 }}
          >
            <Link to={chapter.link} className="chapter-card-link-wrap">
              <div className="chapter-card-image-wrap">
                {chapter.video ? (
                  <video
                    src={chapter.video}
                    className="chapter-card-image"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={chapter.image}
                  />
                ) : (
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="chapter-card-image"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="chapter-card-content">
                <span className="chapter-card-label">{chapter.label}</span>
                <h3 className="chapter-card-title">{chapter.title}</h3>
                <p className="chapter-card-subtitle">{chapter.subtitle}</p>
                <span className="chapter-card-date">{chapter.date}</span>
                <span className="chapter-card-cta">
                  {chapter.cta} <span className="chapter-cta-arrow">→</span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ChapterShowcase;
