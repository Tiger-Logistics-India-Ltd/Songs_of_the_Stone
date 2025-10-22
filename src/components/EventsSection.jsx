import React from 'react';
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
   * Intersection Observer for scroll-triggered animations
   */
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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
              
              
               
                
              
              <div className="event-date-time">
                
                <span className="event-date">
                                13<sup>th</sup> December 2025<br />
                              </span>
                <span className="event-time" style={{marginTop: '-4px', display: 'inline-block'}}>
                  <span className="time-icon" aria-hidden="true"></span> 7pm Onwards
                </span>
              <div className="event-location"><span className="event-location-text">Qutub Minar, Delhi</span></div>
                
                  
              </div>
              
              <p className="event-description">
                Join us for a spellbinding musical evening with Mehtab Ali Niazi and his ensemble, where the classical meets the contemporary, and tradition finds new rhythm.
              </p>
              <p className="event-description">
                His semi-classical fusion — weaving raga with elements of jazz and modern soundscapes — creates an experience both timeless and alive, set against the breathtaking backdrop of the Qutub Minar, a UNESCO World Heritage Site.
              </p>
            </div>

            {/* Event Image Section - Portrait mode image */}
            <motion.div
              className="event-video-container"
              variants={imageVariants}
            >
              <img
                className="event-video"
                src="/ultra_new_event_image.png"
                alt="The Mehtab Ali Niazi Experience - Event Poster"
                loading="lazy"
              />
            </motion.div>
            
            {/* Call to Action Buttons - Separate section for flexible positioning */}
            <div className="event-cta-section">
              <div className="event-cta">
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
    </section>
  );
};

export default EventsSection;