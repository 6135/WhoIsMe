// Create a new file: src/components/FullScreenImageViewer.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
interface FullScreenImageViewerProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

export const FullScreenImageViewer: React.FC<FullScreenImageViewerProps> = ({ 
  imageUrl, 
  altText, 
  onClose 
}) => {
  // Add ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling on the body while viewer is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restore scrolling when viewer is closed
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Create portal to render at the document root
  return ReactDOM.createPortal(
    <div 
      className="fullscreen-image-viewer"
      onClick={onClose}
    >
      <div className="fullscreen-image-container">
        <img 
          src={imageUrl} 
          alt={altText} 
          className="fullscreen-image"
          onClick={(e) => e.stopPropagation()}
        />
        <div 
          className="fullscreen-close-button"
          onClick={onClose}
        >
          &times;
        </div>
      </div>
    </div>,
    document.body // This ensures the viewer is a direct child of the body
  );

};