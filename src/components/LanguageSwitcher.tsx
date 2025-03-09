// src/components/LanguageSwitcher.tsx
import React from 'react';
import { useLanguage, Language } from '../i18n/LanguageContext';
import '../assets/css/LanguageSwitcher.css';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const switchToLanguage = (newLanguage: Language) => {
    if (language !== newLanguage) {
      setLanguage(newLanguage);
    }
  };

  return (
    <div className="language-switcher">
      <button className="language-button">
        <span 
          className={`language-option ${language === 'en' ? 'active' : ''}`}
          onClick={() => switchToLanguage('en')}
        >
          EN
        </span>
        <span className="language-separator"> | </span>
        <span 
          className={`language-option ${language === 'pt' ? 'active' : ''}`}
          onClick={() => switchToLanguage('pt')}
        >
          PT
        </span>
      </button>
    </div>
  );
};