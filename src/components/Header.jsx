import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStartedWeeks, getUpcomingMeeting } from '../data/meetings.js';

export default function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const displayWeeks = useMemo(() => {
    const started = getStartedWeeks();
    const upcoming = getUpcomingMeeting();
    if (upcoming && !started.find((w) => w.id === upcoming.id)) return [...started, upcoming];
    return started;
  }, []);

  const openMeeting = (id) => {
    navigate(`/meetings/${id}`);
    setMenuOpen(false);
  };

  return (
    <div className="header-bar">
      <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen((m) => !m)}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <div className="meeting-dates desktop-only">
        {displayWeeks.map((m) => (
          <button key={m.id} className="date-link" title={m.title} onClick={() => openMeeting(m.id)}>
            {m.title}
          </button>
        ))}
      </div>

      <div className="right-actions">
        <button className="theme-toggle" aria-label="Toggle theme" onClick={onToggleTheme}>
          {theme === 'light' ? 'Dark mode' : 'White mode'}
        </button>
  <button className="date-link" onClick={() => navigate('/about')}>About</button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {displayWeeks.map((m) => (
            <button key={m.id} className="date-link" title={m.title} onClick={() => openMeeting(m.id)}>
              {m.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
