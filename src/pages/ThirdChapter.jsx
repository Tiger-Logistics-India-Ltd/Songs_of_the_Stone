import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactSection from '../components/ContactSection';
import DuskToDawn from '../components/DuskToDawn';
import PartnersSection from '../components/PartnersSection';
import { CHAPTER_THREE } from '../config/event';

const tcPartners = [
  { id: 1, name: 'HSBC', desktop: '/Chapter2/Partner/HSBC.png', mobile: '/Chapter2/Partner/HSBC.png' },
  { id: 2, name: 'Delhi Tourism', desktop: '/partner/delhi.svg', mobile: '/partner/delhi.webp' },
  { id: 3, name: 'Archaeological Survey of India', desktop: '/partner/arc.svg', mobile: '/partner/arc.webp' },
];

/**
 * Third Chapter Event Page — Amrita Kaur, Dusk to Dawn
 *
 * Sections:
 * 1. Hero video (shared with the home page)
 * 2. Event — details left, portrait key art right (matches the other chapter pages)
 * 3. Dusk to Dawn — the two moments (Sunset / Sunrise)
 * 4. Terms and Conditions (event-specific)
 * 5. Partners — HSBC, Delhi Tourism, ASI
 * 6. Reserve an Experience form
 */

/* Event-specific terms — distinct from the site-wide Terms & Conditions page */
const eventTerms = [
  'Please carry a valid ID proof along with you.',
  'All ticket purchases are final and non-refundable. If an event is cancelled, you will receive a full refund. If an event is rescheduled, you may choose to retain your ticket for the rescheduled date or opt for a refund.',
  'Security procedures, including frisking, remain the right of the management.',
  'No dangerous or potentially hazardous objects including but not limited to weapons, knives, guns, fireworks, helmets, lazer devices, bottles and musical instruments will be allowed in the venue, and may be ejected with or without the owner from the venue.',
  'The sponsors / performers / organizers are not responsible for any injury or damage occurring due to the event. Any claims regarding the same would be settled in courts in Mumbai.',
  'People in an inebriated state may not be allowed entry.',
  'Organizers hold the right to deny late entry to the event.',
  'Venue rules apply.',
];

const ThirdChapter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ========== HERO VIDEO ==========
  const videoRef = useRef(null);

  // Parallax drift on the hero video
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force autoplay (mobile browsers need every one of these)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute('playsinline', 'playsinline');
    video.setAttribute('webkit-playsinline', 'webkit-playsinline');
    video.setAttribute('muted', 'muted');
    video.volume = 0;
    video.load();

    let cancelled = false;
    const forcePlay = async () => {
      if (cancelled) return;
      try {
        video.muted = true;
        video.volume = 0;
        await video.play();
      } catch {
        setTimeout(forcePlay, 50);
      }
    };
    forcePlay();

    const playOnReady = () => { if (video.paused) forcePlay(); };
    video.addEventListener('loadeddata', playOnReady);
    video.addEventListener('canplay', playOnReady);

    return () => {
      cancelled = true;
      video.removeEventListener('loadeddata', playOnReady);
      video.removeEventListener('canplay', playOnReady);
    };
  }, []);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, delay: 0.4, ease: 'easeOut' } },
  };

  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const [termsOpen, setTermsOpen] = useState(false);

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="third-chapter-page">
      {/* ========== 1. HERO VIDEO ========== */}
      <section id="tc-home" className="hero-featured">
        <video
          ref={videoRef}
          src="/Hero_Banner_Video/homapage.mp4"
          className="hero-featured-img"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          x-webkit-airplay="true"
        />
        <div className="hero-text-overlay">
          <h1 className="hero-chapter-text">THE THIRD CHAPTER</h1>
          <p className="hero-date-text">10&ndash;11 OCT 2026</p>
          <a
            href={CHAPTER_THREE.ticketUrl}
            className="hero-ticket-button"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Book tickets for ${CHAPTER_THREE.title}, ${CHAPTER_THREE.dateLong}`}
          >
            <span className="button-text">Book Tickets on District</span>
            <span className="button-arrow">→</span>
          </a>
        </div>
      </section>

      {/* ========== 2. EVENT — details left, key art right ========== */}
      <section id="tc-events" className="events" ref={aboutRef}>
        <div className="container">
          <motion.div
            className="events-content"
            initial="hidden"
            animate={aboutInView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
            }}
          >
            <div className="events-grid">
              <div className="event-details">
                <div className="event-category">{CHAPTER_THREE.chapter}</div>

                <h2 className="event-title">Live The Legacy</h2>

                <h3 className="event-subtitle">Amrita Kaur - From Dusk to Dawn</h3>

                <p className="event-description">
                  Internationally acclaimed music sensation, Amrita Kaur, is coming to Delhi for
                  Chapter 3 of Songs of the Stone by Inkpot India&mdash;a rare, sensory and
                  contemplative musical experience set within one of the city&rsquo;s most evocative
                  heritage spaces.
                </p>
                <p className="event-description">
                  Unfolding across two extraordinary moments at sunset and sunrise, the experience
                  will bring together two distinct concerts, inviting audiences to immerse themselves
                  in music, stillness and the changing moods of the sky.
                </p>
                <p className="event-description">
                  With two distinct moments&mdash;an atmospheric evening performance and a
                  contemplative morning experience, each with its own setlist, mood and rhythm, come
                  to reimagine how Delhi experiences music, heritage and place.
                </p>
              </div>

              <motion.div className="event-video-container" variants={imageVariants}>
                <img
                  className="event-video"
                  src="/chapter_3/new_hero_poster_chapter_3.jpg"
                  alt="Amrita Kaur — From Dusk to Dawn, a two-part live concert experience"
                  loading="lazy"
                />
              </motion.div>

              <div className="event-cta-section">
                <div className="event-cta">
                  <a
                    href={CHAPTER_THREE.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-btn"
                    aria-label={`Book tickets for ${CHAPTER_THREE.title}`}
                  >
                    Book Tickets on District
                  </a>
                  <a href="#contact" className="event-btn event-btn-ghost" onClick={scrollToContact}>
                    Register Your Interest
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== 3. DUSK TO DAWN ========== */}
      <DuskToDawn />

      {/* ========== 4. TERMS AND CONDITIONS ========== */}
      <section className="tc-terms">
        <div className="tc-terms-inner">
          <button
            type="button"
            className={`tc-terms-toggle${termsOpen ? ' tc-terms-open' : ''}`}
            onClick={() => setTermsOpen((open) => !open)}
            aria-expanded={termsOpen}
            aria-controls="tc-terms-panel"
          >
            <span className="tc-terms-heading">Terms and Conditions</span>
            <svg className="tc-terms-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            id="tc-terms-panel"
            className="tc-terms-panel"
            hidden={!termsOpen}
          >
            <ul className="tc-terms-list">
              {eventTerms.map((term, i) => (
                <li key={i}>{term}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========== 5. PARTNERS ========== */}
      <PartnersSection partners={tcPartners} centered />

      {/* ========== 6. RESERVE AN EXPERIENCE ========== */}
      <ContactSection
        tag="Reserve Your Place"
        heading="Register Your Interest"
        submitLabel="Submit"
        eventName={CHAPTER_THREE.title}
        description={
          <>
            Two concerts, one experience &mdash; at dusk on 10 October and at dawn on 11 October.
            Seating is limited and intimate by design.
            <br /><br />
            Share your details below and our team will get in touch to guide you through the next steps.
          </>
        }
      />
    </div>
  );
};

export default ThirdChapter;
