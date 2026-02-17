import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * GalleryVideoSection — exact copy of FirstChapter's
 * manual scroll image gallery + YouTube video section.
 * Drop into any page.
 */

// All 15 gallery images (same as FirstChapter)
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

const GalleryVideoSection = () => {
  const galleryScrollRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showUnmuteOverlay, setShowUnmuteOverlay] = useState(false);

  // Gallery scroll handlers
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

  // Intersection observer for video animation
  const { ref: videoRef, inView: videoInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    function initPlayer() {
      playerRef.current = new window.YT.Player('home-youtube-player', {
        videoId: 'HxaNbvC4NhM',
        playerVars: {
          autoplay: 1,
          mute: 0,
          loop: 1,
          playlist: 'HxaNbvC4NhM',
          controls: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
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

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  const skipForward = () => {
    if (playerRef.current && playerRef.current.getCurrentTime) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 10, true);
    }
  };

  const skipBackward = () => {
    if (playerRef.current && playerRef.current.getCurrentTime) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(0, currentTime - 10), true);
    }
  };

  const handleUnmute = () => {
    if (playerRef.current) {
      playerRef.current.unMute();
      playerRef.current.setVolume(100);
      setIsMuted(false);
      setShowUnmuteOverlay(false);
    }
  };

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

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
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
    <>
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

      {/* YouTube Video Section */}
      <section className="fc-video-section" ref={videoRef}>
        <motion.div 
          className="fc-video-container"
          initial="hidden"
          animate={videoInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="fc-video-wrapper">
            <div id="home-youtube-player"></div>
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
    </>
  );
};

export default GalleryVideoSection;
