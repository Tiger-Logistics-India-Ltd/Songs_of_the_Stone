import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { CHAPTER_THREE } from '../config/event';

/**
 * Upcoming Event Section (Home)
 *
 * Announces the next chapter — Amrita Kaur, Dusk to Dawn.
 * The supplied key art already carries the artist name and title, so nothing
 * is overlaid on it; the date, venue and CTA sit in an editorial band below.
 *
 * Landscape key art on desktop, portrait key art on mobile (the landscape
 * lock-up becomes unreadable below ~700px).
 */
const UpcomingEvent = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="ue-section" id="upcoming" ref={ref}>
      <motion.div
        className="ue-header"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="ue-label">{CHAPTER_THREE.chapter}</span>
        <h2 className="ue-heading">{CHAPTER_THREE.title}</h2>
      </motion.div>

      <motion.div
        className="ue-banner-wrap"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15 }}
      >
        <Link to="/third-chapter" className="ue-banner-link" aria-label="About the Event — Amrita Kaur, Dusk to Dawn">
          <picture>
            <source
              media="(max-width: 700px)"
              srcSet="/chapter_3/new_hero_poster_chapter_3.jpg"
            />
            <img
              src="/chapter_3/new_hero_poster_chap_3_landscape.jpeg"
              alt="Amrita Kaur — From Dusk to Dawn, Songs of the Stone by Inkpot India"
              className="ue-banner-img"
              width="1600"
              height="900"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </Link>
      </motion.div>

      <motion.div
        className="ue-meta"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="ue-meta-items">
          <div className="ue-meta-item">
            <span className="ue-meta-key">{CHAPTER_THREE.sunset.label}</span>
            <span className="ue-meta-val">
              {CHAPTER_THREE.sunset.date} &middot; {CHAPTER_THREE.sunset.time}
            </span>
          </div>
          <div className="ue-meta-item">
            <span className="ue-meta-key">{CHAPTER_THREE.sunrise.label}</span>
            <span className="ue-meta-val">
              {CHAPTER_THREE.sunrise.date} &middot; {CHAPTER_THREE.sunrise.time}
            </span>
          </div>
          <div className="ue-meta-item">
            <span className="ue-meta-key">Where</span>
            <span className="ue-meta-val">{CHAPTER_THREE.venue}</span>
          </div>
        </div>
      </motion.div>

      {/* Description sits under the meta row, with both actions beneath it */}
      <motion.div
        className="ue-description-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <h3 className="ue-description-heading">Description</h3>
        <p className="ue-description">
          Internationally acclaimed music sensation, Amrita Kaur, comes to Delhi for Chapter 3 of
          Songs of the Stone&mdash;a rare, sensory and contemplative musical experience set within one
          of the city&rsquo;s most evocative heritage spaces. Unfolding across two extraordinary
          moments at sunset and sunrise, it brings together two distinct concerts, each with its own
          setlist, mood and rhythm.
        </p>
        <div className="ue-actions">
          <a
            href={CHAPTER_THREE.ticketUrl}
            className="ue-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Tickets on District <span className="ue-cta-arrow" aria-hidden="true">&rarr;</span>
          </a>
          <Link to={CHAPTER_THREE.path} className="ue-cta ue-cta-ghost">
            Learn More About the Event <span className="ue-cta-arrow" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default UpcomingEvent;
