// src/types/index.ts
// Define shared types across the application

import pic1 from '../assets/images/talita.jpg';
import pic2 from '../assets/images/travel.jpg';
import pic3 from '../assets/images/algarve.jpg';
import pic4 from '../assets/images/likes.jpg';
import pic5 from '../assets/images/aboutme.jpg';
import pic6 from '../assets/images/favs.jpg';
export interface CardData {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
  }
  
  export interface CardProp {
    id: number;
    imageUrl: string;
    title: string;
    description?: string; // Added description property
    isSelected: boolean;
    isZoomed: boolean;
    onClick: () => void;
  }
  
  // Mock data that could be moved to a separate file
  export const cardDataset: CardData[] = [
        {
          id: 1,
          imageUrl: pic1,
          title: 'cards.card1.title',
          description: 'cards.card1.description'
        },
        {
          id: 2,
          imageUrl: pic2,
          title: 'cards.card2.title',
          description: 'cards.card2.description'
        },
        {
          id: 3,
          imageUrl: pic3,
          title: 'cards.card3.title',
          description: 'cards.card3.description'
        },
        {
          id: 4,
          imageUrl: pic4,
          title: 'cards.card4.title',
          description: 'cards.card4.description'
        },
        {
          id: 5,
          imageUrl: pic5,
          title: 'cards.card5.title',
          description: 'cards.card5.description'
        },
        {
          id: 6,
          imageUrl: pic6,
          title: 'cards.card6.title',
          description: 'cards.card6.description'
        }
      ];
  
  // Utility functions
  export const shuffleArray = <T extends unknown>(array: T[]): T[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  export const moveCardIdToLast = (array: CardData[], id: number): CardData[] => {
    const cardIndex = array.findIndex(card => card.id === id);
    const card = array.splice(cardIndex, 1)[0];
    array.push(card);
    return array;
  }