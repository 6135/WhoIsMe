// App.tsx - Updated with image preloading
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { CardGame } from './components/CardGame';
import { ContactInfo } from './components/ContactInfo';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { LanguageProvider } from './i18n/LanguageContext';
import ImagePreloader from './components/ImagePreloader';
import './App.css';
import './assets/css/DarkTheme.css';

const App: React.FC = () => {
  // Add state for tracking image loading
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [appReady, setAppReady] = useState(false);
  
  // Set default theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(`${savedTheme}-theme`);
  }, []);

  // Set app as ready after a short delay following images being loaded
  useEffect(() => {
    if (imagesLoaded) {
      // Add a small delay to ensure smooth transitions
      const timer = setTimeout(() => {
        setAppReady(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  return (
    <LanguageProvider>
      <div className={`app ${appReady ? 'app-ready' : 'app-loading'}`}>
        {/* Preload images in the background */}
        <ImagePreloader onLoadComplete={() => setImagesLoaded(true)} />
        
        {/* Conditionally render loading state or content */}
        {!appReady ? (
          <div className="app-loading-container">
            <div className="app-loading-spinner"></div>
          </div>
        ) : (
          <>
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Header />
            <CardGame />
            <ContactInfo />
          </>
        )}
      </div>
    </LanguageProvider>
  );
};

export default App;