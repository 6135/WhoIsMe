// src/components/Header.tsx
import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { AnimatedBackground } from './AnimatedBackground';
import '../assets/css/Header.css';

export const Header: React.FC = () => {
  const { t } = useLanguage();

  // Function to handle scroll when user clicks on the header text area
  const handleHeaderClick = () => {
    // Find the card game section and scroll to it
    const cardGameSection = document.querySelector('.card-game');
    if (cardGameSection) {
      cardGameSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <AnimatedBackground />
      <div className="header-content" onClick={handleHeaderClick}>
        <h1>{t('header.title')}</h1>
        <p>{t('header.description')}</p>
      </div>
      <div className="scroll-indicator-container">
        <div className="scroll-indicator" onClick={handleHeaderClick}>
          <span>{t('header.scrollToPlay')}</span>
          <div className="arrow-down"></div>
        </div>
      </div>
    </header>
  );
};