import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import PartnersSection from '../components/PartnersSection';

/**
 * First Chapter Event Page
 * 
 * Features:
 * - Hero video with infinite loop
 * - Text sections that render instantly (no animation delay)
 * - Embedded YouTube video with autoplay + sound (click-to-unmute fallback)
 * - Manual scroll image gallery (like partners section)
 * - Artist sections with static images
 * - Contact form section
 * - Fully responsive design
 */

// All 15 marquee images — URL-encoded spaces for reliable browser loading
const marqueeImages = [
  '/chapter_one/Chapter%201/7.png',
  '/chapter_one/Chapter%201/8.png',
  '/chapter_one/Chapter%201/9.png',
  '/chapter_one/Chapter%201/10.png',
  '/chapter_one/Chapter%201/11.png',
  '/chapter_one/Chapter%201/12.png',
  '/chapter_one/Chapter%201/13.png',
  '/chapter_one/Chapter%201/14.png',
  '/chapter_one/Chapter%201/15.png',
  '/chapter_one/Chapter%201/16.png',
  '/chapter_one/Chapter%201/17.png',
  '/chapter_one/Chapter%201/18.png',
  '/chapter_one/Chapter%201/19.png',
  '/chapter_one/Chapter%201/20.png',
  '/chapter_one/Chapter%201/21.png',
];

