// components/ContactInfo.tsx
import React from 'react';
import '../assets/css/ContactInfo.css';

export const ContactInfo: React.FC = () => {
  return (
    <footer className="contact-info">
      <h2>Contact Information</h2>
      <div className="contact-links">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link">
          <i className="icon github-icon">GitHub</i>
          <span>github.com/yourusername</span>
        </a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="contact-link">
          <i className="icon linkedin-icon">LinkedIn</i>
          <span>linkedin.com/in/yourprofile</span>
        </a>
        <a href="mailto:your.email@example.com" className="contact-link">
          <i className="icon email-icon">Email</i>
          <span>your.email@example.com</span>
        </a>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Card Memory Game. All rights reserved.</p>
      </div>
    </footer>
  );
};