// components/Card.tsx
import React, { useState } from 'react';
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

  const handleClick = () => {
    if (!hasBeenFlipped) {
      setHasBeenFlipped(true);
    }
    onClick();
  };

  return (
    <div 
      className={`card ${isSelected ? 'flipped' : ''} ${isZoomed ? 'zoomed' : ''} ${hasBeenFlipped ? 'revealed' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
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