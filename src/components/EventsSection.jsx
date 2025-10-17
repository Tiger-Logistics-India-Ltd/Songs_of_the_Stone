import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Events Section Component
 * 
 * Features:
 * - Event showcase with image and details
 * - Interactive elements and hover effects
 * - Mobile-responsive layout
 * - Date badge and call-to-action functionality
 */
const EventsSection = () => {
  /**
   * State for managing event registration modal or actions
   */
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  
  /**
   * State for managing "Learn More" section visibility
   */
  const [showLearnMore, setShowLearnMore] = useState(false);

  /**
   * Intersection Observer for scroll-triggered animations
   */
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Removed dynamic height measurement to prevent layout thrash on mobile

  /**
   * Handle event registration button click
   * Navigate to contact form section
   */
  const handleEventRegistration = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  /**
   * Handle "Learn More" button click
   */
  const handleLearnMore = () => {
    setShowLearnMore(!showLearnMore);
  };

  /**
   * Animation variants for the events content
   */
  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1, 
        delay: 0.2,
        ease: "easeOut" 
      }
    }
  };

  /**
   * Animation variants for the event image
   */
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1.2, 
        delay: 0.4,
        ease: "easeOut" 
      }
    }
  };

  return (
    <section id="events" className="events" ref={ref}>
      <div className="container">
        <motion.div 
          className="events-content"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } }
          }}
        >
          <div className="events-grid">
            {/* Event Details Section */}
            <div className="event-details">
              <div className="event-category">The First Chapter</div>
              
              <h2 className="event-title">The Mehtab Ali Niazi Experience</h2>
              
              <h3 className="event-subtitle">A Classical Rhapsody</h3>
              
              <div className="event-location">
                <span className="location-icon" aria-hidden="true">📍</span>
                Qutub Minar, Delhi
              </div>
              
              <p className="event-description">
                Join us for a spellbinding musical evening with Mehtab Ali Niazi and his ensemble, where the classical meets the contemporary, and tradition finds new rhythm.
              </p>
              <p className="event-description">
                His semi-classical fusion — weaving raga with elements of jazz and modern soundscapes — creates an experience both timeless and alive, set against the breathtaking backdrop of the Qutub Minar, a UNESCO World Heritage Site.
              </p>
            </div>

            {/* Event Video Section - Portrait mode video */}
            <motion.div 
              className="event-video-container"
              variants={imageVariants}
            >
              <video 
                className="event-video"
                autoPlay
                loop
                controls
                playsInline
                poster="/Images/desktop/Songs_of_the_stone_800x600 px.svg"
              >
                <source 
                  src="/Images/desktop/event_video.mp4" 
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </motion.div>
            
            {/* Call to Action Buttons - Separate section for flexible positioning */}
            <div className="event-cta-section">
              <div className="event-cta">
                <button 
                  className="event-btn-secondary"
                  onClick={handleLearnMore}
                  aria-label={showLearnMore ? "Hide event details" : "Learn more about the event"}
                >
                  {showLearnMore ? "Show Less" : "Learn More"}
                </button>
                
                <button 
                  className="event-btn"
                  onClick={handleEventRegistration}
                  aria-label="Reserve your spot for The Mehtab Ali Niazi Experience"
                >
                  Reserve Your Experience
                </button>
                
                
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Learn More Section - Separate full-width section */}
      <AnimatePresence initial={false}>
        {showLearnMore && (
          <motion.section
            key="learn-more"
            className="learn-more-full-section"
            initial={{ opacity: 0, y: 24, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 24, height: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className="container">
              <div className="learn-more-grid">
                  {/* Desktop: Left side - Text Content */}
                  <div className="learn-more-text-content">
                    <h3 className="learn-more-section-title">About the Artist</h3>
                    
                    <div className="learn-more-description">
                      <p>
                        The premiere features Mehtaab Ali Niazi of the Rampur-Sahaswan Gharana — one of India's most nuanced classical lineages. Trained under Ustad Ghulam Mustafa Niazi, Mehtaab bridges raga and rhythm with modern soundscapes, perfectly balancing the old and the new.
                      </p>
                    </div>

                    <div className="event-details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">13th December 2025</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Time:</span>
                        <span className="detail-value">9pm-11pm</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Place:</span>
                        <span className="detail-value">Qutub Minar, New Delhi</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Right side - Image */}
                  <div className="learn-more-image-wrapper">
                    <img 
                      src="/Images/Mobile/Mehtab_ali_600x400 px.png" 
                      alt="Ustad Mehtaab Ali Niazi - Classical Music Performance" 
                      className="learn-more-section-img"
                      loading="lazy"
                    />
                  </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventsSection;