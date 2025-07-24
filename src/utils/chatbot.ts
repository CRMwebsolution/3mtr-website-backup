// Utility function to interact with TIXAE Agents widget
const waitForChatbot = (maxAttempts = 20): Promise<void> => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const checkAPI = () => {
      try {
        // Check if the widget container exists and is ready
        const container = document.getElementById('VG_OVERLAY_CONTAINER');
        const hasWidget = container?.querySelector('.vg-widget');
        
        if (window.VG_API && typeof window.VG_API.open === 'function' && hasWidget) {
          resolve();
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkAPI, 500);
        } else {
          reject(new Error('Chatbot initialization timeout'));
        }
      } catch (error) {
        reject(error);
      }
    };

    // Start checking after a short delay to allow for initial script loading
    setTimeout(checkAPI, 100);
  });
};

export const openChatbotBooking = async () => {
  try {
    // Ensure VG_CONFIG is properly set before proceeding
    if (!window.VG_CONFIG) {
      window.VG_CONFIG = {
        ID: "qzkkvzov2a803ivk",
        region: 'na',
        render: 'bottom-right',
        stylesheets: [
          "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
        ]
      };
    }

    // Wait for chatbot to be ready
    await waitForChatbot();
    
    // Double check API availability
    if (!window.VG_API || typeof window.VG_API.open !== 'function') {
      throw new Error('Chatbot API not properly initialized');
    }

    // Open the widget
    window.VG_API.open();
    
    // Wait for the widget to fully open
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Send the command if available
    if (typeof window.VG_API.command === 'function') {
      window.VG_API.command('book-trailer');
    }
  } catch (error) {
    // Log error but don't throw to prevent UI disruption
    console.warn('Chatbot interaction failed:', error);
    
    // Fallback behavior - redirect to booking page
    window.location.href = '/booking';
  }
};