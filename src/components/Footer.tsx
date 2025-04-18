import React from 'react';
import { Scale } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Scale className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold">Lexi</span>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8">
            <a href="#" className="hover:text-blue-400 transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Lexi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;