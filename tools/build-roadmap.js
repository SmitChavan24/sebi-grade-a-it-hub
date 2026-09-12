/* ============================================================
   build-roadmap.js
   Generates data/roadmap.json — a concrete 180-day study plan
   for SEBI Grade A (IT stream) out of data/syllabus.json.

   Run:  node tools/build-roadmap.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const syl = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/syllabus.json'), 'utf8'));
const subj = Object.fromEntries(syl.subjects.map(s => [s.id, s]));

const TOTAL_DAYS = 180;

/* ---------- helpers ---------- */
// Turn a subject's topics into a queue of day-sized slots.
// A topic with est=4 and slot=1.5 becomes 3 slots: "(1/3)", "(2/3)", "(3/3)".
function queue(subjectId, slotHours) {
  const out = [];
  for (const t of subj[subjectId].topics) {
    const parts = Math.max(1, Math.round(t.est / slotHours));
    for (let p = 1; p <= parts; p++) out.push({ ...t, s: subjectId, part: p, parts });
  }
  return out;
}
const label = u => u.parts > 1 ? `${u.name} (part ${u.part}/${u.parts})` : u.name;

function cycle(arr) { let i = 0; return () => arr[i++ % arr.length]; }

/* ---------- curriculum queues (first pass) ---------- */
const IT_ORDER = ['it-prog', 'it-ds', 'it-os', 'it-dbms', 'it-cn', 'it-coa', 'it-se', 'it-web', 'it-sec', 'it-cloud', 'it-fin'];
const itQueue = IT_ORDER.flatMap(id => queue(id, 1.25));
const gaQueue = queue('ga', 0.75);
const qaQueue = queue('qa', 0.75);
const reQueue = queue('reas', 0.75);
const enQueue = queue('eng', 0.5);
const edQueue = queue('engd', 0.75);

/* All topics, for revision cycles */
const allIT = IT_ORDER.flatMap(id => subj[id].topics.map(t => ({ ...t, s: id })));
const allP1 = ['ga', 'qa', 'reas', 'eng'].flatMap(id => subj[id].topics.map(t => ({ ...t, s: id })));

/* ---------- current-affairs & english rotations ---------- */
const caTasks = cycle([
  'Read the day\'s business paper (Mint / Business Standard) — note 5 market items',
  'SEBI website: scan Press Releases + Orders of the day, note 2 lines each',
  'Read 1 SEBI circular end-to-end and summarise it in 5 bullets',
  'Economic Times markets page + note new terms in your CA log',
  'RBI/SEBI monthly bulletin skim — note policy changes',
  'Revise this week\'s current affairs log entries'
]);
const engTasks = cycle([
  'Reading comprehension — 1 passage (10 Q) with a timer',
  'Error spotting — 20 questions + note the rule you missed',
  'Cloze test + fillers — 15 questions',
  'Para jumbles — 10 sets',
  'Vocabulary: 15 new words + 5 idioms into your flashcards',
  'Grammar rule revision + 15 sentence-improvement questions'
]);

/* ---------- day builders ---------- */
const T = (t, s, m, kind, n) => ({ t, s, m, k: kind, ...(n ? { n } : {}) });

