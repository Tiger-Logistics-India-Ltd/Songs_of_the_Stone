import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';

// Import modular components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Lazy-loaded pages (code splitting)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const FirstChapter = lazy(() => import('./pages/FirstChapter'));
const SecondChapter = lazy(() => import('./pages/SecondChapter'));
const ThirdChapter = lazy(() => import('./pages/ThirdChapter'));
const PrivacyPolicy = lazy(() => import('./components/Privacypolicy'));
const TermsAndConditions = lazy(() => import('./components/TermsAndConditions'));
const Press = lazy(() => import('./pages/Press'));

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
 * - /first-chapter : The First Chapter event page
 */
function App() {
  return (
    <>
      <div className="App">
        <Navigation />
        <main>
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />


          {/* Chapter pages - temporarily disabled on production, enabled locally for testing */}
          <Route path="/first-chapter" element={<FirstChapter />} />
          <Route path="/second-chapter" element={<SecondChapter />} />
          <Route path="/third-chapter" element={<ThirdChapter />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/press" element={<Press />} />
          
        </Routes>
        </Suspense>
        </main>
        <Footer />
      </div>
      <SpeedInsights />
    </>
  );
}

export default App;