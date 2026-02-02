import React, { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
  const videoRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Ultra-aggressive autoplay for mobile devices
    const video = videoRef.current;
    if (!video) return;

    // Force all necessary attributes for mobile autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute('playsinline', 'playsinline');
    video.setAttribute('webkit-playsinline', 'webkit-playsinline');
    video.setAttribute('muted', 'muted');
    video.volume = 0;

    // Force load the video
    video.load();

    // Aggressive play function with retries
    const forcePlay = async () => {
      try {
        video.muted = true;
        video.volume = 0;
        await video.play();
        console.log('✓ Video playing successfully');
      } catch (err) {
        console.log('Retry attempt:', err.message);
        // Retry multiple times with increasing delays
        setTimeout(() => forcePlay(), 50);
      }
    };

    // Start playing as soon as possible
    forcePlay();

    // Listen to multiple events that indicate video is ready
    const playOnReady = () => {
      if (video.paused) {
        forcePlay();
      }
    };

    video.addEventListener('loadedmetadata', playOnReady);
    video.addEventListener('loadeddata', playOnReady);
    video.addEventListener('canplay', playOnReady);
    video.addEventListener('canplaythrough', playOnReady);

    // Handle visibility changes (user switches tabs)
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        forcePlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Handle user interaction anywhere on page to start video on mobile
    const handleUserInteraction = () => {
      if (video.paused) {
        forcePlay();
      }
    };

    // Try to play on any touch/click event (mobile requirement)
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('click', handleUserInteraction, { once: true });

    // Cleanup
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

  return (
    <section id="home" className="hero-featured">
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
        <p className="hero-date-text">07-03-2026</p>
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
  );
};

export default HeroSection;