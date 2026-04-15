import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ContactSection from '../components/ContactSection';

/* ── Gallery data (After Film + Gallery section — from GalleryVideoSection) ── */
const galleryImages = [
  { src: '/chapter_one/Chapter%201/1.png',  title: 'Opening Night' },
  { src: '/chapter_one/Chapter%201/desktop_potrait/stage.png', mobileSrc: '/chapter_one/Chapter%201/mobile_landscape/1.png', title: 'The Stage' },
  { src: '/chapter_one/Chapter%201/2.png',  title: 'First Light' },
  { src: '/chapter_one/Chapter%201/desktop_landscape/mehtab.png', title: 'Artist' },
  { src: '/chapter_one/Chapter%201/6.png', title: 'In Conversation' },
  { src: '/chapter_one/Chapter%201/7.png',  title: 'Opening Night' },
  { src: '/chapter_one/Chapter%201/9.png',  title: 'The Stage' },
  { src: '/chapter_one/Chapter%201/8.png',  title: 'First Light' },
  { src: '/chapter_one/Chapter%201/10.png', title: 'Behind the Curtain' },
  { src: '/chapter_one/Chapter%201/11.png', title: 'In Conversation' },
  { src: '/chapter_one/Chapter%201/12.png', title: 'The Audience' },
  { src: '/chapter_one/Chapter%201/13.png', title: 'On Display' },
  { src: '/chapter_one/Chapter%201/14.png', title: 'Evening Gala' },
  { src: '/chapter_one/Chapter%201/15.png', title: 'Expressions' },
  { src: '/chapter_one/Chapter%201/desktop_landscape/Sofa.png', title: 'Dialogue' },
  { src: '/chapter_one/Chapter%201/17.png', title: 'Standing Ovation' },
  { src: '/chapter_one/Chapter%201/18.png', title: 'Curtain Call' },
  { src: '/chapter_one/Chapter%201/19.png', title: 'The Gathering' },
  { src: '/chapter_one/Chapter%201/20.png', title: 'Final Act' },
  { src: '/chapter_one/Chapter%201/21.png', title: 'Encore' },
];

const IMAGES_PER_PAGE_DESKTOP = 5;
const IMAGES_PER_PAGE_MOBILE  = 3;

const desktopPattern = [
  { gridColumn: '1 / 5',  gridRow: '1 / 2' },
  { gridColumn: '5 / 9',  gridRow: '1 / 3' },
  { gridColumn: '9 / 13', gridRow: '1 / 2' },
  { gridColumn: '1 / 5',  gridRow: '2 / 3' },
  { gridColumn: '9 / 13', gridRow: '2 / 3' },
];

const mobilePattern = [
  { gridColumn: 'auto' }, { gridColumn: 'auto' }, { gridColumn: 'auto' },
];



/* ── Partners data (inlined from PartnersSection — same design, independent code) ── */
const fc1Partners = [
  { id: 1,  name: 'ARC',          desktop: '/partner/arc.svg',         mobile: '/partner/arc.svg' },
  { id: 2,  name: 'Delhi Tourism', desktop: '/partner/delhi.svg',        mobile: '/partner/delhi.webp' },
  { id: 3,  name: 'Max',           desktop: '/partner/max.svg',          mobile: '/partner/max.webp' },
  { id: 4,  name: 'Stanford',      desktop: '/partner/stanford.svg',     mobile: '/partner/stanford.webp' },
  { id: 5,  name: 'Hyder',         desktop: '/partner/hyder.svg',        mobile: '/partner/hyder.svg' },
  { id: 6,  name: 'Jaipur Rugs',   desktop: '/partner/jaipurrugs.svg',   mobile: '/partner/jaipurrugs.webp' },
  { id: 7,  name: 'Aava',          desktop: '/partner/aava.svg',         mobile: '/partner/aava.webp' },
  { id: 8,  name: 'Aanyna',        desktop: '/partner/aanyna.svg',       mobile: '/partner/aanyna.webp' },
  { id: 9,  name: 'Olaf',          desktop: '/partner/olaf_svg.svg',     mobile: '/partner/olaf_svg.svg' },
  { id: 10, name: 'Alegro',        desktop: '/partner/alegro.svg',       mobile: '/partner/alegro.svg' },
];