function buildDay(n, dow, phase) {
  const tasks = [];
  const isSunday = dow === 0;

  if (phase === 'build') {
    if (isSunday) {
      tasks.push(T('Weekly revision: re-read this week\'s IT notes + your own margin notes', 'it-ds', 75, 'revise'));
      tasks.push(T('Weekly sectional test: 50 IT MCQs from the Question Bank (timed)', 'it-ds', 45, 'test'));
      tasks.push(T('Weekly sectional test: 40 questions GA + Securities Market', 'ga', 30, 'test'));
      tasks.push(T('Clear backlog: any unchecked task from this week', 'ga', 60, 'revise'));
      tasks.push(T('Update your weak-topic list + flashcards for everything you got wrong', 'ga', 30, 'revise'));
      tasks.push(T('Weekly current affairs compilation — condense the week into 1 page', 'ga', 30, 'ca'));
      return tasks;
    }
    const it1 = itQueue.shift(), it2 = itQueue.shift();
    if (it1) tasks.push(T(`${subj[it1.s].short}: ${label(it1)}`, it1.s, 75, 'learn', it1.note));
    if (it2) tasks.push(T(`${subj[it2.s].short}: ${label(it2)}`, it2.s, 60, 'learn', it2.note));
    if (it1) tasks.push(T(`Practice 20 MCQs on "${it1.name.split(':')[0]}" + note every mistake`, it1.s, 30, 'practice', it1.note));

    const g = gaQueue.shift();
    if (g) tasks.push(T(`Securities market: ${label(g)}`, 'ga', 45, 'learn', g.note));
    else   tasks.push(T('Securities market revision + 25 MCQs', 'ga', 45, 'revise'));

    const alt = (n % 2) ? qaQueue.shift() : reQueue.shift();
    if (alt) tasks.push(T(`${subj[alt.s].short}: ${label(alt)}`, alt.s, 45, 'learn', alt.note));
    else {
      const f = (n % 2) ? 'Quant' : 'Reasoning';
      tasks.push(T(`${f} practice set — 25 questions, timed`, (n % 2) ? 'qa' : 'reas', 45, 'practice'));
    }

    const e = enQueue.shift();
    tasks.push(e ? T(`English: ${label(e)}`, 'eng', 25, 'learn', e.note) : T(`English: ${engTasks()}`, 'eng', 25, 'practice'));
    tasks.push(T(`Current affairs: ${caTasks()}`, 'ga', 20, 'ca'));
    return tasks;
  }

  if (phase === 'rev1') {
    // Revision cycle 1 + descriptive writing + weekly full mock
    const r1 = allIT[(n * 3) % allIT.length], r2 = allIT[(n * 3 + 1) % allIT.length];
    if (isSunday) {
      tasks.push(T('FULL MOCK — Phase I Paper 1 (100 Q / 60 min) under exam conditions', 'ga', 60, 'test'));
      tasks.push(T('FULL MOCK — Phase I Paper 2 IT (100 Q / 40 min)', 'it-ds', 40, 'test'));
      tasks.push(T('Mock analysis: log the score, classify every mistake (silly / concept / unseen)', 'ga', 60, 'revise'));
      tasks.push(T('Re-study the 3 weakest topics from today\'s mock', 'it-sec', 75, 'revise'));
      tasks.push(T('Weekly current affairs compilation', 'ga', 30, 'ca'));
      return tasks;
    }
    tasks.push(T(`Revision 1 — ${subj[r1.s].short}: ${r1.name}`, r1.s, 60, 'revise', r1.note));
    tasks.push(T(`Revision 1 — ${subj[r2.s].short}: ${r2.name}`, r2.s, 45, 'revise', r2.note));
    const ed = edQueue.shift();
    tasks.push(ed
      ? T(`Descriptive English: ${label(ed)}`, 'engd', 50, 'write', ed.note)
      : T('Descriptive practice: write 1 essay (250 words) OR 1 précis in 30 min, then self-review', 'engd', 50, 'write', 'engd-essay'));
    tasks.push(T('IT descriptive answer writing — 1 long question in 15 min (structure + diagram)', 'it-sec', 30, 'write', 'it-descriptive-method'));
    const p = allP1[(n * 2) % allP1.length];
    tasks.push(T(`${subj[p.s].short} practice: ${p.name}`, p.s, 45, 'practice', p.note));
    tasks.push(T(`Current affairs: ${caTasks()}`, 'ga', 20, 'ca'));
    tasks.push(T('Flashcard drill — clear today\'s due cards', 'ga', 15, 'revise'));
    return tasks;
  }

  if (phase === 'rev2') {
    // Rapid revision 2 + mock intensive
    const r1 = allIT[(n * 5) % allIT.length], r2 = allIT[(n * 5 + 2) % allIT.length], r3 = allIT[(n * 5 + 4) % allIT.length];
    if (isSunday) {
      tasks.push(T('FULL MOCK — Phase II Paper 2 IT (objective + descriptive, full duration)', 'it-ds', 100, 'test'));
      tasks.push(T('FULL MOCK — Phase II Paper 1 English descriptive (60 min, handwritten/typed)', 'engd', 60, 'test'));
      tasks.push(T('Deep mock analysis + rewrite one answer properly', 'engd', 60, 'revise'));
      tasks.push(T('Weekly current affairs compilation', 'ga', 30, 'ca'));
      return tasks;
    }
    tasks.push(T(`Rapid revision — ${subj[r1.s].short}: ${r1.name}`, r1.s, 40, 'revise', r1.note));
    tasks.push(T(`Rapid revision — ${subj[r2.s].short}: ${r2.name}`, r2.s, 40, 'revise', r2.note));
    tasks.push(T(`Rapid revision — ${subj[r3.s].short}: ${r3.name}`, r3.s, 35, 'revise', r3.note));
    tasks.push(T('Sectional mock — 40 IT MCQs in 20 min (speed focus)', 'it-ds', 25, 'test'));
    tasks.push(T('Securities market + SEBI regulations rapid revision (one-liners)', 'ga', 40, 'revise', 'ga-sebi-regulations'));
    tasks.push(T('Wrong-answer review from the Question Bank (Revision Queue)', 'it-ds', 30, 'revise'));
    tasks.push(T(`Current affairs: ${caTasks()}`, 'ga', 20, 'ca'));
    return tasks;
  }

  /* phase === 'final' */
  const finalPlan = [
    ['Final revision: Operating Systems + Computer Networks one-pagers', 'it-os', 'it-os-intro'],
    ['Final revision: DBMS + DSA one-pagers', 'it-dbms', 'it-dbms-sql'],
    ['Final revision: Cyber security, IT Act, SEBI CSCRF', 'it-sec', 'it-sec-sebi-cscrf'],
    ['Final revision: SEBI Act, regulations, market structure', 'ga', 'ga-sebi-regulations'],
    ['Final revision: emerging tech + IT in securities markets', 'it-fin', 'it-fin-mii']
  ];
  const fp = finalPlan[(n - 1) % finalPlan.length];
  tasks.push(T(fp[0], fp[1], 90, 'revise', fp[2]));
  tasks.push(T('Formula / one-liner sheet run-through (Quant + Reasoning shortcuts)', 'qa', 40, 'revise', 'qa-speed-maths'));
  tasks.push(T('Current affairs: last 6 months compilation — final pass', 'ga', 45, 'ca', 'ga-current-affairs'));
  tasks.push(T('50 mixed MCQs — accuracy over speed', 'it-ds', 35, 'test'));
  tasks.push(T('Interview prep: 3 questions answered aloud + recorded', 'intv', 30, 'write', 'intv-it-questions'));
  tasks.push(T('Sleep, hydration, exam-day logistics check (admit card, centre, ID)', 'intv', 10, 'revise'));
  return tasks;
}

