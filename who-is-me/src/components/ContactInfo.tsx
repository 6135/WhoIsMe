// src/components/ContactInfo.tsx - Updated with translations
import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import '../assets/css/ContactInfo.css';

export const ContactInfo: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="contact-info">
      <h2>{t('contactInfo.title')}</h2>
      <div className="contact-links">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link">
          <i className="icon github-icon">{t('contactInfo.githubLabel')}</i>
          <span>github.com/6135</span>
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="contact-link">
          <i className="icon linkedin-icon">{t('contactInfo.linkedinLabel')}</i>
          <span>linkedin.com/in/yourprofile</span>
        </a>

      </div>
      <div className="copyright">
        <p>&copy; {currentYear} {t('contactInfo.copyrightText')}</p>
      </div>
    </footer>
  );
};