import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Chatbot() {
  const location = useLocation();
  
  // Don't render chatbot on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const loadChatbotScript = () => {
      // Check if chatbot script is already loaded
      const existingScript = document.querySelector('script[src*="vg_bundle.js"]');
      if (existingScript) {
        return;
      }

      // Configure the chatbot
      window.VG_CONFIG = {
        ID: "qzkkvzov2a803ivk",
        region: 'na',
        render: 'bottom-right',
        stylesheets: [
          "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
        ]
      };

      // Create and load the script
      const script = document.createElement("script");
      script.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
      script.defer = true;
      script.async = true;

      script.onload = () => {
        console.log('Chatbot script loaded successfully');
      };

      script.onerror = () => {
        console.error('Failed to load chatbot script');
      };

      document.body.appendChild(script);
    };

    // Use requestIdleCallback for better performance, with fallback to setTimeout
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadChatbotScript, { timeout: 2000 });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(loadChatbotScript, 500);
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      const scriptToRemove = document.querySelector('script[src*="vg_bundle.js"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <div id="VG_OVERLAY_CONTAINER" style={{ width: 0, height: 0 }}>
      {/* TIXAE Agents widget will render here when loaded */}
    </div>
  );
}