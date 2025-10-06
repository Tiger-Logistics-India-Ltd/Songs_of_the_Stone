import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [formErrors, setFormErrors] = useState({});

  /**
   * Intersection Observer for scroll animations
   */
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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
    
    if (!formData.message.trim()) {
      errors.message = 'Please share your cultural interests';
    }
    
    return errors;
  };

  /**
   * Handle form submission
   * Validates data and simulates API call
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
      // Simulate API call - replace with actual submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
      
    } catch (error) {
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

  return (
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
                
                <h2 className="contact-title">Begin Your Cultural Journey</h2>
                
                <p className="contact-description">
                  Step into a world where every experience is curated with passion. 
                  Let us craft moments that resonate with your soul and connect you 
                  with the timeless beauty of our cultural heritage.
                </p>
              </div>
              
              {/* Contact Form */}
              <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* Form Row - Name and Email */}
                  <div className="form-row">
                    <div className="form-field">
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Your Name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className={formErrors.name ? 'error' : ''}
                        disabled={formStatus === 'submitting'}
                      />
                      {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>
                    
                    <div className="form-field">
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Your Email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? 'error' : ''}
                        disabled={formStatus === 'submitting'}
                      />
                      {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>
                  </div>
                  
                  {/* Message Field */}
                  <div className="form-field">
                    <textarea 
                      name="message"
                      placeholder="Share your cultural interests and how we can help you connect with heritage..."
                      rows="5"
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
                    {formStatus === 'idle' && 'Connect With Us'}
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

            {/* Contact Image Section */}
            <div className="contact-image-section">
              <div className="contact-image-wrapper">
                <img 
                  src="/music.jpeg" 
                  alt="Musical Heritage and Cultural Expression" 
                  className="contact-img"
                  loading="lazy"
                />
                
                <div className="contact-image-overlay">
                  <div className="overlay-text">
                    <span className="overlay-quote">
                      "Music is the bridge between the earthly and the divine"
                    </span>
                    <span className="overlay-author">- Ancient Wisdom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;