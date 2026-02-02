import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * First Chapter Event Page
 * 
 * Features:
 * - Hero video with infinite loop
 * - Text section with event description
 * - Embedded YouTube video (after story)
 * - Auto-scrolling image marquee gallery
 * - Fully responsive design
 */

// Import all images from EventPage_Auto_rotate_images folder
const marqueeImages = [
  '/chapter_one/EventPage_Auto_rotate_images/SotS-103.jpg',
  '/chapter_one/EventPage_Auto_rotate_images/SotS-109.jpg',
  '/chapter_one/EventPage_Auto_rotate_images/SotS-13.jpg',
  '/chapter_one/EventPage_Auto_rotate_images/SotS-197.jpg',
  '/chapter_one/EventPage_Auto_rotate_images/SotS-328.jpg',
  '/chapter_one/EventPage_Auto_rotate_images/SotS-489.jpg',
  '/chapter_one/EventPage_Auto_rotate_images/SotS-49.jpg',
  '/chapter_one/EventPage_Auto_rotate_images/SotS-546.jpg',
  '/chapter_one/EventPage_Auto_rotate_images/SotS-548.jpg',
  '/chapter_one/EventPage_Auto_rotate_images/SotS-58.jpg',
  '/chapter_one/EventPage_Auto_rotate_images/SotS-60.jpg',
  '/chapter_one/EventPage_Auto_rotate_images/SotS-61.jpg',
];

const FirstChapter = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection observer for animations
  const { ref: textRef, inView: textInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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

      {/* Text Description Section */}
      <section className="fc-text-section" ref={textRef}>
        <motion.div 
          className="fc-text-container"
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="fc-text-content">
            <p className="fc-text-main">
              Really Artistic Line One —<br />
              Cool Line 2,<br />
              <strong>SongsoftheStone</strong> is <strong>Inkports's</strong> Art. heritage.and other cool stuff.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Artist Biography 1 - Image Left, Text Right */}
      <section className="fc-artist-section" ref={biographyRef}>
        <motion.div 
          className="fc-artist-container"
          initial="hidden"
          animate={biographyInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="fc-artist-image-wrapper">
            <img 
              src="/chapter_one/EventPage_Auto_rotate_images/SotS-548.jpg" 
              alt="Roxana - Violinist"
              className="fc-artist-image"
            />
          </div>
          <div className="fc-artist-text">
            <h2 className="fc-artist-name">BLAH BLAH</h2>
            <p className="fc-artist-bio">
              Somewhere in Delhi.
            </p>
            
          </div>
        </motion.div>
      </section>

      

      {/* Artist Biography 2 - Text Left, Image Right (Reversed) */}
      <section className="fc-artist-section fc-artist-reverse">
        <motion.div 
          className="fc-artist-container"
          initial="hidden"
          animate={biographyInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="fc-artist-text">
            <h2 className="fc-artist-name">BLAH BLAH</h2>
            <p className="fc-artist-bio">
              Culture is the arts elevated to a set of beliefs.
            </p>
           
          </div>
          <div className="fc-artist-image-wrapper">
            <img 
              src="/chapter_one/EventPage_Auto_rotate_images/SotS-546.jpg" 
              alt="Yaoré - Violinist"
              className="fc-artist-image"
            />
          </div>
        </motion.div>
      </section>

      {/* Image | Text 3 - Image Left, Text Right */}
      <section className="fc-artist-section">
        <motion.div 
          className="fc-artist-container"
          initial="hidden"
          animate={biographyInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="fc-artist-image-wrapper">
            <img 
              src="/chapter_one/EventPage_Auto_rotate_images/SotS-109.jpg" 
              alt="Suzanne - Cellist"
              className="fc-artist-image"
            />
          </div>
          <div className="fc-artist-text">
            <h2 className="fc-artist-name"><span className="fc-hindi">फुर्सत [Fursat]</span></h2>
            <p className="fc-artist-bio">
              A pause in time.
              A moment to listen without urgency.
              Music created not for consumption — but for presence.
            </p>
          </div>
        </motion.div>
      </section>
      {/* Text Description Section */}
      <section className="fc-text-section" ref={textRef}>
        <motion.div 
          className="fc-text-container"
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="fc-text-content">
            <p className="fc-text-main">
               Songs of the Stone is an Inkpots initiative —
                dedicated to documenting artistic heritage through sound, film, and storytelling.
            </p>

          </div>
        </motion.div>
      </section>

      {/* Image Marquee Section */}
      <section className="fc-marquee-section">
        <div className="fc-marquee-container">
          <div className="fc-marquee-track">
            {/* First set of images */}
            {marqueeImages.map((src, index) => (
              <img
                key={`first-${index}`}
                src={src}
                alt={`Event moment ${index + 1}`}
                className="fc-marquee-image"
                loading="lazy"
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {marqueeImages.map((src, index) => (
              <img
                key={`second-${index}`}
                src={src}
                alt={`Event moment ${index + 1}`}
                className="fc-marquee-image"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>
      {/* Text Description Section */}
      <section className="fc-text-section" ref={textRef}>
        <motion.div 
          className="fc-text-container"
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="fc-text-content">
            <p className="fc-text-main">
              <strong>Art</strong> Culture & Heritage.
            </p>
          </div>
        </motion.div>
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
            <iframe
              src="https://www.youtube.com/embed/HxaNbvC4NhM?autoplay=1&mute=1&loop=1&playlist=HxaNbvC4NhM&controls=0"
              title="The First Chapter - After Story"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </section>

      {/* Text Description Section */}
      <section className="fc-text-section" ref={textRef}>
        <motion.div 
          className="fc-text-container"
          initial="hidden"
          animate={textInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="fc-text-content">
            <p className="fc-text-main">
              <strong>SongsoftheStone</strong> is <strong>Inkports's</strong> Art. heritage.and other cool stuff.
            </p>
          </div>
        </motion.div>
      </section>

      

    </div>
  );
};

export default FirstChapter;
