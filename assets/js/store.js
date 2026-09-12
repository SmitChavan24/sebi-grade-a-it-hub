/* ============================================================
   store.js — all persistent state (localStorage), one object.
   Everything you do in the app lives here and can be exported
   to a JSON file and re-imported on any other device.
   ============================================================ */

const KEY = 'sebi-gradeA-it-hub:v1';

const todayISO = () => new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD, local time

const DEFAULTS = () => ({
  v: 1,
  createdAt: new Date().toISOString(),
  settings: {
    name: '',
    startDate: todayISO(),
    examDate: '',           // set in Settings
    dailyHours: 4,
    theme: 'dark',
    planDays: 180
  },
  tasks:    {},   // "d12:3" -> true
  topics:   {},   // topicId -> {status, conf, lastRev, box, due}
  sessions: {},   // "YYYY-MM-DD" -> minutes studied
  quiz: { attempts: [], wrong: [], mastered: [] },
  mocks:    [],   // {id,d,name,type,score,max,attempted,correct,notes}
  ca:       [],   // {id,d,title,body,tags[]}
  reader:   {},   // fileKey -> {name,page,total,bookmarks[],note,updated}
  userNotes:{},   // noteId -> markdown written by you
  flash:    {},   // cardId -> {box,due,seen}
  misc:     {}    // ui prefs, last-opened, etc.
});

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS();
    const parsed = JSON.parse(raw);
    return migrate({ ...DEFAULTS(), ...parsed, settings: { ...DEFAULTS().settings, ...(parsed.settings || {}) } });
  } catch (e) {
    console.warn('State unreadable, starting fresh.', e);
    return DEFAULTS();
  }
}

function migrate(s) {
  if (!s.quiz) s.quiz = { attempts: [], wrong: [], mastered: [] };
  if (!Array.isArray(s.quiz.wrong)) s.quiz.wrong = [];
  if (!Array.isArray(s.quiz.mastered)) s.quiz.mastered = [];
  if (!s.flash) s.flash = {};
  if (!s.userNotes) s.userNotes = {};
  return s;
}

let saveTimer = null;
function save() {
  clearTimeout(saveTimer);
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch (e) { console.warn('Could not save (storage full or blocked).', e); window.dispatchEvent(new CustomEvent('storage:failed')); }
  window.dispatchEvent(new CustomEvent('state:change'));
}

export function validateBackup(parsed) {
  const record=x=>!!x && typeof x==='object' && !Array.isArray(x);
  if(!record(parsed)||parsed.v!==1||!record(parsed.settings)||!record(parsed.tasks)) throw new Error('Not a SEBI study backup (version 1 expected)');
  function checkKeys(value){if(!value||typeof value!=='object')return;for(const [k,v]of Object.entries(value)){if(['__proto__','prototype','constructor'].includes(k))throw new Error('Unsafe backup key');checkKeys(v);}}
  checkKeys(parsed);
  const validDate=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString().slice(0,10)===x;
  if(!validDate(parsed.settings.startDate))throw new Error('Invalid plan start date');
  if(parsed.settings.examDate&&!validDate(parsed.settings.examDate))throw new Error('Invalid exam date');
  if(!Number.isFinite(parsed.settings.dailyHours)||parsed.settings.dailyHours<1||parsed.settings.dailyHours>16)throw new Error('Invalid daily hours');
  if(typeof parsed.settings.name!=='string')throw new Error('Invalid name');
  if(!['dark','light'].includes(parsed.settings.theme))throw new Error('Invalid theme');
  for(const [key,value]of Object.entries(parsed.tasks))if(!/^d\d+:\d+$/.test(key)||typeof value!=='boolean')throw new Error('Invalid task data');
  for(const key of ['topics','sessions','reader','userNotes','flash','misc'])if(!record(parsed[key]))throw new Error('Invalid '+key+' data');
  for(const [date,minutes]of Object.entries(parsed.sessions))if(!validDate(date)||!Number.isFinite(minutes)||minutes<0)throw new Error('Invalid study session');
  if(!record(parsed.quiz)||!['attempts','wrong','mastered'].every(k=>Array.isArray(parsed.quiz[k])))throw new Error('Invalid quiz data');
  for(const key of ['mocks','ca'])if(!Array.isArray(parsed[key]))throw new Error('Invalid '+key+' data');
  for(const value of Object.values(parsed.userNotes))if(typeof value!=='string')throw new Error('Invalid personal note');
  for(const value of Object.values(parsed.reader))if(!record(value)||!Array.isArray(value.bookmarks)||!value.bookmarks.every(p=>Number.isInteger(p)&&p>0)||typeof value.note!=='string')throw new Error('Invalid reader data');
  return parsed;
}

