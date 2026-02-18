import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

/**
 * GalleryVideoSection — Premium editorial redesign
 * Swiss-minimal masonry grid + cinematic video embed
 * Pure CSS Grid · Native IntersectionObserver · Zero extra deps
 */

/* ── Gallery data ─────────────────────────────── */
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
const IMAGES_PER_PAGE_MOBILE = 3;

/* Desktop: single consistent 12-col grid layout — tall center pillar on every page */
const desktopPattern = [
  { gridColumn: '1 / 5',  gridRow: '1 / 2' },   // top-left
  { gridColumn: '5 / 9',  gridRow: '1 / 3' },   // center (tall, spans both rows)
  { gridColumn: '9 / 13', gridRow: '1 / 2' },   // top-right
  { gridColumn: '1 / 5',  gridRow: '2 / 3' },   // bottom-left
  { gridColumn: '9 / 13', gridRow: '2 / 3' },   // bottom-right
];

/* Mobile: pattern is ignored — CSS overrides to auto-flow single column */
const mobilePattern = [
  { gridColumn: 'auto' }, { gridColumn: 'auto' }, { gridColumn: 'auto' },
];

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

/* ── Component ────────────────────────────────── */
const GalleryVideoSection = () => {
  const playerRef       = useRef(null);
  const galleryGridRef  = useRef(null);
  const tileRefs        = useRef([]);
  const videoSectionRef = useRef(null);

  const [isPlaying,         setIsPlaying]         = useState(true);
  const [isMuted,           setIsMuted]           = useState(false);
  const [showUnmuteOverlay, setShowUnmuteOverlay] = useState(false);
  const [currentPage,       setCurrentPage]       = useState(0);
  const [gridVisible,       setGridVisible]       = useState(true);

  const isMobile = useIsMobile();
  const perPage  = isMobile ? IMAGES_PER_PAGE_MOBILE : IMAGES_PER_PAGE_DESKTOP;
  const pattern  = isMobile ? mobilePattern : desktopPattern;

  const totalPages     = Math.ceil(galleryImages.length / perPage);
  const currentImages  = useMemo(() =>
    galleryImages.slice(
      currentPage * perPage,
      (currentPage + 1) * perPage
    ),
    [currentPage, perPage]
  );

  // Reset page if switching breakpoint pushes currentPage out of range
  useEffect(() => {
    if (currentPage >= totalPages) setCurrentPage(0);
  }, [totalPages, currentPage]);

  /* ── YouTube IFrame API ───────────────────── */
  useEffect(() => {
    if (window.YT && window.YT.Player) { initPlayer(); return; }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const first = document.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(tag, first);
    window.onYouTubeIframeAPIReady = () => initPlayer();

    function initPlayer() {
      playerRef.current = new window.YT.Player('home-youtube-player', {
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
          onStateChange: (e) =>
            setIsPlaying(e.data === window.YT.PlayerState.PLAYING),
        },
      });
    }
    return () => { window.onYouTubeIframeAPIReady = null; };
  }, []);

  /* ── Video controls ───────────────────────── */
  const skipForward = () => {
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

  /* ── Pagination (fade-out → swap → fade-in) ─ */
  const goToPage = useCallback((page) => {
    if (page < 0 || page >= totalPages || page === currentPage) return;
    setGridVisible(false);
    setTimeout(() => { setCurrentPage(page); setGridVisible(true); }, 500);
  }, [currentPage, totalPages]);

  /* ── IntersectionObserver — tile scroll reveal  */
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

  /* ── IntersectionObserver — video section reveal */
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

  /* ── Render ───────────────────────────────── */
  return (
    <>
      {/* ═══ VIDEO SECTION ═══ */}
      <section className="gvs-video-section" ref={videoSectionRef}>
        <div className="gvs-container">
          <div className="gvs-section-header">
            <span className="gvs-label">After Film</span>
            <h2 className="gvs-title">The First Chapter</h2>
          </div>

          <div className="gvs-video-frame">
            <div className="gvs-video-embed">
              <div id="home-youtube-player"></div>
            </div>

            {/* {showUnmuteOverlay && (
              <button className="gvs-unmute-pill" onClick={handleUnmute} type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>
                </svg>
                <span>Tap to unmute</span>
              </button>
            )} */}
          </div>

          {/* Minimal controls */}
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

      {/* ═══ GALLERY SECTION ═══ */}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="gvs-pagination" aria-label="Gallery pagination">
              <button
                className="gvs-page-arrow"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                aria-label="Previous page"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="9,6 15,12 9,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </button>
            </nav>
          )}
        </div>
      </section>
    </>
  );
};

export default GalleryVideoSection;
