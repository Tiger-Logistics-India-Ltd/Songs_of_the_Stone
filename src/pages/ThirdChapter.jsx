import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactSection from '../components/ContactSection';
import PartnersSection from '../components/PartnersSection';
import { CHAPTER_THREE } from '../config/event';

/**
 * Third Chapter Event Page — Amrita Kaur, Dusk to Dawn
 *
 * The event has concluded, so this page follows the same "after" structure
 * as the Second Chapter page:
 *
 * Sections:
 * 1. Hero video (shared with the home page)
 * 2. Opening text
 * 3. Edge-to-edge landscape image — dusk stage shot
 * 4. Event section (text left, key art right)
 * 4b. Edge-to-edge landscape image — dawn stage shot (bookends the event section)
 * 5. Gallery
 * 6. Partners — HSBC, Delhi Tourism, ASI
 * 7. Contact
 *
 * No After Film yet (no recap video available) — add a gvs-video-section
 * once one exists, matching SecondChapter.jsx's "AFTER FILM" block.
 */

/* ── Gallery data — Third Chapter ──
   Desktop: 4 landscape + 1 portrait per page (portrait in the tall middle slot),
   same layout as Second Chapter. Mobile: landscape only (portraits don't suit
   the fixed-height mobile grid). */
const tcGalleryImages = [
  // Page 1
  { src: '/chapter_3/gallery/42.png', title: 'Golden Hour' },
  { src: '/chapter_3/gallery/potrait/66.png', title: 'Dawn Recital' },
  { src: '/chapter_3/gallery/38.png', title: 'The Performance' },
  { src: '/chapter_3/gallery/39.png', title: 'An Evening Unfolds' },
  { src: '/chapter_3/gallery/40.png', title: 'Among the Ruins' },
  // Page 2
  { src: '/chapter_3/gallery/41.png', title: 'A Shared Evening' },
  { src: '/chapter_3/gallery/potrait/67.png', title: 'A Word Before the Song' },
  { src: '/chapter_3/gallery/37.png', title: 'In Full Voice' },
  { src: '/chapter_3/gallery/43.png', title: 'The Ensemble' },
  { src: '/chapter_3/gallery/44.png', title: 'Quiet Moments' },
  // Page 3
  { src: '/chapter_3/gallery/45.png', title: 'Lanterns at Dusk' },
  { src: '/chapter_3/gallery/potrait/68.png', title: 'Into the Evening' },
  { src: '/chapter_3/gallery/46.png', title: 'Echoes of Stone' },
  { src: '/chapter_3/gallery/47.png', title: 'Setting the Scene' },
  { src: '/chapter_3/gallery/48.png', title: 'Gathered Together' },
  // Page 4
  { src: '/chapter_3/gallery/49.png', title: 'At Purana Qila' },
  { src: '/chapter_3/gallery/potrait/69.png', title: 'Welcome to the Stage' },
  { src: '/chapter_3/gallery/50.png', title: 'Under the Canopy' },
  { src: '/chapter_3/gallery/51.png', title: 'As Night Falls' },
  { src: '/chapter_3/gallery/52.png', title: 'The Audience' },
];

const tcMobileGalleryImages = [
  { src: '/chapter_3/gallery/42.png', title: 'Golden Hour' },
  { src: '/chapter_3/gallery/38.png', title: 'The Performance' },
  { src: '/chapter_3/gallery/39.png', title: 'An Evening Unfolds' },
  { src: '/chapter_3/gallery/40.png', title: 'Among the Ruins' },
  { src: '/chapter_3/gallery/41.png', title: 'A Shared Evening' },
  { src: '/chapter_3/gallery/37.png', title: 'In Full Voice' },
  { src: '/chapter_3/gallery/43.png', title: 'The Ensemble' },
  { src: '/chapter_3/gallery/44.png', title: 'Quiet Moments' },
  { src: '/chapter_3/gallery/45.png', title: 'Lanterns at Dusk' },
  { src: '/chapter_3/gallery/46.png', title: 'Echoes of Stone' },
  { src: '/chapter_3/gallery/47.png', title: 'Setting the Scene' },
  { src: '/chapter_3/gallery/48.png', title: 'Gathered Together' },
  { src: '/chapter_3/gallery/49.png', title: 'At Purana Qila' },
  { src: '/chapter_3/gallery/50.png', title: 'Under the Canopy' },
  { src: '/chapter_3/gallery/51.png', title: 'As Night Falls' },
  { src: '/chapter_3/gallery/52.png', title: 'The Audience' },
];

const TC_PER_PAGE_DESKTOP = 5;
const TC_PER_PAGE_MOBILE  = 3;

