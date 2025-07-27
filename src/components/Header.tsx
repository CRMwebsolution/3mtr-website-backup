import React, { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ui/theme-toggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isBookingPage = location.pathname === '/booking';

  if (isBookingPage) return null;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[#003366] dark:text-[#4d8cc8]">
            3 M Trailer Rental
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Home</Link>
            <a href="/#about" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">About</a>
            <a href="/#trailers" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Trailers</a>
            <Link to="/availability" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Availability</Link>
            <a href="/#pricing" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Pricing</a>
            <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Blog</Link>
            <a href="/#contact" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Contact</a>
            <Link to="/booking" className="text-[#FF6600] font-semibold hover:text-[#ff8533]">
              Book Now
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center space-x-2">
              <Phone className="text-[#FF6600]" size={16} />
              <span className="text-[#003366] dark:text-[#4d8cc8] font-semibold text-sm">Contact Us: (252) 622-7921</span>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <div className="flex items-center space-x-1 ml-2">
              <Phone className="text-[#FF6600]" size={14} />
              <span className="text-[#003366] dark:text-[#4d8cc8] font-semibold text-xs">(252) 622-7921</span>
            </div>
            <button 
              className="ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="text-gray-700 dark:text-gray-300" /> : <Menu className="text-gray-700 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Home</Link>
              <a href="/#about" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">About</a>
              <a href="/#trailers" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Trailers</a>
              <Link to="/availability" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Availability</Link>
              <a href="/#pricing" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Pricing</a>
              <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Blog</Link>
              <a href="/#contact" className="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-[#FF6600]">Contact</a>
              <Link to="/booking" className="text-[#FF6600] font-semibold hover:text-[#ff8533]">
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}