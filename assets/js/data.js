/* ============================================================
   data.js — loads syllabus/roadmap/notes/questions and derives
   progress numbers used across views.
   ============================================================ */
import { getJSON } from './util.js';
import { S, currentDayNumber } from './store.js';

export const loadSyllabus = () => getJSON('data/syllabus.json');
export const loadRoadmap  = () => getJSON('data/roadmap.json');
export const loadNotesIdx = () => getJSON('data/notes/index.json');
export const loadQuestions = () => getJSON('data/mcq/questions.json');
export const loadFlashcards = () => getJSON('data/flashcards.json');
export const loadLibrary = () => getJSON('library/library.json').catch(() => ({ books: [] }));

let _flat = null;
export async function allDays() {
  if (_flat) return _flat;
  const r = await loadRoadmap();
  _flat = r.weeks.flatMap(w => w.days.map(d => ({ ...d, week: w.n, phase: w.phase, theme: w.theme })));
  return _flat;
}
export async function getDay(n) {
  const days = await allDays();
  return days.find(d => d.n === n) || null;
}
export async function todayPlan() {
  const n = currentDayNumber();
  const days = await allDays();
  return { n, day: days.find(d => d.n === n) || null, total: days.length };
}

/* subject meta lookup */
let _subjMap = null;
export async function subjects() {
  if (_subjMap) return _subjMap;
  const s = await loadSyllabus();
  _subjMap = Object.fromEntries(s.subjects.map(x => [x.id, x]));
  return _subjMap;
}
export async function subjName(id) { return (await subjects())[id]?.short || id; }

/* ---------- progress maths ---------- */
export async function planProgress() {
  const days = await allDays();
  let total = 0, done = 0, minsPlanned = 0, minsDone = 0;
  for (const d of days) {
    total += d.tasks.length;
    d.tasks.forEach((t, i) => {
      minsPlanned += t.m;
      if (S.isTaskDone(d.n, i)) { done++; minsDone += t.m; }
    });
  }
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0, minsPlanned, minsDone };
}

export async function subjectProgress() {
  const days = await allDays();
  const map = {};
  for (const d of days) {
    d.tasks.forEach((t, i) => {
      const m = (map[t.s] ||= { total: 0, done: 0, mins: 0, minsDone: 0 });
      m.total++; m.mins += t.m;
      if (S.isTaskDone(d.n, i)) { m.done++; m.minsDone += t.m; }
    });
  }
  return map;
}

/* how far behind / ahead you are */
export async function pacing() {
  const days = await allDays();
  const n = currentDayNumber();
  let due = 0, dueDone = 0, backlog = [];
  for (const d of days) {
    if (d.n > n) break;
    d.tasks.forEach((t, i) => {
      due++;
      if (S.isTaskDone(d.n, i)) dueDone++;
      else if (d.n < n) backlog.push({ day: d.n, idx: i, ...t });
    });
  }
  return { due, dueDone, backlog, pct: due ? Math.round((dueDone / due) * 100) : 0 };
}