/* 4 landscape (full-width slots) + 1 portrait (tall middle slot) per page */
const tcDesktopPattern = [
  { gridColumn: '1 / 5',  gridRow: '1 / 2' },
  { gridColumn: '5 / 9',  gridRow: '1 / 3' },
  { gridColumn: '9 / 13', gridRow: '1 / 2' },
  { gridColumn: '1 / 5',  gridRow: '2 / 3' },
  { gridColumn: '9 / 13', gridRow: '2 / 3' },
];

const tcMobilePattern = [
  { gridColumn: 'auto' }, { gridColumn: 'auto' }, { gridColumn: 'auto' },
];

const tcPartners = [
  { id: 1, name: 'HSBC', desktop: '/Chapter2/Partner/HSBC.png', mobile: '/Chapter2/Partner/HSBC.png' },
  { id: 2, name: 'Delhi Tourism', desktop: '/partner/delhi.svg', mobile: '/partner/delhi.webp' },
  { id: 3, name: 'Archaeological Survey of India', desktop: '/partner/arc.svg', mobile: '/partner/arc.webp' },
  { id: 4, name: 'Nabha Phulkari', desktop: '/chapter_3/partner/TLT_LOGO%20WHITE/11.png', mobile: '/chapter_3/partner/TLT_LOGO%20WHITE/11.png' },
  { id: 5, name: 'Pio', desktop: '/chapter_3/partner/TLT_LOGO%20WHITE/12.png', mobile: '/chapter_3/partner/TLT_LOGO%20WHITE/12.png' },
  { id: 6, name: 'Aava Natural Mineral Water', desktop: '/chapter_3/partner/TLT_LOGO%20WHITE/13.png', mobile: '/chapter_3/partner/TLT_LOGO%20WHITE/13.png' },
  { id: 7, name: 'House of Spade', desktop: '/chapter_3/partner/TLT_LOGO%20WHITE/14.png', mobile: '/chapter_3/partner/TLT_LOGO%20WHITE/14.png' },
  { id: 8, name: 'Mahesh Sharma', desktop: '/chapter_3/partner/TLT_LOGO%20WHITE/15.png', mobile: '/chapter_3/partner/TLT_LOGO%20WHITE/15.png' },
  { id: 9, name: 'YogShri Sound Healing Training & Research Institute', desktop: '/chapter_3/partner/TLT_LOGO%20WHITE/16.png', mobile: '/chapter_3/partner/TLT_LOGO%20WHITE/16.png' },
  { id: 10, name: 'House of Aurae', desktop: '/chapter_3/partner/TLT_LOGO%20WHITE/17.png', mobile: '/chapter_3/partner/TLT_LOGO%20WHITE/17.png' },
  { id: 11, name: 'Evolve - The Wellness Club', desktop: '/chapter_3/partner/TLT_LOGO%20WHITE/18.png', mobile: '/chapter_3/partner/TLT_LOGO%20WHITE/18.png' },
  { id: 12, name: 'Dialogues by Nirmals', desktop: '/chapter_3/partner/TLT_LOGO%20WHITE/19.png', mobile: '/chapter_3/partner/TLT_LOGO%20WHITE/19.png' },
  { id: 13, name: 'Parinaya Sutra Wedding Planners', desktop: '/chapter_3/partner/TLT_LOGO%20WHITE/20.png', mobile: '/chapter_3/partner/TLT_LOGO%20WHITE/20.png' },
  { id: 14, name: 'Le Meridien New Delhi', desktop: '/chapter_3/partner/TLT_LOGO%20WHITE/21.png', mobile: '/chapter_3/partner/TLT_LOGO%20WHITE/21.png' },
];

