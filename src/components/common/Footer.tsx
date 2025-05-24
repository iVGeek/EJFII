import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-white dark:bg-gray-800 py-6 mt-8 shadow-inner">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <span className="text-gray-600 dark:text-gray-400 text-sm">&copy; {new Date().getFullYear()} EJ Foundation. All rights reserved.</span>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a href="/about" className="text-primary hover:underline">About</a>
        <a href="/resources" className="text-primary hover:underline">Resources</a>
        <a href="/contact" className="text-primary hover:underline">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;
