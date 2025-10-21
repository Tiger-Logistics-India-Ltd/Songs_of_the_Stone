import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Aggressive autoplay for mobile and desktop
    const video = videoRef.current;
    if (video) {
      // Set attributes programmatically for better mobile support
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.muted = true;
      video.defaultMuted = true;
      video.autoplay = true;

      // Multiple attempts to play
      const attemptPlay = () => {
        video.play()
          .then(() => {
            console.log('Video autoplay started successfully');
          })
          .catch(error => {
            console.log('Retrying video autoplay:', error);
            // Retry after a short delay
            setTimeout(() => {
              video.play().catch(err => console.log('Final autoplay attempt failed:', err));
            }, 100);
          });
      };

      // Try to play immediately
      attemptPlay();

      // Also try when video is loaded
      video.addEventListener('loadeddata', attemptPlay);
      video.addEventListener('canplay', attemptPlay);

      // Ensure it's playing when page becomes visible
      const handleVisibilityChange = () => {
        if (!document.hidden && video.paused) {
          attemptPlay();
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        video.removeEventListener('loadeddata', attemptPlay);
        video.removeEventListener('canplay', attemptPlay);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, []);

  return (
    <section id="home" className="hero-obeetee">
      <video
        ref={videoRef}
        src="/new_hero_video.mp4"
        className="hero-obeetee-img"
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
        <h1 className="hero-chapter-text">THE FIRST CHAPTER</h1>
        <p className="hero-date-text">13-12-2025</p>
      </div>
    </section>
  );
};

export default HeroSection;