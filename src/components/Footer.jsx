import React from 'react';

/**
 * Footer Component
 * 
 * Features:
 * - Simple, clean footer design
 * - Copyright information
 * - Mobile-responsive layout
 * - Expandable for future social media links or additional content
 */
const Footer = () => {
  /**
   * Get current year for copyright
   */
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Footer Logo */}
          <div className="footer-logo">
            <img 
              src="/Images/desktop/new_footer.svg" 
              alt="Inkpot India & Songs of the Stone" 
              className="footer-logo-img"
            />
          </div>
          
          {/* Main Footer Text */}
          <div className="footer-text">
            <p className="copyright">
              Songs of the Stone © {currentYear}. All rights reserved.
            </p>
          </div>
          
          {/* Future: Social Media Links Section */}
          <div className="footer-social" style={{ display: 'none' }}>
            {/* 
              Placeholder for future social media links
              Uncomment and customize when needed:
              
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            */}
          </div>
          
          {/* Future: Additional Links Section */}
          <div className="footer-links" style={{ display: 'none' }}>
            {/* 
              Placeholder for future footer links
              Uncomment and customize when needed:
              
              <a href="#privacy" className="footer-link">Privacy Policy</a>
              <a href="#terms" className="footer-link">Terms of Service</a>
              <a href="#accessibility" className="footer-link">Accessibility</a>
            */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;