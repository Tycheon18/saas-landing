import React, { useState, useEffect } from 'react';
import { Cloud, Menu, X } from 'lucide-react';

const Navbar = ({ logo = 'CloudSync', links = [], ctaText = '무료 시작', ctaHref = '#' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (href) => (e) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-200 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="flex items-center gap-2">
            <Cloud className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">{logo}</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <a key={i} href={link.href} onClick={smoothScroll(link.href)}
                className="text-gray-700 hover:text-primary-600 transition-colors text-sm font-medium">
                {link.label}
              </a>
            ))}
            <a href={ctaHref} onClick={smoothScroll(ctaHref)}
              className="px-5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold">
              {ctaText}
            </a>
          </div>
          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-gray-700 hover:text-primary-600 transition-colors" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100 ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 space-y-3">
          {links.map((link, i) => (
            <a key={i} href={link.href} onClick={smoothScroll(link.href)}
              className="block text-gray-700 hover:text-primary-600 transition-colors text-sm font-medium py-1">
              {link.label}
            </a>
          ))}
          <a href={ctaHref} onClick={smoothScroll(ctaHref)}
            className="block w-full text-center px-5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold mt-2">
            {ctaText}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;