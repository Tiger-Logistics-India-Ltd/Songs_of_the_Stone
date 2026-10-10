import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Dusk to Dawn — the two-moment section of the Third Chapter.
 *
 * The section is one unbroken night: the sky runs from dusk on the left,
 * through deep night, into first light on the right, and a single skyline
 * spans the whole width beneath it. The two concerts sit on that sky as
 * glass panels, so the design says what the event says — one night, two
 * moments — rather than presenting two unrelated cards.
 *
 * Everything is drawn in SVG and CSS: no image assets, and it stays crisp
 * at any width.
 */

/* Fixed so the sky is identical on every render — no random positions. */
const STARS = [
  { x: 4,  y: 18, s: 1.6, d: 0.0, t: 3.4 }, { x: 9,  y: 42, s: 1.1, d: 1.2, t: 4.1 },
  { x: 14, y: 9,  s: 2.0, d: 0.6, t: 3.0 }, { x: 18, y: 30, s: 1.2, d: 2.1, t: 4.6 },
  { x: 22, y: 55, s: 1.0, d: 1.6, t: 3.8 }, { x: 26, y: 14, s: 1.7, d: 0.3, t: 4.3 },
  { x: 30, y: 38, s: 1.3, d: 2.6, t: 3.2 }, { x: 34, y: 7,  s: 2.2, d: 1.0, t: 5.0 },
  { x: 37, y: 26, s: 1.1, d: 3.1, t: 3.6 }, { x: 41, y: 48, s: 1.5, d: 0.8, t: 4.4 },
  { x: 45, y: 12, s: 1.9, d: 2.2, t: 3.1 }, { x: 48, y: 33, s: 1.2, d: 1.4, t: 4.8 },
  { x: 52, y: 20, s: 2.1, d: 0.4, t: 3.9 }, { x: 55, y: 51, s: 1.0, d: 2.9, t: 4.2 },
  { x: 59, y: 8,  s: 1.6, d: 1.8, t: 3.3 }, { x: 62, y: 29, s: 1.3, d: 0.9, t: 4.7 },
  { x: 66, y: 44, s: 1.1, d: 2.4, t: 3.5 }, { x: 69, y: 16, s: 1.8, d: 1.1, t: 4.0 },
  { x: 73, y: 35, s: 1.2, d: 3.3, t: 3.7 }, { x: 76, y: 11, s: 1.4, d: 0.2, t: 4.5 },
  { x: 80, y: 27, s: 1.0, d: 2.0, t: 3.2 }, { x: 84, y: 6,  s: 1.5, d: 1.5, t: 4.9 },
  { x: 88, y: 22, s: 0.9, d: 2.7, t: 3.4 }, { x: 92, y: 13, s: 1.1, d: 0.7, t: 4.1 },
  { x: 96, y: 31, s: 0.8, d: 1.9, t: 3.8 }, { x: 7,  y: 62, s: 1.0, d: 2.3, t: 4.4 },
  { x: 44, y: 62, s: 0.9, d: 1.3, t: 3.6 }, { x: 64, y: 58, s: 0.9, d: 2.8, t: 4.2 },
];

/* Fine line-art sigil — a crescent over a horizon, for the evening. */
const DuskSigil = () => (
  <svg className="dd-sigil" viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <circle cx="50" cy="42" r="27" stroke="currentColor" strokeWidth="0.9" opacity="0.35" />
    <path
      d="M58 26a20 20 0 1 0 0 32 17 17 0 0 1 0-32z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
    <path d="M14 78h72" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
    <path d="M26 86h20M56 86h18" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
    <g opacity="0.7">
      <path d="M22 22l1.6 3.6L27 27l-3.4 1.4L22 32l-1.6-3.6L17 27l3.4-1.4z" fill="currentColor" />
      <path d="M79 46l1.1 2.5 2.4 1-2.4 1-1.1 2.5-1.1-2.5-2.4-1 2.4-1z" fill="currentColor" />
    </g>
  </svg>
);

/* Fine line-art sigil — a sun lifting off the horizon, for the morning. */
const DawnSigil = () => (
  <svg className="dd-sigil" viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <circle cx="50" cy="52" r="19" stroke="currentColor" strokeWidth="1.1" />
    <g stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.75">
      <path d="M50 20v-9" />
      <path d="M29 29l-6.4-6.4" />
      <path d="M71 29l6.4-6.4" />
      <path d="M21 52h-9" />
      <path d="M79 52h9" />
    </g>
    <path d="M14 78h72" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
    <path d="M26 86h20M56 86h18" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
    <g stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.55" fill="none">
      <path d="M20 40c2-2.4 4-2.4 5.4 0 1.4-2.4 3.4-2.4 5.4 0" />
    </g>
  </svg>
);

