// src/components/ImagePreloader.tsx
import React, { useEffect, useState } from 'react';
import { cardDataset } from '../types';

interface ImagePreloaderProps {
  onLoadComplete?: () => void;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ onLoadComplete }) => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = cardDataset.length;

  useEffect(() => {
    // Create an array to track which images have loaded
    const imageLoadTracker = new Array(totalImages).fill(false);
    
    // Function to check if all images are loaded
    const checkAllImagesLoaded = () => {
      if (imageLoadTracker.every(loaded => loaded)) {
        if (onLoadComplete) onLoadComplete();
      }
    };

    // Preload all images
    cardDataset.forEach((card, index) => {
      const img = new Image();
      
      img.onload = () => {
        imageLoadTracker[index] = true;
        setImagesLoaded(prev => prev + 1);
        checkAllImagesLoaded();
      };
      
      img.onerror = () => {
        // Mark as loaded even if there's an error to avoid blocking the app
        imageLoadTracker[index] = true;
        setImagesLoaded(prev => prev + 1);
        console.error(`Failed to load image: ${card.imageUrl}`);
        checkAllImagesLoaded();
      };
      
      img.src = card.imageUrl;
    });

  }, [onLoadComplete, totalImages]);

  // You could render a loading indicator here, but for pure preloading just return null
  return null;
};

export default ImagePreloader;