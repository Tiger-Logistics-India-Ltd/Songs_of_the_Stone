import React from 'react';

/**
 * WhatsApp Floating Widget Component
 * 
 * Displays a floating WhatsApp button in the bottom-right corner
 * that opens WhatsApp chat with the provided phone number
 */
const WhatsAppWidget = () => {
  const phoneNumber = '919205304666'; // +91-9205304666 in WhatsApp format
  const message = 'Hello! I would like to inquire about your upcoming event.';
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="whatsapp-widget" onClick={handleWhatsAppClick}>
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 0C7.164 0 0 7.164 0 16c0 2.825.738 5.607 2.138 8.049L.057 31.757l8.011-2.053A15.902 15.902 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.333c-2.503 0-4.944-.693-7.084-2.004l-.508-.312-5.27 1.35 1.378-5.072-.342-.527A13.228 13.228 0 012.667 16c0-7.364 5.97-13.333 13.333-13.333S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.302-9.975c-.4-.2-2.366-1.166-2.733-1.3-.366-.133-.633-.2-.9.2-.266.4-1.033 1.3-1.266 1.566-.234.267-.467.3-.867.1-.4-.2-1.688-.622-3.214-1.982-1.188-1.06-1.99-2.368-2.224-2.768-.233-.4-.025-.616.176-.815.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.266.067-.5-.033-.7-.1-.2-.9-2.166-1.233-2.966-.325-.778-.655-.673-.9-.686-.233-.012-.5-.015-.767-.015s-.7.1-1.066.5c-.367.4-1.4 1.366-1.4 3.333s1.433 3.866 1.633 4.133c.2.266 2.82 4.302 6.834 6.034.954.412 1.699.659 2.279.843.958.304 1.83.261 2.519.158.768-.115 2.366-.967 2.699-1.9.333-.933.333-1.733.233-1.9-.1-.166-.366-.266-.766-.466z"/>
      </svg>
    </div>
  );
};

export default WhatsAppWidget;
