import React, { useState, useEffect, useRef } from 'react';
import { Check, Sparkles } from 'lucide-react';

const PricingCard = ({ plan, price, period = '월', description = '', features = [], highlighted = false, buttonText = '시작하기', onSelect, badge }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true); }); },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
  }, []);

  const formatPrice = (val) => {
    if (val === 0) return '₩0';
    if (typeof val === 'string') return val;
    return `₩${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  return (
    <div ref={cardRef}
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-500 ${
        highlighted
          ? 'bg-gradient-to-br from-primary-600 to-purple-600 text-white shadow-2xl scale-105 border-2 border-primary-400'
          : 'bg-white text-gray-900 shadow-md hover:shadow-xl border border-gray-200 hover:-translate-y-1'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      {badge && highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
            <Sparkles className="w-4 h-4" />
            {badge}
          </div>
        </div>
      )}
      <h3 className={`text-2xl font-bold mb-1 ${highlighted ? 'text-white' : 'text-gray-900'}`}>{plan}</h3>
      {description && <p className={`text-sm mb-4 ${highlighted ? 'text-primary-100' : 'text-gray-500'}`}>{description}</p>}
      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-5xl font-bold">{formatPrice(price)}</span>
        {period && typeof price === 'number' && price >= 0 && (
          <span className={`text-lg ${highlighted ? 'text-primary-100' : 'text-gray-500'}`}>/{period}</span>
        )}
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${highlighted ? 'bg-white/20' : 'bg-primary-100'}`}>
              <Check className={`w-3 h-3 ${highlighted ? 'text-white' : 'text-primary-600'}`} />
            </div>
            <span className={`text-sm leading-relaxed ${highlighted ? 'text-primary-50' : 'text-gray-600'}`}>{feature}</span>
          </li>
        ))}
      </ul>
      <button onClick={onSelect}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
          highlighted ? 'bg-white text-primary-600 hover:bg-gray-50 shadow-lg' : 'bg-primary-600 text-white hover:bg-primary-700'
        }`}>
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;