/* One continuous skyline running the full width, beneath both panels. */
const Skyline = () => (
  <svg
    className="dd-skyline"
    viewBox="0 0 1600 220"
    preserveAspectRatio="none"
    fill="none"
    aria-hidden="true"
  >
    <g fill="#05060f">
      <path d="M0 200h1600v20H0z" />
      {/* domed pavilions and minarets, spaced irregularly like a real skyline */}
      <path d="M60 200v-46a22 22 0 0 1 44 0v46z" />
      <path d="M82 132c0-11 5-19 5-19s5 8 5 19z" />
      <path d="M150 200v-74l10-18 10 18v74z" />
      <path d="M232 200v-38h52v38z" />
      <path d="M258 162c0-14 7-24 7-24s7 10 7 24z" />
      <path d="M360 200v-96l11-20 11 20v96z" />
      <path d="M440 200v-54a26 26 0 0 1 52 0v54z" />
      <path d="M466 122c0-13 6-22 6-22s6 9 6 22z" />
      <path d="M560 200v-34h44v34z" />
      <path d="M660 200v-86l9-16 9 16v86z" />
      <path d="M730 200v-44a24 24 0 0 1 48 0v44z" />
      <path d="M754 128c0-12 6-21 6-21s6 9 6 21z" />
      <path d="M850 200v-30h58v30z" />
      <path d="M960 200v-92l10-18 10 18v92z" />
      <path d="M1040 200v-50a25 25 0 0 1 50 0v50z" />
      <path d="M1065 126c0-13 6-22 6-22s6 9 6 22z" />
      <path d="M1150 200v-36h48v36z" />
      <path d="M1250 200v-80l9-17 9 17v80z" />
      <path d="M1330 200v-42a23 23 0 0 1 46 0v42z" />
      <path d="M1353 130c0-12 6-20 6-20s6 8 6 20z" />
      <path d="M1440 200v-28h54v28z" />
      <path d="M1540 200v-88l10-18 10 18v88z" />
    </g>
  </svg>
);

const moments = [
  {
    id: 'dusk',
    label: 'Moment One',
    title: 'Dusk',
    day: 'Sunday, 11 October 2026',
    time: '7 PM – 10 PM',
    description:
      'An atmospheric evening performance, as the light leaves the stone and the sky turns. Its own setlist, its own mood, its own rhythm.',
    Sigil: DuskSigil,
  },
  {
    id: 'dawn',
    label: 'Moment Two',
    title: 'Dawn',
    day: 'Sunday, 11 October 2026',
    time: '7 AM – 10 AM',
    description:
      'A contemplative morning experience, met in the quiet before the city wakes — a different setlist, a different stillness.',
    Sigil: DawnSigil,
  },
];

const DuskToDawn = () => {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });

  return (
    <section className="dd-section" ref={ref}>
      {/* ── The sky: dusk on the left, deep night, first light on the right ── */}
      <div className="dd-sky" aria-hidden="true">
        <div className="dd-sky-base" />
        <div className="dd-glow dd-glow-dusk" />
        <div className="dd-glow dd-glow-dawn" />
        <div className="dd-stars">
          {STARS.map((star, i) => (
            <span
              key={i}
              className="dd-star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.s}px`,
                height: `${star.s}px`,
                animationDelay: `${star.d}s`,
                animationDuration: `${star.t}s`,
              }}
            />
          ))}
        </div>
        <Skyline />
      </div>

      {/* ── Content ── */}
      <div className="dd-inner">
        <motion.header
          className="dd-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="dd-eyebrow">From Dusk to Dawn</span>
          <h2 className="dd-heading">One Night, Two Moments</h2>
          <p className="dd-standfirst">
            The sun sets on one concert and rises on another. Between them, a single night.
          </p>
        </motion.header>

        <div className="dd-rail">
          {moments.map((moment, i) => {
            const { Sigil } = moment;
            return (
              <React.Fragment key={moment.id}>
                {i === 1 && (
                  <motion.div
                    className="dd-thread"
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.7 }}
                  >
                    <span className="dd-thread-line" />
                    <span className="dd-thread-mark" />
                    <span className="dd-thread-line" />
                  </motion.div>
                )}

                <motion.article
                  className={`dd-panel dd-panel-${moment.id}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.85, delay: 0.25 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="dd-corner dd-corner-tl" aria-hidden="true" />
                  <span className="dd-corner dd-corner-br" aria-hidden="true" />

                  <Sigil />

                  <span className="dd-label">{moment.label}</span>
                  <h3 className="dd-title">{moment.title}</h3>

                  <div className="dd-rule" aria-hidden="true">
                    <span className="dd-rule-line" />
                    <span className="dd-rule-dot" />
                    <span className="dd-rule-line" />
                  </div>

                  <div className="dd-time">{moment.time}</div>
                  <div className="dd-day">{moment.day}</div>

                  <p className="dd-desc">{moment.description}</p>
                </motion.article>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DuskToDawn;
