import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { meetings } from '../data/meetings.js';

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

export default function MeetingDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const idx = meetings.findIndex((m) => m.id === params.id);
  const meeting = idx >= 0 ? meetings[idx] : null;
  const prevId = idx > 0 ? meetings[idx - 1].id : null;
  const nextId = idx < meetings.length - 1 ? meetings[idx + 1].id : null;

  if (!meeting) {
    return (
      <div className="main-content">
        <div className="meeting-desc">Meeting not found.</div>
        <div className="meeting-nav">
          <button className="date-link" onClick={() => navigate('/meetings')}>All Weeks</button>
          <button className="date-link" onClick={() => navigate('/')}>Home</button>
        </div>
      </div>
    );
  }

  const go = (id) => { if (id) navigate(`/meetings/${id}`); };

  return (
    <div className="main-content">
      <h1 className="week-title glitch" data-text={meeting.title}>{meeting.title}</h1>

      <div className="meeting-card">
        {meeting.events && meeting.events.length ? (
          <ul className="meeting-details" style={{ listStyle: 'none', paddingLeft: 0, marginLeft: 0, textAlign: 'center' }}>
            {meeting.events.map((ev, i) => (
              <li className="meetingli" key={i}>
                <div className="meeting-title">{ev.title}</div>
                {(ev.date || ev.time) && (
                  <div className="meeting-desc">
                    {ev.date ? fmtDate(ev.date) : ''}
                    {ev.date && ev.time ? ' - ' : ''}
                    {ev.time ? fmtTimeRange(ev.time) : ''}
                  </div>
                )}
                {ev.room ? <div className="meeting-desc">Room: {ev.room}</div> : null}
                {ev.items && ev.items.length ? (
                  <ul style={{ listStyle: 'none', paddingLeft: 0, marginLeft: 0 }}>
                    {ev.items.map((item, ii) => (
                      <li key={ii}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <div className="meeting-desc">No events listed for this week.</div>
        )}
      </div>

      <div className="meeting-nav">
        <button className="date-link" disabled={!prevId} onClick={() => go(prevId)}>← Prev</button>
        <button className="date-link" onClick={() => navigate('/meetings')}>All Weeks</button>
        <button className="date-link" disabled={!nextId} onClick={() => go(nextId)}>Next →</button>
      </div>
      <button className="date-link" onClick={() => navigate('/')}>← Back</button>
    </div>
  );
}