const FirstChapter = () => {
  // YouTube Player reference
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showUnmuteOverlay, setShowUnmuteOverlay] = useState(false);
  const galleryScrollRef = useRef(null);

  // ========== CONTACT FORM STATE ==========
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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
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
    if (!formData.message.trim()) errors.message = 'Please share your cultural interests';
    return errors;
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
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
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

  // Gallery scroll handlers — exact copy of partners scroll pattern
  const scrollGalleryLeft = () => {
    if (galleryScrollRef.current) {
      galleryScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  const scrollGalleryRight = () => {
    if (galleryScrollRef.current) {
      galleryScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    // If API already loaded from a previous mount, just init the player
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // Load the YouTube IFrame API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    function initPlayer() {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: 'HxaNbvC4NhM',
        playerVars: {
          autoplay: 1,
          mute: 0,        // start with sound ON
          loop: 1,
          playlist: 'HxaNbvC4NhM',
          controls: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            // Try to play with sound
            event.target.playVideo();
            // If browser blocks unmuted autoplay, fall back to muted + show overlay
            setTimeout(() => {
              const state = event.target.getPlayerState && event.target.getPlayerState();
              if (state !== window.YT.PlayerState.PLAYING) {
                event.target.mute();
                setIsMuted(true);
                setShowUnmuteOverlay(true);
                event.target.playVideo();
              }
            }, 1500);
          },
          onStateChange: (event) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          }
        }
      });
    }

    // Cleanup
    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  // Skip forward 10 seconds
  const skipForward = () => {
    if (playerRef.current && playerRef.current.getCurrentTime) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 10, true);
    }
  };

  // Skip backward 10 seconds
  const skipBackward = () => {
    if (playerRef.current && playerRef.current.getCurrentTime) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(0, currentTime - 10), true);
    }
  };

  // Handle user click to unmute (satisfies browser autoplay policy)
  const handleUnmute = () => {
    if (playerRef.current) {
      playerRef.current.unMute();
      playerRef.current.setVolume(100);
      setIsMuted(false);
      setShowUnmuteOverlay(false);
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (playerRef.current) {
      if (playerRef.current.isMuted()) {
        playerRef.current.unMute();
        setIsMuted(false);
        setShowUnmuteOverlay(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  // Intersection observer for animations (artist & video sections only)
  const { ref: videoRef, inView: videoInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: biographyRef, inView: biographyInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 1, ease: "easeOut" } 
    }
  };

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
        
      </section>

      {/* Opening Text — featured-heading style (same as Home page) */}
      <section className="featured-category-section">
        <div className="featured-heading">
          <h3 className="featured-subtitle">IN DIALOGUE WITH TIME</h3>
          <h2 className="featured-title">Art. Architecture. Performance.</h2>
          <p className="featured-description">Songs of the Stone is Inkpot's journey into art, heritage, and the spaces between.</p>
        </div>
      </section>

      {/* First Image | Image Left, Text Right */}
      <section className="fc-artist-section" ref={biographyRef}>
        <motion.div 
          className="fc-artist-container"
          initial="hidden"
          animate={biographyInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="fc-artist-image-wrapper">
            <img 
              src="/chapter_one/Chapter%201/1.png" 
              alt="Qutub Event Artist tabla Stage Photo"
              className="fc-artist-image"
            />
          </div>
          <div className="fc-artist-text">
            <h2 className="fc-artist-name">The Beauty of Craft</h2>
            <p className="fc-artist-bio">
              Somewhere in Delhi.
            </p>
            
          </div>
        </motion.div>
      </section>

      

      {/* second | Text Left, Image Right (Reversed) */}
      <section className="fc-artist-section fc-artist-reverse">
        <motion.div 
          className="fc-artist-container"
          initial="hidden"
          animate={biographyInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="fc-artist-text">
            <h2 className="fc-artist-name">The Beauty of Craft</h2>
            <p className="fc-artist-bio">
              Somewhere in Delhi.
            </p>
            
          </div>
          <div className="fc-artist-image-wrapper">
            <img 
              src="/chapter_one/Chapter%201/2.png" 
              alt="Yaoré - Violinist"
              className="fc-artist-image"
            />
          </div>
        </motion.div>
      </section>

      {/* Third section | Image Left, Text Right */}
      <section className="fc-artist-section">
        <motion.div 
          className="fc-artist-container"
          initial="hidden"
          animate={biographyInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="fc-artist-image-wrapper">
            <img 
              src="/chapter_one/Chapter%201/3.png" 
              alt="Suzanne - Cellist"
              className="fc-artist-image"
            />
          </div>
          <div className="fc-artist-text">
            <h2 className="fc-artist-name">The Beauty of Craft</h2>
            <p className="fc-artist-bio">
              Somewhere in Delhi.
            </p>
            
          </div>
        </motion.div>
      </section>
      {/* Opening Text — featured-heading style (same as Home page) */}
      <section className="featured-category-section">
        <div className="featured-heading">
          <h3 className="featured-subtitle">IN DIALOGUE WITH TIME</h3>
          <h2 className="featured-title">Art. Architecture. Performance.</h2>
          <p className="featured-description">Songs of the Stone is Inkpot's journey into art, heritage, and the spaces between.</p>
        </div>
      </section>

      {/* Image Gallery — Manual Scroll with overlay buttons */}
      <section className="fc-gallery-section">
        <div className="fc-gallery-scroll-container">
          <button 
            className="fc-gallery-scroll-btn fc-gallery-scroll-btn-left" 
            onClick={scrollGalleryLeft}
            aria-label="Scroll left"
          >
            ‹
          </button>
          
          <div className="fc-gallery-scroll-wrapper" ref={galleryScrollRef}>
            <div className="fc-gallery-grid">
              {marqueeImages.map((src, index) => (
                <div key={index} className="fc-gallery-card">
                  <img
                    src={src}
                    alt={`Event moment ${index + 1}`}
                    className="fc-gallery-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="fc-gallery-scroll-btn fc-gallery-scroll-btn-right" 
            onClick={scrollGalleryRight}
            aria-label="Scroll right"
          >
            ›
          </button>
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
      

      {/* YouTube Video Section (After Story) */}
      <section className="fc-video-section" ref={videoRef}>
        <motion.div 
          className="fc-video-container"
          initial="hidden"
          animate={videoInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="fc-video-wrapper">
            <div id="youtube-player"></div>
            
          </div>
          
          {/* Video Controls */}
          <div className="fc-video-controls">
            <button 
              className="fc-video-control-btn" 
              onClick={skipBackward}
              aria-label="Skip back 10 seconds"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V1L7 6L12 11V7C15.31 7 18 9.69 18 13C18 16.31 15.31 19 12 19C8.69 19 6 16.31 6 13H4C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13C20 8.58 16.42 5 12 5Z" fill="currentColor"/>
                <text x="9" y="14.5" fontSize="6" fill="currentColor" fontWeight="bold">10</text>
              </svg>
            </button>
            
            <button 
              className="fc-video-control-btn fc-play-pause-btn" 
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/>
                  <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
              )}
            </button>
            
            <button 
              className="fc-video-control-btn" 
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
                </svg>
              )}
            </button>

            <button 
              className="fc-video-control-btn" 
              onClick={skipForward}
              aria-label="Skip forward 10 seconds"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V1L17 6L12 11V7C8.69 7 6 9.69 6 13C6 16.31 8.69 19 12 19C15.31 19 18 16.31 18 13H20C20 17.42 16.42 21 12 21C7.58 21 4 17.42 4 13C4 8.58 7.58 5 12 5Z" fill="currentColor"/>
                <text x="9" y="14.5" fontSize="6" fill="currentColor" fontWeight="bold">10</text>
              </svg>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* ========== CONTACT SECTION (exact copy from SecondChapter) ========== */}
      <section id="sc-contact" className="sc-contact-section" ref={contactRef}>
        <div className="sc-contact-wrapper">
          {/* Left Side - Text and Form */}
          <motion.div 
            className="sc-contact-left"
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h2 className="sc-contact-title">CONTACT US</h2>
            
            <p className="sc-contact-description">
              We’re so glad you found us. Songs of The Stone is an experience for those seeking meaning, connection, and beauty — in art, in stories, and in each other.
            </p>
            <p className="sc-contact-description">
              Please fill out the form below to reserve your seat. Our team will connect with you to guide you through the next steps.
            </p>

            {/* Contact Form */}
            <form className="sc-contact-form" onSubmit={handleSubmit}>
              <div className="sc-form-field">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className={formErrors.name ? 'error' : ''}
                  disabled={formStatus === 'submitting'}
                />
                {formErrors.name && <span className="sc-error-message">{formErrors.name}</span>}
              </div>

              <div className="sc-form-field">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'error' : ''}
                  disabled={formStatus === 'submitting'}
                />
                {formErrors.email && <span className="sc-error-message">{formErrors.email}</span>}
              </div>

              <div className="sc-form-field">
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={formErrors.phone ? 'error' : ''}
                  disabled={formStatus === 'submitting'}
                />
                {formErrors.phone && <span className="sc-error-message">{formErrors.phone}</span>}
              </div>
              
              <div className="sc-form-field">
                <textarea 
                  name="message"
                  placeholder="Tell us about yourself..."
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={formErrors.message ? 'error' : ''}
                  disabled={formStatus === 'submitting'}
                ></textarea>
                {formErrors.message && <span className="sc-error-message">{formErrors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className={`sc-submit-btn ${formStatus}`}
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' && 'Sending...'}
                {formStatus === 'success' && 'Sent!'}
                {formStatus === 'error' && 'Try Again'}
                {formStatus === 'idle' && 'SUBMIT'}
              </button>
              
              {formStatus === 'success' && (
                <div className="sc-form-success">
                  Thank you! We’ll be in touch soon.
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="sc-form-error">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </motion.div>

          {/* Right Side - Image with colored background */}
          <motion.div 
            className="sc-contact-right"
            initial={{ opacity: 0, x: 50 }}
            animate={contactInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="sc-contact-image-bg"></div>
            <img 
              src="/SotS-35.jpg.jpeg" 
              alt="Musical Heritage and Cultural Expression" 
              className="sc-contact-image"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Success Popup */}
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
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="popup-title">Thank You!</h3>
              <p className="popup-message">
                Thank you for reaching out. Will get back to you soon!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FirstChapter;
