import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  icon: Icon,
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center";
  
  const variants = {
    primary: "bg-[#FF6600] hover:bg-[#ff8533] text-white",
    secondary: "bg-[#003366] hover:bg-[#004080] text-white",
    outline: "border-2 border-white hover:bg-white hover:text-[#003366] text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
      {Icon && <Icon className="ml-2" size={20} />}
    </button>
  );
}