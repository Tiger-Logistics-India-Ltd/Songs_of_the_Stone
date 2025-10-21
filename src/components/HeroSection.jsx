import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays on mount
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.log('Video autoplay prevented:', error);
      });
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
        loop
        playsInline
        preload="auto"
      />
      <div className="hero-text-overlay">
        <h1 className="hero-chapter-text">THE FIRST CHAPTER</h1>
        <p className="hero-date-text">13-12-2025</p>
      </div>
    </section>
  );
};

export default HeroSection;