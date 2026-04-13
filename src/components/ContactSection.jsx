import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      const firstInput = document.querySelector('#contact input[name="name"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
      }
    }
  }, [inView]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

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

  const saveToGoogleSheets = async (data) => {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzwGA3AYlRmdXU7q0iiGuDUQoaCem3XSAMyJyiGwJmahbBwHmOb_5wGaESs7dPfPCwGRw/exec';
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', data.name);
      formDataToSend.append('email', data.email);
      formDataToSend.append('phone', data.phone);
      formDataToSend.append('message', data.message);
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend,
      });
    } catch (error) {
      console.error('Google Sheets Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormStatus('submitting');
    try {
      const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_name: 'Songs of the Stone Team'
      };
      await Promise.all([
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY),
        saveToGoogleSheets(formData)
      ]);
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setShowSuccessPopup(true);
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

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.2, ease: "easeOut" }
    }
  };

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
      <AnimatePresence mode="wait">
        {showSuccessPopup && <SuccessPopup />}
      </AnimatePresence>

      <section id="contact" className="contact-glass-section" ref={ref}>

        {/* Left panel: text + form */}
        <motion.div
          className="contact-glass-panel"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Header text (from First Chapter style) */}
          <div className="contact-glass-header">
            <span className="contact-glass-tag">CONNECT WITH HERITAGE</span>
            <h2 className="contact-glass-heading">Contact Us</h2>
            <p className="contact-glass-desc">
              We're so glad you found us. Songs of The Stone is an experience for those seeking meaning, connection, and beauty — in art, in stories, and in each other.
              <br /><br />
              Please fill out the form below and our team will connect with you to guide you through the next steps.
            </p>
          </div>

          {/* Form */}
          <form className="contact-glass-form" onSubmit={handleSubmit}>
            <div className="contact-glass-field">
              <input
                className={`contact-glass-input${formErrors.name ? ' cg-error' : ''}`}
                type="text" name="name" placeholder="Name"
                value={formData.name} onChange={handleInputChange}
                disabled={formStatus === 'submitting'}
              />
              {formErrors.name && <span className="cg-error-msg">{formErrors.name}</span>}
            </div>

            <div className="contact-glass-field">
              <input
                className={`contact-glass-input${formErrors.email ? ' cg-error' : ''}`}
                type="email" name="email" placeholder="Email"
                value={formData.email} onChange={handleInputChange}
                disabled={formStatus === 'submitting'}
              />
              {formErrors.email && <span className="cg-error-msg">{formErrors.email}</span>}
            </div>

            <div className="contact-glass-field">
              <input
                className={`contact-glass-input${formErrors.phone ? ' cg-error' : ''}`}
                type="tel" name="phone" placeholder="Phone Number"
                value={formData.phone} onChange={handleInputChange}
                disabled={formStatus === 'submitting'}
              />
              {formErrors.phone && <span className="cg-error-msg">{formErrors.phone}</span>}
            </div>

            <div className="contact-glass-field">
              <textarea
                className={`contact-glass-input contact-glass-textarea${formErrors.message ? ' cg-error' : ''}`}
                name="message"
                placeholder="We'd love to get to know you. What draws you to this world of culture and what do you do in your own life or work?"
                rows="4" value={formData.message} onChange={handleInputChange}
                disabled={formStatus === 'submitting'}
              />
              {formErrors.message && <span className="cg-error-msg">{formErrors.message}</span>}
            </div>

            <button
              type="submit"
              className="contact-glass-btn"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? 'Connecting...' :
               formStatus === 'success'    ? 'Message Sent!' :
               formStatus === 'error'      ? 'Try Again'     : 'Submit'}
            </button>

            {formStatus === 'error' && (
              <p className="cg-form-error">Something went wrong. Please try again.</p>
            )}
          </form>
        </motion.div>

        {/* Right: background image shows freely — no panel */}
        <div className="contact-glass-right-space" aria-hidden="true" />

      </section>
    </>
  );
};

export default ContactSection;