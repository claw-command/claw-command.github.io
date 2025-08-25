import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUpcomingMeeting } from '../data/meetings.js';

function parseLocalDate(dateStr) {
  if (!dateStr) return new Date(NaN);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (m) {
    const [, y, mo, d] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d));
  }
  return new Date(dateStr);
}

function fmtDate(d) {
  if (!d) return '';
  if (d.includes?.(' to ')) return d;
  const dt = parseLocalDate(d);
  if (isNaN(dt)) return d;
  return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
}

export default function HomePage() {
  const navigate = useNavigate();
  const upcoming = getUpcomingMeeting();
  const openDetails = () => {
    if (upcoming) navigate(`/meetings/${upcoming.id}`);
  };

  return (
    <div className="main-content">
      <img src="/icons/Claw_Command_Bird_Only.svg" alt="Claw Command Logo" className="logo logo-light" />
      <img src="/icons/Claw_Command_Bird_Only_White.svg" alt="" aria-hidden="true" className="logo logo-dark" />
      <h1 className="organization-name glitch glitch-clip" data-text="Claw Command">Claw Command</h1>

      {upcoming ? (
        <>
          <div className="upcoming-meeting">{upcoming.title}</div>
          <button className="date-link" onClick={openDetails} aria-label="View upcoming week details">
            View details
          </button>
        </>
      ) : (
        <div className="upcoming-meeting">No upcoming meetings</div>
      )}
    </div>
  );
}
