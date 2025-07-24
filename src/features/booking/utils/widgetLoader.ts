export const initializeBookingWidget = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Pre-configure widget settings
      window.VG_CONFIG = {
        ID: "qzkkvzov2a803ivk",
        region: 'na',
        render: 'full-width',
        stylesheets: [
          "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
        ]
      };

      // Create script element
      const script = document.createElement("script");
      script.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
      script.defer = true;
      script.async = true; // Add async loading
      
      // Resolve immediately when widget is found
      const observer = new MutationObserver(() => {
        const widget = document.querySelector('.vg-widget');
        if (widget) {
          observer.disconnect();
          resolve();
        }
      });

      // Start observing as soon as script is added
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Handle script load error
      script.onerror = () => {
        observer.disconnect();
        reject(new Error('Failed to load booking widget script'));
      };

      // Set timeout for widget initialization
      setTimeout(() => {
        observer.disconnect();
        resolve(); // Resolve anyway to prevent blocking
      }, 5000);

      // Add script to document
      document.body.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });
};