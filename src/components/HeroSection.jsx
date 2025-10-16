import React from 'react';

const HeroSection = () => {
  return (
    <section id="home" className="hero-obeetee">
      <picture>
        <source 
          media="(max-width: 767px)" 
          srcSet="/Images/Mobile/hero.svg"
        />
        <source 
          media="(min-width: 768px)" 
          srcSet="/Images/desktop/new_hero.png"
        />
        <img
          src="/Images/desktop/new_hero.png"
          alt="Songs of the Stone"
          className="hero-obeetee-img"
          loading="priority"
        />
      </picture>
    </section>
  );
};

export default HeroSection;