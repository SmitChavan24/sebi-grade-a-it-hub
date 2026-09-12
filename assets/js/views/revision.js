/* Revision queue — spaced repetition over topics + your wrong answers. */
import { el, toast, pct, fmtDate } from '../util.js';
import { S, todayISO } from '../store.js';
import { loadSyllabus, subjects, loadQuestions } from '../data.js';

const GAPS = [1, 3, 7, 14, 30, 60];   // days between repetitions

export default async function revision(root) {
  const [syl, subjMap, bank] = await Promise.all([loadSyllabus(), subjects(), loadQuestions()]);
  const allTopics = syl.subjects.flatMap(s => s.topics.map(t => ({ ...t, s: s.id })));

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, 'Revision Queue'),
      el('p', { class: 'sub' }, 'Spaced repetition: 1 → 3 → 7 → 14 → 30 → 60 days. A topic you keep failing comes back to the front.')),
    el('div', { class: 'btn-row' },
      S.quiz.wrong.length ? el('a', { class: 'btn primary', href: '#/practice?mode=wrong' }, `Redo ${S.quiz.wrong.length} wrong questions`) : '')
  ));

  const today = todayISO();
  const due = [], upcoming = [], never = [];
  for (const t of allTopics) {
    const st = S.topic(t.id);
    if (!st.lastRev) { never.push(t); continue; }
    const box = st.box || 1;
    const d = new Date(st.lastRev + 'T00:00:00');
    d.setDate(d.getDate() + GAPS[Math.min(box - 1, GAPS.length - 1)]);
    const dueISO = d.toLocaleDateString('sv-SE');
    (dueISO <= today ? due : upcoming).push({ ...t, dueISO, box, status: st.status });
  }
  upcoming.sort((a, b) => a.dueISO.localeCompare(b.dueISO));

  root.append(el('div', { class: 'grid g4', style: 'margin-bottom:18px' },
    stat('Due today', String(due.length), 'revise these first', due.length ? 'warn' : 'ok'),
    stat('Scheduled', String(upcoming.length), 'coming back later', 'acc'),
    stat('Never revised', String(never.length), 'not yet in the cycle', ''),
    stat('Wrong answers', String(S.quiz.wrong.length), 'questions to redo', S.quiz.wrong.length ? 'bad' : 'ok')));

  const section = (title, arr, empty, showDate) => {
    const c = el('div', { class: 'card', style: 'margin-bottom:16px' }, el('h2', {}, title));
    if (!arr.length) { c.append(el('p', { class: 'small muted' }, empty)); return c; }
    arr.slice(0, 40).forEach(t => {
      const row = el('div', { class: 'task', style: 'cursor:default' },
        el('div', { class: 't-body' },
          el('p', { class: 't-title' }, t.name),
          el('p', { class: 't-meta' },
            el('span', { class: 'pill' }, subjMap[t.s]?.short || t.s),
            t.box ? el('span', { class: 'pill acc' }, `box ${t.box}`) : '',
            showDate && t.dueISO ? el('span', {}, 'due ' + fmtDate(t.dueISO)) : '',
            t.note ? el('a', { class: 'link-btn', href: `#/notes/${t.note}` }, 'open notes →') : '')),
        el('div', { class: 'row', style: 'gap:6px' },
          el('button', { class: 'btn sm ok', onclick: () => grade(t, true, row) }, 'Knew it'),
          el('button', { class: 'btn sm danger', onclick: () => grade(t, false, row) }, 'Forgot')));
      c.append(row);
    });
    if (arr.length > 40) c.append(el('p', { class: 'small muted' }, `+ ${arr.length - 40} more`));
    return c;
  };

  function grade(t, good, row) {
    const st = S.topic(t.id);
    const box = good ? Math.min(GAPS.length, (st.box || 1) + 1) : 1;
    S.setTopic(t.id, { box, lastRev: todayISO(), status: good ? 'done' : 'revise' });
    row.style.opacity = '.4';
    row.querySelectorAll('button').forEach(b => b.disabled = true);
    toast(good ? `Back in ${GAPS[box - 1]} days` : 'Scheduled for tomorrow');
  }

  root.append(section('Due today', due, 'Nothing due — you are current. Start a new topic instead.', true));
  root.append(section('Never revised yet', never, 'Every topic has been through at least one revision.', false));
  root.append(section('Scheduled ahead', upcoming.slice(0, 20), 'Nothing scheduled yet.', true));

  root.append(el('div', { class: 'card' },
    el('h2', {}, 'How to use this properly'),
    el('ul', { class: 'small', style: 'margin:0;padding-left:18px;color:var(--tx2)' },
      el('li', {}, 'Open the note, close it, then say the 5 main points out loud from memory. Only then grade yourself.'),
      el('li', {}, '“Knew it” means you could answer a question on it in the exam — not that it looked familiar.'),
      el('li', {}, 'Your wrong answers in the question bank are the single highest-value revision material you own. Redo them weekly until they are gone.'),
      el('li', {}, 'In the last 3 weeks, stop learning new topics entirely and live in this queue.'))));
}

const stat = (k, v, d, c) => el('div', { class: 'stat ' + c }, el('div', { class: 'k' }, k), el('div', { class: 'v' }, v), el('div', { class: 'd' }, d));
