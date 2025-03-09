// src/components/Card.tsx
import React, { useState, useEffect, useRef } from "react";
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
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const scrollTopAtTouchStartRef = useRef(0);

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
      // If we're currently scrolling, don't process the click
      if (isScrollingRef.current) {
        isScrollingRef.current = false;
        e.stopPropagation();
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

  // Handle touch start for mobile scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed && cardBackRef.current) {
      touchStartYRef.current = e.touches[0].clientY;
      scrollTopAtTouchStartRef.current = cardBackRef.current.scrollTop;
      
      // Don't prevent default here to allow native scrolling behavior
    }
  };

  // Handle touch move for mobile scrolling
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isZoomed && cardBackRef.current) {
      const touchY = e.touches[0].clientY;
      const touchDiff = touchStartYRef.current - touchY;
      
      // Update scroll position directly
      cardBackRef.current.scrollTop = scrollTopAtTouchStartRef.current + touchDiff;
      
      // Mark that we're scrolling to prevent click event from firing
      if (Math.abs(touchDiff) > 10) {
        isScrollingRef.current = true;
      }
      
      // Prevent default only if scrolling vertically significantly
      // This allows the card content to scroll without page scroll interference
      if (Math.abs(touchDiff) > 10) {
        e.preventDefault();
      }
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    // Keep track of scrolling state for a short period
    if (isScrollingRef.current) {
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 100);
    }
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
          style={{ overscrollBehavior: 'contain' }}
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