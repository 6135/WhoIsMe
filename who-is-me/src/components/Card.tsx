// src/components/Card.tsx
import React, { useState, useEffect } from 'react';
import { CardProp } from '../types';

export const Card: React.FC<CardProp> = ({
  imageUrl,
  title,
  description,
  isSelected,
  isZoomed,
  onClick
}) => {
  // Only track if card has been revealed at least once
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);
  // State to control close button visibility
  const [showCloseButton, setShowCloseButton] = useState(false);

  // Ensure zoomed cards are always flipped
  useEffect(() => {
    if (isZoomed) {
      setHasBeenRevealed(true);
      
      // Set a timer to show the close button after the card has flipped
      const timer = setTimeout(() => {
        setShowCloseButton(true);
      }, 1000); // 1-second delay
      
      return () => {
        clearTimeout(timer); // Clean up timer on component unmount or when zoom state changes
        setShowCloseButton(false); // Hide close button when card is unzoomed
      };
    } else {
      setShowCloseButton(false);
    }
  }, [isZoomed]);

  const handleClick = (e: React.MouseEvent) => {
    // If the card is zoomed, prevent the click from closing it
    // when clicking on the card content
    if (isZoomed) {
      e.stopPropagation();
      return;
    }
    
    if (!hasBeenRevealed) {
      setHasBeenRevealed(true);
    }
    onClick();
  };

  // Combine class names conditionally
  const cardClasses = [
    'card',
    isSelected || isZoomed ? 'flipped' : '',
    isZoomed ? 'zoomed' : '',
    hasBeenRevealed ? 'revealed' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={handleClick}>
      <div className="card-inner">
        <div className={`card-front ${hasBeenRevealed ? 'hidden' : ''}`}>
          <div className="card-back-design">
            <span>?</span>
          </div>
        </div>
        <div className="card-back">
          <img src={imageUrl} alt={title} />
          <h4>{title}</h4>
          {isZoomed && description && (
            <div className="card-details-content" onClick={(e) => e.stopPropagation()}>
              <p>{description}</p>
            </div>
          )}
        </div>
      </div>
      {isZoomed && showCloseButton && (
        <div className="card-close-button" onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      )}
    </div>
  );
};