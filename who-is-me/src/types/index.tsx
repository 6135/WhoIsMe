// src/types/index.ts
// Define shared types across the application

export interface CardData {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
  }
export  interface CardProp {
    id: number;
    imageUrl: string;
    title: string;
    isSelected: boolean;
    isZoomed: boolean;
    onClick: () => void;
  }
  
  // Mock data that could be moved to a separate file
  export const cardDataset: CardData[] = [
    {
      id: 1,
      imageUrl: "/images/ninetails.jpg",
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
      description: "A rare glimpse of exotic animals in their natural habitat. This image captures the beauty and diversity of wildlife in one of the world's most renowned conservation areas.A rare glimpse of exotic animals in their natural habitat. This image captures the beauty and diversity of wildlife in one of the world's most renowned conservation areas.A rare glimpse of exotic animals in their natural habitat. This image captures the beauty and diversity of wildlife in one of the world's most renowned conservation areas.A rare glimpse of exotic animals in their natural habitat. This image captures the beauty and diversity of wildlife in one of the world's most renowned conservation areas."
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