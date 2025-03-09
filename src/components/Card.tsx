// src/components/Card.tsx
import React, { useState, useEffect, useRef, TouchEvent } from "react";
import { CardProp } from "../types";
import logo from "../assets/logo-design.svg";
import { FullScreenImageViewer } from "./FullScreenImageViewer";

export const Card: React.FC<CardProp> = ({
  imageUrl,
  title,
  description,
  isSelected,
  isZoomed,
  onClick,
}) => {
  // Existing states
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);

  // New state for fullscreen image viewer
  const [showFullscreenImage, setShowFullscreenImage] = useState(false);
  const cardBackRef = useRef<HTMLDivElement>(null);
  
  // For touch scrolling
  const [isTouching, setIsTouching] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [scrollStartY, setScrollStartY] = useState(0);

  useEffect(() => {
    if (isZoomed) {
      setHasBeenRevealed(true);

      const timer = setTimeout(() => {
        setShowCloseButton(true);
        setShowExpandButton(true);
      }, 600);

      return () => {
        clearTimeout(timer);
        setShowCloseButton(false);
        setShowExpandButton(false);
      };
    } else {
      setShowCloseButton(false);
      setShowExpandButton(false);

      if (cardBackRef.current) {
        cardBackRef.current.scrollTop = 0;
      }
    }
  }, [isZoomed]);

  const handleClick = (e: React.MouseEvent) => {
    if (isZoomed) {
      // Don't prevent propagation for the card back when zoomed
      // This allows clicks within the content to work normally
      if ((e.target as HTMLElement).closest('.card-details-content')) {
        return;
      }
      e.stopPropagation();
      return;
    }

    if (!hasBeenRevealed) {
      setHasBeenRevealed(true);
    }
    onClick();
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isZoomed && cardBackRef.current) {
      e.stopPropagation();

      const scrollAmount = e.deltaY * 0.3;
      cardBackRef.current.scrollTop += scrollAmount;
    }
  };

  // Handle touch start for scrolling
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (isZoomed && cardBackRef.current) {
      setIsTouching(true);
      setTouchStartY(e.touches[0].clientY);
      setScrollStartY(cardBackRef.current.scrollTop);
    }
  };

  // Handle touch move for scrolling
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isZoomed && isTouching && cardBackRef.current) {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      
      // Apply the scroll
      cardBackRef.current.scrollTop = scrollStartY + deltaY;
      
      // Prevent default to avoid page scrolling while card content is scrolled
      if (
        (deltaY > 0 && cardBackRef.current.scrollTop < cardBackRef.current.scrollHeight - cardBackRef.current.clientHeight) ||
        (deltaY < 0 && cardBackRef.current.scrollTop > 0)
      ) {
        e.preventDefault();
      }
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  // New function to handle search icon click
  const handleImageSearch = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from affecting the card
    setShowFullscreenImage(true);
  };

  const cardClasses = [
    "card",
    isSelected || isZoomed ? "flipped" : "",
    isZoomed ? "zoomed" : "",
    hasBeenRevealed ? "revealed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div 
      className={cardClasses} 
      onClick={handleClick} 
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="card-inner">
        <div className={`card-front ${hasBeenRevealed ? "hidden" : ""}`}>
          <div className="card-back-design">
            <img src={logo} alt="Who Is Me logo" className="card-logo-full" />
          </div>
        </div>
        <div 
          className="card-back" 
          ref={cardBackRef}
        >
          {/* Add image container with search icon */}
          <div>
            <div className="card-image-container">
              <img src={imageUrl} alt={title} />
            </div>
            <h4>{title}</h4>
            {isZoomed && description && (
              <div
                className="card-details-content"
                onClick={(e) => e.stopPropagation()}
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            )}
          </div>
        </div>
      </div>
      {isZoomed && showCloseButton && (
        <div
          className="card-close-button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          &times;
        </div>
      )}
      {isZoomed && showExpandButton && (
        <div
          className="card-close-button image-search-icon "
          onClick={handleImageSearch}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
      )}
      {/* Add FullScreenImageViewer */}
      {showFullscreenImage && isZoomed && (
        <FullScreenImageViewer
          imageUrl={imageUrl}
          altText={title}
          onClose={() => setShowFullscreenImage(false)}
        />
      )}
    </div>
  );
};