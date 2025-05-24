import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
// import Contact from './pages/Contact';
import Resources from './pages/Resources';
// If you have a Resources page, uncomment the next line and ensure the file exists:
// import Resources from './pages/Resources';
// import Blog from './pages/Blog';
// import Assessment from './pages/Assessment';
// import Tracker from './pages/Tracker';
import Navbar from './components/common/Navbar';
// import Footer from './components/common/Footer';
// import ScrollToTop from './components/common/ScrollToTop';
// import ChatWidget from './components/chat/ChatWidget';

const App: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Navbar />
          {/* <ScrollToTop /> */}
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/resources" element={<Resources />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route path="/resources" element={<Resources />} />
              {/* <Route path="/blog" element={<Blog />} /> */}
              {/* <Route path="/assessment" element={<Assessment />} /> */}
              {/* <Route path="/tracker" element={<Tracker />} /> */}
            </Routes>
          </AnimatePresence>
          {/* <Footer /> */}
          <button 
            onClick={() => setShowChat(!showChat)}
            className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          >
            {showChat ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </button>
          {/* {showChat && <ChatWidget onClose={() => setShowChat(false)} />} */}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