/* ------------------------------------------------------------------ */
/* public API                                                          */
/* ------------------------------------------------------------------ */
export const S = {
  get raw() { return state; },
  get settings() { return state.settings; },

  set(path, value) {
    const parts = path.split('.');
    if(parts.some(k=>['__proto__','prototype','constructor'].includes(k)))throw new Error('Invalid setting key');
    let o = state;
    for (let i = 0; i < parts.length - 1; i++) { o[parts[i]] = o[parts[i]] ?? {}; o = o[parts[i]]; }
    o[parts.at(-1)] = value;
    save();
  },

  /* ---- daily tasks ---- */
  taskKey: (day, idx) => `d${day}:${idx}`,
  isTaskDone(day, idx) { return !!state.tasks[`d${day}:${idx}`]; },
  toggleTask(day, idx, force) {
    const k = `d${day}:${idx}`;
    const next = force === undefined ? !state.tasks[k] : !!force;
    if (next) state.tasks[k] = true; else delete state.tasks[k];
    state.misc.taskDates ||= {};
    if(next)state.misc.taskDates[k]=todayISO();else delete state.misc.taskDates[k];
    save();
    return next;
  },
  dayDone(day, count) {
    let n = 0;
    for (let i = 0; i < count; i++) if (state.tasks[`d${day}:${i}`]) n++;
    return n;
  },
  totalTasksDone() { return Object.keys(state.tasks).length; },

  /* ---- topics / syllabus coverage ---- */
  topic(id) { return state.topics[id] || { status: 'todo', conf: 0, lastRev: null, box: 0 }; },
  setTopic(id, patch) {
    state.topics[id] = { ...this.topic(id), ...patch };
    save();
  },

  /* ---- study sessions (minutes) ---- */
  addMinutes(mins, dateISO) {
    if(!Number.isFinite(mins)||mins<0)throw new Error('Invalid study minutes');
    const d = dateISO || todayISO();
    state.sessions[d] = (state.sessions[d] || 0) + Math.max(0, Math.round(mins));
    save();
  },
  minutesOn(dateISO) { return state.sessions[dateISO] || 0; },
  get sessions() { return state.sessions; },
  totalMinutes() { return Object.values(state.sessions).reduce((a, b) => a + b, 0); },

  /* ---- streak ---- */
  streak() {
    let n = 0;
    const d = new Date();
    for (;;) {
      const iso = d.toLocaleDateString('sv-SE');
      const active = (state.sessions[iso] || 0) > 0 ||
        Object.values(state.misc.taskDates || {}).includes(iso);
      if (active) { n++; d.setDate(d.getDate() - 1); }
      else if (n === 0 && iso === todayISO()) { d.setDate(d.getDate() - 1); } // today not started yet
      else break;
      if (n > 400) break;
    }
    return n;
  },

  /* ---- quiz ---- */
  logAttempt(a) { state.quiz.attempts.unshift({ id: uid(), d: todayISO(), ...a }); state.quiz.attempts = state.quiz.attempts.slice(0, 400); save(); },
  markWrong(qid) { if (!state.quiz.wrong.includes(qid)) state.quiz.wrong.push(qid); state.quiz.mastered = state.quiz.mastered.filter(x => x !== qid); save(); },
  markRight(qid) { state.quiz.wrong = state.quiz.wrong.filter(x => x !== qid); if (!state.quiz.mastered.includes(qid)) state.quiz.mastered.push(qid); save(); },
  get quiz() { return state.quiz; },

  /* ---- mocks ---- */
  addMock(m) { state.mocks.unshift({ id: uid(), ...m }); save(); },
  delMock(id) { state.mocks = state.mocks.filter(m => m.id !== id); save(); },
  get mocks() { return state.mocks; },

  /* ---- current affairs ---- */
  addCA(c) { state.ca.unshift({ id: uid(), ...c }); save(); },
  delCA(id) { state.ca = state.ca.filter(c => c.id !== id); save(); },
  get ca() { return state.ca; },

  /* ---- reader ---- */
  readerState(key) { return state.reader[key] || { page: 1, total: 0, bookmarks: [], note: '' }; },
  setReader(key, patch) {
    state.reader[key] = { ...this.readerState(key), ...patch, updated: Date.now() };
    save();
  },
  get readerAll() { return state.reader; },

  /* ---- your own notes ---- */
  userNote(id) { return state.userNotes[id] || ''; },
  setUserNote(id, md) { if (md.trim()) state.userNotes[id] = md; else delete state.userNotes[id]; save(); },

  /* ---- flashcards (Leitner boxes) ---- */
  card(id) { return state.flash[id] || { box: 1, due: todayISO(), seen: 0 }; },
  gradeCard(id, good) {
    const c = this.card(id);
    const box = good ? Math.min(5, c.box + 1) : 1;
    const gap = [0, 1, 2, 4, 8, 16][box];
    const due = new Date(); due.setDate(due.getDate() + gap);
    state.flash[id] = { box, due: due.toLocaleDateString('sv-SE'), seen: (c.seen || 0) + 1 };
    save();
  },
  get flash() { return state.flash; },

  /* ---- misc ui ---- */
  m(k, v) { if (v === undefined) return state.misc[k]; state.misc[k] = v; save(); },

  /* ---- backup ---- */
  export() { return JSON.stringify(state, null, 2); },
  import(json) {
    const parsed = validateBackup(JSON.parse(json));
    const next = migrate({ ...DEFAULTS(), ...parsed, settings: { ...DEFAULTS().settings, ...parsed.settings } });
    localStorage.setItem(KEY, JSON.stringify(next));
    state = next;
    window.dispatchEvent(new CustomEvent('state:change'));
  },
  reset() { state = DEFAULTS(); localStorage.setItem(KEY, JSON.stringify(state)); window.dispatchEvent(new CustomEvent('state:change')); }
};

/* ------------------------------------------------------------------ */
/* date helpers tied to the plan start date                            */
/* ------------------------------------------------------------------ */
export function dayNumberFor(iso) {
  return Math.floor((Date.parse(iso+'T00:00:00Z')-Date.parse(state.settings.startDate+'T00:00:00Z'))/86400000)+1;
}
export function dateForDay(n) {
  const d = new Date(state.settings.startDate + 'T00:00:00');
  d.setDate(d.getDate() + n - 1);
  return d;
}
export function currentDayNumber() {
  return dayNumberFor(todayISO());
}
export function daysToExam() {
  const e = state.settings.examDate;
  if (!e) return null;
  return Math.ceil((new Date(e + 'T00:00:00') - new Date(todayISO() + 'T00:00:00')) / 86400000);
}
export { todayISO };
export function uid() { return Math.random().toString(36).slice(2, 10); }
