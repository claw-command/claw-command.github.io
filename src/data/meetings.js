// Ported from Svelte src/lib/data/meetings.js
export const Fall_2025_Schedule = {
  Important_Dates: {
    Semester_Begins: '2025-08-18',
    Labor_Day: '2025-09-01',
    GMIS_Conference: '2025-10-02 to 2025-10-04',
    OSSCON: '2025-10-18',
    SHPE_Conference: '2025-10-29 to 2025-11-01',
    Hackaday_Superconference: '2025-10-31 to 2025-11-02',
    Veterans_Day: '2025-11-11',
    Thanksgiving_Break: '2025-11-24 to 2025-11-29',
    Finals_Week: '2025-12-08 to 2025-12-13'
  },
  Weeks: [
    { Week_of: '2025-08-18', Events: [
      { type: 'Recruitment', details: ['Be on the look out for Claw Commanders in your classes!'] },
      { type: 'Event', date: '2025-08-21', name: 'College of ECST Fall 2025 Welcome Back Celebration' }
    ]},
    { Week_of: '2025-08-25', Events: [
      { type: 'Recruitment', details: ['Be on the look out for Claw Commanders in your classes!'] },
  { type: 'Movie_Night', date: '2025-08-29', time: '17:00', title: 'Hackers (1995)', room: 'Circuit Space ET B-105' }
    ]},
    { Week_of: '2025-09-01', Events: [ { type: 'Recruitment', details: ['Be on the look out for Claw Commanders in your classes!'] } ] },
    { Week_of: '2025-09-08', Events: [ { type: 'Meeting', date: '2025-09-09', time: '15:00-16:00', name: 'General Club Meeting', room: 'Circuit Space ET B-105' } ] },
    { Week_of: '2025-09-15', Events: [ { type: 'Workshop', date: '2025-09-16', time: '15:00-16:00', topic: 'Pico-Ducky', room: 'Circuit Space ET B-105' } ] },
    { Week_of: '2025-09-22', Events: [ { type: 'Guest_Speaker', date: '2025-09-23', time: '15:00-16:00', speaker: 'FireFly', room: 'Circuit Space ET B-105' }, { type: 'Movie_Night', date: '2025-09-26', time: '17:00', title: 'Wargames (1983)', room: 'Circuit Space ET B-105' } ] },
    { Week_of: '2025-09-29', Events: [ { type: 'Meeting', date: '2025-09-30', time: '15:00-18:00', name: 'SentinelOne Threat Hunting', room: 'TBD' }, { type: 'Conference', date: '2025-10-02 to 2025-10-04', name: 'GMIS Conference' } ] },
    { Week_of: '2025-10-06', Events: [ { type: 'Workshop', date: '2025-10-07', time: '15:00-16:00', topic: 'CCDC Info Session', room: 'Circuit Space ET B-105' } ] },
    { Week_of: '2025-10-13', Events: [ { type: 'Conference', date: '2025-10-18', time: '09:00-18:00', name: 'OSSCON', details: ['Hosting Hardware Hacking Village', 'Carpool list'] } ] },
    { Week_of: '2025-10-20', Events: [ { type: 'President Speaker', date: '2025-10-21', time: '15:00-16:00', speaker: 'Jitter', room: 'Circuit Space ET B-105' } ] },
    { Week_of: '2025-10-27', Events: [ { type: 'Movie Tuesday!', date: '2025-10-27', name: 'Spy Kids' }, { type: 'Conference', date: '2025-10-31 to 2025-11-02', name: 'Hackaday Supercon' }, { type: 'Movie_Night', date: '2025-10-31', time: '17:00', title: 'Spy Kids', room: 'Circuit Space ET B-105' } ] },
    { Week_of: '2025-11-03', Events: [ { type: 'Workshop', date: '2025-11-04', time: '15:00-16:00', topic: 'Alex Lynd', room: 'Circuit Space ET B-105' } ] },
    { Week_of: '2025-11-10', Events: [ { type: 'Guest_Speaker', date: '2025-11-11', time: '15:00-16:00', speaker: 'Peter Morin', room: 'Circuit Space ET B-105' } ] },
    { Week_of: '2025-11-17', Events: [ { type: 'Workshop', date: '2025-11-17', time: '15:00-16:00', topic: 'Warm My Turkey', details: ['Use electronics and tech to warm a slice of turkey sandwich meat'], room: 'Circuit Space ET B-105' } ] },
    { Week_of: '2025-11-24', Events: [ { type: 'Holiday', name: 'Thanksgiving 🦃🧂🍽️' } ] },
    { Week_of: '2025-12-01', Events: [ { type: 'Study_Event', date: '2025-12-02', name: 'Study-a-thon', room: 'Circuit Space ET B-105' } ] },
    { Week_of: '2025-12-08', Events: [ { type: 'Finals', name: 'Final Exams Week' } ] }
  ]
};

