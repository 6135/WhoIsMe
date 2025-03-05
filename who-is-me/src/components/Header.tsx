// components/Header.tsx
import React from 'react';
import '../assets/css/Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Memory Card Game</h1>
        <p>
          Welcome to the Memory Card Game! Scroll down to play. Click on a card to
          reveal the image. Each card contains a unique picture with interesting
          information. Explore all cards to discover their contents. The cards are
          randomly arranged each time you refresh the page for a new experience.
        </p>
        <div className="scroll-indicator">
          <span>Scroll to Play</span>
          <div className="arrow-down"></div>
        </div>
      </div>
    </header>
  );
};