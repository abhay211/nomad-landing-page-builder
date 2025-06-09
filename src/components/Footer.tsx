
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#37666F' }} className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="font-albert-sans font-bold text-2xl text-white mb-4">
              Nomad
            </h3>
            <p className="font-albert-sans text-gray-300 text-sm leading-relaxed mb-6">
              Making group travel planning simple, collaborative, and stress-free with AI-powered tools and local expertise.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-sage-300 rounded-full flex items-center justify-center">
                <Facebook size={20} className="text-white" />
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Twitter size={20} className="text-white" />
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Instagram size={20} className="text-white" />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h4 className="font-albert-sans font-medium text-white text-lg mb-6">
              About
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h4 className="font-albert-sans font-medium text-white text-lg mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  Destination
                </a>
              </li>
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  Trip Planning
                </a>
              </li>
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  Adventure Travel
                </a>
              </li>
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  Group Activities
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="font-albert-sans font-medium text-white text-lg mb-6">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-albert-sans text-gray-300 hover:text-white transition-colors">
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
