import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonial = ({ quote, author, role, company, avatar, rating = 5 }) => {
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

  return (
    <div ref={cardRef}
      className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}>
      <div className="absolute top-4 right-4 text-primary-100">
        <Quote className="w-12 h-12" />
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
        ))}
      </div>
      <p className="text-gray-700 text-base leading-relaxed mb-6 relative z-10">"{quote}"</p>
      <div className="flex items-center gap-4">
        {avatar ? (
          <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-purple-400 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">{role}{company && `, ${company}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;