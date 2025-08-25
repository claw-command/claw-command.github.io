import React from 'react';
import { useNavigate } from 'react-router-dom';
import { meetings as weeks, Fall_2025_Schedule } from '../data/meetings.js';

function parseLocalDate(dateStr) {
  if (!dateStr) return new Date(NaN);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (m) {
    const [, y, mo, d] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d));
  }
  return new Date(dateStr);
}

function fmtMD(dateStr) {
  const d = parseLocalDate(dateStr);
  if (isNaN(d)) return dateStr;
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
function fmtMDY(dateStr) {
  const d = parseLocalDate(dateStr);
  if (isNaN(d)) return dateStr;
  const yy = String(d.getFullYear()).slice(2);
  return `${d.getMonth() + 1}/${d.getDate()}/${yy}`;
}
function fmtDateShort(val, withYear = false) {
  if (!val) return '';
  if (val.includes(' to ')) {
    const [a, b] = val.split(' to ');
    return withYear ? `${fmtMDY(a)} - ${fmtMDY(b)}` : `${fmtMD(a)} - ${fmtMD(b)}`;
  }
  return withYear ? fmtMDY(val) : fmtMD(val);
}
function to12h(t) {
  if (!t) return '';
  const [hStr, mStr] = t.split(':');
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr || '0', 10);
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return m ? `${h}:${String(m).padStart(2, '0')}${ampm}` : `${h}${ampm}`;
}
function fmtTimeRange(timeStr) {
  if (!timeStr) return '';
  if (timeStr.includes('-')) {
    const [a, b] = timeStr.split('-');
    return `${to12h(a)}-${to12h(b)}`;
  }
  return to12h(timeStr);
}

const important = Fall_2025_Schedule.Important_Dates;
const importantList = [
  { label: 'Semester Begins', value: important.Semester_Begins, withYear: true },
  { label: 'Labor Day', value: important.Labor_Day, withYear: true },
  { label: 'GMIS Conference', value: important.GMIS_Conference, withYear: false },
  { label: 'OSSCON', value: important.OSSCON, withYear: true },
  { label: 'SHPE Conference', value: important.SHPE_Conference, withYear: false },
  { label: 'Hackaday Superconference', value: important.Hackaday_Superconference, withYear: false },
  { label: 'Veterans Day', value: important.Veterans_Day, withYear: true },
  { label: 'Thanksgiving Break', value: important.Thanksgiving_Break, withYear: true },
  { label: 'Finals Week', value: important.Finals_Week, withYear: true }
];

export default function MeetingsIndex() {
  const navigate = useNavigate();
  return (
    <div className="main-content" style={{ color: 'var(--text)' }}>
      <h1 className="week-title glitch" data-text="Fall 2025 Schedule">Fall 2025 Schedule</h1>
      <p style={{ margin: '6px 0 14px' }}>
        <a
          href="https://pointed-catamaran-df1.notion.site/Fall-2025-Schedule-227f8dc7ece6809b930ef8800f3598fd"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--text)', textDecoration: 'underline' }}
        >
          Fall 2025 Schedule
        </a>
      </p>

      <div className="meeting-nav">
        <button className="date-link" onClick={() => navigate('/')} aria-label="Go to Home">← Home</button>
      </div>

      <details open style={{ width: 'min(900px,94vw)', textAlign: 'left', marginBottom: 14, color: 'var(--text)' }}>
        <summary className="meeting-title">Important Dates</summary>
        <div style={{ margin: '8px 0' }}>CSULA Academic Calendar</div>
        {importantList.map((d) => (
          <div key={d.label} style={{ margin: '6px 0' }}>
            {fmtDateShort(d.value, d.withYear)} : {d.label}
          </div>
        ))}
      </details>

      <details open style={{ width: 'min(900px,94vw)', textAlign: 'left', color: 'var(--text)' }}>
        <summary className="meeting-title">Week Breakdown</summary>
        <ul style={{ marginTop: 8 }}>
          {weeks.map((m) => (
            <li key={m.id} style={{ margin: '8px 0' }}>
              <button
                className="week-card-header"
                style={{ textDecoration: 'none', background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer' }}
                onClick={() => navigate(`/meetings/${m.id}`)}
                aria-label={`Open ${m.title}`}
              >
                <strong>{m.title}</strong>
              </button>
              {m.events && m.events.length ? (
                <ul style={{ marginTop: 6 }}>
                  {m.events.map((ev, i) => (
                    <li key={i} style={{ margin: '6px 0' }}>
                      {ev.kind === 'Recruitment' ? (
                        <>
                          <span>Recruitment Efforts:</span>
                          {ev.items && ev.items.length ? (
                            <ul style={{ marginTop: 6 }}>
                              {ev.items.map((item, ii) => (
                                <li key={ii}>{item}</li>
                              ))}
                            </ul>
                          ) : null}
                        </>
                      ) : ev.kind === 'Movie' ? (
                        <>
                          <span>{ev.date ? fmtDateShort(ev.date) + ' ' : ''}</span>
                          <strong>Movie Screening{ev.time ? ' ' + fmtTimeRange(ev.time) + ' start' : ''}</strong>
                          {ev.room ? <div style={{ marginTop: 4 }}>Room: {ev.room}</div> : null}
                          {(ev.items && ev.items.length) || ev.title ? (
                            <ul style={{ marginTop: 6 }}>
                              {ev.items && ev.items.length
                                ? ev.items.map((item, ii) => <li key={ii}>{item}</li>)
                                : null}
                              {ev.title ? <li>{ev.title.replace('Movie Screening: ', '')}</li> : null}
                            </ul>
                          ) : null}
                        </>
                      ) : ev.kind === 'Conference' ? (
                        <>
                          <span>{ev.date ? fmtDateShort(ev.date) : ''} : {ev.title}</span>
                          {ev.items && ev.items.length ? (
                            <ul style={{ marginTop: 6 }}>
                              {ev.items.map((item, ii) => (
                                <li key={ii}>{item}</li>
                              ))}
                            </ul>
                          ) : null}
                        </>
                      ) : (
                        <>
                          <span>
                            {ev.date ? fmtDateShort(ev.date) + ' ' : ''}
                            {ev.title}
                            {ev.time ? ' ' + fmtTimeRange(ev.time) : ''}
                          </span>
                          {ev.room ? <div style={{ marginTop: 4 }}>Room: {ev.room}</div> : null}
                          {ev.items && ev.items.length ? (
                            <ul style={{ marginTop: 6 }}>
                              {ev.items.map((item, ii) => (
                                <li key={ii}>{item}</li>
                              ))}
                            </ul>
                          ) : null}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
