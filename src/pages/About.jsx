import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref: inkpotRef, inView: inkpotInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: songsRef, inView: songsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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

  return (
    <section id="about" className="about">
      <div className="container">
        
        {/* Inkpot India Section */}
        <motion.div 
          className="about-section"
          ref={inkpotRef}
          initial="hidden"
          animate={inkpotInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <div className="about-grid">
            {/* Text Content */}
            <div className="about-text">
              <div className="event-category">About</div>
              
              <div className="about-description">
                <p>
                  India stands at an inflection point in its relationship with its own cultural wealth. 
                  For too long, external narratives dictated what was valued, what was preserved, and what slipped into silence.
                </p>
                <p>
                  Inkpot exists to change that — to bring our music, literature, architecture, and performance back into the light, 
                  not as relics of the past, but as living forces of beauty and imagination. Our task is not only to preserve, 
                  but to reframe — to make our traditions aspirational and relevant in the contemporary global imagination.
                </p>
                <p>
                  Through intimate, thoughtfully crafted experiences, we weave together space, sound, and story. 
                  Each event is an invitation to pause, listen, and rediscover the pulse of Indian artistry in a new light.
                </p>
                <p className="about-signature">
                  <strong>Inkpot</strong> — Contemporary revival of Indian cultural heritage
                </p>
              </div>
            </div>
            
            {/* Image Section - Inkpot */}
            <div className="about-image">
              <picture>
                <source 
                  media="(max-width: 767px)" 
                  srcSet="/Images/Mobile/about_inkpot_600x400 px.svg" 
                  type="image/svg+xml" 
                />
                <source 
                  media="(min-width: 768px)"
                  srcSet="/Images/desktop/Inkpot_600x400 px.svg" 
                  type="image/svg+xml" 
                />
                <img 
                  src="/Images/desktop/Inkpot_600x400 px.svg" 
                  alt="Inkpot — Contemporary revival of Indian cultural heritage" 
                  className="about-img"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </motion.div>

        {/* Songs of the Stone Section */}
        <motion.div 
          className="about-section songs-section"
          ref={songsRef}
          initial="hidden"
          animate={songsInView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <div className="about-grid reverse">
            {/* Image Section - Songs of the Stone */}
            <div className="about-image">
              <picture>
                <source 
                  media="(max-width: 767px)" 
                  srcSet="/Images/Mobile/Songs_of_the_stone_600x400 px.svg" 
                  type="image/svg+xml" 
                />
                <source 
                  media="(min-width: 768px)"
                  srcSet="/Images/desktop/Songs_of_the_stone_800x600 px.svg" 
                  type="image/svg+xml" 
                />
                <img 
                  src="/Images/desktop/Songs_of_the_stone_800x600 px.svg" 
                  alt="Songs of the Stone - Heritage Monuments and Music" 
                  className="about-img"
                  loading="lazy"
                />
              </picture>
            </div>
            
            {/* Text Content */}
            <div className="about-text">
              <div className="event-category">Songs of the Stone</div>
              
              <div className="about-description">
                <p>
                  <strong>Songs of the Stone</strong> is Inkpot's flagship series of after-hours cultural evenings 
                  at Delhi's heritage monuments. Here, space becomes stage, arches become resonance, and stone becomes story.
                </p>
                <p>
                  Our debut edition unfolds at the Qutub Minar, transforming the monument into a living arena of music and memory. 
                  Presented in association with the Delhi Government and the Archaeological Survey of India, the evening celebrates 
                  the dialogue between heritage and contemporary expression.
                </p>
                <p>
                  Each Songs of the Stone evening is intimate by design — an invitation to share in something rare and real: 
                  a moment of connection between music, history, and each other.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
