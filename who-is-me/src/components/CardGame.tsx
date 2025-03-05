// src/components/CardGame.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Card } from './Card';
import { CardData, cardDataset, shuffleArray } from '../types';
import '../assets/css/Card.css';

export const CardGame: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const detailsRef = useRef<HTMLDivElement>(null);

  // Shuffle cards on component mount
  useEffect(() => {
    setCards(shuffleArray(cardDataset));
  }, []);

  // Handle body scroll locking when zoomed
  useEffect(() => {
    // We don't lock scrolling anymore, as we want the page to scroll
    // Just cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle scrolling to details when a card is zoomed
  useEffect(() => {
    if (isZoomed && detailsRef.current) {
      // Wait for the card zoom animation to complete
      setTimeout(() => {
        // Calculate scroll position to show card details
        const cardHeight = 450; // Height of zoomed card
        const windowHeight = window.innerHeight;
        const detailsTop = detailsRef.current?.getBoundingClientRect().top || 0;
        const detailsHeight = detailsRef.current?.offsetHeight || 0;
        
        // Calculate ideal scroll position to center the card + details in view
        const idealScrollTop = 
          window.scrollY + 
          detailsTop - 
          (windowHeight - (cardHeight + detailsHeight)) / 2;
        
        window.scrollTo({
          top: idealScrollTop,
          behavior: 'smooth'
        });
      }, 300);
    }
  }, [isZoomed, selectedCard]);

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

  // Find the currently selected card data
  const selectedCardData = cards.find(card => card.id === selectedCard);

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
        <div id="card-details-container" ref={detailsRef}>
          <div className="card-details">
            <h3>{selectedCardData.title}</h3>
            <p>{selectedCardData.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};