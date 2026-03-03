import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const CTASection = ({ title, subtitle, primaryButton, secondaryButton }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true); }); },
      { threshold: 0.2, rootMargin: '50px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const smoothScroll = (href) => (e) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative py-20 px-4 bg-gradient-to-br from-primary-600 to-primary-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-xl text-primary-100 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {subtitle}
          </p>
        )}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {primaryButton && (
            <a href={primaryButton.href} onClick={smoothScroll(primaryButton.href)}
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl text-lg">
              {primaryButton.text}
              <ArrowRight className="w-5 h-5" />
            </a>
          )}
          {secondaryButton && (
            <a href={secondaryButton.href} onClick={smoothScroll(secondaryButton.href)}
              className="inline-flex items-center gap-2 px-10 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-primary-600 transition-all duration-200 hover:scale-105 active:scale-95 text-lg">
              {secondaryButton.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;