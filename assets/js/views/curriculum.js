/* Curriculum — every subject in one place, with its notes, book,
   video course, practice set and your coverage so far. */
import { el, pct, hm } from '../util.js';
import { S } from '../store.js';
import { loadSyllabus, subjectProgress, loadNotesIdx } from '../data.js';
import { resourcesFor, resourceStrip } from '../resources.js';

const PAPER_ORDER = ['Phase I Paper 1', 'IT Paper (Phase I & II)', 'IT Paper + Interview', 'Phase II Paper 1', 'Phase III'];

export default async function curriculum(root) {
  const [syl, sp, idx] = await Promise.all([loadSyllabus(), subjectProgress(), loadNotesIdx()]);

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, 'Full Curriculum'),
      el('p', { class: 'sub' }, 'Every subject, with its notes, book, video course and question set — and how far through it you are.')),
    el('div', { class: 'btn-row' },
      el('a', { class: 'btn', href: '#/syllabus' }, 'Exam pattern'),
      el('a', { class: 'btn primary', href: '#/today' }, "Today's targets"))));

  /* overall counts */
  const notesTotal = idx.notes.length;
  const topicsTotal = syl.subjects.reduce((a, s) => a + s.topics.length, 0);
  const topicsDone = syl.subjects.reduce((a, s) => a + s.topics.filter(t => S.topic(t.id).status === 'done').length, 0);

  root.append(el('div', { class: 'grid g4', style: 'margin-bottom:18px' },
    stat('Subjects', String(syl.subjects.length), 'across all papers', 'acc'),
    stat('Topics', String(topicsTotal), `${topicsDone} marked confident`, 'pur'),
    stat('Notes', String(notesTotal), 'written for this syllabus', 'ok'),
    stat('Coverage', pct(topicsDone, topicsTotal) + '%', 'of topics confident', topicsDone / topicsTotal > 0.6 ? 'ok' : 'warn')));

  /* group subjects by paper */
  const byPaper = {};
  for (const s of syl.subjects) (byPaper[s.paper] ||= []).push(s);
  const papers = Object.keys(byPaper).sort((a, b) => {
    const ia = PAPER_ORDER.indexOf(a), ib = PAPER_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  for (const paper of papers) {
    const section = el('section', { class: 'card', style: 'margin-bottom:18px' },
      el('h2', {}, paper));
    for (const subj of byPaper[paper]) section.append(subjectRow(subj, sp[subj.id], idx));
    root.append(section);
  }

  root.append(el('section', { class: 'card' },
    el('h2', {}, 'How to work a subject'),
    el('ol', { class: 'small', style: 'margin:0;padding-left:18px;color:var(--tx2)' },
      el('li', {}, el('b', {}, 'Notes first.'), ' They are written to this syllabus and are the fastest route through it.'),
      el('li', {}, el('b', {}, 'Video only when a point will not click.'), ' Watch one lecture, then close it and recall the four main ideas.'),
      el('li', {}, el('b', {}, 'Book for depth'), ' on the three or four topics you know are weak — never cover-to-cover.'),
      el('li', {}, el('b', {}, 'Practice every time.'), ' A topic is not finished until you have answered questions on it and reviewed the mistakes.'),
      el('li', {}, el('b', {}, 'Mark the topic honestly'), ' in the Syllabus tracker. That is what drives your Revision Queue.'))));
}

function subjectRow(subj, prog, idx) {
  const notes = idx.notes.filter(n => n.subject === subj.id);
  const done = subj.topics.filter(t => S.topic(t.id).status === 'done').length;
  const p = pct(done, subj.topics.length);
  const planned = prog ? prog.mins : 0;

  const row = el('div', { style: 'padding:13px 0;border-top:1px solid var(--line)' },
    el('div', { class: 'row between', style: 'gap:10px;align-items:flex-start' },
      el('div', { style: 'min-width:0;flex:1' },
        el('div', { style: 'font-weight:700;font-size:.92rem' }, subj.name),
        el('div', { class: 'xsmall muted', style: 'margin-top:3px' },
          `${subj.topics.length} topics · ${notes.length} notes${planned ? ' · ' + hm(planned) + ' planned' : ''}`)),
      el('div', { style: 'width:110px;flex:0 0 auto' },
        el('div', { class: 'bar ' + (p >= 80 ? 'ok' : p >= 40 ? '' : 'warn'), html: `<i style="width:${p}%"></i>` }),
        el('div', { class: 'xsmall muted', style: 'text-align:right;margin-top:3px' }, `${done}/${subj.topics.length} confident`))));

  if (subj.weightNote)
    row.append(el('p', { class: 'xsmall muted', style: 'margin:6px 0 0;font-style:italic' }, subj.weightNote));

  const strip = el('div');
  row.append(strip);
  resourceStrip(subj.id, { label: false }).then(s => { if (s) strip.append(s); });
  resourcesFor(subj.id).then(r => {
    if (r.books.length) strip.append(el('p', { class: 'xsmall muted', style: 'margin:6px 0 0' },
      'Book: ' + r.books.map(b => b.title).join(' · ')));
  });

  return row;
}

const stat = (k, v, d, c) => el('div', { class: 'stat ' + c },
  el('div', { class: 'k' }, k), el('div', { class: 'v' }, v), el('div', { class: 'd' }, d));
