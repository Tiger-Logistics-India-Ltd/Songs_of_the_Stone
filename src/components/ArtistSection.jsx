import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const artists = [
  { name: 'Amrita Kaur',       role: 'Vocalist',           image: '/chapter_3/gallery/potrait/66.png' },
  { name: 'Rakesh Chaurasia',  role: 'Flautist',           image: '/Artist/Rakesh Chaurasia.png' },
  { name: 'Sanjoy Das',        role: 'Guitarist',          image: '/Artist/Sanjoy Das.png' },
  { name: 'Gino Banks',        role: 'Drummer',            image: '/Artist/Gino Banks.png' },
  { name: 'Satyajit Talwalkar',role: 'Tabla',              image: '/Artist/Satyajit Talwalkar.png' },
  { name: "Sheldon D'silva",   role: 'Bassist',            image: "/Artist/Shelodon D'silva.png" },
  { name: 'Sangeet Haldipur',  role: 'Vocalist & Composer',image: '/Artist/Sangeet Haldipur.png' },
  { name: 'Mehtab Ali Niazi',  role: 'Sitar',              image: '/Artist/Mehtab Ali Niazi.png' },
];

const getBatch = () => {
  if (typeof window === 'undefined') return 5;
  if (window.innerWidth <= 900) return 1;
  if (window.innerWidth <= 1024) return 3;
  return 5;
};

const ArtistSection = () => {
  const [offset, setOffset]   = useState(0);
  const [batch,  setBatch]    = useState(getBatch);
  const [paused, setPaused]   = useState(false);
  const [dir,    setDir]      = useState(1);   // 1 = forward, -1 = backward
  const { ref: sectionRef, inView } = useInView({ threshold: 0.08, triggerOnce: true });

  const n = artists.length;

  useEffect(() => {
    const handler = () => setBatch(getBatch());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    const ms = batch === 1 ? 5000 : 3500;
    const id = setInterval(() => {
      setDir(1);
      setOffset(o => (o + 1) % n);
    }, ms);
    return () => clearInterval(id);
  }, [inView, paused, n, batch]);

  const advance = () => { setDir(1);  setOffset(o => (o + 1) % n); };
  const retreat = () => { setDir(-1); setOffset(o => (o - 1 + n) % n); };

  const visible = Array.from({ length: batch }, (_, i) => artists[(offset + i) % n]);
  const isMobile = batch === 1;

  return (
    <section className="artist-section" id="artists" ref={sectionRef}>
      <div className="artist-section-header">
        <motion.span
          className="artist-label"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          THE ENSEMBLE
        </motion.span>
        <motion.h2
          className="artist-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Artists
        </motion.h2>
      </div>

      <motion.div
        className={`artist-carousel-wrap${isMobile ? ' artist-carousel-wrap--mobile' : ''}`}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Prev arrow — always visible (partner-style) */}
        <button className="artist-arrow artist-arrow--prev" onClick={retreat} aria-label="Previous artists">
          ‹
        </button>

        {isMobile ? (
          /* ── Mobile: single card with slide ── */
          <div className="artist-mobile-single">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={offset}
                className="artist-card"
                custom={dir}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 70 }),
                  center: { opacity: 1, x: 0 },
                  exit:  (d) => ({ opacity: 0, x: d * -70 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="artist-image-wrap">
                  <img src={artists[offset].image} alt={artists[offset].name} className="artist-image" loading="lazy" />
                </div>
                <div className="artist-info">
                  <h3 className="artist-name">{artists[offset].name}</h3>
                  <span className="artist-role">{artists[offset].role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* ── Desktop: multi-card track ── */
          <div className="artist-carousel-track">
            {visible.map((artist, i) => (
              <div key={i} className="artist-card">
                <div className="artist-image-wrap">
                  <img src={artist.image} alt={artist.name} className="artist-image" loading="lazy" />
                </div>
                <div className="artist-info">
                  <h3 className="artist-name">{artist.name}</h3>
                  <span className="artist-role">{artist.role}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Next arrow — always visible (partner-style) */}
        <button className="artist-arrow artist-arrow--next" onClick={advance} aria-label="Next artists">
          ›
        </button>
      </motion.div>

      {/* Dots */}
      <motion.div
        className="artist-dots"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {artists.map((_, i) => (
          <button
            key={i}
            className={`artist-dot${i === offset ? ' artist-dot--active' : ''}`}
            onClick={() => { setDir(i > offset ? 1 : -1); setOffset(i); }}
            aria-label={`Go to artist ${i + 1}`}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default ArtistSection;