function parseLocalDate(dateStr) {
  if (!dateStr) return new Date(NaN);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (m) {
    const [, y, mo, d] = m;
    return new Date(Number(y), Number(mo) - 1, Number(d));
  }
  // Fallback to native parsing (handles ranges elsewhere)
  return new Date(dateStr);
}
function formatShort(md) {
  const d = parseLocalDate(md);
  if (isNaN(d)) return md;
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
function weekTitle(md) {
  return `${formatShort(md)} Week`;
}
function normalizeEvent(e) {
  const items = [];
  if (e?.expected_attendance) items.push(`~${e.expected_attendance} ppl expected`);
  if (Array.isArray(e?.details) && e.details.length) items.push(...e.details);
  const base = { date: e.date ?? null, time: e.time ?? null, room: e.room ?? null, items };

  switch (e.type) {
    case 'Recruitment':
      return { ...base, kind: 'Recruitment', title: 'Recruitment Efforts', items: Array.isArray(e.details) ? e.details : [] };
    case 'Event':
      return { ...base, kind: 'Event', title: e.name };
    case 'Movie_Night':
      return { ...base, kind: 'Movie', title: `Movie Night: ${e.title}` };
    case 'Meeting':
      return { ...base, kind: 'Meeting', title: e.name ?? 'Meeting' };
    case 'Workshop':
      return { ...base, kind: 'Workshop', title: `Workshop${e.topic ? `: ${e.topic}` : ''}` };
    case 'Guest_Speaker':
      return { ...base, kind: 'Guest Speaker', title: `Guest Speaker${e.speaker ? `: ${e.speaker}` : ''}` };
    case 'Conference':
      return { ...base, kind: 'Conference', title: e.name ?? 'Conference' };
    case 'Holiday':
      return { ...base, kind: 'Holiday', title: e.name ?? 'Holiday' };
    case 'Study_Event':
      return { ...base, kind: 'Study', title: e.name ?? 'Study Event' };
    case 'Finals':
      return { ...base, kind: 'Finals', title: e.name ?? 'Finals Week' };
    default:
      return { ...base, kind: e.type ?? 'Event', title: e.name ?? e.title ?? 'Event' };
  }
}

export const weeks = Fall_2025_Schedule.Weeks.map((w) => {
  const id = w.Week_of;
  return {
    id,
    dateLabel: weekTitle(id),
    shortDate: formatShort(id),
    title: weekTitle(id),
    description: 'Weekly meetings and activities',
    events: Array.isArray(w.Events) ? w.Events.map(normalizeEvent) : []
  };
});

export const meetings = weeks;

export function getUpcomingWeek(referenceDate = new Date()) {
  const ref = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
    12, 0, 0, 0
  );
  const withDates = weeks.map((m) => {
    const d = parseLocalDate(m.id);
    if (!isNaN(d)) d.setHours(12, 0, 0, 0);
    return { ...m, date: d };
  });
  const upcoming = withDates.filter((m) => m.date >= ref).sort((a, b) => a.date - b.date)[0];
  return upcoming || null;
}

export const getUpcomingMeeting = getUpcomingWeek;

export function getStartedWeeks(referenceDate = new Date()) {
  const ref = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
    23, 59, 59, 999
  );
  return weeks.filter((m) => parseLocalDate(m.id) <= ref);
}

// Return the next upcoming event across all weeks, based on local dates.
// Definition: earliest event whose start date is today or later. For same-day ties, earlier start time wins.
export function getNextUpcomingEvent(referenceDate = new Date()) {
  const ref = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
    0, 0, 0, 0
  );

  function parseStart(dateStr) {
    if (!dateStr) return new Date(NaN);
    if (dateStr.includes(' to ')) {
      const [a] = dateStr.split(' to ').map((s) => s.trim());
      return parseLocalDate(a);
    }
    return parseLocalDate(dateStr);
  }

  function timeToMinutes(timeStr) {
    if (!timeStr) return 24 * 60; // place undated times at the end of the same day
    const start = timeStr.includes('-') ? timeStr.split('-')[0].trim() : timeStr.trim();
    const m = /^(\d{1,2})(?::(\d{2}))?$/.exec(start);
    if (!m) return 24 * 60;
    let h = parseInt(m[1], 10);
    const min = m[2] ? parseInt(m[2], 10) : 0;
    if (!Number.isFinite(h) || !Number.isFinite(min)) return 24 * 60;
    return h * 60 + min;
  }

  const entries = [];
  for (const w of weeks) {
    if (!Array.isArray(w.events)) continue;
    for (const ev of w.events) {
      if (!ev?.date) continue; // skip items without explicit dates
      const start = parseStart(ev.date);
      if (isNaN(start)) continue;
      start.setHours(0, 0, 0, 0);
      entries.push({
        weekId: w.id,
        weekTitle: w.title,
        event: ev,
        start,
        timeMinutes: timeToMinutes(ev.time)
      });
    }
  }

  const upcoming = entries
    .filter((e) => e.start >= ref)
    .sort((a, b) => (a.start - b.start) || (a.timeMinutes - b.timeMinutes))[0];

  return upcoming || null;
}
