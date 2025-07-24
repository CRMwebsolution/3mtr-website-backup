import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-4 text-center text-gray-600 dark:text-gray-400 border-t dark:border-gray-800">
      <p>
        Made by{' '}
        <a 
          href="https://stayautomated.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#FF6600] hover:text-[#ff8533] font-medium"
        >
          Southern Automate
        </a>
      </p>
    </footer>
  );
}