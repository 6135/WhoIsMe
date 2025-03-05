// App.tsx - Updated with language provider
import React from 'react';
import { Header } from './components/Header';
import { CardGame } from './components/CardGame';
import { ContactInfo } from './components/ContactInfo';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { LanguageProvider } from './i18n/LanguageContext';
import './App.css';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="app">
        <LanguageSwitcher />
        <Header />
        <CardGame />
        <ContactInfo />
      </div>
    </LanguageProvider>
  );
};

export default App;