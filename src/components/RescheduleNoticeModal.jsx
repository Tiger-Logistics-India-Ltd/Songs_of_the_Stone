import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Reschedule Notice Modal (Home)
 *
 * One-time popup for first-time visitors announcing that the 10 October
 * evening concert (Amrita Kaur, Third Chapter) has been rescheduled to
 * 11 October, 7 PM onwards. Shown once per browser via localStorage.
 */
const NOTICE_KEY = 'sots_reschedule_notice_oct11_v1';

const RescheduleNoticeModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!localStorage.getItem(NOTICE_KEY);
    } catch {
      seen = false;
    }
    if (seen) return;

    const timer = setTimeout(() => setShow(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(NOTICE_KEY, '1');
    } catch {
      // localStorage unavailable — notice will simply show again next visit
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="success-popup-overlay reschedule-notice-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={dismiss}
        >
          <motion.div
            className="success-popup reschedule-notice-popup"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reschedule-notice-title"
          >
            <button
              type="button"
              className="reschedule-notice-close"
              onClick={dismiss}
              aria-label="Close notice"
            >
              &times;
            </button>

            <span className="reschedule-notice-eyebrow">Live The Legacy</span>
            <h3 className="popup-title" id="reschedule-notice-title">Notice of Rescheduling</h3>
            <p className="reschedule-notice-subhead">10th October Evening Concert</p>

            <p className="popup-message">
              Following discussions with the concerned authorities and careful consideration
              of the planned protest on 10th October, the Evening Concert of Amrita Kaur at
              Purana Qila, New Delhi has been rescheduled from 10th October, 7 PM to{' '}
              <strong>11th October, 7 PM onwards</strong>.
            </p>
            <p className="popup-message">
              The morning concert on 11th October at 7 AM remains as scheduled.
            </p>
            <p className="popup-message">
              Guests who purchased tickets for the evening concert via District may choose to
              attend the rescheduled concert on 11th October or opt for a full refund through
              District.
            </p>

            <div className="reschedule-notice-actions">
              <Link to="/third-chapter" className="event-btn" onClick={dismiss}>
                View Event Details
              </Link>
              <button type="button" className="event-btn event-btn-ghost" onClick={dismiss}>
                Got It
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RescheduleNoticeModal;
