import React from 'react';

const HeroSection = () => {
  return (
    <section id="home" className="hero-obeetee">
      <video
        src="/new_hero_video.mp4"
        className="hero-obeetee-img"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-text-overlay">
        <h1 className="hero-chapter-text">THE FIRST CHAPTER</h1>
        <p className="hero-date-text">13-12-2025</p>
      </div>
    </section>
  );
};

export default HeroSection;