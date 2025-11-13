import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import modular components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import PrivacyPolicy from './components/Privacypolicy';

/**
 * Main App Component
 * 
 * This is the root component with routing setup.
 * 
 * Features:
 * - React Router for multi-page navigation
 * - Modular component architecture
 * - Clean separation of concerns
 * - Mobile-responsive design throughout
 * 
 * Routes:
 * - / : Home page (Hero, Featured, Events, Contact)
 * - /about : About page (Inkpot & Songs of the Stone)
 */
function App() {
  return (
    <>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;