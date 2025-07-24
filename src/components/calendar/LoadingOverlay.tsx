import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = 'Updating...' }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="flex items-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-[#FF6600]" />
        <span className="text-gray-700 font-medium">{message}</span>
      </div>
    </div>
  );
}