import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* ---- Top row: logo + tagline ---- */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link">
            <img
              src="/Images/desktop/new_footer.svg"
              alt="Songs of the Stone"
              className="footer-logo-img"
              loading="lazy"
            />
          </Link>
          {/* <p className="footer-tagline">
            Art. Architecture. Performance.<br />
            A Musical Evening at Heritage Sites.
          </p> */}
        </div>

        {/* ---- Middle row: nav columns + social ---- */}
        <div className="footer-grid">

          {/* Column 1 — Experiences */}
          <div className="footer-col">
            <h2 className="footer-col-heading">Experiences</h2>
            <nav aria-label="Experiences navigation">
              <ul className="footer-nav-list">
                <li><Link to="/first-chapter" className="footer-nav-link">Chapter One — Mehtab Ali Niazi</Link></li>
                <li><Link to="/second-chapter" className="footer-nav-link">Chapter Two — Live the Legacy</Link></li>
              </ul>
            </nav>
          </div>

          {/* Column 2 -- Explore */}
          <div className="footer-col">
            <h2 className="footer-col-heading">Explore</h2>
            <nav aria-label="Explore navigation">
              <ul className="footer-nav-list">
                <li><Link to="/" className="footer-nav-link">Home</Link></li>
                <li><Link to="/about" className="footer-nav-link">About</Link></li>
                <li><Link to="/press" className="footer-nav-link">Press</Link></li>
              </ul>
            </nav>
          </div>

          {/* Column 3 -- Connect */}
          <div className="footer-col">
            <h2 className="footer-col-heading">Connect</h2>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="https://www.instagram.com/songsofthestone/"
                  className="footer-nav-link footer-social-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61582672430070"
                  className="footer-nav-link footer-social-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919205304666?text=Hello!%20I%20would%20like%20to%20inquire%20about%20Songs%20of%20the%20Stone."
                  className="footer-nav-link footer-social-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact us on WhatsApp"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.549 4.205 1.594 6.037L.043 23.788l6.008-1.539A11.927 11.927 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.476 16.519c-.3-.15-1.775-.876-2.05-.975-.274-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.266-.467-2.411-1.487-.891-.795-1.492-1.776-1.668-2.076-.175-.3-.019-.462.132-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.583-.491-.504-.675-.514-.175-.009-.375-.011-.575-.011s-.525.075-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.115 3.227 5.126 4.526.717.309 1.274.494 1.709.632.719.228 1.373.196 1.889.119.576-.086 1.775-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ---- Bottom row: copyright + legal ---- */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Songs of the Stone · Inkpot India. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <Link to="/privacy-policy" className="footer-legal-link">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="footer-legal-link">Terms &amp; Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
