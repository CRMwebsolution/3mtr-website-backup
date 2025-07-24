import { useChatbotStore } from '../stores/chatbotStore';

interface ChatbotConfig {
  ID: string;
  region: string;
  render: string;
  stylesheets: string[];
}

interface VG_API {
  open: () => void;
  command: (cmd: string) => void;
  close: () => void;
  isOpen: () => boolean;
}

declare global {
  interface Window {
    VG_API?: VG_API;
    VG_CONFIG?: ChatbotConfig;
  }
}

let chatbotLoaded = false;
let chatbotLoading = false;

export const loadChatbot = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { setLoading, setLoaded } = useChatbotStore.getState();

    // If already loaded, resolve immediately
    if (chatbotLoaded && window.VG_API) {
      setLoaded(true);
      resolve();
      return;
    }

    // If currently loading, wait for it to complete
    if (chatbotLoading) {
      const checkLoaded = () => {
        if (chatbotLoaded && window.VG_API) {
          setLoaded(true);
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
      return;
    }

    chatbotLoading = true;
    setLoading(true);

    try {
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
        // Wait for the API to be available
        const checkAPI = () => {
          if (window.VG_API && typeof window.VG_API.open === 'function') {
            chatbotLoaded = true;
            chatbotLoading = false;
            setLoaded(true);
            setLoading(false);
            resolve();
          } else {
            setTimeout(checkAPI, 100);
          }
        };
        
        // Start checking after a longer delay to allow full initialization
        setTimeout(checkAPI, 1000);
      };

      script.onerror = () => {
        chatbotLoading = false;
        setLoading(false);
        reject(new Error('Failed to load chatbot script'));
      };

      // Set a timeout to prevent infinite waiting
      setTimeout(() => {
        if (!chatbotLoaded) {
          chatbotLoading = false;
          setLoading(false);
          reject(new Error('Chatbot loading timeout'));
        }
      }, 10000);

      document.body.appendChild(script);
    } catch (error) {
      chatbotLoading = false;
      setLoading(false);
      reject(error);
    }
  });
};

export const openChatbot = async (): Promise<void> => {
  const { setOpen } = useChatbotStore.getState();
  
  try {
    await loadChatbot();
    
    if (window.VG_API && typeof window.VG_API.open === 'function') {
      window.VG_API.open();
      setOpen(true);
    } else {
      throw new Error('Chatbot API not available');
    }
  } catch (error) {
    console.warn('Failed to open chatbot:', error);
    // Fallback: redirect to booking page
    window.location.href = '/booking';
  }
};

export const closeChatbot = (): void => {
  const { setOpen } = useChatbotStore.getState();
  
  try {
    if (window.VG_API && typeof window.VG_API.close === 'function') {
      window.VG_API.close();
      setOpen(false);
    }
  } catch (error) {
    console.warn('Failed to close chatbot:', error);
  }
};

export const toggleChatbot = async (): Promise<void> => {
  const { isOpen } = useChatbotStore.getState();
  
  if (isOpen) {
    closeChatbot();
  } else {
    await openChatbot();
  }
};