/* ── useIsMobile hook ── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

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

  // ========== GALLERY ==========
  const galleryGridRef = useRef(null);
  const tileRefs       = useRef([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [gridVisible, setGridVisible] = useState(true);

  const isMobile = useIsMobile();
  const galleryData = isMobile ? tcMobileGalleryImages : tcGalleryImages;
  const perPage      = isMobile ? TC_PER_PAGE_MOBILE : TC_PER_PAGE_DESKTOP;
  const pattern       = isMobile ? tcMobilePattern : tcDesktopPattern;

  const totalPages    = Math.ceil(galleryData.length / perPage);
  const currentImages = useMemo(
    () => galleryData.slice(currentPage * perPage, (currentPage + 1) * perPage),
    [currentPage, perPage, galleryData]
  );

  useEffect(() => {
    if (currentPage >= totalPages) setCurrentPage(0);
  }, [totalPages, currentPage]);

  const goToPage = useCallback((page) => {
    if (page < 0 || page >= totalPages || page === currentPage) return;
    setGridVisible(false);
    setTimeout(() => { setCurrentPage(page); setGridVisible(true); }, 500);
  }, [currentPage, totalPages]);

  /* IntersectionObserver — tile scroll reveal */
  useEffect(() => {
    const tiles = tileRefs.current.filter(Boolean);
    if (!tiles.length) return;
    tiles.forEach(t => t.classList.remove('gvs-tile-visible'));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const idx = tiles.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('gvs-tile-visible'), Math.max(0, idx) * 120);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );
    tiles.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, [currentPage, gridVisible]);

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
          <p className="hero-date-text">11 OCT 2026</p>
        </div>
      </section>

      {/* ========== 2. OPENING TEXT ========== */}
      <section className="featured-category-section">
        <div className="featured-heading">
          <h3 className="featured-subtitle">IN DIALOGUE WITH TIME</h3>
          <h2 className="featured-title">Art. Architecture. Performance.</h2>
          <p className="featured-description">Songs of the Stone is Inkpot's journey into art, heritage, and the spaces between.</p>
        </div>
      </section>

      {/* ========== 3. EDGE-TO-EDGE LANDSCAPE IMAGE — Dusk ========== */}
      <section className="sc-landscape-section">
        <motion.div
          className="sc-landscape-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src="/chapter_3/banner/8.png"
            alt="Amrita Kaur performing at dusk, Songs of the Stone Chapter 3"
            className="sc-landscape-image sc-no-crop"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* ========== 4. EVENT — details left, key art right ========== */}
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
                  Internationally acclaimed music sensation, Amrita Kaur, came to Delhi for
                  Chapter 3 of Songs of the Stone by Inkpot India&mdash;a rare, sensory and
                  contemplative musical experience set within one of the city&rsquo;s most evocative
                  heritage spaces.
                </p>
                <p className="event-description">
                  Unfolding across two extraordinary moments at sunset and sunrise, the experience
                  brought together two distinct concerts, inviting audiences to immerse themselves
                  in music, stillness and the changing moods of the sky.
                </p>
                <p className="event-description">
                  With two distinct moments&mdash;an atmospheric evening performance and a
                  contemplative morning experience, each with its own setlist, mood and rhythm,
                  the evening reimagined how Delhi experiences music, heritage and place.
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== 4b. EDGE-TO-EDGE LANDSCAPE IMAGE — Dawn ========== */}
      <section className="sc-landscape-section">
        <motion.div
          className="sc-landscape-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src="/chapter_3/banner/9.png"
            alt="Amrita Kaur performing at dawn, Songs of the Stone Chapter 3"
            className="sc-landscape-image sc-no-crop"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* ========== 5. GALLERY ========== */}
      <section className="gvs-gallery-section">
        <div className="gvs-container">
          <div className="gvs-section-header">
            <span className="gvs-label">Explore</span>
            <h2 className="gvs-title">Gallery</h2>
            <p className="gvs-subtitle">Two concerts, one night's turn from dusk to dawn&mdash;held here in the moments between.</p>
          </div>

          <div
            className={`gvs-grid ${gridVisible ? 'gvs-grid-enter' : 'gvs-grid-exit'}`}
            ref={galleryGridRef}
          >
            {currentImages.map((img, index) => {
              const placement = pattern[index];
              if (!placement) return null;
              return (
                <div
                  key={`p${currentPage}-t${index}`}
                  className="gvs-tile"
                  style={{ gridColumn: placement.gridColumn, gridRow: placement.gridRow }}
                  ref={el => { tileRefs.current[index] = el; }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="gvs-tile-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <nav className="gvs-pagination" aria-label="Gallery pagination">
              <button
                className="gvs-page-arrow"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                aria-label="Previous page"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polyline points="15,6 9,12 15,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </button>

              <div className="gvs-page-indicators">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`gvs-dot${i === currentPage ? ' gvs-dot-active' : ''}`}
                    onClick={() => goToPage(i)}
                    aria-label={`Page ${i + 1}`}
                    aria-current={i === currentPage ? 'page' : undefined}
                    type="button"
                  />
                ))}
              </div>

              <button
                className="gvs-page-arrow"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                aria-label="Next page"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polyline points="9,6 15,12 9,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </button>
            </nav>
          )}
        </div>
      </section>

      {/* ========== 6. PARTNERS ========== */}
      <PartnersSection partners={tcPartners} centered />

      {/* ========== 7. CONTACT ========== */}
      <ContactSection />
    </div>
  );
};

export default ThirdChapter;
