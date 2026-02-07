import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';


/**
 * Events Section Component
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
              <div className="event-category">The Second Chapter</div>
              
              <h2 className="event-title">Live the Legacy</h2>
              
              <h3 className="event-subtitle">Rakesh Chaurasia & Friends (RAF) | The Legend Ensemble</h3>
              
              <div className="event-date-time">
                <span className="event-date">
                  8<sup>th</sup> March 2025<br />
                </span>
                <span className="event-time" style={{marginTop: '-4px', display: 'inline-block'}}>
                  <span className="time-icon" aria-hidden="true"></span> 7pm Onwards
                </span>
                <div className="event-location"><span className="event-location-text">Qutub Minar, Delhi</span></div>
              </div>
              
              <p className="event-description">
                Songs of the Stone by Inkpot India and HSBC 'Live the Legacy' presents an immersive musical experience at the Qutub Minar. The evening features two-time Grammy Award–winning flautist Rakesh Chaurasia, accompanied by Gino Banks, Satyajit Talwalkar, Sheldon D'Silva, Sanjoy Das and Sangeet Haldipur — a collective of some of India's finest contemporary classical musicians.
              </p>
              <p className="event-description">
                Curated for a discerning community of art and heritage connoisseurs, the experience invites guests to witness India's legacy in a rare light. As dusk yields to night, the monument's illuminated silhouette becomes both stage and muse, while the serenity of the bansuri and the ensemble's virtuosity create a confluence of sound, history and architectural splendour.
              </p>
              <p className="event-description">
                Songs of the Stone evokes a deeper, more intimate engagement with heritage — a quiet, contemplative and unforgettable night where music breathes life into stone, and the Qutub Minar reveals itself anew.
              </p>
            </div>

            {/* Event Image Section - Portrait mode image */}
            <motion.div
              className="event-video-container"
              variants={imageVariants}
            >
              <img
                className="event-video"
                src="/Chapter2/Event section/hero banner.png"
                alt="The Rakesh Chaurasia - Event Poster"
                loading="lazy"
              />
            </motion.div>
            
            {/* Call to Action Buttons - Separate section for flexible positioning */}
            <div className="event-cta-section">
              <div className="event-cta">
                <button
                  className="event-btn"
                  onClick={handleEventRegistration}
                  aria-label="Reserve your spot for The Rakesh Chaurasia Experience"
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