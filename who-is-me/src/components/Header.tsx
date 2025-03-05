// src/components/Header.tsx - Updated with translations
import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { AnimatedBackground } from './AnimatedBackground';
import '../assets/css/Header.css';

export const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="header">
      <AnimatedBackground />
      <div className="header-content">
        <h1>{t('header.title')}</h1>
        <p>{t('header.description')}</p>
        <div className="scroll-indicator">
          <span>{t('header.scrollToPlay')}</span>
          <div className="arrow-down"></div>
        </div>
      </div>
    </header>
  );
};