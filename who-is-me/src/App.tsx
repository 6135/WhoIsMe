// App.tsx - Main application component
import React from 'react';
import { Header } from './components/Header';
import { CardGame } from './components/CardGame';
import { ContactInfo } from './components/ContactInfo';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      {/* <Header /> */}
      <CardGame />
      {/* <ContactInfo /> */}
    </div>
  );
};

export default App;