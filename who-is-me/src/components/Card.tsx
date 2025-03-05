// components/Card.tsx
import React, { useState, useEffect } from 'react';
import '../assets/css/Card.css';

interface CardProps {
  id: number;
  imageUrl: string;
  title: string;
  isSelected: boolean;
  isZoomed: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  title,
  isSelected,
  isZoomed,
  onClick
}) => {
  // Track if the card has been flipped at least once
  const [hasBeenFlipped, setHasBeenFlipped] = useState<boolean>(false);

  // Always flip the card when zoomed
  useEffect(() => {
    if (isZoomed && !isSelected) {
      // Force the card to be flipped when zoomed
      setHasBeenFlipped(true);
    }
  }, [isZoomed, isSelected]);

  const handleClick = () => {
    if (!hasBeenFlipped) {
      setHasBeenFlipped(true);
    }
    onClick();
  };

  return (
    <div
      className={`card ${isSelected || isZoomed ? 'flipped' : ''} ${isZoomed ? 'zoomed' : ''} ${hasBeenFlipped ? 'revealed' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className={`card-front ${hasBeenFlipped ? 'hidden' : ''}`}>
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
