import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUpcomingMeeting, getNextUpcomingEvent } from '../data/meetings.js';

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

function to12h(t) {
  if (!t) return '';
  const [hStr, mStr] = t.split(':');
  let h = parseInt(hStr, 10);
  if (Number.isNaN(h)) return t;
  const m = parseInt(mStr ?? '0', 10);
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return Number.isFinite(m) ? `${h}:${String(m).padStart(2, '0')}${ampm}` : `${h}${ampm}`;
}

function fmtTimeRange(timeStr) {
  if (!timeStr) return '';
  if (timeStr.includes('-')) {
    const [a, b] = timeStr.split('-').map((s) => s.trim());
    return `${to12h(a)}-${to12h(b)}`;
  }
  return to12h(timeStr);
}

export default function HomePage() {
  const navigate = useNavigate();
  const upcoming = getUpcomingMeeting();
  const nextEvent = getNextUpcomingEvent();
  const openDetails = () => {
    if (upcoming) navigate(`/meetings/${upcoming.id}`);
  };

  return (
    <div className="main-content">
      <img src="/icons/Claw_Command.svg" alt="Claw Command Logo" className="logo logo-light" />
      <img src="/icons/Claw_Command_White.svg" alt="" aria-hidden="true" className="logo logo-dark" />
      <h1 className="organization-name glitch glitch-clip" data-text="Claw Command">Claw Command</h1>

      {upcoming ? (
        <>
          <div className="upcoming-meeting">{upcoming.title}</div>
          {/*}
          <button className="date-link" onClick={openDetails} aria-label="View upcoming week details">
            View details
          </button>
          */}
          {nextEvent ? (
            <div style={{ marginTop: 12 }}>
              <div className="meeting-title">Next Event</div>
              <div className="meeting-title" style={{ marginTop: 6 }}>{nextEvent.event.title}</div>
              <div className="meeting-desc" style={{ marginTop: 6 }}>
                {nextEvent.event.time ? fmtTimeRange(nextEvent.event.time) + ' - ' : ''}
                {fmtDate(nextEvent.event.date)}
                {nextEvent.event.room ? ' - Room: ' + nextEvent.event.room : ''}
              </div>
              <div className="meeting-nav" style={{ marginTop: 8 }}>
                <button
                  className="date-link"
                  onClick={() => navigate(`/meetings/${nextEvent.weekId}`)}
                  aria-label={`Open ${nextEvent.weekTitle}`}
                >
                  View week →
                </button>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="upcoming-meeting">No upcoming meetings</div>
      )}
    </div>
  );
}
