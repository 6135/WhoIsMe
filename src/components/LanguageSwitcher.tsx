// src/components/LanguageSwitcher.tsx
import React from 'react';
import { useLanguage, Language } from '../i18n/LanguageContext';
import '../assets/css/LanguageSwitcher.css';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'pt' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <div className="language-switcher">
      <button onClick={toggleLanguage} className="language-button">
        {t('language.switchTo')} {language === 'en' ? t('language.portuguese') : t('language.english')}
      </button>
    </div>
  );
};
