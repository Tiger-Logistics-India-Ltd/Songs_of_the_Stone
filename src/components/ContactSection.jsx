import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

/**
 * Contact Section Component
 * 
 * Features:
 * - Contact form with validation
 * - Image section with inspirational quote
 * - Mobile-responsive grid layout
 * - Form state management and submission handling
 */
const ContactSection = () => {
  /**
   * Form state management
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  /**
   * Intersection Observer for scroll animations
   */
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  /**
   * Smooth scroll to contact section
   */
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  /**
   * Auto-focus on first input when section comes into view
   */
  useEffect(() => {
    if (inView) {
      const firstInput = document.querySelector('#contact input[name="name"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
      }
    }
  }, [inView]);

  /**
   * Handle form input changes
   * Updates form data state and clears related errors
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate form data
   * Returns an object with field names as keys and error messages as values
   */
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Please share your cultural interests';
    }
    
    return errors;
  };

  /**
   * Save form data to Google Sheets
   * Uses form data approach for better CORS compatibility
   */
  const saveToGoogleSheets = async (data) => {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzwGA3AYlRmdXU7q0iiGuDUQoaCem3XSAMyJyiGwJmahbBwHmOb_5wGaESs7dPfPCwGRw/exec'; 
    
    try {
      // Use FormData for better CORS compatibility with Google Apps Script
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('message', data.message);
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
    } catch (error) {
      console.error('Google Sheets Error:', error);
      // Don't fail the form submission if Google Sheets fails
    }
  };

  /**
   * Handle form submission
   * Validates data and sends email using EmailJS + saves to Google Sheets
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormStatus('submitting');
    
    try {
      // EmailJS configuration
      const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;
      
      // Template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_name: 'Songs of the Stone Team'
      };
      
      // Send email using EmailJS and save to Google Sheets in parallel
      await Promise.all([
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY),
        saveToGoogleSheets(formData)
      ]);
      
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Show elegant success popup
      setShowSuccessPopup(true);
      
      // Hide popup after 4 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
        setFormStatus('idle');
      }, 4000);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  /**
   * Animation variants for the contact content
   */
  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.2, ease: "easeOut" }
    }
  };

  /**
   * Success Popup Component
   */
  const SuccessPopup = () => (
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
        transition={{ duration: 0.3, ease: "easeOut" }}
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
        <p className="popup-message">
          Thank you for reaching out. Will get back to you soon!
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {/* Success Popup */}
      <AnimatePresence mode="wait">
        {showSuccessPopup && <SuccessPopup />}
      </AnimatePresence>

      <section id="contact" className="contact" ref={ref}>
        <div className="container">
        <motion.div 
          className="contact-content"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={contentVariants}
        >
          <div className="contact-grid">
            {/* Contact Text and Form Section */}
            <div className="contact-text-section">
              <div className="contact-header">
                <div className="contact-tagline">Connect With Heritage</div>
                
                <h2 className="contact-title">Reserve your Experience</h2>
                
                <p className="contact-description">
                  We’re so glad you found us. Songs of The Stone is an experience for those seeking meaning, connection, and beauty -- in art, in stories, and in each other.

                  Please fill out the form below to reserve your seat for our First Chapter - The Mehtab Ali Niazi Experience at Qutub Minar. Our team will connect with you to guide you through the next steps.

                </p>
              </div>
              
              {/* Contact Form */}
              <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* Name Field */}
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

                  {/* Email Field (single full width) */}
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

                  {/* Phone Field now full width and with clearer placeholder */}
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
                  
                  {/* Message Field */}
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
                  
                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className={`submit-btn ${formStatus}`}
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' && 'Connecting...'}
                    {formStatus === 'success' && 'Message Sent!'}
                    {formStatus === 'error' && 'Try Again'}
                    {formStatus === 'idle' && 'Submit'}
                  </button>
                  
                  {/* Status Messages */}
                  {formStatus === 'success' && (
                    <div className="form-success">
                      Thank you for your interest! We'll be in touch soon.
                    </div>
                  )}
                  
                  {formStatus === 'error' && (
                    <div className="form-error">
                      Something went wrong. Please try again later.
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Image Section - Optimized loading */}
            <div className="contact-image">
              <img 
                src="/contact_real.webp" 
                alt="Musical Heritage and Cultural Expression" 
                className="contact-img"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default ContactSection;