import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import PartnersSection from '../components/PartnersSection';

/**
 * Second Chapter Event Page
 * 
 * Sections:
 * 1. Hero Video Section
 * 2. Featured 4-Picture Grid
 * 3. Edge-to-Edge Landscape Image
 * 4. Event Section (Text & Image)
 * 5. Reserve Your Experience (Contact Form)
 */



const sc2Partners = [
  { id: 1,  name: 'ARC',          desktop: '/partner/arc.svg',             mobile: '/partner/arc.svg' },
  { id: 2,  name: 'Delhi Tourism', desktop: '/partner/delhi.svg',           mobile: '/partner/delhi.webp' },
  { id: 3,  name: 'HSBC',          desktop: '/Chapter2/Partner/HSBC.png',   mobile: '/Chapter2/Partner/HSBC.png' },
  { id: 4,  name: 'Cohoma',        desktop: '/Chapter2/Partner/Cohoma.png', mobile: '/Chapter2/Partner/Cohoma.png' },
  { id: 5,  name: 'Partner 6',     desktop: 'partner/7.png',   mobile: 'partner/7.png' },
  { id: 6,  name: 'Partner 7',     desktop: 'partner/8.png',   mobile: 'partner/8.png' },
  { id: 7,  name: 'Partner 8',     desktop: 'partner/9.png',   mobile: 'partner/9.png' },
  { id: 8,  name: 'Partner 9',     desktop: 'partner/10.png',  mobile: 'partner/10.png' },
  { id: 9,  name: 'Partner 10',    desktop: 'partner/11.png',  mobile: 'partner/11.png' },
  { id: 10, name: 'Partner 11',    desktop: 'partner/12.png',  mobile: 'partner/12.png' },
  { id: 11, name: 'Partner 12',    desktop: 'partner/13.png',  mobile: 'partner/13.png' },
  { id: 12, name: 'Partner 13',    desktop: 'partner/14.png',  mobile: 'partner/14.png' },
];