/* ── useIsMobile hook (inlined from GalleryVideoSection) ── */
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

/* ── Editorial image grid — 5-cell data ── */
const editGridCells = [
  { images: ['/chapter_one/Chapter%201/1.png',  '/chapter_one/Chapter%201/4.png',  '/chapter_one/Chapter%201/5.png']  },
  { images: ['/chapter_one/Chapter%201/2.png',  '/chapter_one/Chapter%201/6.png',  '/chapter_one/Chapter%201/3.png']  },
  { images: ['/chapter_one/Chapter%201/3.png',  '/chapter_one/Chapter%201/8.png',  '/chapter_one/Chapter%201/9.png']  },
  { images: ['/chapter_one/Chapter%201/10.png', '/chapter_one/Chapter%201/11.png', '/chapter_one/Chapter%201/12.png'] },
  { images: ['/chapter_one/Chapter%201/13.png', '/chapter_one/Chapter%201/14.png', '/chapter_one/Chapter%201/15.png'] },
];

const FirstChapter = () => {
  /* ── YouTube player (After Film) ─────────────────────────── */
  const playerRef       = useRef(null);
  const galleryGridRef  = useRef(null);
  const tileRefs        = useRef([]);
  const videoSectionRef = useRef(null);

  const [isPlaying,         setIsPlaying]         = useState(true);
  const [isMuted,           setIsMuted]           = useState(false);
  const [showUnmuteOverlay, setShowUnmuteOverlay] = useState(false);

  /* ── Gallery pagination ───────────────────────────────────── */
  const [currentPage, setCurrentPage] = useState(0);
  const [gridVisible, setGridVisible] = useState(true);

  const isMobile = useIsMobile();
  const perPage  = isMobile ? IMAGES_PER_PAGE_MOBILE : IMAGES_PER_PAGE_DESKTOP;
  const pattern  = isMobile ? mobilePattern : desktopPattern;

  const totalPages    = Math.ceil(galleryImages.length / perPage);
  const currentImages = useMemo(
    () => galleryImages.slice(currentPage * perPage, (currentPage + 1) * perPage),
    [currentPage, perPage]
  );

  useEffect(() => {
    if (currentPage >= totalPages) setCurrentPage(0);
  }, [totalPages, currentPage]);

  /* ── Partners scroll ref ─────────────────────────────────── */
  const partnersScrollRef = useRef(null);
  const { ref: partnersRef, inView: partnersInView } = useInView({ threshold: 0.3, triggerOnce: true });

  /* ── Artist sections ─────────────────────────────────────── */
  const { ref: biographyRef, inView: biographyInView } = useInView({ threshold: 0.1, triggerOnce: true });


  const { ref: fcEventsRef, inView: fcEventsInView } = useInView({ threshold: 0.1,  triggerOnce: true });

  /* ── Animation variants ──────────────────────────────────── */
  const fadeInUp = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  /* ── Partners scroll handlers ────────────────────────────── */
  const partnersScrollLeft  = () => partnersScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const partnersScrollRight = () => partnersScrollRef.current?.scrollBy({ left:  200, behavior: 'smooth' });

  /* ── Scroll to top on mount ──────────────────────────────── */
  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* ── YouTube IFrame API (from GalleryVideoSection) ───────── */
  useEffect(() => {
    const sectionEl = videoSectionRef.current;
    if (!sectionEl) return;

    let playerCreated = false;

    function initPlayer() {
      if (playerCreated) return;
      playerCreated = true;

      playerRef.current = new window.YT.Player('fc1-youtube-player', {
        videoId: 'HxaNbvC4NhM',
        playerVars: {
          autoplay: 1, mute: 0, loop: 1,
          playlist: 'HxaNbvC4NhM',
          controls: 1, modestbranding: 1,
          rel: 0, playsinline: 1,
        },
        events: {
          onReady: (e) => {
            e.target.playVideo();
            setTimeout(() => {
              if (e.target.getPlayerState?.() !== window.YT.PlayerState.PLAYING) {
                e.target.mute();
                setIsMuted(true);
                setShowUnmuteOverlay(true);
                e.target.playVideo();
              }
            }, 1500);
          },
          onStateChange: (e) => setIsPlaying(e.data === window.YT.PlayerState.PLAYING),
        },
      });
    }

    function loadAndInit() {
      if (window.YT && window.YT.Player) { initPlayer(); return; }
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(tag, first);
      window.onYouTubeIframeAPIReady = () => initPlayer();
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadAndInit();
          obs.unobserve(sectionEl);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(sectionEl);

    return () => {
      obs.disconnect();
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  /* ── Video controls ──────────────────────────────────────── */
  const skipForward  = () => {
    if (playerRef.current?.getCurrentTime)
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10, true);
  };
  const skipBackward = () => {
    if (playerRef.current?.getCurrentTime)
      playerRef.current.seekTo(Math.max(0, playerRef.current.getCurrentTime() - 10), true);
  };
  const handleUnmute = () => {
    if (!playerRef.current) return;
    playerRef.current.unMute();
    playerRef.current.setVolume(100);
    setIsMuted(false);
    setShowUnmuteOverlay(false);
  };
  const toggleMute = () => {
    if (!playerRef.current) return;
    if (playerRef.current.isMuted()) {
      playerRef.current.unMute(); setIsMuted(false); setShowUnmuteOverlay(false);
    } else {
      playerRef.current.mute(); setIsMuted(true);
    }
  };
  const togglePlayPause = () => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  /* ── Gallery pagination ──────────────────────────────────── */
  const goToPage = useCallback((page) => {
    if (page < 0 || page >= totalPages || page === currentPage) return;
    setGridVisible(false);
    setTimeout(() => { setCurrentPage(page); setGridVisible(true); }, 500);
  }, [currentPage, totalPages]);

  /* ── IntersectionObserver — tile scroll reveal ───────────── */
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

  /* ── IntersectionObserver — video section reveal ─────────── */
  useEffect(() => {
    const el = videoSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('gvs-video-revealed'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="first-chapter-page">
      {/* Hero Video Section */}
      <section className="fc-hero">
        <video
          className="fc-hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/chapter_one/Hero_first_chapter.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-text-overlay">
          <h1 className="hero-chapter-text">THE FIRST CHAPTER</h1>
          <p className="hero-date-text">13-12-2025</p>
        </div>
      </section>

      {/* Opening Text — featured-heading style (same as Home page) */}
      <section className="featured-category-section">
        <div className="featured-heading">
          <h3 className="featured-subtitle">IN DIALOGUE WITH TIME</h3>
          <h2 className="featured-title">Art. Architecture. Performance.</h2>
          <p className="featured-description">Songs of the Stone is Inkpot's journey into art, heritage, and the spaces between.</p>
        </div>
      </section>

      {/* ═══ WEBSITE BANNER ═══ */}
      <section className="fc-banner-section">
        <img
          src="/chapter_one/SOTS_Website Banner.png"
          alt="Songs of the Stone"
          className="fc-banner-img"
          loading="lazy"
        />
      </section>

      {/* ═══ EVENTS — First Chapter ═══ */}
      <section id="fc-events" className="events" ref={fcEventsRef}>
        <div className="container">
          <div className="events-content">
            <div className="events-grid">
              {/* Event Details */}
              <div className="event-details">
                <div className="event-category">The First Chapter</div>
                <h2 className="event-title">The Mehtab Ali Niazi Experience</h2>
                <h3 className="event-subtitle">A Classical Rhapsody</h3>
                <div className="event-date-time">
                  <span className="event-date">
                    13<sup>th</sup> December 2025
                  </span>
                  <div className="event-location"><span className="event-location-text">Qutub Minar, Delhi</span></div>
                </div>
                <p className="event-description">
                  An evening of extraordinary resonance unfolded at the Qutub Minar, as Mehtab Ali Niazi and his ensemble brought together the classical and the contemporary in a performance that will long be remembered.
                </p>
                <p className="event-description">
                  His semi-classical fusion — weaving raga with elements of jazz and modern soundscapes — wove an experience both timeless and alive, set against the breathtaking backdrop of a UNESCO World Heritage Site at dusk.
                </p>
              </div>

              {/* Event Poster Image */}
              <div className="event-video-container">
                <img
                  className="event-video"
                  src="/chapter_one/chapter_one_poster.png"
                  alt="The First Chapter — Event Poster"
                  loading="lazy"
                />
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* ═══ FC VIDEO BANNER ═══ */}
      <section className="fc-banner-section">
        <video
          className="fc-banner-img"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/chapter_one/videos/video_first_chapter.mp4" type="video/mp4" />
        </video>
      </section>



                  <section id="after-film" className="gvs-video-section" ref={videoSectionRef}>
        <div className="gvs-container">
          <div className="gvs-section-header">
            <span className="gvs-label">After Film</span>
            <h2 className="gvs-title">The First Chapter</h2>
          </div>

          <div className="gvs-video-frame">
            <div className="gvs-video-embed">
              <div id="fc1-youtube-player"></div>
            </div>
          </div>

          <div className="gvs-controls">
            <button className="gvs-ctrl-btn" onClick={skipBackward} aria-label="Rewind 10 seconds" type="button">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" fill="currentColor"/>
                <text x="9" y="14.5" fontSize="6" fill="currentColor" fontWeight="bold">10</text>
              </svg>
            </button>

            <button className="gvs-ctrl-btn gvs-ctrl-play" onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'} type="button">
              {isPlaying ? (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/>
                  <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
                </svg>
              )}
            </button>

            <button className="gvs-ctrl-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'} type="button">
              {isMuted ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
                </svg>
              )}
            </button>

            <button className="gvs-ctrl-btn" onClick={skipForward} aria-label="Forward 10 seconds" type="button">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" fill="currentColor"/>
                <text x="9" y="14.5" fontSize="6" fill="currentColor" fontWeight="bold">10</text>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ GALLERY — masonry grid + pagination (from GalleryVideoSection) ═══ */}
      <section className="gvs-gallery-section">
        <div className="gvs-container">
          <div className="gvs-section-header">
            <span className="gvs-label">Explore</span>
            <h2 className="gvs-title">Gallery</h2>
            <p className="gvs-subtitle">Some evenings ask nothing of us— only that we arrive, and stand still long enough to feel the moment fully as it gathers around us.</p>
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
                    src={isMobile && img.mobileSrc ? img.mobileSrc : img.src}
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

      {/* ═══ PARTNERS — inlined from PartnersSection (same design, independent code) ═══ */}
      <section className="partners-section" ref={partnersRef}>
        <motion.div
          className="partners-container"
          initial={{ opacity: 0, y: 30 }}
          animate={partnersInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="partners-heading">Partners - First Chapter</h3>

          <div className="partners-scroll-container">
            <button
              className="partners-scroll-btn partners-scroll-btn-left"
              onClick={partnersScrollLeft}
              aria-label="Scroll left"
            >
              ‹
            </button>

            <div className="partners-scroll-wrapper" ref={partnersScrollRef}>
              <motion.div
                className="partners-grid"
                initial={{ opacity: 0 }}
                animate={partnersInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {fc1Partners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    className="partner-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={partnersInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
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

            <button
              className="partners-scroll-btn partners-scroll-btn-right"
              onClick={partnersScrollRight}
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </motion.div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <ContactSection />

    </div>
  );
};

export default FirstChapter;
