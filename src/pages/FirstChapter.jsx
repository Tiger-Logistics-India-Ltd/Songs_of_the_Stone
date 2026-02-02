import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * First Chapter Event Page
 * 
 * Features:
 * - Hero video with infinite loop
 * - Text section with event description
 * - Embedded YouTube video (after story) with skip controls
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
  // YouTube Player reference
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    // Load the YouTube IFrame API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: 'HxaNbvC4NhM',
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: 'HxaNbvC4NhM',
          controls: 0,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onStateChange: (event) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          }
        }
      });
    };

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
