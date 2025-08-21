import React from 'react';
import { getUpcomingMeeting } from '../data/meetings.js';

function fmtDate(d) {
  if (!d) return '';
  if (d.includes?.(' to ')) return d;
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
}

export default function HomePage() {
  const upcoming = getUpcomingMeeting();
  const openDetails = () => {
    if (upcoming) window.location.href = `/meetings/${upcoming.id}`;
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
