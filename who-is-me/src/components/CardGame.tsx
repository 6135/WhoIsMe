// components/CardGame.tsx
import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import '../assets/css/CardGame.css';

// Define card interface
interface CardType {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

export const CardGame: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Example card data (in a real app, this might come from an API)
  const cardData: CardType[] = [
    {
      id: 1,
      imageUrl: "/api/placeholder/400/400",
      title: "Mountain Landscape",
      description: "A breathtaking view of snow-capped mountains and a serene lake reflecting the surrounding peaks. The area is known for its diverse wildlife and hiking trails."
    },
    {
      id: 2,
      imageUrl: "/api/placeholder/400/400",
      title: "Coastal Sunset",
      description: "A stunning sunset over the ocean with vibrant colors reflecting off the water. The silhouettes of palm trees frame this beautiful scene on a tropical beach."
    },
    {
      id: 3,
      imageUrl: "/api/placeholder/400/400",
      title: "Urban Cityscape",
      description: "A dynamic city skyline illuminated at night, showcasing modern architecture and the vibrant energy of urban life. Skyscrapers reach toward the stars in this metropolitan wonder."
    },
    {
      id: 4,
      imageUrl: "/api/placeholder/400/400",
      title: "Forest Waterfall",
      description: "A hidden waterfall cascading through a lush green forest. The sound of rushing water creates a peaceful atmosphere in this secluded natural paradise."
    },
    {
      id: 5,
      imageUrl: "/api/placeholder/400/400",
      title: "Desert Dunes",
      description: "Rolling sand dunes stretching as far as the eye can see, with intricate patterns created by the wind. The desert landscape transforms with the changing light throughout the day."
    },
    {
      id: 6,
      imageUrl: "/api/placeholder/400/400",
      title: "Wildlife Safari",
      description: "A rare glimpse of exotic animals in their natural habitat. This image captures the beauty and diversity of wildlife in one of the world's most renowned conservation areas."
    }
  ];

  // Shuffle cards on component mount
  useEffect(() => {
    const shuffledCards = [...cardData].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (id: number) => {
    // If clicking the same card that's already zoomed, toggle zoom state
    if (selectedCard === id && isZoomed) {
      setIsZoomed(false);
    } else {
      // Otherwise, select the card and zoom in
      setSelectedCard(id);
      setIsZoomed(true);
      
      // Ensure the body doesn't scroll while a card is zoomed
      document.body.style.overflow = 'hidden';
    }
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Only unzoom if clicking the background, not a card
    if ((event.target as HTMLElement).classList.contains('card-game') || 
        (event.target as HTMLElement).classList.contains('cards-container')) {
      setIsZoomed(false);
      // Restore scrolling when unzooming
      document.body.style.overflow = 'auto';
    }
  };

  const selectedCardData = cards.find(card => card.id === selectedCard);

  return (
    <div className="card-game" onClick={handleBackgroundClick}>
      {/* Overlay for when a card is zoomed */}
      <div 
        className={`card-overlay ${isZoomed ? 'overlay-visible' : ''}`} 
        onClick={() => {
          setIsZoomed(false);
          document.body.style.overflow = 'auto';
        }}
      />
      
      <h2>Flip the Cards to Discover</h2>
      <div className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            imageUrl={card.imageUrl}
            title={card.title}
            isSelected={card.id === selectedCard}
            isZoomed={isZoomed && card.id === selectedCard}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      
      {selectedCardData && isZoomed && (
        <div className="card-details">
          <h3>{selectedCardData.title}</h3>
          <p>{selectedCardData.description}</p>
        </div>
      )}
    </div>
  );
};