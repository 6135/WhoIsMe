// App.tsx - Updated with theme switcher
import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { CardGame } from './components/CardGame';
import { ContactInfo } from './components/ContactInfo';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { LanguageProvider } from './i18n/LanguageContext';
import './App.css';
import './assets/css/DarkTheme.css';

const App: React.FC = () => {
  // Set default theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(`${savedTheme}-theme`);
  }, []);

  return (
    <LanguageProvider>
      <div className="app">
        <ThemeSwitcher />
        <LanguageSwitcher />
        <Header />
        <CardGame />
        <ContactInfo />
      </div>
    </LanguageProvider>
  );
};

export default App;