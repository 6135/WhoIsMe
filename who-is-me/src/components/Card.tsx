// src/components/Card.tsx
import React, { useState, useEffect } from 'react';

interface CardProps {
  id: number;
  imageUrl: string;
  title: string;
  isSelected: boolean;
  isZoomed: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  isSelected,
  isZoomed,
  onClick
}) => {
  // Only track if card has been revealed at least once
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);

  // Ensure zoomed cards are always flipped
  useEffect(() => {
    if (isZoomed) {
      setHasBeenRevealed(true);
    }
  }, [isZoomed]);

  const handleClick = () => {
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
        </div>
      </div>
    </div>
  );
};