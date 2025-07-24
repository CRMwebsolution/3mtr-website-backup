/// <reference types="vite/client" />

interface VG_API {
  open: () => void;
  command: (cmd: string) => void;
  close: () => void;
  isOpen: () => boolean;
}

interface Window {
  VG_API?: VG_API;
  VG_CONFIG: {
    ID: string;
    region: string;
    render: string;
    stylesheets: string[];
  };
}