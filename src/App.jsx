import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './App.css';

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/logo.png" alt="Song of the Stone" className="logo-img" />
        </div>
        
        <div className="nav-menu">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#events" className="nav-link">Events</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        
        <div className="nav-cta">
          <a href="#contact" className="cta-button">Explore</a>
        </div>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <img src="/hero.png" alt="Song of the Stone" className="hero-img" />
        <div className="hero-overlay"></div>
      </div>
      
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="hero-text">
          <motion.div 
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Stories carved in stone
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            SONG OF THE STONE
          </motion.h1>
          
          <motion.div 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            WHERE TRADITION BREATHES THROUGH MODERN RHYTHMS
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="about-grid">
            <div className="about-text">
              <div className="about-tagline">Heritage Reimagined</div>
              <h2 className="about-title">Culture blooms where tradition meets innovation</h2>
              <p className="about-description">
                We curate immersive experiences that honor the past while speaking to contemporary hearts. Every stone tells a story, every shadow holds wisdom.
              </p>
            </div>
            
            <div className="about-image">
              <img src="/image.png" alt="Heritage" className="about-img" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Events Section Component
const EventsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="events" className="events" ref={ref}>
      <div className="container">
        <motion.div 
          className="events-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="events-grid">
            <div className="event-image">
              <img src="/qutub.jpeg" alt="Qutub Minar" className="event-img" />
              <div className="event-date-badge">
                <span className="date-day">13</span>
                <span className="date-month">DEC</span>
                <span className="date-year">2025</span>
              </div>
            </div>
            
            <div className="event-details">
              <div className="event-category">Musical Experience</div>
              <h2 className="event-title">The Mehtab Ali Niazi Experience</h2>
              <h3 className="event-subtitle">A Classical Rhapsody</h3>
              <div className="event-location">Qutub Minar</div>
              <p className="event-description">
                Join us for a spellbinding musical rendition - an auditory journey where timeless melodies are juxtaposed against the grandeur of India's architectural marvels.
              </p>
              <div className="event-cta">
                <button className="event-btn">Reserve Your Experience</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.div 
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="contact-grid">
            <div className="contact-text-section">
              <div className="contact-header">
                <div className="contact-tagline">Connect With Heritage</div>
                <h2 className="contact-title">Begin Your Cultural Journey</h2>
                <p className="contact-description">
                  Step into a world where every experience is curated with passion. 
                  Let us craft moments that resonate with your soul.
                </p>
              </div>
              
              <div className="contact-form-wrapper">
                <form className="contact-form">
                  <div className="form-row">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                  </div>
                  <textarea placeholder="Share your cultural interests..." rows="5"></textarea>
                  <button type="submit" className="submit-btn">Connect With Us</button>
                </form>
              </div>
            </div>

            <div className="contact-image-section">
              <div className="contact-image-wrapper">
                <img src="/music.jpeg" alt="Musical Heritage" className="contact-img" />
                <div className="contact-image-overlay">
                  <div className="overlay-text">
                    <span className="overlay-quote">"Music is the bridge between the earthly and the divine"</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p>Song of the Stone © 2025. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;