import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

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

const SecondChapter = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ========== HERO SECTION ==========
  const videoRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

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

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.2, ease: "easeOut" }
    }
  };

  return (
    <div className="second-chapter-page">
      {/* ========== 1. HERO VIDEO SECTION ========== */}
      <section id="sc-home" className="hero-featured">
        <video
          ref={videoRef}
          src="/chapter_one/Hero_first_chapter.mp4"
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
          <a 
            href="https://www.district.in/events/songs-of-the-stone-after-dark-musical-experience-qutub-minar-mehtab-ali-niazi-dec13-2025-buy-tickets" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hero-ticket-button"
          >
            <span className="button-text">Book Your Ticket</span>
            <span className="button-arrow">→</span>
          </a>
        </div>
      </section>

      {/* ========== 2. FEATURED 4-PICTURE GRID ========== */}
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
                
                <h3 className="event-subtitle">Rakesh Chaurasia & Friends</h3>
                
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
                  Join us for a spellbinding musical evening with Mehtab Ali Niazi and his ensemble, where the classical meets the contemporary, and tradition finds new rhythm.
                </p>
                <p className="event-description">
                  His semi-classical fusion — weaving raga with elements of jazz and modern soundscapes — creates an experience both timeless and alive, set against the breathtaking backdrop of the Qutub Minar, a UNESCO World Heritage Site.
                </p>
              </div>

              <motion.div
                className="event-video-container"
                variants={imageVariants}
              >
                <img
                  className="event-video"
                  src="/Chapter2/Event section/hero_1.jpeg"
                  alt="The Mehtab Ali Niazi Experience - Event Poster"
                  loading="lazy"
                />
              </motion.div>
              
              <div className="event-cta-section">
                <div className="event-cta">
                  <button
                    className="event-btn"
                    onClick={handleEventRegistration}
                    aria-label="Reserve your spot for The Mehtab Ali Niazi Experience"
                  >
                    Book Your Tickets Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CHAPTER ONE BANNER ========== */}
      <section className="chapter-link-banner">
        <motion.div 
          className="chapter-link-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="chapter-link-label">Explore Our Journey</span>
          <h2 className="chapter-link-title">The First Chapter</h2>
          <p className="chapter-link-subtitle">The Mehtab Ali Niazi Experience</p>
          <a href="/first-chapter" className="chapter-link-btn">
            <span>View Chapter One</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </section>

      {/* ========== 5. RESERVE YOUR EXPERIENCE (CONTACT SECTION) ========== */}
      <section id="sc-contact" className="contact" ref={contactRef}>
        <div className="container">
        <motion.div 
          className="contact-content"
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <div className="contact-grid">
            {/* Contact Text and Form Section */}
            <div className="contact-text-section">
              <div className="contact-header">
                <div className="contact-tagline">Connect With Heritage</div>
                
                <h2 className="contact-title">Contact Us
                </h2>
                
                <p className="contact-description">
                  We're so glad you found us. Songs of The Stone is an experience for those seeking meaning, connection, and beauty -- in art, in stories, and in each other.

                  Please fill out the form below to reserve your seat for our First Chapter - The Mehtab Ali Niazi Experience at Qutub Minar. Our team will connect with you to guide you through the next steps.

                </p>
              </div>
              
              {/* Contact Form */}
              <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div className="form-field">
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className={formErrors.name ? 'error' : ''}
                      disabled={formStatus === 'submitting'}
                    />
                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                  </div>

                  {/* Email Field (single full width) */}
                  <div className="form-field full-width-input">
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? 'error' : ''}
                      disabled={formStatus === 'submitting'}
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>

                  {/* Phone Field now full width and with clearer placeholder */}
                  <div className="form-field full-width-input">
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="Phone Number" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? 'error' : ''}
                      disabled={formStatus === 'submitting'}
                    />
                    {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                  </div>
                  
                  {/* Message Field */}
                  <div className="form-field">
                    <textarea 
                      name="message"
                      placeholder="We'd love to get to know you. What draws you to this world of culture and what do you do in your own life or work?"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={formErrors.message ? 'error' : ''}
                      disabled={formStatus === 'submitting'}
                    ></textarea>
                    {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className={`submit-btn ${formStatus}`}
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' && 'Connecting...'}
                    {formStatus === 'success' && 'Message Sent!'}
                    {formStatus === 'error' && 'Try Again'}
                    {formStatus === 'idle' && 'Submit'}
                  </button>
                  
                  {/* Status Messages */}
                  {formStatus === 'success' && (
                    <div className="form-success">
                      Thank you for your interest! We'll be in touch soon.
                    </div>
                  )}
                  
                  {formStatus === 'error' && (
                    <div className="form-error">
                      Something went wrong. Please try again later.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Image Section - Clean slate approach matching About section exactly */}
            <div className="contact-image">
              <picture>
                {/* Mobile contact image - edge to edge */}
                <source 
                  media="(max-width: 767px)" 
                  srcSet="/SotS-35.jpg.jpeg" 
                  type="image/jpeg" 
                />
                
                {/* Desktop contact image */}
                <source 
                  srcSet="/SotS-35.jpg.jpeg" 
                  type="image/jpeg" 
                />
                
                {/* Fallback */}
                <img 
                  src="/SotS-35.jpg.jpeg" 
                  alt="Musical Heritage and Cultural Expression" 
                  className="contact-img"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
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

export default SecondChapter;
