const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'FirstChapter.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Determine line ending
const crlf = content.includes('\r\n');
const nl = crlf ? '\r\n' : '\n';

// Find the start — look for the second featured-category-section comment
// (the one that comes right before the old fc-gallery-section)
const galleryIdx = content.indexOf('fc-gallery-section');
const lookBack = content.substring(0, galleryIdx);
const startMarker = lookBack.lastIndexOf('{/* Opening Text');

// End marker — everything after the last AnimatePresence closing tag
const endMarker = content.lastIndexOf('</AnimatePresence>') + '</AnimatePresence>'.length;

const newSections = `{/* ═══ AFTER FILM \u2014 video section (from GalleryVideoSection) ═══ */}
      <section id="after-film" className="gvs-video-section" ref={videoSectionRef}>
        <div className="gvs-container">
          <div className="gvs-section-header">
            <span className="gvs-label">After Film</span>
            <h2 className="gvs-title">The First Chapter</h2>
          </div>

          <div className="gvs-video-frame">
            <div className="gvs-video-embed">
              <div id="fc1-youtube-player"></div>
            </div>
          </div>

          <div className="gvs-controls">
            <button className="gvs-ctrl-btn" onClick={skipBackward} aria-label="Rewind 10 seconds" type="button">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" fill="currentColor"/>
                <text x="9" y="14.5" fontSize="6" fill="currentColor" fontWeight="bold">10</text>
              </svg>
            </button>

            <button className="gvs-ctrl-btn gvs-ctrl-play" onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'} type="button">
              {isPlaying ? (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/>
                  <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
                </svg>
              )}
            </button>

            <button className="gvs-ctrl-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'} type="button">
              {isMuted ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
                </svg>
              )}
            </button>

            <button className="gvs-ctrl-btn" onClick={skipForward} aria-label="Forward 10 seconds" type="button">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" fill="currentColor"/>
                <text x="9" y="14.5" fontSize="6" fill="currentColor" fontWeight="bold">10</text>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ GALLERY \u2014 masonry grid + pagination (from GalleryVideoSection) ═══ */}
      <section className="gvs-gallery-section">
        <div className="gvs-container">
          <div className="gvs-section-header">
            <span className="gvs-label">Explore</span>
            <h2 className="gvs-title">Gallery</h2>
            <p className="gvs-subtitle">Some evenings ask nothing of us\u2014 only that we arrive, and stand still long enough to feel the moment fully as it gathers around us.</p>
          </div>

          <div
            className={\`gvs-grid \${gridVisible ? 'gvs-grid-enter' : 'gvs-grid-exit'}\`}
            ref={galleryGridRef}
          >
            {currentImages.map((img, index) => {
              const placement = pattern[index];
              if (!placement) return null;
              return (
                <div
                  key={\`p\${currentPage}-t\${index}\`}
                  className="gvs-tile"
                  style={{ gridColumn: placement.gridColumn, gridRow: placement.gridRow }}
                  ref={el => { tileRefs.current[index] = el; }}
                >
                  <img
                    src={isMobile && img.mobileSrc ? img.mobileSrc : img.src}
                    alt={img.title}
                    className="gvs-tile-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <nav className="gvs-pagination" aria-label="Gallery pagination">
              <button
                className="gvs-page-arrow"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                aria-label="Previous page"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polyline points="15,6 9,12 15,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </button>

              <div className="gvs-page-indicators">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={\`gvs-dot\${i === currentPage ? ' gvs-dot-active' : ''}\`}
                    onClick={() => goToPage(i)}
                    aria-label={\`Page \${i + 1}\`}
                    aria-current={i === currentPage ? 'page' : undefined}
                    type="button"
                  />
                ))}
              </div>

              <button
                className="gvs-page-arrow"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                aria-label="Next page"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polyline points="9,6 15,12 9,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </button>
            </nav>
          )}
        </div>
      </section>

      {/* ═══ PARTNERS \u2014 inlined from PartnersSection (same design, independent code) ═══ */}
      <section className="partners-section" ref={partnersRef}>
        <motion.div
          className="partners-container"
          initial={{ opacity: 0, y: 30 }}
          animate={partnersInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="partners-heading">Partners - First Chapter</h3>

          <div className="partners-scroll-container">
            <button
              className="partners-scroll-btn partners-scroll-btn-left"
              onClick={partnersScrollLeft}
              aria-label="Scroll left"
            >
              \u2039
            </button>

            <div className="partners-scroll-wrapper" ref={partnersScrollRef}>
              <motion.div
                className="partners-grid"
                initial={{ opacity: 0 }}
                animate={partnersInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {fc1Partners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    className="partner-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={partnersInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <picture>
                      <source media="(max-width: 768px)" srcSet={partner.mobile} />
                      <source media="(min-width: 769px)" srcSet={partner.desktop} />
                      <img
                        src={partner.desktop}
                        alt={partner.name}
                        className="partner-logo"
                        loading="lazy"
                      />
                    </picture>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <button
              className="partners-scroll-btn partners-scroll-btn-right"
              onClick={partnersScrollRight}
              aria-label="Scroll right"
            >
              \u203a
            </button>
          </div>
        </motion.div>
      </section>

      {/* ═══ CONTACT \u2014 inlined from ContactSection (same design) ═══ */}
      <section id="fc-contact" className="contact" ref={contactRef}>
        <div className="container">
          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="contact-grid">
              <div className="contact-text-section">
                <div className="contact-header">
                  <div className="contact-tagline">Connect With Heritage</div>
                  <h2 className="contact-title">Reserve your Experience</h2>
                  <p className="contact-description">
                    We're so glad you found us. Songs of The Stone is an experience for those seeking meaning, connection, and beauty -- in art, in stories, and in each other.
                    Please fill out the form below to reserve your seat for our First Chapter - The Mehtab Ali Niazi Experience at Qutub Minar. Our team will connect with you to guide you through the next steps.
                  </p>
                </div>

                <div className="contact-form-wrapper">
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={formErrors.name ? 'error' : ''}
                        disabled={formStatus === 'submitting'}
                      />
                      {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>

                    <div className="form-field full-width-input">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? 'error' : ''}
                        disabled={formStatus === 'submitting'}
                      />
                      {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>

                    <div className="form-field full-width-input">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={formErrors.phone ? 'error' : ''}
                        disabled={formStatus === 'submitting'}
                      />
                      {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                    </div>

                    <div className="form-field">
                      <textarea
                        name="message"
                        placeholder="We'd love to get to know you. What draws you to this world of culture and what do you do in your own life or work?"
                        rows="4"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={formErrors.message ? 'error' : ''}
                        disabled={formStatus === 'submitting'}
                      ></textarea>
                      {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                    </div>

                    <button
                      type="submit"
                      className={\`submit-btn \${formStatus}\`}
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' && 'Connecting...'}
                      {formStatus === 'success' && 'Message Sent!'}
                      {formStatus === 'error' && 'Try Again'}
                      {formStatus === 'idle' && 'Submit'}
                    </button>

                    {formStatus === 'success' && (
                      <div className="form-success">Thank you for your interest! We'll be in touch soon.</div>
                    )}
                    {formStatus === 'error' && (
                      <div className="form-error">Something went wrong. Please try again later.</div>
                    )}
                  </form>
                </div>
              </div>

              <div className="contact-image">
                <img
                  src="/contact_real.webp"
                  alt="Musical Heritage and Cultural Expression"
                  className="contact-img"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Popup */}
      <AnimatePresence mode="wait">
        {showSuccessPopup && (
          <motion.div
            key="success-popup-overlay"
            className="success-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowSuccessPopup(false)}
          >
            <motion.div
              className="success-popup"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="popup-title">Thank You!</h3>
              <p className="popup-message">Thank you for reaching out. Will get back to you soon!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>`;

// Build the new content: keep from start to startMarker, insert new sections, keep the rest
const before = content.substring(0, startMarker);
const after = content.substring(endMarker);

const newContent = before + newSections.split('\n').join(nl) + after;
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Done! File rewritten successfully.');
console.log('New file length:', newContent.length);
