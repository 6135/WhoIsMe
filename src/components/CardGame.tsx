// src/components/CardGame.tsx
import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { CardData, cardDataset, shuffleArray } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import '../assets/css/Card.css';

export const CardGame: React.FC = () => {
  const { t } = useLanguage();
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Shuffle cards on component mount
  useEffect(() => {
    setCards(shuffleArray(cardDataset));
  }, []);

  // Handle body scroll locking when zoomed
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isZoomed]);

  const handleCardClick = (id: number) => {
    // Add card to flipped cards set
    setFlippedCards(prev => new Set(prev).add(id));

    // Toggle zoom state if clicking the same card
    if (selectedCard === id && isZoomed) {
      setIsZoomed(false);
      // Scroll back to the card's original position if unzooming
      const cardWrapper = document.querySelector(`.card-wrapper[data-card-id="${id}"]`);
      if (cardWrapper) {
        cardWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setSelectedCard(id);
      setIsZoomed(true);
    }
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Only close zoomed view if clicking on background elements
    const target = event.target as HTMLElement;
    if (
      target.classList.contains('card-game') || 
      target.classList.contains('cards-container') || 
      target.classList.contains('card-overlay')
    ) {
      setIsZoomed(false);
    }
  };

  return (
    <div className="card-game" onClick={handleBackgroundClick}>
      {/* Overlay for zoomed cards */}
      <div className={`card-overlay ${isZoomed ? 'overlay-visible' : ''}`} />

      <h2>Flip the Cards to Discover</h2>
      
      <div className="cards-container">
        {cards.map((card) => (
          <div 
            key={card.id} 
            className={`card-wrapper ${isZoomed && card.id === selectedCard ? 'has-zoomed-card' : ''}`}
            data-card-id={card.id}
          >
            <Card
              id={card.id}
              imageUrl={card.imageUrl}
              title={t(card.title)}
              description={t(card.description)}
              isSelected={flippedCards.has(card.id)}
              isZoomed={isZoomed && card.id === selectedCard}
              onClick={() => handleCardClick(card.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};