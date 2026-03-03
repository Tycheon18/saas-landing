import React from 'react';
import { Github, Twitter, Linkedin, Instagram, Facebook, Cloud } from 'lucide-react';

const FooterWithLinks = ({ companyName, description, links = [], socialLinks = [], copyright, extraLinks = [] }) => {
  const socialIcons = { github: Github, twitter: Twitter, linkedin: Linkedin, instagram: Instagram, facebook: Facebook };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Cloud className="w-7 h-7 text-primary-400" />
              <h3 className="text-xl font-bold text-white">{companyName}</h3>
            </div>
            {description && <p className="text-sm text-gray-400 leading-relaxed">{description}</p>}
          </div>
          {links.map((group, i) => (
            <div key={i}>
              <h4 className="text-white font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.items.map((item, j) => (
                  <li key={j}>
                    <a href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-gray-500">{copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`}</p>
            {extraLinks.length > 0 && (
              <div className="flex gap-4">
                {extraLinks.map((link, i) => (
                  <a key={i} href={link.href} className="text-gray-500 hover:text-white transition-colors text-sm">{link.label}</a>
                ))}
              </div>
            )}
          </div>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => {
                const Icon = socialIcons[social.platform.toLowerCase()];
                return Icon ? (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200" aria-label={social.platform}>
                    <Icon className="w-5 h-5" />
                  </a>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default FooterWithLinks;