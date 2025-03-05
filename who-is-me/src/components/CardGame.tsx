// src/components/CardGame.tsx
import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { CardData, cardDataset, shuffleArray } from '../types';
import '../assets/css/Card.css';

export const CardGame: React.FC = () => {
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
    document.body.style.overflow = isZoomed ? 'hidden' : 'auto';
    
    // Cleanup function to restore scrolling when component unmounts
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

  // Find the currently selected card data
  const selectedCardData = cards.find(card => card.id === selectedCard);

  return (
    <div className="card-game" onClick={handleBackgroundClick}>
      {/* Overlay for zoomed cards */}
      <div className={`card-overlay ${isZoomed ? 'overlay-visible' : ''}`} />

      <h2>Flip the Cards to Discover</h2>
      
      <div className="cards-container">
        {cards.map((card) => (
          <div key={card.id} className="card-wrapper">
            <Card
              id={card.id}
              imageUrl={card.imageUrl}
              title={card.title}
              isSelected={flippedCards.has(card.id)}
              isZoomed={isZoomed && card.id === selectedCard}
              onClick={() => handleCardClick(card.id)}
            />
          </div>
        ))}
      </div>

      {/* Card details panel that appears when a card is zoomed */}
      {selectedCardData && isZoomed && (
        <div className="card-details">
          <h3>{selectedCardData.title}</h3>
          <p>{selectedCardData.description}</p>
        </div>
      )}
    </div>
  );
};