/* ---------- week themes ---------- */
function phaseOf(day) {
  if (day <= 126) return 'build';
  if (day <= 154) return 'rev1';
  if (day <= 175) return 'rev2';
  return 'final';
}
const PHASE_META = {
  build: { name: 'Phase A — Full syllabus, first pass', c: 'acc' },
  rev1:  { name: 'Phase B — Revision 1 + descriptive writing + mocks', c: 'pur' },
  rev2:  { name: 'Phase C — Rapid revision 2 + mock intensive', c: 'warn' },
  final: { name: 'Phase D — Final week', c: 'ok' }
};

/* ---------- build ---------- */
const weeks = [];
let dayN = 1;
for (let w = 1; dayN <= TOTAL_DAYS; w++) {
  const days = [];
  for (let d = 0; d < 7 && dayN <= TOTAL_DAYS; d++, dayN++) {
    const dow = (dayN - 1 + 1) % 7; // day 1 = Monday → dow 1..6, Sunday = 0
    days.push({ n: dayN, dow, tasks: buildDay(dayN, dow === 0 ? 0 : dow, phaseOf(dayN)) });
  }
  // theme = the IT subject that dominates the week
  const counts = {};
  days.flatMap(d => d.tasks).forEach(t => { if (t.s.startsWith('it-')) counts[t.s] = (counts[t.s] || 0) + t.m; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const ph = phaseOf(days[0].n);
  weeks.push({
    n: w,
    phase: ph,
    phaseName: PHASE_META[ph].name,
    colour: PHASE_META[ph].c,
    theme: ph === 'build'
      ? (top ? `${subj[top[0]].short} focus` : 'Foundation')
      : ph === 'rev1' ? `Revision 1 + descriptive (week ${w})`
      : ph === 'rev2' ? `Rapid revision + mocks (week ${w})`
      : 'Final week',
    days
  });
}

const totalTasks = weeks.reduce((a, w) => a + w.days.reduce((b, d) => b + d.tasks.length, 0), 0);
const totalMins  = weeks.reduce((a, w) => a + w.days.reduce((b, d) => b + d.tasks.reduce((c, t) => c + t.m, 0), 0), 0);

const out = {
  title: 'SEBI Grade A (IT) — 180 Day Plan',
  totalDays: TOTAL_DAYS,
  totalTasks,
  totalHours: Math.round(totalMins / 60),
  generated: new Date().toISOString().slice(0, 10),
  phases: PHASE_META,
  note: 'Day 1 is whatever date you set as your start date in Settings. Rest day = Sunday of each week is a revision/test day, not a new-topic day. If the official notification lands earlier than you planned, jump to the nearest revision phase and prioritise Phase I papers.',
  weeks
};

fs.writeFileSync(path.join(ROOT, 'data/roadmap.json'), JSON.stringify(out));
console.log(`roadmap.json written: ${TOTAL_DAYS} days, ${weeks.length} weeks, ${totalTasks} tasks, ~${out.totalHours} study hours.`);
console.log(`IT queue left over (not scheduled in first pass): ${itQueue.length} slots`);
console.log(`GA left ${gaQueue.length} | QA left ${qaQueue.length} | REAS left ${reQueue.length} | ENG left ${enQueue.length} | ENGD left ${edQueue.length}`);
