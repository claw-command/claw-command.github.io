import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Social from './components/Social.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import MeetingsIndex from './pages/MeetingsIndex.jsx';
import MeetingDetail from './pages/MeetingDetail.jsx';

function App() {
  // theme persistence like Svelte version
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('cc-theme') : null;
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cc-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/meetings" element={<MeetingsIndex />} />
        <Route path="/meetings/:id" element={<MeetingDetail />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Social />
    </div>
  );
}

export default App;