const SecondChapter = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ========== HERO SECTION ==========
  const videoRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  /* ── YouTube player (After Film) ─────────────────────────── */
  const sc2PlayerRef       = useRef(null);
  const sc2VideoSectionRef = useRef(null);
  const [isPlaying,         setIsPlaying]         = useState(true);
  const [isMuted,           setIsMuted]           = useState(false);
  const [showUnmuteOverlay, setShowUnmuteOverlay] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    const forcePlay = async () => {
      try {
        video.muted = true;
        video.volume = 0;
        await video.play();
      } catch (err) {
        setTimeout(() => forcePlay(), 50);
      }
    };

    forcePlay();

    const playOnReady = () => {
      if (video.paused) forcePlay();
    };

    video.addEventListener('loadedmetadata', playOnReady);
    video.addEventListener('loadeddata', playOnReady);
    video.addEventListener('canplay', playOnReady);
    video.addEventListener('canplaythrough', playOnReady);

    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) forcePlay();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleUserInteraction = () => {
      if (video.paused) forcePlay();
    };
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('click', handleUserInteraction, { once: true });

    return () => {
      video.removeEventListener('loadedmetadata', playOnReady);
      video.removeEventListener('loadeddata', playOnReady);
      video.removeEventListener('canplay', playOnReady);
      video.removeEventListener('canplaythrough', playOnReady);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  // ========== FEATURED SECTION ==========
  const { ref: featuredRef, inView: featuredInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const categories = [
    {
      id: 'Artist',
      title: '',
      image: '/Chapter2/chapter 2 page/feature images section/Rakesh_chusrisia.png'
    },
    {
      id: 'music',
      title: '',
      image: '/Chapter2/chapter 2 page/feature images section/second.jpeg'
    },
    {
      id: 'performance',
      title: '',
      image: '/Chapter2/chapter 2 page/feature images section/third.jpeg'
    },
    {
      id: 'heritage',
      title: '',
      image: '/Chapter2/chapter 2 page/feature images section/fourth.jpeg'
    }
  ];



  // ========== EVENTS SECTION ==========
  const { ref: eventsRef, inView: eventsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleEventRegistration = () => {
    const contactSection = document.getElementById('sc-contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2, delay: 0.4, ease: "easeOut" }
    }
  };

  // ========== CONTACT SECTION ==========
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState('idle');
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { ref: contactRef, inView: contactInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Please share your cultural interests';
    }
    
    return errors;
  };

  const saveToGoogleSheets = async (data) => {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzwGA3AYlRmdXU7q0iiGuDUQoaCem3XSAMyJyiGwJmahbBwHmOb_5wGaESs7dPfPCwGRw/exec';
    try {
      const fd = new FormData();
      fd.append('name',    data.name);
      fd.append('email',   data.email);
      fd.append('phone',   data.phone);
      fd.append('message', data.message);
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: fd });
    } catch (error) {
      console.error('Google Sheets Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormStatus('submitting');
    
    try {
      const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_name: 'Songs of the Stone Team'
      };
      
      await Promise.all([
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY),
        saveToGoogleSheets(formData),
      ]);
      
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setShowSuccessPopup(true);
      
      setTimeout(() => {
        setShowSuccessPopup(false);
        setFormStatus('idle');
      }, 4000);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.2, ease: "easeOut" }
    }
  };

  /* ── YouTube IFrame API ───────────────────────────────────── */
  useEffect(() => {
    if (window.YT && window.YT.Player) { initPlayer(); return; }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const first = document.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(tag, first);
    window.onYouTubeIframeAPIReady = () => initPlayer();

    function initPlayer() {
      sc2PlayerRef.current = new window.YT.Player('sc2-youtube-player', {
        videoId: 'PuX7U9ogybc',
        playerVars: {
          autoplay: 1, mute: 0, loop: 1,
          playlist: 'PuX7U9ogybc',
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
    return () => { window.onYouTubeIframeAPIReady = null; };
  }, []);

  /* ── Video section reveal ────────────────────────────────── */
  useEffect(() => {
    const el = sc2VideoSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('gvs-video-revealed'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Video controls ──────────────────────────────────────── */
  const skipForward  = () => {
    if (sc2PlayerRef.current?.getCurrentTime)
      sc2PlayerRef.current.seekTo(sc2PlayerRef.current.getCurrentTime() + 10, true);
  };
  const skipBackward = () => {
    if (sc2PlayerRef.current?.getCurrentTime)
      sc2PlayerRef.current.seekTo(Math.max(0, sc2PlayerRef.current.getCurrentTime() - 10), true);
  };
  const handleUnmute = () => {
    if (!sc2PlayerRef.current) return;
    sc2PlayerRef.current.unMute();
    sc2PlayerRef.current.setVolume(100);
    setIsMuted(false);
    setShowUnmuteOverlay(false);
  };
  const toggleMute = () => {
    if (!sc2PlayerRef.current) return;
    if (sc2PlayerRef.current.isMuted()) {
      sc2PlayerRef.current.unMute(); setIsMuted(false); setShowUnmuteOverlay(false);
    } else {
      sc2PlayerRef.current.mute(); setIsMuted(true);
    }
  };
  const togglePlayPause = () => {
    if (!sc2PlayerRef.current) return;
    isPlaying ? sc2PlayerRef.current.pauseVideo() : sc2PlayerRef.current.playVideo();
  };

  return (
    <div className="second-chapter-page">
      {/* ========== 1. HERO VIDEO SECTION ========== */}
      <section id="sc-home" className="hero-featured">
        <video
          ref={videoRef}
          src="/Hero_Banner_Video/homapage.mp4"
          className="hero-featured-img"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
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
          <h1 className="hero-chapter-text">THE SECOND CHAPTER</h1>
          <p className="hero-date-text">08-03-2026</p>
        </div>
      </section>

      {/* ========== 2. FEATURED 4-PICTURE GRID (commented out) ========== */}
      {false && (
      <section className="featured-category-section" ref={featuredRef}>
        <motion.div 
          className="featured-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={featuredInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="featured-subtitle">IN DIALOGUE WITH TIME</h3>
          <h2 className="featured-title">Art. Architecture. Performance.</h2>
          <p className="featured-description">A Musical Evening at the Qutub Minar</p>
        </motion.div>

        <div className="featured-category-scroll-container">
          <motion.div 
            className="featured-category-grid"
            initial={{ opacity: 0 }}
            animate={featuredInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="featured-category-card"
                initial={{ opacity: 0, y: 40 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : {}}
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
      )}

      {/* ========== OPENING TEXT ========== */}
      <section className="featured-category-section">
        <div className="featured-heading">
          <h3 className="featured-subtitle">IN DIALOGUE WITH TIME</h3>
          <h2 className="featured-title">Art. Architecture. Performance.</h2>
          <p className="featured-description">Songs of the Stone is Inkpot's journey into art, heritage, and the spaces between.</p>
        </div>
      </section>

      {/* ========== 3. EDGE-TO-EDGE LANDSCAPE IMAGE ========== */}
      <section className="sc-landscape-section">
        <motion.div 
          className="sc-landscape-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src="/Chapter2/chapter 2 page/SOTS_Website (1).png"
            alt="Event Landscape"
            className="sc-landscape-image sc-no-crop"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* ========== 4. EVENT SECTION ========== */}
      <section id="sc-events" className="events" ref={eventsRef}>
        <div className="container">
          <motion.div 
            className="events-content"
            initial="hidden"
            animate={eventsInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } }
            }}
          >
            <div className="events-grid">
              <div className="event-details">
                <div className="event-category">The Second Chapter</div>
                
                <h2 className="event-title">Live the Legacy</h2>
                
                <h3 className="event-subtitle">Rakesh Chaurasia & Friends (RAF) | The Legend Ensemble</h3>
                
                <div className="event-date-time">
                  <span className="event-date">
                    8<sup>th</sup> March 2026<br />
                  </span>
                  <span className="event-time" style={{marginTop: '-4px', display: 'inline-block'}}>
                    <span className="time-icon" aria-hidden="true"></span> 7pm Onwards
                  </span>
                  <div className="event-location">
                    <span className="event-location-text">Qutub Minar, Delhi</span>
                  </div>
                </div>
                
                <p className="event-description">
                  Songs of the Stone by Inkpot India and HSBC 'Live the Legacy' presents an immersive musical experience at the Qutub Minar. The evening features two-time Grammy Award–winning flautist Rakesh Chaurasia, accompanied by Gino Banks, Satyajit Talwalkar, Sheldon D'Silva, Sanjoy Das and Sangeet Haldipur — a collective of some of India's finest contemporary classical musicians.
                </p>
                <p className="event-description">
                  As dusk yields to night, the monument's illuminated silhouette becomes both stage and muse, while the serenity of the bansuri and the ensemble's virtuosity create a confluence of sound, history and architectural splendour.
                </p>
              </div>

              <motion.div
                className="event-video-container"
                variants={imageVariants}
              >
                <img
                  className="event-video"
                  src="/chapter_one/finalhero.jpg"
                  alt="The Rakesh Chaurasia - Event Poster"
                  loading="lazy"
                />
              </motion.div>
              

            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== VIDEO BANNER ========== */}
      <section className="fc-banner-section">
        <video
          className="fc-banner-img"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/chapter_one/videos/video_first_chapter.mp4" type="video/mp4" />
        </video>
      </section>



      {/* ========== AFTER FILM ========== */}
      <section id="after-film" className="gvs-video-section" ref={sc2VideoSectionRef}>
        <div className="gvs-container">
          <div className="gvs-section-header">
            <span className="gvs-label">After Film</span>
            <h2 className="gvs-title">The Second Chapter</h2>
          </div>

          <div className="gvs-video-frame">
            <div className="gvs-video-embed">
              <div id="sc2-youtube-player"></div>
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

      {/* ========== PARTNERS SECTION ========== */}
      <PartnersSection partners={sc2Partners} centered />

      {/* ========== CONTACT ========== */}
      <AnimatePresence mode="wait">
        {showSuccessPopup && (
          <motion.div
            key="success-popup-overlay"
            className="success-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowSuccessPopup(false)}
          >
            <motion.div
              className="success-popup"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="popup-title">Thank You!</h3>
              <p className="popup-message">Thank you for reaching out. Will get back to you soon!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="sc-contact" className="contact" ref={contactRef}>
        <div className="container">
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="contact-grid">
              <div className="contact-text-section">
                <div className="contact-header">
                  <div className="contact-tagline">Connect With Heritage</div>
                  <h2 className="contact-title">Contact Us</h2>
                  <p className="contact-description">
                    We're so glad you found us. Songs of The Stone is an experience for those seeking meaning, connection, and beauty -- in art, in stories, and in each other.

                    Please fill out the form below and Our team will connect with you to guide you through the next steps.
                  </p>
                </div>
                <div className="contact-form-wrapper">
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className={formErrors.name ? 'error' : ''} disabled={formStatus === 'submitting'} />
                      {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>
                    <div className="form-field full-width-input">
                      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className={formErrors.email ? 'error' : ''} disabled={formStatus === 'submitting'} />
                      {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>
                    <div className="form-field full-width-input">
                      <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className={formErrors.phone ? 'error' : ''} disabled={formStatus === 'submitting'} />
                      {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                    </div>
                    <div className="form-field">
                      <textarea name="message" placeholder="We'd love to get to know you. What draws you to this world of culture and what do you do in your own life or work?" rows="4" value={formData.message} onChange={handleInputChange} className={formErrors.message ? 'error' : ''} disabled={formStatus === 'submitting'} />
                      {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                    </div>
                    <button type="submit" className={`submit-btn ${formStatus}`} disabled={formStatus === 'submitting'}>
                      {formStatus === 'submitting' && 'Connecting...'}
                      {formStatus === 'success' && 'Message Sent!'}
                      {formStatus === 'error' && 'Try Again'}
                      {formStatus === 'idle' && 'Submit'}
                    </button>
                    {formStatus === 'success' && <div className="form-success">Thank you for your interest! We'll be in touch soon.</div>}
                    {formStatus === 'error' && <div className="form-error">Something went wrong. Please try again later.</div>}
                  </form>
                </div>
              </div>
              <div className="contact-image">
                <img src="/Contact_us_form/contact_us_form.jpeg" alt="Songs of the Stone — Contact Us" className="contact-img" loading="eager" fetchPriority="high" decoding="async" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SecondChapter;
