import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const allPress = [
  {
    id: 1,
    image: '/press/1.png',
    publication: 'Condé Nast Traveller',
    title: "How Delhi's heritage sites are serving modern culture",
    url: 'https://www.cntraveller.in/story/how-delhis-heritage-sites-are-serving-modern-culture/',
    chapter: 'Second Chapter'
  },
  {
    id: 2,
    image: '/press/2.png',
    publication: 'The Patriot',
    title: 'Songs of the Stone: A musical evening',
    url: 'https://thepatriot.in/listicle/songs-of-the-stone-a-musical-evening-82507',
    chapter: 'Second Chapter'
  },
  {
    id: 3,
    image: '/press/3.png',
    publication: 'News18',
    title: "Flautist Rakesh Chaurasia to perform at 2nd 'Songs of the Stone' at Qutub Minar",
    url: 'https://www.news18.com/agency-feeds/flautist-rakesh-chaurasia-to-perform-at-2nd-songs-of-the-stone-at-qutub-minar-9940191.html',
    chapter: 'Second Chapter'
  },
  {
    id: 4,
    image: '/press/4.png',
    publication: 'India Today',
    title: 'New lease to tradition | Rakesh Chaurasia at Qutub Minar',
    url: 'https://www.indiatoday.in/amp/magazine/leisure/story/20260309-new-lease-to-tradition-rakesh-chaurasia-at-qutub-minar-2875612-2026-02-28',
    chapter: 'Second Chapter'
  },
  {
    id: 5,
    image: '/press/5.png',
    publication: 'PTI',
    title: "Flautist Rakesh Chaurasia to perform at 2nd 'Songs of the Stone' at Qutub Minar",
    url: 'https://www.ptinews.com/story/national/flautist-rakesh-chaurasia-to-perform-at-2nd-songs-of-the-stone-at-qutub-minar/3431546',
    chapter: 'Second Chapter'
  },
  {
    id: 6,
    image: '/press/6.png',
    publication: 'The Wire',
    title: 'Songs of the Stone: A Saga of Sound, Space and Story Brings the Qutub Minar into a New Cultural Conversation',
    url: 'https://thewire.in/ptiprnews/songs-of-the-stone-a-saga-of-sound-space-and-story-brings-the-qutub-minar-into-a-new-cultural-conversation',
    chapter: 'First Chapter'
  },
  {
    id: 7,
    image: '/press/7.png',
    publication: 'The Luxury Chronicle',
    title: 'India – Songs of the Stone Opens a New Cultural Chapter at the Qutub Minar',
    url: 'https://www.theluxurychronicle.com/india-songs-of-the-stone-opens-a-new-cultural-chapter-at-the-qutub-minar/',
    chapter: 'First Chapter'
  },
  {
    id: 8,
    image: '/press/8.png',
    publication: 'ANI News',
    title: 'Songs of the Stone: A Saga of Sound, Space and Story Brings the Qutub Minar into a New Cultural Conversation',
    url: 'https://www.aninews.in/news/business/songs-of-the-stone-a-saga-of-sound-space-and-story-brings-the-qutub-minar-into-a-new-cultural-conversation20251217174104/',
    chapter: 'First Chapter'
  }
];

const PressCard = ({ item, index }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.a
      ref={ref}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="press-page-card"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    >
      <div className="press-page-card-image-wrap">
        <img src={item.image} alt={item.title} className="press-page-card-image" loading="lazy" />
        <span className="press-page-chapter-badge">{item.chapter}</span>
      </div>
      <div className="press-page-card-content">
        <span className="press-page-publication">{item.publication}</span>
        <h3 className="press-page-title">{item.title}</h3>
        <span className="press-page-readmore">
          Read Article <span className="press-readmore-arrow">→</span>
        </span>
      </div>
    </motion.a>
  );
};

const Press = () => {
  return (
    <div className="press-page">
      {/* Press Grid */}
      <section className="press-page-grid-section">
        <div className="press-page-grid">
          {allPress.map((item, i) => (
            <PressCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Press;
