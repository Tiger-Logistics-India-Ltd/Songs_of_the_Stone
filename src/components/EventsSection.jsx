import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
   * Intersection Observer for scroll-triggered animations
   */
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  /**
   * Handle event registration button click
   * In a real app, this would open a modal or navigate to booking page
   */
  const handleEventRegistration = () => {
    // For now, we'll show an alert, but this could open a modal
    alert('Event registration coming soon! Please contact us for more details.');
    // setIsEventModalOpen(true); // Uncomment when modal is implemented
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
          variants={contentVariants}
        >
          <div className="events-grid">
            {/* Event Image Section */}
            <motion.div 
              className="event-image"
              variants={imageVariants}
            >
              <img 
                src="/qutub.jpeg" 
                alt="Qutub Minar - Venue for The Mehtab Ali Niazi Experience" 
                className="event-img"
                loading="lazy"
              />
              
              {/* Date Badge - positioned over the image */}
              <div className="event-date-badge">
                <span className="date-day">13</span>
                <span className="date-month">DEC</span>
                <span className="date-year">2025</span>
              </div>
            </motion.div>
            
            {/* Event Details Section */}
            <div className="event-details">
              <div className="event-category">Musical Experience</div>
              
              <h2 className="event-title">The Mehtab Ali Niazi Experience</h2>
              
              <h3 className="event-subtitle">A Classical Rhapsody</h3>
              
              <div className="event-location">
                <span className="location-icon" aria-hidden="true">📍</span>
                Qutub Minar, Delhi
              </div>
              
              <p className="event-description">
                Join us for a spellbinding musical rendition - an auditory journey where timeless melodies 
                are juxtaposed against the grandeur of India's architectural marvels. Experience the magic 
                of classical music resonating through centuries-old stones.
              </p>
              
              
              
              
              {/* Call to Action */}
              <div className="event-cta">
                <button 
                  className="event-btn"
                  onClick={handleEventRegistration}
                  aria-label="Reserve your spot for The Mehtab Ali Niazi Experience"
                >
                  Reserve Your Experience
                </button>
                
                <button className="event-btn-secondary">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;