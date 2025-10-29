// EmailJS Configuration
// Uses environment variables for better security

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_kc85ggl',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_bd9mmgt',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'hU7gdDpwzNyOeHzah'
};

// Example of how to get these values:
// 1. Go to https://www.emailjs.com/
// 2. Sign in to your account
// 3. Go to Email Services - copy the Service IDgit 
// 4. Go to Email Templates - copy the Template ID  
// 5. Go to Account (Integration tab) - copy the Public Key