// src/components/Card.tsx
import React, { useState, useEffect, useRef } from "react";
import { CardProp } from "../types";
import logo from "../assets/logo-design.svg";

export const Card: React.FC<CardProp> = ({
  imageUrl,
  title,
  description,
  isSelected,
  isZoomed,
  onClick,
}) => {
  // Only track if card has been revealed at least once
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);
  // State to control close button visibility
  const [showCloseButton, setShowCloseButton] = useState(false);
  // Reference to the card-back div to control scrolling
  const cardBackRef = useRef<HTMLDivElement>(null);

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

      // Reset scroll position when card is unzoomed
      if (cardBackRef.current) {
        cardBackRef.current.scrollTop = 0;
      }
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
  const handleWheel = (e: React.WheelEvent) => {
    if (isZoomed && cardBackRef.current) {
      e.stopPropagation();
      
      // Scale the deltaY to create smoother scrolling
      // A smaller multiplier makes scrolling more gentle
      const scrollAmount = e.deltaY * 0.3;
      
      // Apply the scroll
      cardBackRef.current.scrollTop += scrollAmount;
    }
  };
  // Combine class names conditionally
  const cardClasses = [
    "card",
    isSelected || isZoomed ? "flipped" : "",
    isZoomed ? "zoomed" : "",
    hasBeenRevealed ? "revealed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} onClick={handleClick} onWheel={handleWheel}>
      <div className="card-inner" >
        <div className={`card-front ${hasBeenRevealed ? "hidden" : ""}`}>
          <div className="card-back-design">
            <img src={logo} alt="Who Is Me logo" className="card-logo-full" />
          </div>
        </div>
        <div
          className="card-back"
          ref={cardBackRef}
        >
          <img src={imageUrl} alt={title} />
          <h4>{title}</h4>
          {isZoomed && description && (
            <div
              className="card-details-content"
              onClick={(e) => e.stopPropagation()}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
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
    </div>
  );
};
