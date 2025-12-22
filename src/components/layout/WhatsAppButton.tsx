

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '919572031045'; // Your WhatsApp number (without +)
  const message = 'Hello RK Jewellers';

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 8 seconds
    const showTimer = setTimeout(() => {
      setShowPopup(true);

      // Hide popup after 6 seconds of being shown
      const hideTimer = setTimeout(() => {
        setShowPopup(false);
      }, 6000);

      return () => clearTimeout(hideTimer);
    }, 8000);

    return () => clearTimeout(showTimer);
  }, []);

  return (
    <>
      {/* Message Popup */}
      {showPopup && (
        <div className="fixed bottom-24 right-6 z-50 bg-white text-black px-4 py-2 rounded-lg shadow-lg border border-green-500 max-w-xs animate-bounce">
          💬 Need help? <strong>Chat with us</strong>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
    </>
  );
};

export default WhatsAppButton;
